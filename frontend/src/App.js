import EditPost from './Components/EditPost';
import AddPost from './Components/AddPost';
import PostList from './Components/PostList';

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal, Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function App() {
    const [posts, setPosts] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts'));
        if (storedPosts) {
            setPosts(storedPosts);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = (id) => {
        setEditPostId(id);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenConfirm = (id) => {
        setDeleteId(id);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => setOpenConfirm(false);

    const addPost = (post) => {
        setPosts([...posts, { id: Date.now(), ...post }]);
        handleCloseAdd();
    };

    const editPost = (updatedPost) => {
        setPosts(posts.map(post => post.id === editPostId ? updatedPost : post));
        setEditPostId(null);
        handleCloseEdit();
    };

    const deletePost = () => {
        setPosts(posts.filter(post => post.id !== deleteId));
        handleCloseConfirm();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Post Management System
                    </Typography>
                    <Button color="inherit" onClick={handleOpenAdd}>Add Post</Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <PostList posts={posts} handleOpenEdit={handleOpenEdit} handleOpenConfirm={handleOpenConfirm} />
            </Container>
            <Modal open={openAdd} onClose={handleCloseAdd}>
                <Box sx={style}>
                    <AddPost addPost={addPost} />
                </Box>
            </Modal>
            <Modal open={openEdit} onClose={handleCloseEdit}>
                <Box sx={style}>
                    <EditPost posts={posts} editPostId={editPostId} editPost={editPost} />
                </Box>
            </Modal>
            <Modal open={openConfirm} onClose={handleCloseConfirm}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Are you sure you want to delete this post?
                    </Typography>
                    <Button onClick={deletePost} color="primary" variant="contained" sx={{ mr: 2 }}>
                        Yes
                    </Button>
                    <Button onClick={handleCloseConfirm} color="secondary" variant="outlined">
                        No
                    </Button>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}

export default App;


