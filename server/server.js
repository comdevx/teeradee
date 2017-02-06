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

if (Cards.find().count() === 0) {
    for (var i = 1; i < 41; i++) {
        Cards.insert({
            number: i,
            start: '',
            option1: 0,
            option2: 0,
            option3: 0,
        });
    }
}