const express = require('express')
const { AuthCheck } = require('../middleware/auth')
const PostController = require('../controller/PostController')
const router = express.Router()


//@routes   POST  /api/posts/create
//@desc     Create a Post
//@access    Private
router.post('/create', AuthCheck, PostController.createPost)

//@routes   GET  /api/posts/allPosts
//@desc     get all Posts
//@access   Private

router.get('/allPosts',AuthCheck,PostController.getAllPost)

//@routes   get  /api/posts/:id
//@desc     Get a Post by id
//@access    Private
router.get('/:id', AuthCheck, PostController.getPostById)


//@routes   delete  /api/posts/delete/:id
//@desc     delete a Post by id
//@access    Private
router.delete('/delete/:id', AuthCheck, PostController.deletePost)


//@routes   PUT /api/posts/like/:id
//@desc     like a Post by user
//@access    Private
router.put('/like/:id', AuthCheck, PostController.likePost)


//@routes   PUT /api/posts/unlike/:id
//@desc     unlike a Post by user
//@access    Private
router.put('/unlike/:id', AuthCheck, PostController.unlikePost)


//@route    POST   /api/posts/comment/post/:postId
//@desc     Create a comment
//@access   Private
router.post('/comment/post/:postId', AuthCheck, PostController.createComment);


//@routes   DELETE  /delete-comment/:postId/:comment_id
//@desc     delete a comment
//@access    Private
router.delete('/delete-comment/:postId/:comment_id', AuthCheck, PostController.deleteComment);



module.exports = router