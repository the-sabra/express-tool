export let packageCjs = {
  name: "",
  version: "0.0.1",
  private: true,
  scripts: {
    dev: "nodemon app.js",
    start: "node app.js ",
  },
  dependencies: {
    express: "~4.17.1",
    cors: "^2.8.5",
  },
  devDependencies: {
    nodemon: "^3.0.1",
  },
};
export let packageEjs = {
  name: "",
  version: "0.0.1",
  private: true,
  type: "module",
  scripts: {
    dev: "nodemon app.js",
    start: "node app.js ",
  },
  dependencies: {
    express: "~4.17.1",
    cors: "^2.8.5",
  },
  devDependencies: {
    nodemon: "^3.0.1",
  },
};

export let packageTs = {
  name: "",
  version: "0.0.1",
  private: true,
  scripts: {
    start: "node ./dist/app.js",
    build: "tsc -p",
    dev: "nodemon ./src/app.ts",
  },
  dependencies: {
    express: "~4.17.1",
    cors: "^2.8.5",
  },
  devDependencies: {
    nodemon: "^3.0.1",
    typescript: "^4.7.4",
    "@types/cors": "^2.8.13",
    "ts-node": "^10.0.0",
    "@types/node": "18.15.11",
    "@types/express": "^4.17.13",
    "@types/node": "18.15.11",
  },
};
