// Toggle Class Active Menu
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu-nav").onclick = e => {
	navbarNav.classList.toggle("active");
	e.preventDefault();
};

// Toggle Class Active Search
const Search = document.querySelector(".search-form");
const SearchBox = document.querySelector("#search-box");
document.querySelector("#search-nav").onclick = e => {
	Search.classList.toggle("active");
	SearchBox.focus();
	showNotification("Waktu sekarang: " + new Date().toLocaleTimeString());
	e.preventDefault();
};

// Notification Handling
let notificationTimeout;
const notification = document.getElementById("notification");

function showNotification(message) {
	if (notification) {
		notification.textContent = message;
		notification.classList.remove("hidden");
		clearTimeout(notificationTimeout);
		notificationTimeout = setTimeout(() => {
			notification.classList.add("hidden");
		}, 3000); // Menampilkan notifikasi selama 3 detik
	}
}

// Handle Search Input
const searchBox = document.getElementById("search-box");
let items = [];
let initialScrollTop = window.scrollY;

function updateItems() {
	items = Array.from(document.querySelectorAll('h3[x-text="item.name"]'));
}

function handleInput() {
	const query = searchBox.value.toLowerCase();
	items.forEach(item => item.classList.remove("highlight"));

	if (query.length >= 3) {
		let found = false;
		items.forEach(item => {
			if (item.textContent.toLowerCase().includes(query)) {
				item.classList.add("highlight");
				item.scrollIntoView({ behavior: "smooth", block: "center" });
				showNotification(`Ditemukan: ${item.textContent}`);
				found = true;
				return;
			}
		});
		if (!found) {
			showNotification("Produk tidak ditemukan.");
		}
	} else if (query.length === 0) {
		window.scrollTo({ top: initialScrollTop, behavior: "smooth" });
		showNotification(`Waktu sekarang: ${new Date().toLocaleTimeString()}`);
	} else {
		showNotification("Ketik minimal 3 karakter untuk mencari.");
	}
}

searchBox.addEventListener("input", handleInput);

window.addEventListener("load", () => {
	updateItems(); // Update items saat halaman dimuat
	initialScrollTop = window.scrollY;
	showNotification(`Waktu sekarang: ${new Date().toLocaleTimeString()}`);
});

// Toggle Class Shopping
const Shopping = document.querySelector(".shopping-cart");
document.querySelector("#shopping-nav").onclick = e => {
	Shopping.classList.toggle("active");
	e.preventDefault();
};

// Toggle Class Remove Element
document.addEventListener("click", e => {
	if (!document.querySelector("#menu-nav").contains(e.target) && !navbarNav.contains(e.target)) {
		navbarNav.classList.remove("active");
	}
	if (!document.querySelector("#search-nav").contains(e.target) && !Search.contains(e.target)) {
		Search.classList.remove("active");
	}
	if (!document.querySelector("#shopping-nav").contains(e.target) && !Shopping.contains(e.target)) {
		Shopping.classList.remove("active");
	}
});

// Notification for Shopping Cart
document.addEventListener("DOMContentLoaded", function () {
	// Fungsi untuk menampilkan notifikasi
	function showNotification(notification) {
		if (!notification) return;
		notification.textContent = "Save order"; // Set teks notifikasi
		notification.classList.add("active"); // Tambahkan kelas 'active' untuk menampilkan notifikasi
		setTimeout(() => {
			notification.classList.remove("active"); // Hapus kelas 'active' setelah 3 detik
		}, 3000); // Tampilkan selama 3 detik
	}

	// Event listener untuk tombol dengan kelas 'togg'
	document.querySelectorAll(".togg").forEach(button => {
		button.addEventListener("click", e => {
			e.preventDefault(); // Cegah aksi default tombol
			const productIcon = button.closest(".product-icon");
			if (!productIcon) {
				console.error("Elemen .product-icon tidak ditemukan");
				return;
			}
			const notification = productIcon.querySelector(".notification");
			if (!notification) {
				console.error("Elemen .notification tidak ditemukan");
				return;
			}
			showNotification(notification);
		});
	});
});