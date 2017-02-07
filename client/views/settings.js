Template.rate.helpers({
    load: function () {
        return Rate.findOne();
    }
});

Template.setRate.events({
    'submit': function (event, form) {
        event.preventDefault();
        const rateValue = Number(event.target.rate.value);
        const getRate = Rate.findOne();
        Rate.update(getRate._id, {
            $set: {
                rate: rateValue
            }
        });
        form.find("form").reset();
    },
});

Template.product.events({
    'submit': function (event, form) {
        event.preventDefault();
        const price = Number(event.target.price.value);
        Products.insert({ price: price });
        form.find("form").reset();
    },
});

Template.productList.events({
    'click a': function (event) {
        Products.remove(this._id);
    },
});

Template.productList.helpers({
    products: function () {
        return Products.find();
    }
});

Template.product2.events({
    'submit': function (event, form) {
        event.preventDefault();
        const price = Number(event.target.price.value);
        Balls.insert({ price: price });
        form.find("form").reset();
    },
});

Template.productList2.events({
    'click a': function (event) {
        Balls.remove(this._id);
    },
});

Template.productList2.helpers({
    balls: function () {
        return Balls.find();
    }
});

Template.log.helpers({
    logs: function () {
        return Logs.find();
    }
});