import { fetchInstallationToken } from './gettoken';
import { context} from "@actions/github";
import { setOutput } from "@actions/core";

const fs = require("fs");
var myKey = fs.readFileSync("./token.pem", "utf8");


var res = fetchInstallationToken({
    appId: "272308",
    owner: context.repo.owner,
    privateKey: myKey,
    repo: "Githubactions",
    apiUrl: "https://api.github.com",

})
res.then(function (result) {
    setOutput('token', result);
    console.log(result)
})