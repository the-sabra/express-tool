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
      reject(new Error("npm install timed out"));
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
      reject(new Error("npm install timed out"));
    }, timeout);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the npm install process completes
    });
  });
}