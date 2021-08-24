const router = require("express").Router()

router.get("/", (req,res) => {
    res.status(200).json("Hello world")
})

const { authentication } = require("../middlewares/auth");

const adminRouter = require("./admin");
const apiRouter = require("./api");

router.use("/admin", authentication, adminRouter);
router.use("/api", apiRouter);

module.exports = router;
