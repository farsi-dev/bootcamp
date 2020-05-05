const express = require("express");
const router = express.Router({"mergeParams": true});
const { createPost, removePost, showPost } = require("../handlers/post");

router.route("/newpost").post(createPost);
router.route("/posts/:post_id").delete(removePost);
router.route("/posts/:post_id").get(showPost);

module.exports = router;