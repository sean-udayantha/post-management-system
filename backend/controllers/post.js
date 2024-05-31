import Post from "../models/post.js";
const PostController = {
  createPost: async (req, res) => {
    try {
      //get  Post data from body
      const { title, content, image } = req.body;
      
      //checking all fields are fill
      if (!title || !content  || !image)
        return res.status(400).json({
          msg: "Please fill in all fields.",
        });

      const newPost = new Post({
        title,
        content,
        image
      });
      await newPost.save();
      res.json({
        message: "Readable file create success",
        data: newPost,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //get all Posts
  getPost: async (req, res) => {
    try {
      const Posts = await Post.find();
      res.json({
        message: "Posts fetch success",
        data: Posts
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  //get one Post
  getOnePost: async (req, res) => {
    const id = req.params.id;
    try {
      const post = await Post.findOne({ _id: id });
      res.json({
        message: "Posts fetch success",
        data: post
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      });
    }
  },
  updatePost: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, content, image } = req.body;

      await Post.findOneAndUpdate(
        { _id: id },
        { title, content, image}
      );
      res.json({
        message: "Post update success",
        data: { title, content, image },
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const id = req.params.id;

      await Post.findByIdAndDelete({ _id: id });
      res.json({ message: "Post delete success !" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
export default PostController;