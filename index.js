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
        console.clear()
        await pilihMenu();
        break;
      case 2:
        console.clear()
        await tampilkanKeranjang();
        break;
      case 3:
        console.clear()
        await tampilkanHistory();
        break;
      case 4:
        console.clear()
        console.log("\n\nTerima kasih, sampai jumpa kembali..😊\n\n");
        exit();
        running = false;
        break;
      default:
        console.log("Input tidak valid!");
        console.clear()
    }
  }
}

menuUtama();
