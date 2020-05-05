const db = require("../models");

exports.createPost = async (req, res, next) => {
  try {
    let foundUser = await db.User.findById(req.params.id);
    let {title, description, postImageUrl} = req.body;
    let newPost = await db.Post.create({
      title,
      description,
      postImageUrl,
      user: foundUser
    });
    foundUser.posts.push(newPost);
    await foundUser.save()
    let foundPost = await (await db.Post.findById(newPost.id)).populate("user", {
      username: true,
      email: true
    });
    return res.status(200).json(foundPost)
  } catch (err) {
    return next(err)
  }
};


exports.showPost = async(req, res, next) => {
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    return res.status(200).json(foundPost)
  } catch (err) {
    return next(err)
  }
}

exports.removePost = async (req, res, next) =>{
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    await foundPost.remove();
    return res.status(200).json(foundPost)
  } catch (err) {
    return next(err);
  }
}