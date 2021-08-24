const {
  Line_items,
  Movie,
  Movies_cart,
  Movies_actor,
  Movies_comment,
  Order,
  User,
} = require("../models");
const fs = require("fs-extra");
const path = require("path");

class AdminController {
  static async showDashboard(req, res) {
    res.status(200).json({
      status: 200,
      message: "Admin validated.",
    });
  }

  static async showAllUsers(req, res) {
    try {
      let UserAll = await User.findAll({
        include: [Movie, Movies_comment, Movies_cart, Order],
        order: [["id", "ASC"]],
      });
      res.status(200).json(UserAll);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showAllMovies(req, res) {
    try {
      let Movies = await Movie.findAll({
        include: [Movies_actor, Movies_comment, Line_items],
        order: [["id", "ASC"]],
      });
      res.status(200).json(Movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async addMovies(req, res) {
    try {
      const UserId = +req.userData.id;
      let file = req.file;
      const {
        title,
        episode,
        director,
        studio,
        tv_status,
        duration,
        release,
        country,
        genre,
        rating_tmdb,
        network,
        trailer,
        views,
        price,
      } = req.body;

      let findMovie = await Movie.findOne({
        where: { title },
      });

      if (findMovie) {
        res.status(403).json({
          message: `Film ${title} already exist!`,
        });
      } else {
        let movies = await Movie.create({
          title,
          episode,
          director,
          studio,
          tv_status,
          duration,
          release,
          country,
          genre,
          rating_tmdb,
          network,
          trailer,
          views,
          price,
          image: file ? file.filename : "blank.png",
          UserId,
        });

        res.status(201).json(movies);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async editMovies(req, res) {
    try {
      const UserId = +req.userData.id;
      
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteMovies(req, res) {
    try {
      let id = +req.params.id;
      let movies = await Movie.findByPk(id);

      
      await fs.unlink(path.join(`public/images/movies/${movies.image}`));
      await Movie.destroy({
        where: { id },
      });
      await Movies_actor.destroy({
        where: { MovieId: id },
      });
      await Movies_comment.destroy({
        where: { MovieId: id },
      });
      // const carts = await Movies_cart.findAll();
      // carts.forEach(async (cart) => {
      //   const line_items = await Line_items.findAll({
      //     where: { MoviesCartId: cart.id, status: "cart" },
      //   });

      //   if (line_items.length === 1) {
      //     await Movies_cart.destroy({
      //       where: { id: cart.id },
      //     });
      //   }

      //   await Line_items.destroy({
      //     where: { MovieId: id, status: "cart" },
      //   });
      // });
      res.status(200).json({
        message: "This movie has been deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error di controller",
      });
    }
  }
}

module.exports = AdminController;
