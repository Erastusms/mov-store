const ApiRouter = require("express").Router();
const ApiController = require("../controllers/ApiController");
const { MulterSingle } = require("../middlewares/multer");

ApiRouter.post(
  "/register",
  MulterSingle("./public/images/avatars/"),
  ApiController.register
);
ApiRouter.post("/login", ApiController.login);
// ApiRouter.put(
//   "/account/update",
//   userAuth,
//   MulterSingle("./public/images/avatars/"),
//   ApiController.updateProfile
// );

module.exports = ApiRouter;
