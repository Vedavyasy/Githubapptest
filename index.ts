import { getInput } from "@actions/core";
import { context ,getOctokit } from "@actions/github";
import dedent from "dedent";

type GithubContext = typeof context;
const inputName = getInput("name");
const ghtoken=getInput("ghtoken");

greet(inputName,getrepourl(context));

getdiff().then(files =>{
    console.log(dedent(`
    Your PR diff:
    ${JSON.stringify(files, undefined, 2)}
    `))
})
function greet(name: string, repoUrl: string) {
    console.log(`'Hello ${name}! You are running a GH Action in ${repoUrl}'`);
  }

function getrepourl({repo, serverUrl} : GithubContext): string {
   return `${serverUrl}/${repo.owner}/${repo.repo}`
}

async function getdiff(){
    if(ghtoken){
        const octokit=getOctokit(ghtoken);
        const result = await octokit.rest.repos.compareCommits({
            repo: context.repo.repo,
            owner:context.repo.owner,
            head: context.payload.pull_request?.head.sha,
            base: context.payload.pull_request?.base.sha,
            per_page : 100

        })
        return result.data.files || []
    }
    return []
}