import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CardMedia } from '@mui/material';

function EditPost({ posts, editPostId, editPost }) {
    const postToEdit = posts.find(post => post.id === editPostId);
    const [title, setTitle] = useState(postToEdit.title);
    const [content, setContent] = useState(postToEdit.content);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(postToEdit.image);

    useEffect(() => {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setPreview(postToEdit.image);
    }, [postToEdit]);

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        const reader = new FileReader();
        reader.onloadend = () => {
            editPost({ id: editPostId, title, content, image: reader.result });
        };
        if (image) {
            reader.readAsDataURL(image);
        } else {
            editPost({ id: editPostId, title, content, image: postToEdit.image });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
            setPreview(postToEdit.image);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Edit Post
            </Typography>
            <TextField 
                label="Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
                fullWidth 
                margin="normal"
            />
            <TextField 
                label="Content" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required 
                multiline
                rows={4}
                fullWidth 
                margin="normal"
            />
            <Button 
                variant="contained" 
                component="label"
                sx={{ mt: 2, mb: 2 }}
            >
                Upload Image
                <input 
                    type="file" 
                    hidden
                    onChange={handleImageChange}
                />
            </Button>
            {preview && (
                <CardMedia
                    component="img"
                    height="140"
                    image={preview}
                    alt="Image preview"
                    sx={{ mb: 2 }}
                />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Update Post
            </Button>
        </Box>
    );
}

export default EditPost;
