const express = require("express");
const {
  updatePost,
  deletePost,
  getPosts,
  createPosts,
  getDetail,
  searchPost,
} = require("../controller/post.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/getPosts", getPosts);
router.post("/createPosts", auth, createPosts);
router.get("/getDetail/:id", getDetail);
router.patch("/getUpdate/:id", auth, updatePost);
router.delete("/deletePosts/:id", auth, deletePost);
router.get("/searchPost", searchPost);

module.exports = router;
