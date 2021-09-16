var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;
const {readFileSync} = require('fs');
const conn = new Client();

/* GET users listing. */
router.post('/', (req, res) => {
  const {body = {}} = req;

  conn.on('ready', function() {
    console.log('Client :: ready');
    conn.exec('uptime', function(err, stream) {
      if (err) throw err;
      stream.on('close', function(code, signal) {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
      }).on('data', function(data) {
        console.log('STDOUT: ' + data);
        res.send(data)
      }).stderr.on('data', function(data) {
        res.send(data)
        console.log('STDERR: ' + data);
      });
    });
  }).connect({
    host: body.host,
    port: body.port,
    username: body.username,
    passphrase: body.passphrase,
    privateKey: readFileSync(body.privateKey),
  });
});

module.exports = router;