const express = require("express");

const authController = require("./../controllers/authController");
const dataController = require("./../controllers/dataController");

const router = express.Router();

// console.log'In router');

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/news")
  .get(authController.protect, dataController.getAllData)
  .post(authController.protect, dataController.createData);

router
  .route("/news/:id")
  .patch(authController.protect, dataController.updateData)
  .delete(authController.protect, dataController.deleteData);

// router.route("/fetch").get(authController.protect, dataController.getAllData);
// router.route("/create").post(authController.protect, dataController.createData);

router
  .route("/fetchreporter")
  .get(authController.protect, dataController.getAllDataReporter);

// router
//   .route("/update/:id")
//   .patch(authController.protect, dataController.updateData);

// router
//   .route("/delete/:id")
//   .delete(authController.protect, dataController.deleteData);

router
  .route("/addcomment/:id")
  .patch(authController.protect, dataController.addComment);

router
  .route("/deletecomment/:id")
  .patch(authController.protect, dataController.deleteComment);

// console.log(req.Router);
router
  .route("/updatecomment/:id1/:id2")
  .patch(authController.protect, dataController.updateComment);

module.exports = router;
