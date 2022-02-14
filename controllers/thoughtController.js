const { User, Thought } = require('../models');

module.exports = {

    // getThoughts
    getThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // getSingleThought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thought)
            }
            )
            .catch((err) => res.status(500).json(err));
    },
    // createThought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)});
    },
    // updateThought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // deleteThought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : User.deleteMany({ _id: { $in: thought.user } })
            )
            .then(() => res.json({ message: 'User and thought have been deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // createReaction
    createReaction(req, res) {
        console.log("You are adding a reaction!")
        console.log(req.body)
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //deleteReaction
    deleteReaction(req, res) {
        console.log("You are deleting a reaction.")
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
}; 