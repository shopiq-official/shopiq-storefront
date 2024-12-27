#!/usr/bin/env node
import { execSync } from 'child_process';
const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to execute ${command}`, error)
        return false;
    }
    return true
}


const repoName = process.argv[2] || "my-store";

const gitCheckOutCommand = `git clone --depth 1 https://github.com/shopiq-official/shopiq-storefront.git ${repoName}`
const installDepsCommand = `cd ${repoName} && npm install`

console.log('Cloning the Repository ' + repoName);
const checkedOut = runCommand(gitCheckOutCommand);

if (!checkedOut) process.exit(-1);


console.log(`Installing Dependencies for ${repoName}`)

const installDeps = runCommand(installDepsCommand);

if (!installDeps) process.exit(-1);

console.log("Congratulations . Follow the commands to Start")

console.log(`cd ${repoName} && npm install`)
