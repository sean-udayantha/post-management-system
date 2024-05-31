import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

function PostList({ posts, handleOpenEdit, handleOpenConfirm }) {
    return (
        <Grid container spacing={3}>
            {posts.map(post => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <Card>
                        {post.image && (
                            <CardMedia
                                component="img"
                                height="100%"
                                image={post.image}
                                alt={post.title}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.content}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Button 
                                onClick={() => handleOpenEdit(post.id)} 
                                variant="outlined" 
                                color="primary"
                                style={{ marginRight: '8px' }}
                            >
                                Edit
                            </Button>
                            <Button 
                                onClick={() => handleOpenConfirm(post.id)} 
                                variant="contained" 
                                color="secondary"
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default PostList;
