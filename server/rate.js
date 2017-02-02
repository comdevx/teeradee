Meteor.publish('rate', function() {
  return Rate.find();
})