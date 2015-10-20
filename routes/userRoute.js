var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
var rootRefUrl = "https://taskhead.firebaseio.com/";
var ref = new Firebase(rootRefUrl);

	router.route('/api/v1/users/')
	.get(function(req, res, err) {
	  ref.child('users').on('value', function(snapshot) {
	  	res.json(snapshot.val());
	  },
	  function(err) {
	  	res.status(400).json(err);
	  });
	});

	router.route('/api/v1/users/:id')
	.get(function(req, res) {
		ref.child('users').child(req.params.id).on('value', function(snapshot) {
			res.json(snapshot.val());
		});
	})
	.put(function(req, res) {
		ref.child('users').on('value', function(snapshot) {
			var id = Object.keys(snapshot.val());
			for(var i = 0; i < id.length; i++) {
				if(id[i] === req.params.id) {
					ref.child('users').child(req.params.id).update({
						"name": req.body.name,
						"username": req.body.username
					});
				}
			}
			if(snapshot) {
				res.send("updated");
			}
			else {
				res.status("Error has occured");
			}
		});
	})
	.delete(function(req, res) {
		ref.child('users').child(req.params.id).remove().then(function(data) {
			res.send("deleted").error(function(err) {
				res.status(403).json(err);
			});
		});
	});
module.exports = router;




