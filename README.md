# PropertyHub - All-in-One Real Estate Platform

PropertyHub adalah platform real estate yang menyediakan fitur lengkap untuk mengelola properti, investasi, dan manajemen properti. Proyek ini dibangun menggunakan teknologi modern seperti React, TypeScript, dan Express.
![Deskripsi Gambar](1.png)
## Fitur

- **Manajemen Properti**: Tambah, edit, dan hapus properti.
- **Investasi Properti**: Jelajahi proyek investasi properti.
- **Dashboard Manajemen**: Kelola properti dengan mudah.
- **Mock Data**: Mendukung data properti dan investasi mock untuk pengembangan.
- **UI Modern**: Menggunakan Tailwind CSS untuk desain responsif dan modern.

## Struktur Proyek

```
.
├── client/                 # Frontend aplikasi
│   ├── src/
│   │   ├── components/     # Komponen UI
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Library utilitas
│   │   ├── pages/          # Halaman aplikasi
│   │   ├── App.tsx         # Entry point aplikasi React
│   │   └── main.tsx        # File utama React
│   ├── index.html          # Template HTML
│   └── index.css           # Gaya global
├── server/                 # Backend aplikasi
│   ├── auth.ts             # Middleware autentikasi
│   ├── db.ts               # Koneksi database
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Implementasi storage
│   └── vite.ts             # Konfigurasi Vite untuk server
├── shared/                 # Schema yang digunakan bersama
├── vite.config.ts          # Konfigurasi Vite
└── package.json            # Dependensi proyek
```

## Teknologi yang Digunakan

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express, TypeScript
- **Database**: Drizzle ORM
- **Build Tools**: Vite

## Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/propertyhub.git
   cd propertyhub
   ```

2. Install dependensi:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

4. Akses aplikasi di [http://localhost:5000](http://localhost:5000).

## Skrip NPM

- `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
- `npm run build`: Membuild aplikasi untuk produksi.
- `npm run start`: Menjalankan aplikasi dalam mode produksi.

## Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk diskusi lebih lanjut.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.
```

Anda dapat menyesuaikan README ini sesuai kebutuhan proyek Anda.
Anda dapat menyesuaikan README ini sesuai kebutuhan proyek Anda.