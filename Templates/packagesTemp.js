export let packageCjs = {
  name: "",
  version: "0.0.1",
  private: true,
  scripts: {
    "start:dev": "nodemon app.js",
    start: "node app.js ",
  },
  dependencies: {
    debug: "~2.6.9",
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
    "start:dev": "nodemon app.js",
    start: "node app.js ",
  },
  dependencies: {
    debug: "~2.6.9",
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
    "start:dev": "nodemon app.ts",
    start: "node  ./dist/app.js ",
  },
  dependencies: {
    debug: "~2.6.9",
    express: "~4.17.1",
    cors: "^2.8.5",
  },
  devDependencies: {
    nodemon: "^3.0.1",
    typescript: "^4.7.4",
    "ts-node": "^10.0.0",
    "@types/node": "18.15.11",
    "@types/express": "^4.17.13",
    "@types/node": "18.15.11",
  },
};
