Template.rate.helpers({
    load: function () {
        return Rate.findOne();
        // console.log(test);
        // Session.set('rateId', test[0]._id);
        // return test;
    }
});

Template.setRate.events({
    'submit': function (event) {
        event.preventDefault();
        const rateValue = Number(event.target.rate.value);
        const getRate = Rate.findOne();
        Rate.update(getRate._id, {
            $set: {
                rate: rateValue
            }
        });
    },
});

Template.product.events({
    'submit': function (event) {
        event.preventDefault();
        const price = Number(event.target.price.value);
        console.log(price)
        Products.insert({ price: price });
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
    'submit': function (event) {
        event.preventDefault();
        const price = Number(event.target.price.value);
        console.log(price)
        Balls.insert({ price: price });
    },
    'click .danger': function (event) {
        const id = Number(event.target.price.value);
        console.log(price)
        Balls.remove();
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