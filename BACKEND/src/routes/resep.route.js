const express = require("express");
const { getSemuaResep, tambahResep } = require("../controllers/resep.controller");
const validasiResep = require("../middlewares/validasiResep.middleware");

const router = express.Router();

router.get("/resep", getSemuaResep);
router.post("/resep", validasiResep, tambahResep);

module.exports = router;
