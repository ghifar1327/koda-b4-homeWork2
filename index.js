const {question,exit}= require("./lib/readquire/readLine")

async function menuUtama() {
  console.log("\n=== Selamat datang di Emado's ===");
  console.log("1. Lihat Menu");
  console.log("2. Lihat Keranjang");
  console.log("3. Lihat History");
  console.log("4. Keluar");

  const inputMenu = parseInt(
    await question('masukan angka untuk memilih menu:')
  )
  switch (inputMenu) {
      case 1:
        console.log('fitur belum dibuat')
        exit()
        break;
      case 2:
        console.log('fitur belum dibuat')
        exit()
        break;
      case 3:
        console.log('fitur belum dibuat')
        exit()
        break;
      case 4:
        console.log('fitur belum dibuat')
        exit
        break;
      default:
        console.log("Input tidak valid!");
        menuUtama();
    }
}

menuUtama()