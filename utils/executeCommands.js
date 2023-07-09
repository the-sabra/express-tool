import { exec } from "child_process";

export async function installPackagesWithNpm(dir) {
  const installCommand = "npm install";
  try {
     process.chdir(dir);
     exec(installCommand);
  } catch (error) {
    throw new Error(error);
  }
}