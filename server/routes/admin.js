const AdminRouter = require("express").Router();
const AdminController = require("../controllers/AdminController");
const { MulterSingle } = require("../middlewares/multer");
const { movieAuth } = require("../middlewares/auth");

AdminRouter.get("/", AdminController.showDashboard);
AdminRouter.get("/list-movies", AdminController.showAllMovies);
AdminRouter.get("/list-users", AdminController.showAllUsers);
AdminRouter.post(
  "/add-movies",
  MulterSingle("./public/images/movies/"),
  AdminController.addMovies
);
AdminRouter.delete(
  "/list-movies/delete/:id",
  movieAuth,
  AdminController.deleteMovies
);

module.exports = AdminRouter;
