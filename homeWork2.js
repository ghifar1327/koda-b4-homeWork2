const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ===== Data Menu =====
const daftarMenu = [
  { menu: "Beef Shawarma Roll", harga: 36000 },
  { menu: "Chiken Shawarma Roll", harga: 30500 },
  { menu: "1 ekor ayam nasi mandhi (4 orang)", harga: 143000 },
  { menu: "1/2 ekor ayam nasi mandhi (2 orang)", harga: 77000 },
  { menu: "1/4 ekor ayam nasi mandhi (1 orang)", harga: 37000 },
  { menu: "1 ekor ayam nasi kasbah (4 orang)", harga: 143000 },
  { menu: "1/2 ekor ayam nasi kasbah (2 orang)", harga: 75000 },
  { menu: "1/4 ekor ayam nasi kasbah (1 orang)", harga: 37000 },
  { menu: "Garlic mayo large", harga: 24000 },
  { menu: "Garlic mayo small", harga: 6000 },
];

// ===== Variabel Keranjang & History =====
let keranjang = [];
let history = [];

// ===== Tampilkan Menu Utama =====
function menuUtama() {
  console.log("\n=== Selamat datang di Emado's ===");
  console.log("1. Lihat Menu");
  console.log("2. Lihat Keranjang");
  console.log("3. Lihat History");
  console.log("4. Keluar");
  rl.question("Pilih menu: ", (input) => {
    switch (parseInt(input)) {
      case 1:
        tampilkanMenu();
        break;
      case 2:
        tampilkanKeranjang();
        break;
      case 3:
        tampilkanHistory();
        break;
      case 4:
        rl.close();
        break;
      default:
        console.log("Input tidak valid!");
        menuUtama();
    }
  });
}

function tampilkanMenu() {
  console.log("\n=== Daftar Menu ===");
  daftarMenu.forEach((item, index) => {
    console.log(`${index + 1}. ${item.menu} = Rp ${item.harga}`);
  });

  rl.question("Pilih nomor menu: ", (nomor) => {
    const idx = parseInt(nomor) - 1;
    if (idx >= 0 && idx < daftarMenu.length) {
      rl.question("Mau berapa pcs? ", (pcs) => {
        pcs = parseInt(pcs);
        tambahKeKeranjang(idx, pcs);

        // setelah tambah ke keranjang, tanya mau tambah lagi atau tidak
        rl.question("\nMau tambah menu lagi (Y: yes / N: no)? ", (input) => {
          switch (input.toLowerCase()) {
            case "y":
              console.clear();
              tampilkanMenu(); // ulang tampilkan menu
              break;
            case "n":
              console.clear();
              menuUtama(); // kembali ke menu utama
              break;
            default:
              console.log("*Input tidak sesuai*");
              tampilkanMenu(); // ulang tampilkan menu
          }
        });
      });
    } else {
      console.log("Nomor menu tidak valid!");
      tampilkanMenu();
    }
  });
}

// ===== Tambah ke Keranjang =====
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

// ===== Tampilkan Keranjang =====
function tampilkanKeranjang() {
  console.log("\n=== Keranjang ===");
  if (keranjang.length === 0) {
    console.log("Keranjang kosong.");
    return menuUtama();
  }

  let total = 0;
  keranjang.forEach((item, i) => {
    total += item.subTotal;
    console.log(
      `${i + 1}. ${item.menu} x${item.quantity} = Rp ${item.subTotal}`
    );
  });
  console.log(`Total: Rp ${total}`);

  rl.question("(Y = pesan | H = hapus item | N = kembali): ", (pilih) => {
    switch (pilih.toLowerCase()) {
      case "y":
        history.push([...keranjang]);
        keranjang = [];
        console.log("Pesanan berhasil!");
        menuUtama();
        break;
      case "h":
        rl.question("Masukkan nomor item yang ingin dihapus: ", (no) => {
          const idx = parseInt(no) - 1;
          if (keranjang[idx]) {
            console.log(`${keranjang[idx].menu} dihapus dari keranjang.`);
            keranjang.splice(idx, 1);
          } else {
            console.log("Nomor tidak valid!");
          }
          tampilkanKeranjang();
        });
        break;
      default:
        menuUtama();
    }
  });
}

// ===== Tampilkan History =====
function tampilkanHistory() {
  console.log("\n=== History Pemesanan ===");
  if (history.length === 0) {
    console.log("Belum ada pesanan.");
    return menuUtama();
  }

  history.forEach((order, i) => {
    console.log(`\nPesanan #${i + 1}:`);
    let total = 0;
    order.forEach((item) => {
      console.log(`- ${item.menu} x${item.quantity} = Rp ${item.subTotal}`);
      total += item.subTotal;
    });
    console.log(`Total: Rp ${total}`);
  });

  rl.question("\nTekan Enter untuk kembali...", () => menuUtama());
}

menuUtama();
