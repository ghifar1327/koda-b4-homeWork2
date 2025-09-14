const { daftarMenu } = require("./data");
const { question } = require("./readquire/readLine");
const { tambahKeKeranjang } = require("./keranjang");

async function pilihMenu() {
  console.log("\n=== Daftar Menu ===");
  daftarMenu.forEach((item, index) => {
    console.log(`${index + 1}. ${item.menu} = Rp ${item.harga}`);
  });

  const nomor = parseInt(await question("Pilih nomor menu: "));
  
  if (nomor > 0 && nomor <= daftarMenu.length) {
    const idx = nomor - 1;
    const pcs = parseInt(await question("Mau berapa pcs? "));
    tambahKeKeranjang(idx, pcs);

    const input = await question("\n Mau tambah menu lagi (Y/N): ");
    if (input.toLowerCase() === "y") {
      console.clear();
      await pilihMenu();
    }
    console.clear()
  } else {
    await question('\n *Input tidak valid... tekan Enter untuk input ulang')
    await pilihMenu()
  }
}

module.exports = { pilihMenu };
