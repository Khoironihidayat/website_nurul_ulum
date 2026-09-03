const fs = require('fs');
const path = require('path');
const https = require('https');

// Define structured image folders with descriptions
const structure = {
    'images/logo': 'Simpan file logo.png atau logo.svg di sini untuk logo Pesantren di Navbar dan Footer.',
    'images/beranda': 'Foto-foto untuk Halaman Beranda (Hero banner, Tentang Kami, Fasilitas, dll).',
    'images/profil': 'Foto-foto untuk Halaman Profil & Sejarah (Gedung, Sejarah, Pengasuh/Masyayikh, Visi Misi).',
    'images/unit-tk': 'Foto-foto untuk Halaman Unit TK / RA (Kegiatan anak, kelas, sarana bermain).',
    'images/unit-mi': 'Foto-foto untuk Halaman Unit MI (Kegiatan belajar Madrasah Ibtidaiyah, tahfidz).',
    'images/unit-mts': 'Foto-foto untuk Halaman Unit MTs (Kegiatan belajar Madrasah Tsanawiyah, asrama).',
    'images/unit-ma': 'Foto-foto untuk Halaman Unit MA (Kegiatan Madrasah Aliyah, laboratorium, kelas unggulan).'
};

// Create folders and README in each
for (const [dir, desc] of Object.entries(structure)) {
    const fullDir = path.join(__dirname, dir);
    if (!fs.existsSync(fullDir)) {
        fs.mkdirSync(fullDir, { recursive: true });
    }
    fs.writeFileSync(path.join(fullDir, 'PANDUAN_FOTO.txt'), `# FOLDER: ${dir}\n\n${desc}\n\nCara mengganti:\nCukup masukkan foto baru Anda ke dalam folder ini dengan nama file yang sama (atau sesuaikan namanya di file HTML terkait).`, 'utf8');
}

// Download helper function
function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(destPath);
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                // follow redirect
                return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
            }
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => {});
            reject(err);
        });
    });
}

async function processPages() {
    const pages = [
        { file: 'index.html', folder: 'images/beranda', prefix: 'beranda' },
        { file: 'profil.html', folder: 'images/profil', prefix: 'profil' },
        { file: 'unit-tk.html', folder: 'images/unit-tk', prefix: 'tk' },
        { file: 'unit-mi.html', folder: 'images/unit-mi', prefix: 'mi' },
        { file: 'unit-mts.html', folder: 'images/unit-mts', prefix: 'mts' },
        { file: 'unit-ma.html', folder: 'images/unit-ma', prefix: 'ma' }
    ];

    for (const p of pages) {
        let content = fs.readFileSync(p.file, 'utf8');
        const urlMatches = content.match(/https:\/\/lh3\.googleusercontent\.com\/[^\s'"\)<>]+/g) || [];
        const uniqueUrls = Array.from(new Set(urlMatches));
        console.log(`Processing ${p.file}: found ${uniqueUrls.length} images`);

        let idx = 1;
        for (const url of uniqueUrls) {
            let imgName = `${p.prefix}-foto-${idx}.jpg`;
            if (idx === 1 && (p.prefix === 'beranda' || p.prefix === 'tk' || p.prefix === 'mi' || p.prefix === 'mts' || p.prefix === 'ma')) {
                imgName = `${p.prefix}-hero-banner.jpg`;
            } else if (idx === 2 && p.prefix === 'beranda') {
                imgName = 'beranda-tentang-kami.jpg';
            }

            const localRelPath = `${p.folder}/${imgName}`.replace(/\\/g, '/');
            const destPath = path.join(__dirname, p.folder, imgName);

            try {
                console.log(`Downloading -> ${destPath}`);
                await downloadFile(url, destPath);
                // Replace in content
                content = content.split(url).join(localRelPath);
            } catch (e) {
                console.error(`Failed to download ${url}:`, e.message);
            }
            idx++;
        }

        fs.writeFileSync(p.file, content, 'utf8');
        console.log(`Updated ${p.file} to use local paths.`);
    }

    console.log('All images downloaded and organized into folders successfully!');
}

processPages();
