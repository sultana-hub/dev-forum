// import React from "react";
// import {
//   Box,
//   Button,
//   Avatar,
//   Typography,
//   TextField,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useParams } from 'react-router-dom';
// import { createComment } from "../../queryFunctions/post/postQuery";
// import { deleteComment } from "../../queryFunctions/post/postQuery";
// import { useQueryClient, useMutation } from '@tanstack/react-query';
// import { useNavigation } from "react-router-dom";
// import { useForm } from 'react-hook-form';
// const Comment = () => {
//   const queryClient = useQueryClient();
//   const postId = useParams()
//   const navigate = useNavigation()
//   const { register, handleSubmit, reset } = useForm();
//   const createCommentMutation = useMutation({
//     mutationFn: createComment,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['post', postId] });
//     },
//   });


//   // Delete comment
//   const deleteCommentMutation = useMutation({
//     mutationFn: deleteComment,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['post', postId] });
//       navigate('/post/postId/comment')
//     },
//   });


//   return (
//     <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
//       {/* Back Button */}
//       <Button
//         variant="outlined"
//         startIcon={<ArrowBackIcon />}
//         href="/posts"
//         sx={{ mb: 2 }}
//       >
//         Back To Posts
//       </Button>

//       {/* Post Section */}
//       <Paper sx={{ display: "flex", gap: 2, p: 2, mb: 2 }} elevation={3}>
//         <Box>
//           <Avatar
//             src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
//             alt="John Doe"
//             sx={{ width: 64, height: 64 }}
//           />
//           <Typography variant="h6" mt={1}>
//             John Doe
//           </Typography>
//         </Box>
//         <Box>
//           <Typography>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
//             possimus corporis sunt necessitatibus! Minus nesciunt soluta
//             suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
//             dolor? Illo perferendis eveniet cum cupiditate aliquam?
//           </Typography>
//         </Box>
//       </Paper>

//       {/* Leave Comment Form */}
//       <Paper sx={{ p: 2, mb: 3, bgcolor: "primary.main", color: "#fff" }}>
//         <Typography variant="h6">Leave A Comment</Typography>
//       </Paper>
//       <Paper sx={{ p: 2, mb: 4 }} elevation={2}>
//         <Box component="form">
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             name="text"
//             placeholder="Comment on this post"
//             required
//             sx={{ mb: 2 }}
//           />
//           <Button variant="contained" color="primary">
//             Submit
//           </Button>
//         </Box>
//       </Paper>

//       {/* Comments Section */}
//       <Typography variant="h6" gutterBottom>
//         Comments
//       </Typography>

//       {[1, 2].map((c) => (
//         <Paper
//           key={c}
//           sx={{
//             display: "flex",
//             gap: 2,
//             p: 2,
//             mb: 2,
//             position: "relative",
//           }}
//           elevation={2}
//         >
//           <Box>
//             <Avatar
//               src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
//               alt="John Doe"
//               sx={{ width: 56, height: 56 }}
//             />
//             <Typography variant="subtitle1" mt={1}>
//               John Doe
//             </Typography>
//           </Box>
//           <Box sx={{ flexGrow: 1 }}>
//             <Typography>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
//               possimus corporis sunt necessitatibus!
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               Posted on 04/16/2019
//             </Typography>
//           </Box>
//           <IconButton
//             color="error"
//             sx={{ position: "absolute", top: 8, right: 8 }}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default Comment;


import React from "react";
import {
  Box,
  Button,
  Avatar,
  Typography,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from 'react-router-dom';
import { createComment, deleteComment } from "../../queryFunctions/post/postQuery";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getPostById } from '../../queryFunctions/post/postQuery';
const Comment = () => {
  const queryClient = useQueryClient();
  const { postId } = useParams();
  console.log("post id ", postId)
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // Create comment
const createCommentMutation = useMutation({
  mutationFn: createComment,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['post', postId] });
  },
});

// // Inside form submit handler:
// const onSubmit = (data) => {
//   createCommentMutation.mutate([postId, { text: data.text }]);
// };


  // Delete comment
  const deleteCommentMutation = useMutation({
    mutationFn: ({ postId, commentId }) => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
//submitting form for comment
  const onSubmit = (data) => {
    if (!postId) {
      console.error("Post ID is missing");
      return;
    }

    createCommentMutation.mutate({ postId, text: data.text });

    reset(); // reset form after submit
  };


  const handleDelete = (commentId) => {
    deleteCommentMutation.mutate({ postId, commentId });
  };

  // You can fetch comments with useQuery here if not passed as props
  const comments = [
    {
      _id: '123',
      name: 'John Doe',
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      text: 'This is a sample comment.',
      date: '2025-07-26',
    },
  ];


  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  });

  if (isLoading) return <Typography>Loading post...</Typography>;
  if (isError) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/posts')}
        sx={{ mb: 2 }}
      >
        Back To Post
      </Button>

      {/* Post Section */}
      <Paper sx={{ display: "flex", gap: 2, p: 2, mb: 2 }} elevation={3}>
        <Box>
          <Avatar
            src={`http://localhost:5000/${post?.avatar}`} // or post?.user?.avatar
            alt={post?.name}
            sx={{ width: 64, height: 64 }}
          />
          <Typography variant="h6" mt={1}>
            {post?.name}
          </Typography>
        </Box>
        <Box>
          <Typography>{post?.text}</Typography>
        </Box>
      </Paper>


      {/* Leave Comment Form */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: "primary.main", color: "#fff" }}>
        <Typography variant="h6">Leave A Comment</Typography>
      </Paper>

      <Paper sx={{ p: 2, mb: 4 }} elevation={2}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            multiline
            rows={4}
            name='text'
            placeholder="Comment on this post"
            {...register('text', { required: true })}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>

      {/* Comments Section */}
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {comments.map((comment) => (
        <Paper
          key={comment._id}
          sx={{ display: "flex", gap: 2, p: 2, mb: 2, position: "relative" }}
          elevation={2}
        >
          <Box>
            <Avatar
              src={comment.avatar}
              alt={comment.name}
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="subtitle1" mt={1}>
              {comment.name}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography>{comment.text}</Typography>
            <Typography variant="caption" color="text.secondary">
              Posted on {new Date(comment.date).toLocaleDateString()}
            </Typography>
          </Box>
          <IconButton
            color="error"
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => handleDelete(comment._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
};

export default Comment;
