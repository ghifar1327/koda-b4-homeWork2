const { question, exit } = require("./lib/readquire/readLine");
const { pilihMenu } = require("./lib/pilihMenu");
const { tampilkanKeranjang } = require("./lib/keranjang");
const { tampilkanHistory } = require("./lib/history");

async function menuUtama() {
  let running = true;

  while (running) {
    console.log("\n=== Selamat datang di Emado's ===");
    console.log("1. Lihat Menu");
    console.log("2. Lihat Keranjang");
    console.log("3. Lihat History");
    console.log("4. Keluar");

    const inputMenu = parseInt(await question("Masukan angka untuk memilih menu: "));

    switch (inputMenu) {
      case 1:
        await pilihMenu();
        break;
      case 2:
        await tampilkanKeranjang();
        break;
      case 3:
        await tampilkanHistory();
        break;
      case 4:
        console.log("Terima kasih, sampai jumpa kembali!");
        exit();
        running = false;
        break;
      default:
        console.log("Input tidak valid!");
    }
  }
}

menuUtama();
