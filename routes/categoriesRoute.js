var express = require('express');
var router = express.Router();
var Firebase = require("firebase");
var rootRefUrl = "https://taskhead.firebaseio.com/";
var ref = new Firebase(rootRefUrl);

	router.route('/api/v1/users/:id/categories')
	.post(function(req, res, err) {
		var categoryCreated = ref.child('users').child(req.params.id).child('categories');
		categoryCreated.push({
			"Category" : req.body
		});
		res.send("Category created");
	}, function(err) {
		res.status(403).json(err);
	})

	.get(function(req, res, err) {
		ref.child('users').child(req.params.id).child('categories').on('value', function(snapshot) {
			res.json(snapshot.val());
		}, function(err) {
			res.status(403).json(err);
		});
	});

	router.route('/api/v1/users/:id/categories/:categoryId')
	.get(function(req, res) {
		var category = ref.child('users').child(req.params.id).child('categories');
		category.child(req.params.categoryId).on('value', function(snapshot) {
			res.json(snapshot.val());
		});
	})
	.put(function(req, res) {
		ref.child('users').child(req.params.id).child('categories').on('value', function(snapshot) {
			var id = Object.keys(snapshot.val());
			for(var i = 0; i < id.length; i++) {
				if(id[i] === req.params.categoryId) {
					ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).update({
						"Category" : req.body
					});
				}
			}
			res.send("Updated successfully");
		});
	},
	function(err) {
		res.send("Cannot update category");
	})
	.delete(function(req, res) {
		ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).remove().then(function() {
			res.send("deleted");
		}).error(function(err) {
			res.status(403).json(err);
		});
	});

	module.exports = router;