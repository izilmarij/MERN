const Data = require("./../models/dataModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllData = catchAsync(async (req, res) => {
  //console.log("Req.headers is ",req.headers.role);
  if (req.query.filter) {
    const data_ = await Data.find({
      category: req.query.filter,
    });

    res.status(200).json({
      status: "success",
      data: {
        data_,
      },
    });
  } else {
    const data_ = await Data.find();

    res.status(200).json({
      status: "success",
      data: {
        data_,
      },
    });
  }
});

exports.getAllDataReporter = catchAsync(async (req, res) => {
  //console.log("Req.headers is ", req.headers.name);

  const data_ = await Data.find({
    poster: req.headers.name,
  });

  res.status(200).json({
    status: "success",
    data: {
      data_,
    },
  });
});

exports.createData = catchAsync(async (req, res) => {
  // console.log("In create data... :");
  // console.log(req.body.body.poster);

  const newData = await Data.create({
    headline: req.body.body.headline,
    body: req.body.body.body,
    poster: req.body.body.poster,
    category: req.body.body.category,
    comments: req.body.body.comments,
  });

  res.status(201).json({
    message: "success",
    data: { newData },
  });
});

exports.deleteData = (req, res, next) => {
  //console.log("Giving all tours "+ req.requestTime);

  //console.log("In delete data is ", req.params.id);
  Data.findByIdAndDelete(req.params.id)
    .then((updatedPost) => {
      if (updatedPost) {
        //console.log("Updated Post:", updatedPost);
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  res.status(204).json({
    status: "success",
    message: "Given ID deleted",
    data: null,
  });
};

exports.updateData = async (req, res, next) => {
  //   console.log("In update data is ", req.body);

  const data = await Data.findByIdAndUpdate(req.params.id, req.body.body, {
    new: true,
  })
    .then((updatedPost) => {
      if (updatedPost) {
        //console.log("Updated Post:", updatedPost);
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  res.status(204).json({
    status: "success",
    data: { data },
  });
};

exports.addComment = (req, res, next) => {
  //console.log("Giving all tours "+ req.requestTime);
  //console.log("In update data is ", req.body.body);
  Data.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: req.body.body } },
    { new: true }
  )
    .then((updatedPost) => {
      if (updatedPost) {
        // console.log("Updated Post:", updatedPost);
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  res.status(204).json({
    status: "success",
    data: {},
  });
};

exports.deleteComment = (req, res, next) => {
  //console.log("Giving all tours "+ req.requestTime);
  //console.log("In delete comment ", req.body.body);
  Data.findByIdAndUpdate(
    req.params.id,
    { $pull: { comments: req.body.body } },
    { new: true }
  )
    .then((updatedPost) => {
      if (updatedPost) {
        // console.log("Updated Post:", updatedPost);
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  res.status(204).json({
    status: "success",
    data: {},
  });
};

exports.updateComment = async (req, res, next) => {
  const params = req.params;
  //   console.log(req.params.id1, req.params.id2);
  //console.log(req.body.body);

  let news_;
  await Data.findById(req.params.id1)
    .then((news) => {
      if (news) {
        // console.log("Post:", news);
        const idx = news.comments.findIndex(
          (comment) => comment._id.toString() === req.params.id2
        );
        if (idx !== -1) {
          news.comments[idx].comment = req.body.body.comment;
        }
        // console.log(idx);
        news_ = news;
      } else {
        console.log("Post not found.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //   console.log(news_);

  await Data.findByIdAndUpdate(
    req.params.id1,
    { comments: news_.comments },
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
};
