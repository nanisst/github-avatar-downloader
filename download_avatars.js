var request = require('request');
var myToken = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': myToken.GITHUB_TOKEN

    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  for (var i = 0; i < result.length; i++) {
    console.log("urls: ", result[i].avatar_url);
  }
});

//nanisst:614ec2b77d8194602b3582561f5a1b6157268b37
//https://github.com/settings/tokens


