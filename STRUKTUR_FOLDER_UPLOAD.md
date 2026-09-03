# 📁 STRUKTUR FOLDER UPLOAD WEBSITE PP NURUL ULUM

## 🎯 Ringkasan Struktur Folder

Website PP Nurul Ulum memiliki 3 area utama untuk upload file:

```
website-nurul-ulum-vs-code/
│
├── 📹 videos/
│   ├── profile-documentary/         ← Video Profil & Dokumenter
│   │   ├── profil-pesantren.mp4
│   │   ├── dokumenter-pesantren.mp4
│   │   └── PANDUAN_UPLOAD.txt
│   │
│   └── activity-documentary/        ← Video Suasana & Kegiatan
│       ├── suasana-pesantren.mp4
│       ├── kegiatan-pesantren.mp4
│       └── PANDUAN_UPLOAD.txt
│
├── 📷 images/
│   └── unit-logos/                  ← Logo Setiap Unit
│       ├── tk-logo.png
│       ├── mi-logo.png
│       ├── mts-logo.png
│       ├── ma-logo.png
│       ├── kb-logo.png
│       └── PANDUAN_UPLOAD.txt
│
└── [Folder dan file lainnya...]
```

---

## 1️⃣ FOLDER VIDEO: Profile Documentary
**Lokasi:** `/videos/profile-documentary/`

**Fungsi:** Menyimpan video profil dan dokumenter pesantren

**Jenis File:**
- Video Profil PP Nurul Ulum
- Dokumentasi Pesantren
- Sejarah Pesantren
- Visi & Misi Pesantren

**Spesifikasi File:**
- Format: MP4 (H.264)
- Resolusi: 1920x1080 (FHD)
- Ukuran Maks: 500MB

**Cara Upload:**
1. Siapkan file video MP4
2. Letakkan di folder ini
3. Buka http://localhost:3000/manage-videos.html
4. Pilih kategori "Video Profil & Dokumenter Pesantren"
5. Isi form dan upload

---

## 2️⃣ FOLDER VIDEO: Activity Documentary
**Lokasi:** `/videos/activity-documentary/`

**Fungsi:** Menyimpan video suasana kegiatan di pesantren

**Jenis File:**
- Video Kegiatan Santri
- Suasana Pembelajaran
- Ekstrakurikuler
- Acara Pesantren
- Gotong Royong

**Spesifikasi File:**
- Format: MP4 (H.264)
- Resolusi: 1920x1080 (FHD)
- Ukuran Maks: 500MB

**Cara Upload:**
1. Siapkan file video MP4
2. Letakkan di folder ini
3. Buka http://localhost:3000/manage-videos.html
4. Pilih kategori "Video Profil & Suasana Kegiatan Pesantren"
5. Isi form dan upload

---

## 3️⃣ FOLDER LOGO: Unit Logos
**Lokasi:** `/images/unit-logos/`

**Fungsi:** Menyimpan logo setiap unit pesantren

**Daftar Unit:**
| Unit | Nama File | Jenis |
|------|-----------|-------|
| 🍼 KB | kb-logo.png | Kelompok Bermain |
| 🎓 TK | tk-logo.png | Taman Kanak-kanak |
| 📚 MI | mi-logo.png | Madrasah Ibtidaiyah |
| 🏫 MTS | mts-logo.png | Madrasah Tsanawiyah |
| 👨‍🎓 MA | ma-logo.png | Madrasah Aliyah |

**Spesifikasi File:**
- Format: PNG (recommended) atau JPG
- Ukuran: 300x300px (optimal)
- Ukuran File: 50-200KB
- Background: Transparan (PNG)

**Cara Upload:**
1. Siapkan logo untuk setiap unit
2. Beri nama sesuai daftar di atas
3. Letakkan di folder `/images/unit-logos/`
4. Logo otomatis muncul di halaman unit
5. Clear cache browser jika tidak update

---

## 📋 CHECKLIST UPLOAD

### Checklist Video Profile Documentary:
- [ ] File video MP4 ready
- [ ] Resolusi minimal 1920x1080
- [ ] File size < 500MB
- [ ] Thumbnail/cover ready (JPG/PNG)
- [ ] Letakkan di `/videos/profile-documentary/`
- [ ] Upload via manage-videos.html

### Checklist Video Activity Documentary:
- [ ] File video MP4 ready
- [ ] Resolusi minimal 1920x1080
- [ ] File size < 500MB
- [ ] Thumbnail/cover ready (JPG/PNG)
- [ ] Letakkan di `/videos/activity-documentary/`
- [ ] Upload via manage-videos.html

### Checklist Logo Unit:
- [ ] KB Logo (kb-logo.png)
- [ ] TK Logo (tk-logo.png)
- [ ] MI Logo (mi-logo.png)
- [ ] MTS Logo (mts-logo.png)
- [ ] MA Logo (ma-logo.png)
- [ ] Semua file di `/images/unit-logos/`

---

## 🔧 TOOLS YANG DIGUNAKAN

### Untuk Video:
- FFmpeg (compress/convert video)
- VLC (play/check video)
- DaVinci Resolve (edit video)
- Adobe Premiere Pro (edit video)

### Untuk Logo:
- GIMP (edit gambar gratis)
- Photoshop (edit gambar)
- Figma (design online gratis)
- Canva (design online gratis)

---

## ⚡ TIPS & TRIK

### Video:
✅ Compress video jika file terlalu besar
✅ Gunakan codec H.264 untuk compatibility
✅ Pastikan audio jernih dan volume normal
✅ Buat thumbnail yang menarik

### Logo:
✅ Gunakan PNG untuk background transparan
✅ Logo harus square (1:1 aspect ratio)
✅ Pastikan logo terlihat jelas di ukuran kecil
✅ Hindari teks yang terlalu detail

---

## ❓ FAQ

**Q: Video tidak muncul di halaman?**
A: Cek apakah file ada di folder yang benar dan path di JSON sesuai

**Q: Logo tidak muncul?**
A: Clear cache browser (Ctrl+Shift+Del) dan refresh halaman

**Q: File video terlalu besar?**
A: Gunakan FFmpeg atau HandBrake untuk compress

**Q: Berapa lama upload video?**
A: Tergantung ukuran file dan kecepatan internet. Disarankan < 500MB

**Q: Bisa upload video dari YouTube?**
A: Bisa, tapi harus download dulu atau embed YouTube player

---

## 📞 SUPPORT

Untuk bantuan lebih lanjut:
1. Baca PANDUAN_UPLOAD.txt di masing-masing folder
2. Periksa console browser (F12) untuk error messages
3. Pastikan server sudah running: `node server.js`
4. Hubungi admin website

---

**Terakhir diperbarui:** 2024-01-15
**Untuk:** PP Nurul Ulum
**Dibuat dengan ❤️ untuk kemudahan upload konten**
