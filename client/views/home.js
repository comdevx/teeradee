Template.cards.helpers({
  lists: function () {
    return Cards.find({ start: { $ne: '' } });
  }
});

Template.dropdown.helpers({
  numbers: function () {
    return Cards.find({ start: '' });
  }
});

Template.dropdown.events({
  'click button': function (event) {
    try {
      var date = new Date;
      var getId = Session.get('id');
      Cards.update(getId, {
        $set: {
          start: date.getHours() + ' : ' + date.getUTCMinutes(),
          option1: 0,
          option2: 0,
          option3: 0,
        }
      });
    } catch (error) {
      console.log(error)
    }
  },

  'click a': function (event) {
    if (this._id) {
      Session.set('id', this._id);
    }
  }
});

Template.cards.events({
  'click a': function (event) {
    console.log(this._id);
  },
  'click button': function (event) {
    if (this._id) {
      console.log(this._id);
      Session.set('id', this._id);
    }
  }
});

Template.payment.events({
  'click div a.accept': function (event) {
    var getId = Session.get('id');
    Cards.update(getId, {
      $set: {
        start: '',
        option1: 0,
        option2: 0,
        option3: 0,
      }
    });
  }
});