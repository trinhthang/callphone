const UserModel = require('../models/user.model');

let UserController = () => {}

UserController.createUser = (data, callback) => {
    UserModel.findOne({}).select('id').sort({id: -1}).exec((err, doc) => {
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
                console.log(err);
                callback(err);
            } else {
                callback(null, doc);
            }
        })
    })
}

UserController.getAllUser = (callback) => {
    try {
        UserModel.find({}, 'id username phone email').exec((err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs);
            }
        })
    } catch(e) {
        console.log(e);
        callback(e);
    }
}

UserController.getUserById = (id, callback) => {
    try {
        UserModel.findById({_id: id}).exec((err, user) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, user);
            }
        })
    } catch (e) {
        console.log(e);
        callback(e);
    }
}

UserController.editUser = (id,dataUpdate, callback) => {
    try {
        UserModel.findOneAndUpdate({_id: id}, dataUpdate, {new: true}).exec((err, doc) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, doc);
            }
        })
    } catch (e) {
        console.log(e);
        callback(e);
    }
}

UserController.searchUserByNamePhoneEmail = (searchString, callback) => {
    try {
        UserModel
            .find({$text: {$search: searchString}})
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    callback(err);
                } else {
                    callback(null, docs);
                }
            })
    } catch (e) {
        console.log(e);
        callback(e);
    }
}

module.exports = UserController;