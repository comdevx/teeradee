Template.cards.helpers({
  lists: function () {
    const array = [];
    Cards.find({ start: { $ne: '' } }).forEach(function (value) {
      const getRate = Rate.findOne();
      const date = value.start;
      const option1 = value.option1;
      const option2 = value.option2;
      const option3 = value.option3;

      const list = {
        _id: value._id,
        number: value.number,
        start: date.getHours() + ':' + date.getMinutes(),
        option1: option1,
        option2: option2,
        option3: option3,
        minute: value.minute,
        total: option1 + option2 + option3,
      };
      array.push(list);
    });
    return array;
  }
});

Template.count.events({
  'click button': function () {
    const ball = Count.findOne();
    Count.update(ball._id, { $set: { ball: 0 } });
  }
});

Template.count.helpers({
  ball: function () {
    return Count.findOne();
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
    const card = Cards.findOne(getId);
    if (card && card.start === '') {
      Cards.update(getId, {
        $set: {
          start: new Date(),
          option1: 0,
          option2: 0,
          option3: 0,
          minute: 0,
        }
      });
    }
  },

  'click a': function (event) {
    if (this._id) {
      Session.set('id', this._id);
    }
  }
});

Template.cards.events({
  'click': function (event) {
    Session.set('id', this._id);
  }
});

Template.payment.events({
  'click div a.btn-success': function (event) {
    const id = Session.get('id'),
      card = Cards.findOne(id),
      option1 = card.option1,
      option2 = card.option2,
      option3 = card.option3;
    Logs.insert({
      start: card.start,
      minute: card.minute,
      option1: option1,
      option2: option2,
      option3: option3,
      total: option1 + option2 + option3,
    });
    Cards.update(id, {
      $set: {
        start: '',
        option1: 0,
        option2: 0,
        option3: 0,
        minute: 0,
        total: 0,
      }
    });
  }
});

Template.payment.helpers({
  payment: function () {
    try {
      const id = Session.get('id');
      const card = Cards.findOne(id);
      if (card && card.start != '') {
        const getRate = Rate.findOne();
        const date = card.start;
        const option1 = card.option1;
        const option2 = card.option2;
        const option3 = card.option3;
        const list = {
          number: card.number,
          start: date.getHours() + ':' + date.getMinutes(),
          option1: option1,
          option2: option2,
          option3: option3,
          minute: card.minute,
          total: option1 + option2 + option3,
        };
        return list;
      }
    } catch (error) {
      console.log(error);
    }
  }
});

Template.option1.events({
  'click div a.btn-success': function (event) {
    const price = Session.get('price');
    const id = Session.get('id');
    const card = Cards.findOne(id);
    Cards.update(id, {
      $set: {
        option1: card.option1 + price,
      }
    });
    Session.set('price', 0);
  },
  'click a': function (event) {
    if (this.price) {
      Session.set('price', this.price);
    }
  }
});

Template.option1.helpers({
  options: function () {
    return Products.find({}, { sort: { price: 1 } });
  }
});

Template.option3.events({
  'click div a.btn-success': function (event) {
    const price = Session.get('price');
    const id = Session.get('id');
    const card = Cards.findOne(id);
    const person = Cards.find({ start: { $ne: '' } }).count();

    const count = Count.findOne();
    Count.update(count._id, { $set: { ball: count.ball + 1 } });

    Cards.find().forEach(function (value) {
      const sum = price / person;
      const total = Number.parseInt(value.option3 + sum);

      Cards.update(value._id, {
        $set: {
          option3: total,
        }
      });
    });
    Session.set('price', 0);
  },
  'click a': function (event) {
    if (this.price) {
      Session.set('price', this.price);
    }
  }
});

Template.option3.helpers({
  options: function () {
    return Balls.find({}, { sort: { price: 1 } });
  }
});
