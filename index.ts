import { getInput } from "@actions/core";
import { context  } from "@actions/github";

type GithubContext = typeof context;
const inputName = getInput("name");

greet(inputName,getrepourl(context));

function greet(name: string, repoUrl: string) {
    console.log(`'Hello ${name}! You are running a GH Action in ${repoUrl}'`);
  }

function getrepourl({repo, serverUrl} : GithubContext): string {
   return `${serverUrl}/${repo.owner}/${repo.repo}`
}