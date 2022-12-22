const kue = require('kue');

const queue = kue.createQueue();
//Creating the object queue

module.exports = queue;