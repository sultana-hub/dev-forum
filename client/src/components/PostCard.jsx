import {

    Button,
    Typography,
    Box,
    Avatar,
    Card,
    CardContent,
    CardActions,
    IconButton,
} from '@mui/material';
import { imagePath } from '../../src/api/axiosInstance';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from "@mui/icons-material/Delete";
const getAvatar = (avatar) => {
    if (!avatar) return '';
    if (avatar.startsWith('uploads')) return imagePath(avatar);
    return avatar.startsWith('//') ? `https:${avatar}` : avatar;
};

const PostCard = ({
    author,
    date,
    content,
    likes,
    comments,
    avatar,
    onLike,
    onUnlike,
    postId,
    isLiked,
    likesCount,
    unlikeCount
}) => (
    <Card sx={{ mb: 2, display: 'flex', gap: 2, p: 2 }}>
        <Box>
            <Avatar alt={author} src={getAvatar(avatar)} sx={{ width: 64, height: 64 }} />
            <Typography variant="h6" mt={1}>{author}</Typography>
        </Box>
        <Box flex={1}>
            <Typography variant="body1" sx={{ mb: 1 }}>{content}</Typography>
            <Typography variant="caption" color="text.secondary">Posted on {date}</Typography>

            <CardActions sx={{ pl: 0, mt: 1 }}>

                <IconButton color="primary" onClick={onUnlike}>
                    <ThumbDownIcon />
                    {unlikeCount > 0 && (
                        <Typography variant="body2" color="textSecondary">
                            {unlikeCount}
                        </Typography>
                    )}


                    {/* <Typography variant="body2" sx={{ ml: 0.5 }}>{likes}</Typography> */}
                </IconButton>

                <IconButton color="primary" onClick={onLike}>
                    <ThumbUpIcon />
                    {likesCount > 0 && (
                        <Typography variant="body2" color="textSecondary">
                            {likesCount}
                        </Typography>
                    )}

                    {/* <Typography variant="body2" sx={{ ml: 0.5 }}>{likes}</Typography> */}
                </IconButton>

                <Button variant="contained" size="small" startIcon={<ChatIcon />} href={`/post/${postId}/comment`}>
                    Comments <Box component="span" ml={1} fontWeight="bold">{comments}</Box>
                </Button>

                <IconButton color="error"><DeleteIcon /></IconButton>
            </CardActions>
        </Box>
    </Card>
);

export default PostCard


