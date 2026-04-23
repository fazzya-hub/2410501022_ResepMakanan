const validasiResep = (req, res, next) => {
  const { nama, bahan, langkah } = req.body;

  if (!nama || typeof nama !== "string") {
    return res.status(400).json({
      message: "Field 'nama' wajib diisi.",
    });
  }

  if (!Array.isArray(bahan) || bahan.length < 1) {
    return res.status(400).json({
      message: "Resep wajib memiliki minimal 1 bahan.",
    });
  }

  if (!Array.isArray(langkah) || langkah.length < 1) {
    return res.status(400).json({
      message: "Resep wajib memiliki minimal 1 langkah.",
    });
  }

  next();
};

module.exports = validasiResep;
