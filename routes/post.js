const express = require("express");
const router = express.Router({"mergeParams": true});
const { createPost, removePost } = require("../handlers/post");

router.route("/newpost").post(createPost);
router.route("/posts/:post_id").delete(removePost);

module.exports = router;