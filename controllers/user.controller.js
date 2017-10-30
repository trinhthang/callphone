const UserModel = require('../models/user.model');

let UserController = () => {}

UserController.createUser = (data, callback) => {
    UserModel.find({}).select('id').sort({id: -1}).exec((err, doc) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            var id;
            if (doc && doc.id) {
                id = doc.id + 1;
            } else {
                id = 1;
            }
            data.id = id;
        }

        UserModel.create(data, (err, doc) => {
            if (err) {
                callback(err);
            } else {
                callback(null, doc);
            }
        })
    })
}

module.exports = UserController;