const { daftarMenu } = require("./data");
const { question } = require("./readquire/readLine");

let keranjang = [];
let history = [];

function tambahKeKeranjang(idx, pcs) {
  const item = daftarMenu[idx];
  const existing = keranjang.find((k) => k.menu === item.menu);

  if (existing) {
    existing.quantity += pcs;
    existing.subTotal = existing.quantity * existing.harga;
  } else {
    keranjang.push({
      ...item,
      quantity: pcs,
      subTotal: item.harga * pcs,
    });
  }

  console.log(`\n* ${item.menu} (${pcs} pcs) ditambahkan ke keranjang *`);
}

async function tampilkanKeranjang() {
  console.log("\n=== Keranjang ===");
  if (keranjang.length === 0) {
    console.log("\n\n*Keranjang kosong.*");
    return;
  }

  let total = 0;
  keranjang.forEach((item, i) => {
    total += item.subTotal;
    console.log(`\n${i + 1}. ${item.menu} x${item.quantity} = Rp ${item.subTotal}`);
  });
  console.log(`\nTotal: Rp ${total}`);

  const pilih = await question("\n(Y = pesan | H = hapus item | N = kembali): ");

  switch (pilih.toLowerCase()) {
    case "y":
      history.push([...keranjang]);
      keranjang.length = 0;
      console.log("\nHore!... Pesanan berhasil!");
      break;
    case "h":
      { const no = parseInt(await question("Masukkan nomor item yang ingin dihapus: "));
      const idx = no - 1;
      if (keranjang[idx]) {
        console.log(`${keranjang[idx].menu} dihapus dari keranjang.`);
        keranjang.splice(idx, 1);
      } else {
        await question("\n*Nomor tidak valid... Tekan enter untuk mengulang")
        tampilkanKeranjang();
      }
      break; }
    default:
      return;
  }
}

module.exports = { tampilkanKeranjang, tambahKeKeranjang, keranjang, history };
