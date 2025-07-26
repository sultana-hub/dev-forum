

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostCard from '../../components/PostCard';
import {
  createPost,
  fetchPosts,
  likePost,
  unlikePost,
} from '../../queryFunctions/post/postQuery';

const Posts = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      reset();
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  // --- Logged-in user ID (adjust according to your auth setup)
  const loggedInUserId = sessionStorage.getItem('userId');

  const likeMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleLike = (postId) => {
    likeMutation.mutate(postId);
  };

  const handleUnlike = (postId) => {
    unlikeMutation.mutate(postId);
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 2 }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Posts
      </Typography>
      <Typography variant="h6" gutterBottom>
        <Person sx={{ mr: 1 }} />
        Welcome to the community!
      </Typography>

      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          p: 2,
          borderRadius: 1,
          mb: 2,
        }}
      >
        <Typography variant="h6">Say Something...</Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mb: 4 }}
      >
        <TextField
          {...register('text', { required: true })}
          placeholder="Create a post"
          multiline
          rows={4}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {mutation.isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        posts?.map((post) => {
          // const isLiked = post.likes.includes(loggedInUserId);

          return (
            <PostCard
              key={post._id}
              avatar={post?.user?.avatar}
              author={post?.user?.name}
              date={new Date(post.date).toLocaleDateString()}
              content={post.text}
              comments={post.comments.length}
              onLike={() => handleLike(post._id)}
              onUnlike={() => handleUnlike(post._id)}
              // isLiked={isLiked}
            />
          );
        })
      )}
    </Box>
  );
};

export default Posts;

