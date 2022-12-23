import { getInput } from "@actions/core";
import { context, getOctokit} from "@actions/github";
import { createAppAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';
import { report } from "process";
import fetch from 'node-fetch';

const inputName = getInput("name");
greet(inputName);
function greet(name: string) {
    console.log(`'Hello ${name}'`);
}

const fs = require("fs");
var myKey = fs.readFileSync("./token.pem", "utf8");

function httprequest(){
    const fs = require("fs");
var myKey = fs.readFileSync("./token.pem", "utf8");
    myKey=myKey.replace('-----BEGIN RSA PRIVATE KEY-----','');
myKey =myKey.replace('-----END RSA PRIVATE KEY-----','');
    const res=fetch('https://api.github.com/app',{
        method: 'Get',
        headers:{
            Authorization: 'Bearer'+ myKey,
            Accept: 'application/vnd.github+json'
        }
    })
    console.log(res);
};
httprequest();

export const fetchInstallationToken = async ({ appId,
    installationId,
    owner,
    permissions,
    privateKey,
    repo,
    apiUrl,
}: Readonly<{
    appId: string;
    installationId?: number;
    owner: string;
    permissions?: Record<string, string>;
    privateKey: string;
    repo: string;
    apiUrl: string;
}>): Promise<string> => {
    const app = createAppAuth({
        appId,
        privateKey,
        request: request.defaults({
            baseUrl: apiUrl,
        }),
    });
    // const octokit = getOctokit(myKey);
    // console.log(await octokit.request('GET /installation/repositories{?per_page,page}', {}))
//     const authApp = await app({ type: "app" });
//      const octokit = getOctokit(authApp.token);
//    console.log(await octokit.rest.apps.getRepoInstallation({ owner, repo }))
    if (installationId == undefined) {
        const authApp = await app({ type: "app" });
        const octokit = getOctokit(authApp.token);
        try {
            ({
                data: { id: installationId },
            } = await octokit.rest.apps.getRepoInstallation({ owner, repo }));
        } catch (error) {
            throw new Error("Could not get the repo installation. is the app installed on this repo?");
        }
    }

    const installation = await app({
        installationId,
        accept: 'application/vnd.github+json',
        permissions:{
            issues: 'write',
            contents: 'read' 
        },
        type: "installation",
    });
    console.log(`'Hello'`);
    return installation.token;
};


var res= fetchInstallationToken({ appId: "272308",
owner: context.repo.owner,
privateKey: myKey,
repo:"Githubactions",
apiUrl:"https://Githubapptest/api/v3",
installationId:32214299
})

