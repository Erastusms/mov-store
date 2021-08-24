const {
  Line_items,
  Movie,
  Movies_cart,
  Movies_actor,
  Movies_comment,
  Order,
  User,
} = require("../models");
const { decrypter, encrypter } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

class ApiController {
  static async register(req, res) {
    try {
      // let avatar = req.file.filename;
      let file = req.file;
      const { name, email, password, birthdate, gender } = req.body;
      let mail = email.toLowerCase();
      let findEmail = await User.findOne({
        where: { email },
      });

      if (findEmail) {
        res.status(403).json({
          message: "Email already exist!",
        });
      } else {
        let user = await User.create({
          name,
          email: mail,
          password,
          birthdate,
          gender,
          avatar: file ? file.filename : "blank.png"
        });
        res.status(201).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email },
      });

      if (user) {
        if (decrypter(password, user.password)) {
          let access_token = tokenGenerator(user);
          res.status(200).json({
            access_token,
          });
        } else {
          res.status(403).json({
            message: "Password is Invalid!",
          });
        }
      } else {
        res.status(404).json({
          message: "User not found!",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ApiController;
