Meteor.publish('count', function() {
  return Count.find();
})