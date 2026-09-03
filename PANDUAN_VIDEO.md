# 📹 Panduan Kelola Video Pesantren

## Cara Menggunakan Sistem Video

### 1. **Akses Halaman Kelola Video**
Buka di browser: `http://localhost:3000/manage-videos.html`

### 2. **Struktur Kategori Video**
Ada 2 kategori video yang bisa dikelola:

#### 📷 Kategori 1: **Video Profil & Dokumenter Pesantren**
- Berisi video profil, dokumentasi pesantren
- Tampil di halaman Beranda (index.html) dan Profil (profil.html)
- ID Kategori: `profile-documentary`

#### 🎬 Kategori 2: **Video Profil & Suasana Kegiatan Pesantren**
- Berisi video dokumentasi kegiatan dan suasana di pesantren
- Tampil di halaman Beranda (index.html) dan Profil (profil.html)
- ID Kategori: `activity-documentary`

### 3. **Cara Menambah Video**
1. Buka halaman `manage-videos.html`
2. Pilih kategori video (tab atas)
3. Isi form:
   - **Judul Video**: Nama/judul video
   - **Deskripsi**: Deskripsi singkat video
   - **File Video**: Pilih file MP4 (maksimal 100MB)
   - **Thumbnail**: Pilih gambar cover (JPG/PNG)
4. Klik tombol "Tambah"
5. Video akan langsung muncul di galeri

### 4. **Struktur Folder untuk File Video**
```
website-nurul-ulum/
├── videos/
│   ├── profile-documentary.mp4
│   ├── activity-documentary.mp4
│   └── [video lainnya]
├── images/
│   └── videos/
│       ├── profile-documentary-thumb.jpg
│       ├── activity-documentary-thumb.jpg
│       └── [thumbnail lainnya]
└── data/
    └── videos.json  ← File database video
```

### 5. **Format File JSON (videos.json)**
```json
{
  "videos": [
    {
      "id": 1,
      "category": "profile-documentary",
      "categoryLabel": "Video Profil & Dokumenter Pesantren",
      "title": "Judul Video",
      "description": "Deskripsi video",
      "thumbnail": "images/videos/thumbnail.jpg",
      "videoUrl": "videos/video.mp4",
      "duration": "5:30",
      "uploadDate": "2024-01-15"
    }
  ]
}
```

### 6. **Fitur di Halaman Kelola Video**
- ✅ **Tambah Video**: Form untuk menambah video baru
- ✏️ **Edit Video**: Klik tombol edit untuk mengubah info video
- 🗑️ **Hapus Video**: Klik tombol hapus untuk menghapus video
- 🔄 **Kategori Tab**: Switch antara 2 kategori video
- 👁️ **Preview Thumbnail**: Lihat preview gambar sebelum upload

### 7. **Cara Memutar Video**
- **Di Halaman Beranda/Profil**: 
  - Video ditampilkan dalam galeri
  - Klik video untuk memutar di modal player
  - Video bisa dari YouTube channel atau video lokal

### 8. **Tips Penting**
- 💾 **Backup Data**: File `data/videos.json` adalah database video Anda
- 📏 **Ukuran File**:
  - Video: Maksimal 100MB, gunakan format MP4
  - Thumbnail: Maksimal 5MB, gunakan JPG/PNG
- 🎞️ **Resolusi Video**: Minimum 1080p untuk hasil terbaik
- 📸 **Thumbnail**: Gunakan resolusi 1280x720 untuk tampilan optimal

### 9. **Troubleshooting**
| Masalah | Solusi |
|---------|--------|
| Video tidak muncul | Pastikan file video ada di folder `/videos/` |
| Thumbnail tidak tampil | Cek path di JSON sudah benar di folder `/images/videos/` |
| Page 404 | Pastikan server sudah jalan: `node server.js` |
| Video tidak bisa diputar | Cek format video MP4 dan codec h264 |

### 10. **Perbarui Video di Halaman Utama**
Setelah menambah video di `manage-videos.html`:
1. Data otomatis tersimpan di `data/videos.json`
2. Refresh halaman beranda/profil untuk lihat video terbaru
3. Video akan muncul di galeri sesuai kategorinya

---
**Dibuat untuk PP Nurul Ulum** | Sistem Manajemen Video Pesantren
