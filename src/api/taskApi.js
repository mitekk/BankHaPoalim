//This file is mocking a web API by hitting hard coded data.
var workPeriodReport = require('./taskData').workPeriodReport;
var users = require('./taskData').users;
var taskList = require('./taskData').taskList;
// var _ = require('lodash');

var _clone = function (item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

//This would be performed on the server in a real app. Just stubbing in.
// var _generateId = function(task) {
// 	return task.name.toLowerCase() + '-' + _.random(0,9999);
// };

var AuthorApi = {
	getworkPeriodReport: () => {
		return _clone(workPeriodReport);
	},
	setReportHours: (data, taskId, userId) => {
		console.log(`User: ${userId}, reported task: ${taskId}, on: ${new Date(data.day.date)}, ${data.index} hours`);
	},
	removeReport: (id, taskId, userId) => {
		console.log(`Report id: ${taskId}, was removed`);
	},
	getUsers: () => {
		return _clone(users);
	},
	getTasks: () => {
		return _clone(taskList);
	}
	// getAllAuthors: function() {
	// 	return _clone(tasks); 
	// },

	// getAuthorById: function(id) {
	// 	var task = _.find(tasks, {id: id});
	// 	return _clone(task);
	// },

	// saveAuthor: function(task) {
	// 	//pretend an ajax call to web api is made here
	// 	console.log('Pretend this just saved the author to the DB via AJAX call...');

	// 	if (task.id) {
	// 		var existingAuthorIndex = _.indexOf(tasks, _.find(tasks, {id: task.id})); 
	// 		tasks.splice(existingAuthorIndex, 1, task);
	// 	} else {
	// 		//Just simulating creation here.
	// 		//The server would generate ids for new authors in a real app.
	// 		//Cloning so copy returned is passed by value rather than by reference.
	// 		task.id = _generateId(task);
	// 		tasks.push(_clone(task));
	// 	}

	// 	return author;
	// },

	// deleteAuthor: function(id) {
	// 	console.log('Pretend this just deleted the author from the DB via an AJAX call...');
	// 	_.remove(tasks, { id: id});
	// }
};

module.exports = AuthorApi;