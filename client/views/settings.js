Template.rate.helpers({
    load: function () {
        return Rate.find();
        // console.log(test);
        // Session.set('rateId', test[0]._id);
        // return test;
    }
});

Template.setRate.events({
    'submit .form-horizontal': function (event) {
        event.preventDefault();
        const rateValue = event.target.rate.value;
        const getRate = Rate.findOne();
        Rate.update(getRate._id, {
            $set: {
                rate: rateValue
            }
        });
    },
});