Template.cards.helpers({
  lists: function () {
    const array = [];
    Cards.find({ start: { $ne: '' } }).forEach(function (value) {
      const date = value.start;
      const list = {
        start: date.getHours() + ':' + date.getMinutes(),
        option1: value.option1,
        option2: value.option2,
        option3: value.option3,
      };
      array.push(list);
    });
    return array;
  }
});

Template.dropdown.helpers({
  numbers: function () {
    return Cards.find({ start: '' }, { sort: { number: 1 } });
  }
});

Template.dropdown.events({
  'click button': function (event) {
    try {
      var getId = Session.get('id');
      Cards.update(getId, {
        $set: {
          start: new Date(),
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