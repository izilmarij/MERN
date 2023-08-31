const Data = require("./../models/dataModel");

exports.getAllData = (req, res) => {
  //console.log("Req.headers is ",req.headers.role);
  if (req.query.filter) {
    Data.find({
      category: req.query.filter,
    })
      .then((data_) => {
        if (data_) {
          //console.log("News fetched..", data_);
          res.status(200).json({
            status: "success",
            data: {
              data_,
            },
          });
        } else {
          console.log("News not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Data.find()
      .then((data_) => {
        if (data_) {
          //console.log("News fetched..", data_);
          res.status(200).json({
            status: "success",
            data: {
              data_,
            },
          });
        } else {
          console.log("News not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getAllDataReporter = (req, res) => {
  Data.find({
    poster: req.headers.name,
  })
    .then((data_) => {
      if (data_) {
        //console.log("Reported news is ", data_);
        res.status(200).json({
          status: "success",
          data: {
            data_,
          },
        });
      } else {
        console.log("No news found...");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createData = (req, res) => {
  Data.create({
    headline: req.body.body.headline,
    body: req.body.body.body,
    poster: req.body.body.poster,
    category: req.body.body.category,
    comments: req.body.body.comments,
  })
    .then((createdNews) => {
      if (createdNews) {
        console.log("News created..");
        res.status(201).json({
          message: "success",
          data: { createdNews },
        });
      }
    })
    .catch((err) => console.log(err));

  // res.status(201).json({
  //   message: "success",
  //   data: { newData },
  // });
};

exports.deleteData = (req, res, next) => {
  Data.findByIdAndDelete(req.params.id)
    .then((deletedPost) => {
      if (deletedPost) {
        //console.log("Deleted News:", deletedPost);
        res.status(204).json({
          status: "success",
          message: "Given ID deleted",
          data: null,
        });
      } else {
        console.log("News not found");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.updateData = (req, res, next) => {
  Data.findByIdAndUpdate(req.params.id, req.body.body, {
    new: true,
  })
    .then((updatedPost) => {
      if (updatedPost) {
        //console.log("Updated Post:", updatedPost);
        res.status(204).json({
          status: "success",
          data: { updatedPost },
        });
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.addComment = (req, res, next) => {
  Data.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: req.body.body } },
    { new: true }
  )
    .then((updatedPost) => {
      if (updatedPost) {
        //console.log("Updated Post:", updatedPost);
        res.status(204).json({
          status: "success",
          data: { updatedPost },
        });
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.deleteComment = (req, res, next) => {
  Data.findByIdAndUpdate(
    req.params.id,
    { $pull: { comments: req.body.body } },
    { new: true }
  )
    .then((updatedPost) => {
      if (updatedPost) {
        // console.log("Updated Post:", updatedPost);
        res.status(204).json({
          status: "success",
          data: {},
        });
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.updateComment = (req, res, next) => {
  //const params = req.params;

  Data.findById(req.params.id1)
    .then((news) => {
      if (news) {
        // console.log("Post:", news);
        const idx = news.comments.findIndex(
          (comment) => comment._id.toString() === req.params.id2
        );
        if (idx !== -1) {
          news.comments[idx].comment = req.body.body.comment;
        }
        Data.findByIdAndUpdate(
          req.params.id1,
          { comments: news.comments },
          { new: true }
        )
          .then((updatedPost) => {
            if (updatedPost) {
              // console.log("Updated Post:", updatedPost);
              res.status(204).json({
                status: "success",
                data: { updatedPost },
              });
            } else {
              console.log("Post not found.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //   console.log(news_);

  // Data.findByIdAndUpdate(
  //   req.params.id1,
  //   { comments: news_.comments },
  //   { new: true }
  // )
  //   .then((updatedPost) => {
  //     if (updatedPost) {
  //       // console.log("Updated Post:", updatedPost);
  //       res.status(204).json({
  //         status: "success",
  //         data: { updatedPost },
  //       });
  //     } else {
  //       console.log("Post not found.");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
};
