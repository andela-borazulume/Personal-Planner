var express = require('express');
var router = express.Router();
var Firebase = require('Firebase');
var rootRefUrl = 'https://taskhead.firebaseio.com/';
var ref = new Firebase(rootRefUrl);

router.route('/api/v1/users/:id/categories/:categoryId/tasks/:taskId/attachments')
.post(function(req, res) {
	ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).child('tasks').child(req.params.taskId).push({
		"Attachments": req.body
	});
	res.send("Attachments created");
}, function(err) {
	res.status(400).json(err);
});