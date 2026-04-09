const router = require("express").Router();
const {
  getBlogs,
  addBlog,
  deleteBlog,
} = require("../controllers/blogController");

router.get("/", getBlogs);
router.post("/", addBlog);
router.delete("/:id", deleteBlog);

module.exports = router;