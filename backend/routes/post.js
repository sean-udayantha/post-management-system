import { Router } from "express";
const postRoute = Router();
import PostController from "../controllers/post.js";


postRoute.post(
    "/api/post/create",
    PostController.createPost
  );
  postRoute.get(
    "/api/post/all",
    PostController.getPost
  );
  postRoute.get(
    "/api/post/:id",
    PostController.getOnePost
  );
  postRoute.put(
    "/api/post/update/:id",
    PostController.updatePost
  );
  postRoute.delete(
    "/api/post/delete/:id",
    PostController.deletePost
  );
  export default postRoute;