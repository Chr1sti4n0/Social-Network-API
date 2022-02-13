const { User } = require('../models');

module.exports = {

    // getUsers
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // getSingleUser
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            }
            )
            .catch((err) => res.status(500).json(err));
    },
    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // updateUser
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // deleteUser

    // deleteUser(req, res) {
    //     User.findOneAndDelete({ _id: req.params.userId })
    //     .then((user) =>
    //       !user
    //         ? res.status(404).json({ message: 'No user with this id!' })
    //         : User.findOneAndUpdate(
    //             { users: req.params.userId },
    //             { $pull: { users: req.params.userId } },
    //             { new: true }
    //           )
    //     )
    //     .then((user) =>
    //       !user
    //         ? res
    //             .status(404)
    //             .json({ message: 'User deleted but no user with this id!' })
    //         : res.json({ message: 'User has been successfully deleted!' })
    //     )
    //     .catch((err) => res.status(500).json(err));
    // }

    // addFriend

    // removeFriend

}          