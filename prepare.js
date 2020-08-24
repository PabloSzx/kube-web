const { existsSync, writeFileSync } = require("fs");

if (!existsSync(".env")) {
  writeFileSync(
    ".env",
    `
DOCKER_USERNAME=your_docker_username
DOCKER_PASSWORD=your_docker_password
DOCKER_EMAIL=your_docker_email
`.trim() + "\n",
    {
      encoding: "utf-8",
    }
  );
}
