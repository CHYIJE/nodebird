const {Post, Hashtag, User} = require('../models');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({url:`/img/${req.file.filename}`});
};

exports.uploadPost = async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId:req.user.id,
        });
        const hashtags = req.body.content.match(/#[^|s#]*/g);
        if(hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrcreate({
                        where: { title: tag.slice(1).toLowerCase()},
                    })
                }),
            );
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.likePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
  
      const post = await Post.findByPk(postId);
      const user = await User.findByPk(userId);
  
      if (!post) {
        res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        return;
      }
  
      await post.addLikedUser(user); // 좋아요한 사용자 추가
  
      res.json({ message: '게시글에 좋아요를 눌렀습니다.' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  
  exports.unlikePost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
  
      const post = await Post.findByPk(postId);
      const user = await User.findByPk(userId);
  
      if (!post) {
        res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        return;
      }
  
      await post.removeLikedUsers(user); // 좋아요한 사용자 제거
  
      res.json({ message: '게시글의 좋아요를 취소했습니다.' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };