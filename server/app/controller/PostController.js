const PostModel = require('../model/post')
const { UserModel } = require('../model/Users')
const ProfileModel = require('../model/Profile')
const httpStatusCode = require('../helper/httpStatusCode')
const postValidation = require('../helper/validations/post')


class PostController {

    //create post

    async createPost(req, res) {

        try {
            const { error, value } = postValidation.validate({
                text: req.body.text
            })
            if (error) {
                return res.status(httpStatusCode.BadRequest).json({
                    message: error.details[0].message
                })
            }
            const user = await UserModel.findById(req.user._id).select('-password')
            const postData = {
                text: value.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user._id
            }
            // let post = await PostModel.findOne({ user: req.user._id })
            const post = new PostModel(postData)
            await post.save()
            return res.status(httpStatusCode.Create).json({
                message: "Post created successfully by user"
            })
        } catch (error) {
            console.error(error.message)
            return res.status(httpStatusCode.InternalServerError).json({
                message: error.message
            })
        }

    }


    //get post by id

    async getPostById(req, res) {
        try {
            const id = req.params.id
            const post = await PostModel.findById(id)
            if (!post) {
                req.flash("message", "Post not found");
                return res.status(httpStatusCode.NotFound).json({
                    message: "post not exist"
                })
            }
            return res.json(post)
        } catch (error) {
            console.log(error.message)

            if (error.kind === 'ObjectId') {
                return res.status(httpStatusCode.NotFound).json({
                    message: "post not exist"
                })
            }
            return res.status(httpStatusCode.InternalServerError).json({
                message: "Something went wrong"
            })
        }

    }

    //get all posts
    async getAllPost(req, res) {
        try {
            const posts = await PostModel.find()
                .populate('user', ['name', 'avatar']) // Populate only name and avatar fields from User
                .sort({ createdAt: -1 }); // Optional: newest posts first

            if (!posts || posts.length === 0) {
                return res.status(httpStatusCode.NotFound).json({
                    message: "No posts found",
                });
            }

            return res.status(200).json(posts);
        } catch (error) {
            console.error("Error fetching posts:", error.message);
            return res.status(httpStatusCode.InternalServerError).json({
                message: "Something went wrong",
            });
        }
    }


    async deletePost(req, res) {
        try {
            const post = await PostModel.findById(req.params.id);

            if (!post) {
                req.flash("message", "Post not found");
                return res.redirect('/admin/post-list');
            }
            if (post.user.toString() !== req.user._id.toString() && req.user.isAdmin !== 'admin') {
                req.flash("message", "Unauthorized action");
                return res.redirect('/admin/post-list');
            }

            await post.deleteOne();

            req.flash("message", "Post deleted successfully");
            return res.redirect('/admin/post-list');
        } catch (error) {
            console.error("Delete Post Error:", error.message);
            if (error.kind === 'ObjectId') {
                return res.status(httpStatusCode.NotFound).json({
                    message: "post not exist"
                })
            }
            req.flash("message", "Error in deleting post");
            return res.redirect('/admin/post-list');
        }
    }

    //like post 
    async likePost(req, res) {
        try {

            const post = await PostModel.findById(req.params.id)

            //checking post has already been liked by user

            if (post.likes.filter(like => like.user.toString() === req.user._id.toString()).length > 0) {
                return res.status(httpStatusCode.Forbidden).json({
                    message: "post is already liked by the user"
                })
            }

            post.likes.unshift({ user: req.user._id })
            await post.save()
            return res.json(post.likes)
        } catch (error) {
            console.error(error.message)
            return res.status(httpStatusCode.InternalServerError).json({
                msg: "Sever Error"
            })
        }
    }


    //unlike post 
    async unlikePost(req, res) {
        try {

            const post = await PostModel.findById(req.params.id)

            //checking post has not been liked by user

            if (post.likes.filter(like => like.user.toString() === req.user._id.toString()).length === 0) {
                return res.status(httpStatusCode.Forbidden).json({
                    message: "post is not liked by the user"
                })
            }
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user._id.toString())
            post.likes.splice(removeIndex, 1)
            await post.save()
            return res.json(post.likes)
        } catch (error) {
            console.error(error.message)
            return res.status(httpStatusCode.InternalServerError).json({
                msg: "Sever Error"
            })
        }
    }
    //create comments

    async createComment(req, res) {

        try {
            const { error, value } = postValidation.validate({
                text: req.body.text
            })
            if (error) {
                return res.status(httpStatusCode.BadRequest).json({
                    message: error.details[0].message
                })
            }
            const user = await UserModel.findById(req.user._id).select('-password')
            const post = await PostModel.findById(req.params.id)
            const newComments = {
                text: value.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user._id
            }
            post.comments.unshift(newComments)
            await post.save()
            return res.status(httpStatusCode.Create).json({
                message: "Comment created successfully by user"
            })
        } catch (error) {
            console.error(error.message)
            return res.status(httpStatusCode.InternalServerError).json({
                message: error.message
            })
        }

    }
    async deleteComment(req, res) {
        try {
            const post = await PostModel.findById(req.params.id)
            //pulling out comment
            const comment = post.comments.find(comment => comment._id === req.params.comment_id)

            if (!comment) {
                return res.status(httpStatusCode.NotFound).json({
                    message: "comment does not exist"
                })
            }
            //finding the user 
            if (comment.user.toString() !== req.user._id.toString()) {
                return res.status(httpStatusCode.Forbidden).json({
                    message: "User does not authorize"
                })
            }

            const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user._id.toString())
            post.comments.splice(removeIndex, 1)
            await post.save()
            return res.json(post.likes)


        } catch (error) {
            return res.status(httpStatusCode.InternalServerError).json({
                message: error.message
            })
        }
    }

}

module.exports = new PostController
