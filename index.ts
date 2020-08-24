import "dotenv/config";

import assert from "assert";
import { parse } from "dotenv";
import fs from "fs";
import open from "open";
import { resolve } from "path";
import { requireEnv } from "require-env-variable";
import { exec } from "shelljs";
import { promisify } from "util";

console.log("START");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const kubeConfig = resolve("./kubeconfig.yaml");
const envFile = resolve("./.env");

assert(
  fs.existsSync(kubeConfig),
  Error(`You have to put a "kubeconfig.yaml" in the root directory of this project.`)
);

assert(
  fs.existsSync(envFile),
  Error(`You have to define a ".env" file in the root directory of this project.`)
);

const { DOCKER_USERNAME, DOCKER_PASSWORD, DOCKER_EMAIL } = requireEnv(
  "DOCKER_USERNAME",
  "DOCKER_PASSWORD",
  "DOCKER_EMAIL"
);

readFile(envFile, { encoding: "utf-8" }).then((envFile) => {
  writeFile(
    "env.json",
    JSON.stringify(
      Object.entries(parse(envFile)).map(([name, value]) => {
        return {
          name,
          value,
        };
      }),
      null,
      2
    ),
    { encoding: "utf-8" }
  ).catch(console.error);
});

const prefix = `cross-env KUBECONFIG=${kubeConfig}`;

exec(
  `${prefix} kubectl create secret docker-registry docker-hub-secrets --docker-server=https://index.docker.io --docker-username=${DOCKER_USERNAME} --docker-password=${DOCKER_PASSWORD} --docker-email=${DOCKER_EMAIL}`,
  {
    async: true,
  }
);

exec(
  `${prefix} kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/recommended.yaml`
);

exec(`${prefix} kubectl proxy`, {
  async: true,
});

setTimeout(() => {
  open(
    "http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/",
    {
      wait: false,
    }
  );
}, 1000);
