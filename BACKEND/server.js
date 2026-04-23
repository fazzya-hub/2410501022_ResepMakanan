require("dotenv").config();
const app = require("./src/app");
const connectDatabase = require("./src/config/database");
const Resep = require("./src/models/resep.model");

const PORT = process.env.PORT || 5000;

const seedResepDummy = async () => {
  const totalResep = await Resep.countDocuments();
  if (totalResep > 0) return;

  await Resep.insertMany([
    {
      nama: "Nasi Goreng Kampung",
      deskripsi: "Nasi goreng sederhana khas rumahan.",
      kategori: "Makanan Utama",
      kesulitan: "Mudah",
      bahan: ["Nasi putih", "Bawang merah", "Kecap manis", "Telur"],
      langkah: ["Tumis bawang", "Masukkan telur", "Tambahkan nasi dan kecap", "Aduk rata"],
    },
    {
      nama: "Es Cendol",
      deskripsi: "Minuman segar khas Nusantara.",
      kategori: "Minuman",
      kesulitan: "Sedang",
      bahan: ["Cendol", "Santan", "Gula merah cair", "Es batu"],
      langkah: ["Siapkan gelas", "Masukkan cendol dan es", "Tuang santan", "Tambahkan gula merah"],
    },
  ]);
};

const startServer = async () => {
  const isDbConnected = await connectDatabase();
  if (isDbConnected) {
    await seedResepDummy();
  } else {
    console.log("Running with dummy in-memory recipes (MongoDB unavailable).");
  }

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
};

startServer();
