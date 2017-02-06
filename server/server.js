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

for (var i = 1; i < 41; i++) {
    setInterval(function () {
        Cards.find({ start: { $ne: '' } }).forEach(function (value) {
            const date = value.start;

            const time = new Date();
            const firstTime = time.getHours() * 60 + time.getMinutes();
            const endTime = date.getHours() * 60 + date.getMinutes();
            const totaltime = firstTime - endTime;

            Cards.update(value._id, {
                $set: {
                    option2: totaltime
                }
            })
        });
        console.log('update time');
    }, 60 * 1000);
};