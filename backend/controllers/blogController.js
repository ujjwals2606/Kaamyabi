const Blog = require("../models/Blog");

// GET
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

// ADD
exports.addBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
};

// DELETE
exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};