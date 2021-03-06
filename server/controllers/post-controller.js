const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {

    // get all community posts
    async getPosts(req, res) {
        
        try {
            const allPosts = await Post.find()
                .populate('comments')
                .select('-__v')
                
            if(!allPosts) {
                return res.status(400).json({ message: 'Couldn\'t get posts' });
            }

            res.json(allPosts)

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // create single post
    async createPost({ user, body }, res) {

        try {
        const newPost= await Post.create(body)
        console.log(newPost)

        if (!newPost) {
            return res.status(400).json({ message: 'Something went wrong!' });
        }

        const updatedUser = await User.findOneAndUpdate(
            // change to user.id when login functionality connected to front-end
            // { _id: user._id },
            { username : body.username },
            { $addToSet: { posts: newPost._id } },
            { new: true }
        )

        if(!updatedUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        res.json(updatedUser);

        } catch (err) {
        return res.status(400).json(err);
        }
    },

    // get post by id
    async getSinglePost({ body, params }, res) {
        try {
            const singlePost = await Post.findOne({ _id: params.postId })
                .populate('comments')
                .select('-__v')

            if (!singlePost) {
                return res.status(400).json({ message: 'No post with that ID!' });
            }

            res.json(singlePost)

        } catch(err) {
            res.status(500).json(err)
        }
    },

    // delete post by ID
    async deletePost({ params }, res) {
        try {
          const deletedPost = await Post.findOneAndDelete({ _id: params.postId })
    
          if (!deletedPost) {
            return res.status(400).json({ message: "Can't find post with that ID!" });
          }
    
          res.json({ message: 'Post successfully deleted!' })
    
        } catch(err) {
            return res.status(500).json(err)
        }
        
    },

    // edit post by ID
    async updatePost({body, params}, res) {
        try {
            const updatedPost = await Post.findOneAndUpdate(
                { _id: params.postId },
                { $set: body },
                { runValidators: true, new: true }
            )

            if (!updatedPost) {
                return res.status(400).json({ message: "Can't find post with that ID!" });
            }

            res.json(updatedPost)
    
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // add comment to post
    async addComment({ body, params }, res) {
        try {
            const updatedPost = await Post.findOneAndUpdate(
                { _id: params.postId },
                { $addToSet: { comments: body } },
                { runValidators: true, new: true }
            )

            if (!updatedPost) {
                return res.status(400).json({ message: "Can't find post with that ID!" });
            }

            res.json(updatedPost)
    
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // delete single comment
    async deleteComment({ params }, res) {
        try {
            const updatedPost = await Post.findOneAndUpdate(
                { _id: params.postId },
                { $pull: { comments: { commentId: params.commentId } } },
                { new: true }
            )

            if (!updatedPost) {
                return res.status(400).json({ message: "Can't find post with that ID!" });
            }

            res.json({ message: 'Comment successfully deleted!' })
    
        } catch(err) {
            res.status(500).json(err);
        }
    },
    
}