const { question } = require("./readquire/readLine");
const { history } = require("./keranjang");

async function tampilkanHistory() {
  console.log("\n=== History Pemesanan ===");
  if (history.length === 0) {
    console.log("\nBelum ada pesanan.");
    await question("\nTekan Enter untuk keluar..");
    return;
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

  await question("\nTekan Enter untuk kembali...");
  console.clear()
}

module.exports = { tampilkanHistory };
