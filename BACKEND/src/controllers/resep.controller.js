const Resep = require("../models/resep.model");
const mongoose = require("mongoose");

const resepDummy = [
  {
    _id: "dummy-1",
    nama: "Nasi Goreng Kampung",
    deskripsi: "Nasi goreng sederhana khas rumahan.",
    kategori: "Makanan Utama",
    kesulitan: "Mudah",
    bahan: ["Nasi putih", "Bawang merah", "Kecap manis", "Telur"],
    langkah: ["Tumis bawang", "Masukkan telur", "Tambahkan nasi dan kecap", "Aduk rata"],
  },
  {
    _id: "dummy-2",
    nama: "Es Cendol",
    deskripsi: "Minuman segar khas Nusantara.",
    kategori: "Minuman",
    kesulitan: "Sedang",
    bahan: ["Cendol", "Santan", "Gula merah cair", "Es batu"],
    langkah: ["Siapkan gelas", "Masukkan cendol dan es", "Tuang santan", "Tambahkan gula merah"],
  },
];

const getSemuaResep = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(200).json(resepDummy);
  }

  try {
    const daftarResep = await Resep.find().sort({ createdAt: -1 });
    return res.status(200).json(daftarResep);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data resep.",
      error: error.message,
    });
  }
};

const tambahResep = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const resepBaru = {
      _id: `dummy-${Date.now()}`,
      ...req.body,
    };
    resepDummy.unshift(resepBaru);
    return res.status(201).json(resepBaru);
  }

  try {
    const resepBaru = await Resep.create(req.body);
    return res.status(201).json(resepBaru);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menyimpan resep baru.",
      error: error.message,
    });
  }
};

module.exports = {
  getSemuaResep,
  tambahResep,
};
