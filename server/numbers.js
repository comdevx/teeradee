Meteor.publish('numbers', function() {
  return Numbers.find();
})