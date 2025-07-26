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

const Comment = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        href="/post"
        sx={{ mb: 2 }}
      >
        Back To Posts
      </Button>

      {/* Post Section */}
      <Paper sx={{ display: "flex", gap: 2, p: 2, mb: 2 }} elevation={3}>
        <Box>
          <Avatar
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt="John Doe"
            sx={{ width: 64, height: 64 }}
          />
          <Typography variant="h6" mt={1}>
            John Doe
          </Typography>
        </Box>
        <Box>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
            possimus corporis sunt necessitatibus! Minus nesciunt soluta
            suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
            dolor? Illo perferendis eveniet cum cupiditate aliquam?
          </Typography>
        </Box>
      </Paper>

      {/* Leave Comment Form */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: "primary.main", color: "#fff" }}>
        <Typography variant="h6">Leave A Comment</Typography>
      </Paper>
      <Paper sx={{ p: 2, mb: 4 }} elevation={2}>
        <Box component="form">
          <TextField
            fullWidth
            multiline
            rows={4}
            name="text"
            placeholder="Comment on this post"
            required
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>

      {/* Comments Section */}
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {[1, 2].map((c) => (
        <Paper
          key={c}
          sx={{
            display: "flex",
            gap: 2,
            p: 2,
            mb: 2,
            position: "relative",
          }}
          elevation={2}
        >
          <Box>
            <Avatar
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt="John Doe"
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="subtitle1" mt={1}>
              John Doe
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus!
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posted on 04/16/2019
            </Typography>
          </Box>
          <IconButton
            color="error"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
};

export default Comment;
