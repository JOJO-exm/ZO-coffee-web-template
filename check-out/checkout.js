document.addEventListener("DOMContentLoaded", () => {
	// Mengambil data produk dari sessionStorage
	const product = JSON.parse(sessionStorage.getItem("purchasedProduct"));

	// Mengambil elemen untuk menampilkan detail produk dan total belanja
	const productDetails = document.getElementById("productDetails");
	const cartTotal = document.getElementById("cartTotal");

	// Fungsi untuk menampilkan detail produk
	function displayProductDetails(product) {
		productDetails.innerHTML = `
            <div class="product-detail-container">
                <img src="../img/products/${product.img}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price"><strong>Harga:</strong> ${formatCurrency(product.idr)}</p>
                </div>
            </div>
            <div class="spacer"></div>
        `;
	}

	// Fungsi untuk memformat harga tanpa desimal
	function formatCurrency(amount) {
		return `RP ${new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)}`;
	}

	if (product) {
		// Menampilkan detail produk
		displayProductDetails(product);

		// Menampilkan total belanja
		cartTotal.innerHTML = `<p class="cart-total"><strong>Total Belanja:</strong> ${formatCurrency(product.idr)}</p>`;

		// Menghapus data produk dari sessionStorage setelah ditampilkan
		sessionStorage.removeItem("purchasedProduct");
	} else {
		productDetails.innerHTML = `<p>Produk tidak ditemukan.</p>`;
	}

	// Menangani form submit
	const form = document.getElementById("checkout");
	form.addEventListener("submit", event => {
		event.preventDefault();

		const notification = document.getElementById("notification");
		const fullName = form["full-name"].value.trim();
		const address = form["address"].value.trim();
		const postalCode = form["postal-code"].value.trim();
		const phone = form["phone"].value.trim();
		const city = form["city"].value.trim();
		let valid = true;

		// Mengatur fungsi untuk menyembunyikan notifikasi
		function hideNotification() {
			setTimeout(() => {
				notification.className = "notification";
			}, 3000); // Notifikasi hilang setelah 3 detik
		}

		// Validasi nama lengkap
		if (fullName.length < 3) {
			notification.innerHTML = "<p>Nama lengkap tidak valid. Harap masukkan nama yang benar.</p>";
			notification.className = "notification error";
			valid = false;
			hideNotification();
		}

		// Validasi alamat
		if (address.length < 10) {
			notification.innerHTML = "<p>Alamat tidak valid. Harap masukkan alamat yang lebih lengkap.</p>";
			notification.className = "notification error";
			valid = false;
			hideNotification();
		}

		// Validasi kode pos (contoh: 5 digit angka)
		const postalCodeRegex = /^[0-9]{5}$/;
		if (!postalCodeRegex.test(postalCode)) {
			notification.innerHTML = "<p>Kode pos tidak valid. Harap masukkan kode pos yang benar.</p>";
			notification.className = "notification error";
			valid = false;
			hideNotification();
		}

		// Validasi nomor telepon (contoh: 10-15 digit angka)
		const phoneRegex = /^[0-9]{10,15}$/;
		if (!phoneRegex.test(phone)) {
			notification.innerHTML = "<p>Nomor telepon tidak valid. Harap masukkan nomor telepon yang benar.</p>";
			notification.className = "notification error";
			valid = false;
			hideNotification();
		}

		// Validasi nama kota (hanya huruf dan spasi)
		const cityRegex = /^[A-Za-z\s]+$/;
		if (!cityRegex.test(city)) {
			notification.innerHTML = "<p>Kota tidak valid. Harap masukkan nama kota yang benar.</p>";
			notification.className = "notification error";
			valid = false;
			hideNotification();
		}

		if (valid) {
			notification.innerHTML = "<p>Pesanan Anda telah dikirim!</p>";
			notification.className = "notification success";
			// Reset form after submission
			form.reset();
			// Menghilangkan notifikasi setelah beberapa detik
			setTimeout(() => {
				notification.className = "notification";
			}, 3000); // Notifikasi hilang setelah 3 detik
		}
	});
});
