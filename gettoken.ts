import { getInput } from "@actions/core";
import { context ,getOctokit } from "@actions/github";
import { createAppAuth } from '@octokit/auth-app';
import { request } from '@octokit/request';
import { report } from "process";

const inputName = getInput("name");
greet(inputName);
function greet(name: string) {
    console.log(`'Hello ${name}'`);
}

const fs = require("fs");
var myKey = fs.readFileSync("./token.pem", "utf8").replace("-----BEGIN RSA PRIVATE KEY-----", "").replace("-----END RSA PRIVATE KEY-----", "").trim();
console.log("My key is: ", myKey);
gettoken("272308",myKey)

function gettoken(appId:string, privateKey: string){
    const app = createAppAuth({
        appId,
        privateKey,
        request: request.defaults({
            baseUrl: "https://Githubapptest/api/v3",
        }),
    });
    console.log(app);
}