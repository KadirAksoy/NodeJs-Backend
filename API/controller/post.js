const PostSchema = require("../models/post.js");

//CRUD  işlemleri
const createPosts = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find();
    res.status(200).json({ getPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await PostSchema.findById({ id });
    res.status(200).json({ detailPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatePost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await PostSchema.findByIdAndDelete({ id });
    res.status(200).json({ message: "Post deletede with id : ", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search, "i");
    const post = await PostSchema.find({
      $or: [{ title }],
      tag: { $in: tag.split(",") },
    });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPosts,
  getPosts,
  getDetail,
  deletePost,
  updatePost,
  searchPost,
};
