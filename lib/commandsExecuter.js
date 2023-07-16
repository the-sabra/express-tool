import { exec } from "child_process";

export async function shellCommandExecuter(
  command,
  timeoutMs,
  timeoutErrMsg,
  cwd
) {
  return new Promise((resolve, reject) => {
    const installProcess = exec(command, { cwd }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    const timeoutId = setTimeout(() => {
      installProcess.kill();
      reject(new Error(timeoutErrMsg));
    }, timeoutMs);

    installProcess.on("exit", () => {
      clearTimeout(timeoutId); // Clear the timeout when the process completes
    });
  });
}
