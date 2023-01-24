exports.getPosts = ((req, res, next) => {

    res.status(200).json({ posts: { "name": "kuldeep", "post": "this is first post" } });

});

exports.createPosts = (req, res, next) => {

    const title = req.body.title;
    const content = req.body.content;


    res.status(201).json({
        message: "Post created successfully!",
        post: { 'title': title, "content": content }
    });

}