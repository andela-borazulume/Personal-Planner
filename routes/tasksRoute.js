var express = require('express');
var router = express.Router();
var Firebase = require('Firebase');
var rootRef = "https://taskhead.firebaseio.com/";
var ref = new Firebase(rootRef);

router.route('/api/v1/users/:id/categories/:categoryId/tasks')
.post(function(req, res) {
	var taskCreated = ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).child('tasks');
	taskCreated.push({
		"Task": req.body
	});	
	res.send("Task has been created");	
}, function(err) {
		res.status(400).json(err);
})

.get(function(req, res) {
	var taskCreated = ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).child('tasks').on('value', function(snapshot) {
			res.json(snapshot.val());
	}, function(err) {
		res.status(400).json(err);
	});
});

router.route('/api/v1/users/:id/categories/:categoryId/tasks/:taskId')
.get(function(req, res) {
	var eachTask = ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).child('tasks').child(req.params.taskId);
	eachTask.on('value', function(snapshot) {
		res.json(snapshot.val());
	}, function(err) {
		res.status(400).json(err);
	});
})
.put(function(req, res) {
	ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).child('tasks').on('value', function(snapshot) {
		var id = Object.keys(snapshot.val());
		for(var i = 0; i < id.length; i++) {
			if(id[i] === req.params.taskId) {
				ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).child('tasks').child(req.params.taskId).update({
					"Task": req.body
				});
			}
		}
		res.send("Updated successfully");
	});
}, function(err) {
		res.send("Cannot update task");
})
.delete(function(req, res) {
	ref.child('users').child(req.params.id).child('categories').child(req.params.categoryId).child('tasks').child(req.params.taskId).remove(function() {
		res.send("deleted");
	});
});

// router.get('.api/v1/users/:id/categories', function(req, res) {
// 	ref.child('users').child(req.params.id).child('categories').on('value', function(snapshot) {
// 		var getCategories = snapshot.val();
// 		console.log("Just checking out this", getCategories);
// 	});
// });

module.exports = router;
