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
        console.log("Hello")
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) => { 
                console.log(user)
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            }
            )
            .catch((err) => {
                console.log(err)
                res.status(400).json(err)});
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

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : User.deleteMany({ _id: { $in: user } })
            )
            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // addFriend
    addFriend(req, res) {
        console.log("You are adding a friend.")
        console.log(req.body)
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // removeFriend
    removeFriend(req, res) {
        console.log("You are removing a friend.")
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.friendId } } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID.' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)});
    },
};          