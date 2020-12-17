import "dotenv/config";

import { exec } from "shelljs";
import { resolve } from "path";

const kubeConfig = resolve("./kubeconfig.yaml");

const prefix = `cross-env KUBECONFIG=${kubeConfig}`;

exec(`${prefix} kubectl rollout restart deployment/api-fishbyte`);
