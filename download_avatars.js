var request = require('request');
var fs = require('fs');
var myToken = require('./secrets');


var repoOwner =  process.argv[2];
var repoName = process.argv[3];

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


getRepoContributors(repoOwner, repoName, function(err, result) {
  if (repoOwner === undefined || repoName === undefined ) {
    console.log("Error: please write jquery twice with an space.");
  } else {
    console.log("Errors:", err);
    console.log("Result:", result);
    for (var i = 0; i < result.length; i++) {
      console.log("urls: ", result[i].avatar_url);
      downloadImageByUrl(result[i].avatar_url, __dirname + "/avatar/" + result[i].login + ".jpg");
    }
  }


});


//__dirname == .

function downloadImageByUrl(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Message: ', response.headers['content-type']);
         console.log('Downloading image...');
       })
       .on('end',function(){
        console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath));

}







//nanisst:614ec2b77d8194602b3582561f5a1b6157268b37
//https://github.com/settings/tokens


