// Form contact
document.addEventListener("DOMContentLoaded", function () {
	const submitButton = document.getElementById("submitButton");
	const contactForm = document.getElementById("contactForm");
	const notifes = document.getElementById("notifes");
	const notifApung = document.getElementById("notif-apung");
	const faqList = document.getElementById("faqList");

	if (typeof getAIResponse === "undefined") {
		console.error("Fungsi getAIResponse tidak ditemukan. Pastikan aiResponses.js dimuat dengan benar.");
	}

	function disableInputs() {
		const inputs = contactForm.querySelectorAll('input[name="name"], input[name="email"], input[name="number"]');
		inputs.forEach(input => {
			input.disabled = true;
			Object.assign(input.style, {
				filter: "grayscale(100%)",
				cursor: "not-allowed"
			});
		});
	}

	function saveFormData() {
		const formData = new FormData(contactForm);
		sessionStorage.setItem("contactFormData", JSON.stringify(Object.fromEntries(formData)));
	}

	function loadFormData() {
		const data = sessionStorage.getItem("contactFormData");
		if (data) {
			const parsedData = JSON.parse(data);
			Object.entries(parsedData).forEach(([key, value]) => {
				const input = contactForm.querySelector(`[name="${key}"]`);
				if (input) {
					input.value = value;
					if (["name", "email", "number"].includes(key)) {
						input.disabled = true;
						Object.assign(input.style, {
							filter: "grayscale(100%)",
							cursor: "not-allowed"
						});
					}
				}
			});
		}
	}

	function showNotification(message, isSuccess = true) {
		const icon = isSuccess ? "&#10003;" : "&#10007;";
		notifApung.innerHTML = `<span class="icon">${icon}</span>${message}`;
		notifApung.style.backgroundColor = isSuccess ? "#4CAF50" : "#f44336";
		notifApung.style.display = "block";
		notifApung.style.opacity = "1";
		setTimeout(() => {
			notifApung.style.opacity = "0";
			setTimeout(() => {
				notifApung.style.display = "none";
			}, 300);
		}, 3000);
	}

	submitButton.addEventListener("click", function () {
		if (contactForm.checkValidity()) {
			const formData = new FormData(contactForm);
			const message = formData.get("message").trim();

			if (containsForbiddenWords(message)) {
				notifes.textContent = ""; // Kosongkan notifes jika kata kasar terdeteksi
				notifes.style.display = "none";
				showNotification("Hindari kata kasar", false);
			} else {
				const aiResponse = getAIResponse(message);
				if (aiResponse === null) {
					notifes.textContent = ""; // Kosongkan notifes ketika tidak ada respon dari AI
					notifes.style.display = "none";
					showNotification("Pesan telah terkirim", true);
				} else {
					notifes.textContent = aiResponse;
					notifes.style.color = "#4CAF50"; // Warna hijau untuk respon positif
					notifes.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Putih dengan transparansi
					notifes.style.display = "block";
				}
				saveFormData();
				disableInputs();
			}

			setTimeout(() => {
				notifes.style.display = "none";
			}, 5000);
		} else {
			notifes.style.color = "#ff2a2a"; // Warna merah untuk peringatan
			notifes.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; // Putih dengan transparansi
			notifes.textContent = "Harap isi semua kolom yang wajib diisi.";
			notifes.style.display = "block";
		}
	});

	faqList.addEventListener("click", function (e) {
		if (e.target.tagName === "H4") {
			const p = e.target.nextElementSibling;
			p.style.display = p.style.display === "none" ? "block" : "none";
		}
	});

	const faqs = [
		{ question: "Apa itu Lorem Ipsum?", answer: "Lorem Ipsum adalah teks dummy yang digunakan dalam industri percetakan dan desain." },
		{ question: "Bagaimana cara menghubungi kami?", answer: "Anda dapat menghubungi kami melalui formulir kontak yang tersedia di sini." },
		{ question: "Di mana lokasi kami?", answer: "Kami terletak di Indramayu, dan Anda dapat melihat lokasi kami di peta di sebelah." }
	];

	faqs.forEach(({ question, answer }) => {
		const li = document.createElement("li");
		const h4 = document.createElement("h4");
		const p = document.createElement("p");
		h4.textContent = question;
		p.textContent = answer;
		p.style.display = "none";

		li.appendChild(h4);
		li.appendChild(p);
		faqList.appendChild(li);
	});

	loadFormData();
});
