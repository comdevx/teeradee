Cards.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    }
});

Rate.allow({
    update: function (userId, doc) {
        return true;
    }
});

Products.allow({
    insert(userId, doc) {
        return true;
    },
    remove(userId, doc) {
        return true;
    },
});

Balls.allow({
    insert(userId, doc) {
        return true;
    },
    remove(userId, doc) {
        return true;
    },
});

Logs.allow({
    insert(userId, doc) {
        return true;
    },
});

if (Cards.find().count() === 0) {
    for (var i = 1; i < 41; i++) {
        Cards.insert({
            number: i,
            start: '',
            option1: 0,
            option2: 0,
            option3: 0,
            minute: 0,
            total: 0,
        });
    }
}

if (Rate.find().count() === 0) {
    Rate.insert({
        rate: 0,
    });
}

Meteor.setInterval(function () {
    Cards.find({ start: { $ne: '' } }).forEach(function (value) {
        const getRate = Rate.findOne();
        const count = value.minute + 1;
        const total = Number.parseInt(count * getRate.rate);
        Cards.update(value._id, {
            $set: {
                option2: total,
                minute: count,
            }
        })
    });
}, 60000);
