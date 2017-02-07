Template.cards.helpers({
  lists: function () {
    const array = [];
    Cards.find({ start: { $ne: '' } }).forEach(function (value) {
      const getRate = Rate.findOne();
      const date = value.start;
      const option1 = value.option1;
      const option2 = Number.parseInt(value.option2 * getRate.rate);
      const option3 = value.option3;

      const list = {
        _id: value._id,
        number: value.number,
        start: date.getHours() + ':' + date.getMinutes(),
        option1: option1,
        option2: option2,
        option3: option3,
        total: option1 + option2 + option3,
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
    var getId = Session.get('id');
    Cards.update(getId, {
      $set: {
        start: new Date(),
        option1: 0,
        option2: 0,
        option3: 0,
      }
    });
    Session.set('id', '');
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
    const getId = this._id;
    if (getId) {
      Session.set('id', getId);
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