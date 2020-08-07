import fs from "fs"
import bread from "atob"
var url = "https://newrelic.com"
var cobrandName = "Big Brand Name"
var cobrandLogin = "user"
var cobrandPassword = "123456"
var result = ""
var cnt = 0

function decodeCert(callback) {
  // any async callback invokes callback with response
  fs.readFile("./xaa", function (err, data) {
    if (err) return callback(err)
    callback(null, data)
    fs.readFile("./xab", function (err, data) {
      if (err) return callback(err)
      callback(null, data)
    })
  })
}

decodeCert(function printToConsole(err, data) {
  // process the async data
  var parts = ""
  if (err === null) {
    parts = bread(data.toString("utf8"))
    cnt++
  } else {
    parts = err
  }
  result += parts

  var options = {
    uri: url + "/cobrand/login",
    agentOptions: {
      key: "gpg",
      cert: result,
    },
    headers: {
      "Canonical-Resource": "CobrandLogin",
      "Content-Type": "application/json",
      "Cobrand-Name": "" + cobrandName + "",
      "Api-Version": "1.0",
    },
    body:
      '{"cobrand" : {"cobrandLogin": "' +
      cobrandLogin +
      '", "cobrandPassword": "' +
      cobrandPassword +
      '"}}',
  }
  if (cnt === 2) {
    console.log(options.agentOptions.cert)
  }
})
