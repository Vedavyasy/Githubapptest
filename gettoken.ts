import { getInput } from "@actions/core";
import { context, getOctokit} from "@actions/github";
import { createAppAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';
import fetch, { Response } from 'node-fetch';
import JWT from 'jsonwebtoken';

const inputName = getInput("name");
greet(inputName);
function greet(name: string) {
    console.log(`'Hello ${name}'`);
}

const fs = require("fs");
var myKey = fs.readFileSync("./token.pem", "utf8");
var date=new Date();
var payload = {
    iat: date.getSeconds() - 60,
    exp: date.getSeconds()+ (10 * 60),
    iss: 272308
  };
var jwt = JWT.sign(payload, myKey,{algorithm:'RS256'});

function httprequest(){
    const fs = require("fs");
var myKey = fs.readFileSync("./token.pem", "utf8");
var date=new Date();
var payload = {
    iat: date.getSeconds() - 60,
    exp: date.getSeconds()+ (10 * 60),
    iss: 272308
  };
var jwt = JWT.sign(payload, myKey,{algorithm:'RS256'});
console.log(jwt);
    return fetch('https://api.github.com/app',{
        method: 'Get',
        headers:{
            Authorization: "Bearer "+jwt,
            Accept: 'application/vnd.github+json'
        }
    }).then(
        (response) => response.json()
      );
    
};
console.log(httprequest());

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
    console.log("done step 1")
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
apiUrl:"https://api.github.com",
installationId:32214299
})
console.log("Token is ",res);

