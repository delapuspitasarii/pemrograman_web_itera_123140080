let keranjang = JSON.parse(localStorage.getItem("keranjangBelanja")) || [];
let kodePromoAktif = false;

const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("nama-barang");
const inputHarga = document.getElementById("harga-barang");
const inputQty = document.getElementById("qty-barang");

const errorNama = document.getElementById("error-nama");
const errorHarga = document.getElementById("error-harga");
const errorQty = document.getElementById("error-qty");

const tabelKeranjang = document.getElementById("tabel-keranjang");
const textSubtotal = document.getElementById("text-subtotal");
const textDiskon = document.getElementById("text-diskon");
const textTotal = document.getElementById("text-total");

const inputKodePromo = document.getElementById("kode-promo");
const btnPromo = document.getElementById("btn-promo");
const inputUangBayar = document.getElementById("uang-bayar");
const textKembalian = document.getElementById("text-kembalian");
const pesanKembalian = document.getElementById("pesan-kembalian");
const btnReset = document.getElementById("btn-reset");


function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(angka);
}

function validasiInput() {
  let isValid = true;

  const nama = inputNama.value.trim();
  const harga = parseFloat(inputHarga.value);
  const qty = parseInt(inputQty.value);

  if (nama.length < 3) {
    errorNama.classList.remove("hidden");
    inputNama.classList.add("input-error");
    isValid = false;
  } else {
    errorNama.classList.add("hidden");
    inputNama.classList.remove("input-error");
  }

  if (isNaN(harga) || harga < 500) {
    errorHarga.classList.remove("hidden");
    inputHarga.classList.add("input-error");
    isValid = false;
  } else {
    errorHarga.classList.add("hidden");
    inputHarga.classList.remove("input-error");
  }

  if (isNaN(qty) || qty < 1) {
    errorQty.classList.remove("hidden");
    inputQty.classList.add("input-error");
    isValid = false;
  } else {
    errorQty.classList.add("hidden");
    inputQty.classList.remove("input-error");
  }

  return isValid;
}

function updateTampilan() {
  tabelKeranjang.innerHTML = "";
  let subtotalKeseluruhan = 0;

  if (keranjang.length === 0) {
    tabelKeranjang.innerHTML = `
      <tr>
        <td colspan="6" class="p-4 text-center text-gray-500">Keranjang masih kosong.</td>
      </tr>`;
  } else {
    keranjang.forEach((item, index) => {
      const subtotalItem = item.harga * item.qty;
      subtotalKeseluruhan += subtotalItem;

      const tr = document.createElement("tr");
      tr.className = "border-b hover:bg-gray-50";
      tr.innerHTML = `
        <td class="p-3 border">${index + 1}</td>
        <td class="p-3 border font-medium">${item.nama}</td>
        <td class="p-3 border">${formatRupiah(item.harga)}</td>
        <td class="p-3 border text-center">${item.qty}</td>
        <td class="p-3 border">${formatRupiah(subtotalItem)}</td>
        <td class="p-3 border text-center">
          <button onclick="hapusItem(${index})" class="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Hapus</button>
        </td>
      `;
      tabelKeranjang.appendChild(tr);
    });
  }

  if (subtotalKeseluruhan < 50000) {
    kodePromoAktif = false;
  }

  let diskon = 0;
  if (subtotalKeseluruhan >= 50000 && kodePromoAktif) {
    diskon = subtotalKeseluruhan * 0.1;
  }

  const totalAkhir = subtotalKeseluruhan - diskon;

  textSubtotal.innerText = formatRupiah(subtotalKeseluruhan);
  textDiskon.innerText = `- ${formatRupiah(diskon)}`;
  textTotal.innerText = formatRupiah(totalAkhir);

  localStorage.setItem("keranjangBelanja", JSON.stringify(keranjang));

  hitungPembayaran(totalAkhir);
}

function hitungPembayaran(totalAkhir) {
  const uangBayar = parseFloat(inputUangBayar.value) || 0;

  if (inputUangBayar.value === "") {
    textKembalian.innerText = "Rp 0";
    textKembalian.className = "text-gray-700";
    pesanKembalian.classList.add("hidden");
    return;
  }

  const kembalian = uangBayar - totalAkhir;

  if (kembalian < 0) {
    textKembalian.innerText = formatRupiah(kembalian);
    textKembalian.className = "text-red-500 font-bold";
    pesanKembalian.classList.remove("hidden");
  } else {
    textKembalian.innerText = formatRupiah(kembalian);
    textKembalian.className = "text-green-600 font-bold";
    pesanKembalian.classList.add("hidden");
  }
}

formBarang.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validasiInput()) return;

  const barangBaru = {
    nama: inputNama.value.trim(),
    harga: parseFloat(inputHarga.value),
    qty: parseInt(inputQty.value)
  };

  keranjang.push(barangBaru);
  updateTampilan();

  formBarang.reset();
  inputQty.value = 1;
});

function hapusItem(index) {
  keranjang.splice(index, 1);
  updateTampilan();
}

btnPromo.addEventListener("click", function () {
  const kode = inputKodePromo.value.trim().toUpperCase();
  const subtotal = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);

  if (kode === "HEMAT10") {
    if (subtotal < 50000) {
      alert("Kode promo HEMAT10 hanya dapat digunakan dengan minimal belanja Rp 50.000!");
      kodePromoAktif = false;
    } else {
      kodePromoAktif = true;
      alert("Kode promo berhasil digunakan! Diskon 10% diterapkan.");
    }
  } else {
    kodePromoAktif = false;
    alert("Kode promo tidak valid!");
  }
  updateTampilan();
});

inputUangBayar.addEventListener("input", function () {
  const subtotal = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);
  let diskon = (subtotal >= 50000 && kodePromoAktif) ? subtotal * 0.1 : 0;
  hitungPembayaran(subtotal - diskon);
});

btnReset.addEventListener("click", function () {
  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang belanja?")) {
    keranjang = [];
    kodePromoAktif = false;
    inputKodePromo.value = "";
    inputUangBayar.value = "";
    localStorage.removeItem("keranjangBelanja");
    updateTampilan();
  }
});

// Load awal aplikasi
updateTampilan();
