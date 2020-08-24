# kube-web

Automating [Kubernetes Web UI Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/), including [Docker Hub](hub.docker.com) secrets creation.

## Requisites

- kubectl
- Node.js v14+

## Usage

1. Put your `kubeconfig.yaml` in the root directory of this project.

2. Install Dependencies

```sh
npm i
```

3. Modify the just created `.env` file, including

```
DOCKER_USERNAME=your_docker_username
DOCKER_PASSWORD=your_docker_password
DOCKER_EMAIL=your_docker_email
```

4. (Optional) Add any extra environment variables you might want to add to your instances inside the same `.env` file, this application will automatically create an `env.json` file containing the environment variables in the Kubernetes JSON format for environment variables, ready to be copied inside the dashboard.

5. Just start it, it will automatically create the Dashboard UI instance and open the browser for you

```sh
npm start
```
