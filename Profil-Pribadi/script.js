// Fungsi untuk menyapa pengguna saat tombol diklik
const greetBtn = document.getElementById('greetBtn');

greetBtn.addEventListener('click', function() {
    // Ambil nama dari HTML 
    const nama = "Bahrul ulum";
    const jamSekarang = new Date().getHours();
    let sapaan = "";

    if (jamSekarang < 10) {
        sapaan = "Selamat Pagi";
    } else if (jamSekarang < 15) {
        sapaan = "Selamat Siang";
    } else if (jamSekarang < 18) {
        sapaan = "Selamat Sore";
    } else {
        sapaan = "Selamat Malam";
    }

    // Tampilkan pesan
    alert(`${sapaan} ${nama}! Semangat terus belajarnya ya! 😊`);

    greetBtn.textContent = "Sudah Sapa!";
    setTimeout(function() {
        greetBtn.textContent = "Sapa Saya!";
    }, 3000);
});

//Tambah efek smooth scroll saat klik tombol kontak
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});