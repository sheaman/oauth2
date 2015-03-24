#! /usr/bin/env node

var redis = require('redis');

if(db) {
  console.log('client is already set...');
}

var db = redis.createClient(15371, 'pub-redis-15371.us-east-1-2.5.ec2.garantiadata.com', {no_ready_check: true});
db.auth('sparky45', function (err) {
    if (err) throw err;
});

db.on('connect', function() {
    console.log('Connected to Redis');
});

db.multi()
  .hmset('users:username', {
    id: 'username',
    username: 'username',
    password: 'password'
  })
  .hmset('clients:client', {
    clientId: 'client',
    clientSecret: 'secret'
  })
  .sadd('clients:client:grant_types', [
    'password',
    'refresh_token'
  ])
  .exec(function (errs) {
    if (errs) {
      console.error(errs[0].message);
      return process.exit(1);
    }

    console.log('Client and user added successfully');
    process.exit();
  });