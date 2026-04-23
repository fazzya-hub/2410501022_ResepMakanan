const mongoose = require("mongoose");

const resepSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      trim: true,
    },
    deskripsi: {
      type: String,
      default: "",
      trim: true,
    },
    kategori: {
      type: String,
      default: "Makanan Utama",
      trim: true,
    },
    kesulitan: {
      type: String,
      default: "Mudah",
      trim: true,
    },
    bahan: {
      type: [String],
      required: true,
    },
    langkah: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resep", resepSchema);
