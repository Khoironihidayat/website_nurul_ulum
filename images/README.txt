# Panduan Penggantian Foto Website Nurul Ulum

Simpan foto/gambar Anda di dalam folder ini (`images/`):

1. **Foto Utama & Profil:**
   - `images/hero.jpg` -> Foto banner utama beranda
   - `images/profil.jpg` -> Foto gedung / santri di halaman profil
   - `images/logo.png` -> Logo pesantren

2. **Foto Unit Pendidikan:**
   - `images/tk.jpg` -> Foto kegiatan TK / RA
   - `images/mi.jpg` -> Foto kegiatan MI
   - `images/mts.jpg` -> Foto kegiatan MTs
   - `images/ma.jpg` -> Foto kegiatan MA

3. **Cara Menggunakan di Kode HTML:**
   Cukup ganti atribut `src="..."` pada tag `<img>` atau `style="background-image: url('...')"`:
   
   Contoh:
   ```html
   <!-- Menggunakan gambar lokal -->
   <img src="images/profil.jpg" alt="Profil Pesantren" class="w-full h-full object-cover">
   ```
