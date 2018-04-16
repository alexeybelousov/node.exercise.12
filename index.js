const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, client) {
  if (err) throw err;

  const db = client.db('test');
  const collection = db.collection('users');
  const user1 = { name: 'Alexey', age: '29' };
  const user2 = { name: 'Roma', age: '34' };
  const user3 = { name: 'Roma', age: '25' };
  const user4 = { name: 'Stas', age: '36' };

  collection.insert([ user1, user2, user3, user4 ], function(err, res) {
    if (err) throw err;
    console.log(res.result.n + ' document(s) inserted');

    collection.find({}).toArray(function(err, res) {
      if (err) throw err;
      console.log(res);
    });

    collection.updateMany({ name: 'Roma' }, {$set: {name: 'Roman'} }, function(err, res) {
      if (err) throw err;
      console.log(res.result.nModified + ' document(s) updated');
    });

    collection.find({}).toArray(function(err, res) {
      if (err) throw err;
      console.log(res);
    });

    collection.deleteMany({ name: 'Roman' }, function(err, res) {
      if (err) throw err;
      console.log(res.result.n + ' document(s) deleted');
    });

    collection.find({}).toArray(function(err, res) {
      if (err) throw err;
      console.log(res);
    });

    client.close();
  });
});
