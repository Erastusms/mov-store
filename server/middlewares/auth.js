const { Movie } = require("../models");
const { tokenVerifier } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;

  try {
    if (access_token) {
      const decoded = tokenVerifier(access_token);
      if (decoded.type === "admin") {
        req.userData = decoded;
        next();
      } else {
        throw {
          status: 401,
          message: "You are not authorized!",
        };
      }
    } else {
      throw {
        status: 404,
        message: "Token not found!",
      };
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      ...err,
    });
  }
};

// function movieAuth(req, res, next) {
//   const id = +req.params.id;
//   const UserId = +req.userData.id;
//   Movie.findByPk(id)
//     .then((movies) => {
//       if (!movies) {
//         res.status(404).json({
//           message: "Movie is not found!",
//         });
//       } else if (movies.UserId !== UserId) {
//         res.status(401).json({
//           message: "User is not authorized!",
//         });
//       } else {
//         next();
//       }
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// }

const movieAuth = async (req, res, next) => {
  const id = +req.params.id;
  const UserId = +req.userData.id;
  try {
    const movies = await Movie.findByPk(id);
    if (movies) {
      if (movies.UserId === UserId) {
        next();
      } else {
        throw {
          status: 401,
          message: "User is not allowed to update or delete this movies",
        };
      }
    } else {
      throw {
        status: 404,
        message: "Movie not found!",
      };
    }
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
};


module.exports = { authentication, movieAuth };
