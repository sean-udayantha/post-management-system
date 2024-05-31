import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CardMedia } from '@mui/material';

function AddPost({ addPost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        const reader = new FileReader();
        reader.onloadend = () => {
            addPost({ title, content, image: reader.result });
            setTitle('');
            setContent('');
            setImage(null);
            setPreview(null);
        };
        if (image) {
            reader.readAsDataURL(image);
        } else {
            addPost({ title, content, image: null });
            setTitle('');
            setContent('');
            setImage(null);
            setPreview(null);
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
            setPreview(null);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Add New Post
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
                Add Post
            </Button>
        </Box>
    );
}

export default AddPost;
