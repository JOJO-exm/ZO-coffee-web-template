// Data respons AI dengan kata kunci dan jawaban
const responses = {
	halo: "Halo! Ada yang bisa kami bantu?",
	info: "Anda dapat menghubungi kami melalui formulir di halaman ini.",
	alamat: "Kami terletak di Indramayu."
	// Tambahkan lebih banyak kata kunci sesuai kebutuhan
};

// Daftar kata kasar
const forbiddenWords = ["kasar1", "kasar2", "kasar3"];

// Fungsi untuk memeriksa apakah pesan mengandung kata-kata kasar
function containsForbiddenWords(message) {
	return forbiddenWords.some(word => message.toLowerCase().includes(word));
}

// Fungsi untuk mendapatkan respon AI berdasarkan pesan
function getAIResponse(message) {
	const lowerCaseMessage = message.toLowerCase();

	if (containsForbiddenWords(lowerCaseMessage)) {
		// Kosongkan notifikasi jika terdeteksi kata kasar
		const notifes = document.getElementById("notifes");
		notifes.textContent = "";
		notifes.style.display = "none";
		return "Pesan Anda mengandung kata-kata yang tidak pantas.";
	}

	// Mengembalikan respons yang cocok dengan kata kunci atau null jika tidak ada yang cocok
	const response = Object.keys(responses).find(keyword => lowerCaseMessage.includes(keyword));
	return response ? responses[response] : null;
}
