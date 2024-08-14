document.addEventListener("alpine:init", () => {
	Alpine.data("products", () => ({
		items: [
			{
				id: 1,
				star: "★★★☆☆",
				name: "mix-coffe",
				img: "1.jpg",
				idr: 20000,
				idrget: 25000,
				description: "DESCRIPTION: Kombinasi rasa kopi klasik dengan sentuhan modern, menyajikan cita rasa yang harmonis dan memuaskan.",
				info: "INFO: Mix-coffee kami menawarkan harmoni rasa kopi klasik dengan elemen modern. Cocok untuk mereka yang ingin menikmati perpaduan unik dalam setiap cangkir kopi."
			},
			{
				id: 2,
				star: "★★☆☆☆",
				name: "mocca-coffe",
				img: "2.jpg",
				idr: 15000,
				idrget: 20000,
				description: "DESCRIPTION: Mocca lembut dengan aroma coklat khas yang memanjakan lidah dalam setiap tegukan.",
				info: "INFO: Nikmati kelezatan mocca-coffee dengan kelembutan dan aroma coklat khas. Ideal untuk pecinta kopi yang menginginkan sentuhan manis dan rasa yang memanjakan."
			},
			{
				id: 3,
				star: "★★★★☆",
				name: "black-coffe",
				img: "3.jpg",
				idr: 18000,
				idrget: 23000,
				description: "DESCRIPTION: Kopi hitam asli yang kuat dan pekat dengan rasa sedikit asam, cocok untuk pecinta kopi sejati.",
				info: "INFO: Black-coffee kami menyajikan rasa kopi hitam yang pekat dan kuat. Dengan sedikit keasaman, ini adalah pilihan sempurna bagi mereka yang mencari pengalaman kopi yang mendalam."
			},
			{
				id: 4,
				star: "★★★☆☆",
				name: "green-coffe",
				img: "4.jpg",
				idr: 25000,
				idrget: 30000,
				description: "DESCRIPTION: Kopi hijau segar, kaya antioksidan dengan rasa yang menyegarkan dan menyehatkan.",
				info: "INFO: Green-coffee kami menawarkan manfaat kesehatan dengan antioksidan tinggi. Rasakan kesegaran dan manfaat kesehatan yang optimal dari setiap tegukan kopi hijau kami."
			},
			{
				id: 5,
				star: "★★★★★",
				name: "capucino-coffe",
				img: "5.jpg",
				idr: 12000,
				idrget: 17000,
				description: "DESCRIPTION: Cappuccino dengan buih lembut dan rasa kopi yang nikmat, menawarkan pengalaman kopi yang memuaskan.",
				info: "INFO: Cappuccino kami memberikan kelezatan buih susu lembut dan rasa kopi yang harmonis. Setiap cangkir menawarkan kombinasi sempurna dari kelembutan dan kelezatan yang memanjakan."
			}
		],
		purchasedItems: [], // Daftar produk yang dibeli per menu

		showNotification(message, duration = 3000) {
			const notification = document.querySelector(".prosess");
			if (notification) {
				notification.textContent = message;
				notification.style.opacity = 1; // Tampilkan notifikasi

				// Sembunyikan notifikasi setelah durasi tertentu
				setTimeout(() => {
					notification.style.opacity = 0;
				}, duration);
			}
		},

		purchaseItem(item) {
			// Mengecek apakah produk sudah ada di daftar pembelian
			const purchasedItem = this.purchasedItems.find(purchased => purchased.id === item.id);

			if (!purchasedItem) {
				// Menambahkan produk jika belum ada di daftar pembelian
				this.purchasedItems.push({ ...item, quantity: 1 });

				// Menyimpan data produk ke sessionStorage
				sessionStorage.setItem("purchasedProduct", JSON.stringify(item));

				// Menampilkan notifikasi
				this.showNotification(`${item.name} Dalam Proses Pembelian ${this.rupiah(item.idr)}.`);

				// Redirect ke halaman checkout
				window.location.href = "check-out/checkout.html"; // Ganti dengan URL halaman checkout Anda
			} else {
				// Menampilkan notifikasi produk sudah dibeli
				this.showNotification(`Produk ${item.name} sudah dibeli.`);
			}
		},

		rupiah(number) {
			return new Intl.NumberFormat("id-ID", {
				style: "currency",
				currency: "IDR",
				minimumFractionDigits: 0
			}).format(number);
		}
	}));

	// Store untuk Keranjang Belanja
	Alpine.store("cart", {
		items: [],
		total: 0,
		quantity: 0,
		add(item) {
			const CartItems = this.items.find(cartItem => cartItem.id === item.id);

			if (!CartItems) {
				this.items.push({ ...item, quantity: 1, total: item.idr });
				this.quantity++;
				this.total += item.idr;
			} else {
				CartItems.quantity++;
				CartItems.total = CartItems.idr * CartItems.quantity;
				this.quantity++;
				this.total += item.idr;
			}
		},
		remove(id) {
			const CartItems = this.items.find(item => item.id === id);

			if (CartItems.quantity > 1) {
				CartItems.quantity--;
				CartItems.total = CartItems.idr * CartItems.quantity;
				this.quantity--;
				this.total -= CartItems.idr;
			} else if (CartItems.quantity === 1) {
				this.items = this.items.filter(item => item.id !== id);
				this.quantity--;
				this.total -= CartItems.idr;
			}
		}
	});
});
