// the current code is
getUser(1,(user)=>{
    getRepositories(user.gitHubUsername,(repos,levelNumber)=>{
        getBrunch(repos[levelNumber],(brunch)=>{
            if (brunch == "master")
                postCommit(newVersion,(committed)=>{
                    if(committed)
                        console.log("The new version is committed");
                    else
                        console.log("The new version is not committed");
                })
        })
    })
});

// question number 1 : developer les function de ce code en callback
var user ={
    gitHubUsername,
}

function getUser(num, userCallback) {
   console.log("getUser method was called")
   // get user
    userCallback(user);
   console.log("user callback method was exectued");
   // userCallback(user);
}

function userCallback(user){
    getRepositories(user.gitHubUsername,repositoryCallback(rep, levelnumber))
}

function getRepositories(usergithubname , repositorycallback) {
      console.log("get repository method was executed")
    repositorycallback(repos,levelNumber);
      console.log("repository callback was executed");
}

function repositoryCallback(rep, levelnumber){
    getbrunch(rep[levelNumber],getBranchcallback)
}

function getBrunch(repo, callback) {
       console.log("brunch method was executed");
    callback(brunch);

}

function brunchCallback(brunch){
    if (brunch == "master")
        postCommit(newVersion,PostCommitCallback)
}

function postCommit(newVersion, postCommitCallback){
    console.log("post commit method was executed")
    postCommitCallback(commited);
}

function postCommitCallback(committed){
        if(committed)
            console.log("The new version is committed");
        else
            console.log("The new version is not committed");
}
// question 2 : with promesses :

  getUser(1).then(user=>getRepositories(user.gitHubUsername))
    .then((repos,levelNumber)=>getBrunch(repos[levelNumber]))
    .then((bunch)=>{
        if(bunch==="master")
            postCommit(newversion)
    }).then((commited)=>postCommitCallback(commited));

// 3 : version async await :
async function getUser(user){

    var repos = await getRepositories(user);
    var bunch = await getBrunch(repos[levelNumber]);
    if(bunch ==="master"){
        var committed = await getCommits(newversion);
        if(committed)
            console.log("The new version is committed");
        else
            console.log("The new version is not committed");

    }
}



