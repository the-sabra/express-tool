import { exec } from "child_process";

// this function to execute npm install command
export async function npmInstaller(dir) {
  const installCommand = "npm install";
  const timeout = 30000; // Timeout in milliseconds (30 seconds)

  return new Promise((resolve, reject) => {
    const installProcess = exec(installCommand, { cwd: dir }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    // Set a timeout for the npm install command
    const timeoutId = setTimeout(() => {
      installProcess.kill(); // Terminate the npm install process
      reject(new Error("npm install timed out"));
    }, timeout);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the npm install process completes
    });
  });
}

// this function to execute pnpm install command
export async function pnpmInstaller(dir) {
  const installCommand = "pnpm install";
  const timeout = 30000; // Timeout in milliseconds (30 seconds)

  return new Promise((resolve, reject) => {
    const installProcess = exec(installCommand, { cwd: dir }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    // Set a timeout for the npm install command
    const timeoutId = setTimeout(() => {
      installProcess.kill(); // Terminate the npm install process
      reject(new Error("pnpm install timed out"));
    }, timeout);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the npm install process completes
    });
  });
}

// this function to execute yarn install command
export async function yarnInstaller(dir) {
  const installCommand = "yarn install";
  const timeout = 30000; // Timeout in milliseconds (30 seconds)

  return new Promise((resolve, reject) => {
    const installProcess = exec(installCommand, { cwd: dir }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    // Set a timeout for the npm install command
    const timeoutId = setTimeout(() => {
      installProcess.kill(); // Terminate the npm install process
      reject(new Error("yarn install timed out"));
    }, timeout);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the npm install process completes
    });
  });
}

// this function to execute npm update command
export async function npmUpdater(dir) {
  const updateCommand = "npm update";
  const timeout = 30000; // Timeout in milliseconds (30 seconds)

  return new Promise((resolve, reject) => {
    const installProcess = exec(updateCommand, { cwd: dir }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    // Set a timeout for the npm update command
    const timeoutId = setTimeout(() => {
      installProcess.kill(); // Terminate the npm update process
      reject(new Error("npm update timed out"));
    }, timeout);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the npm update process completes
    });
  });
}
// this function to execute pnpm update command
export async function pnpmUpdater(dir) {
  const updateCommand = "pnpm update";
  const timeout = 30000; // Timeout in milliseconds (30 seconds)

  return new Promise((resolve, reject) => {
    const installProcess = exec(updateCommand, { cwd: dir }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    // Set a timeout for the pnpm update command
    const timeoutId = setTimeout(() => {
      installProcess.kill(); // Terminate the pnpm update process
      reject(new Error("pnpm update timed out"));
    }, timeout);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the pnpm update process completes
    });
  });
}

// this function to execute yarn update command
export async function yarnUpdater(dir) {
  const updateCommand = "yarn up";
  const timeout = 30000; // Timeout in milliseconds (30 seconds)

  return new Promise((resolve, reject) => {
    const installProcess = exec(updateCommand, { cwd: dir }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    // Set a timeout for the yarn update command
    const timeoutId = setTimeout(() => {
      installProcess.kill(); // Terminate the yarn update process
      reject(new Error("yarn update timed out"));
    }, timeout);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the yarn update process completes
    });
  });
}
