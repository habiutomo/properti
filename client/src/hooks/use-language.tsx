import { createContext, useContext, useState, ReactNode } from "react";

// Define supported languages
export type Language = "id" | "en";

// Language context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number | string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  t: (key) => key,
  formatCurrency: (amount) => `${amount}`,
});

// Translations dictionary
const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.properties": "Properti",
    "nav.investments": "Investasi",
    "nav.management": "Manajemen",
    "nav.login": "Masuk",
    "nav.register": "Daftar",
    "nav.logout": "Keluar",
    "nav.account": "Akun Saya",

    // Home Page
    "home.hero.title": "Temukan Rumah Impian Anda",
    "home.hero.subtitle": "Cari, Investasi, dan Kelola Properti dengan Mudah",
    "home.hero.cta": "Mulai Pencarian",
    "home.featured.title": "Properti Unggulan",
    "home.featured.viewAll": "Lihat Semua",
    "home.investment.title": "Peluang Investasi",
    "home.investment.subtitle": "Berinvestasi pada proyek properti dengan pengembalian menarik",
    "home.investment.cta": "Jelajahi Semua Peluang",
    "home.testimonials.title": "Apa Kata Mereka",
    "home.virtual.title": "Tur Virtual",
    "home.virtual.subtitle": "Jelajahi properti dari kenyamanan rumah Anda",
    "home.virtual.cta": "Lihat Tur",

    // Property Listing
    "property.search.placeholder": "Cari berdasarkan lokasi, tipe, dll...",
    "property.filter.title": "Filter",
    "property.filter.price": "Harga",
    "property.filter.type": "Tipe Properti",
    "property.filter.purpose": "Tujuan",
    "property.filter.bedrooms": "Kamar Tidur",
    "property.filter.bathrooms": "Kamar Mandi",
    "property.filter.apply": "Terapkan Filter",
    "property.filter.reset": "Reset",
    "property.type.house": "Rumah",
    "property.type.apartment": "Apartemen",
    "property.type.land": "Tanah",
    "property.type.commercial": "Komersial",
    "property.purpose.sale": "Dijual",
    "property.purpose.rent": "Disewa",
    "property.card.beds": "KT",
    "property.card.baths": "KM",
    "property.card.size": "Luas",
    "property.card.viewDetails": "Lihat Detail",
    "property.virtual": "Tur Virtual",

    // Property Detail
    "property.detail.description": "Deskripsi",
    "property.detail.features": "Fitur",
    "property.detail.location": "Lokasi",
    "property.detail.contact": "Hubungi Agen",
    "property.detail.book": "Pesan Sekarang",
    "property.detail.invest": "Investasi",

    // Investment Projects
    "investment.roi": "ROI",
    "investment.duration": "Durasi",
    "investment.minInvestment": "Investasi Minimum",
    "investment.target": "Target Dana",
    "investment.raised": "Terkumpul",
    "investment.location": "Lokasi",
    "investment.type": "Tipe Proyek",
    "investment.ends": "Berakhir",
    "investment.status": "Status",
    "investment.invest": "Investasi Sekarang",
    "investment.status.active": "Aktif",
    "investment.status.funded": "Terdanai",
    "investment.status.completed": "Selesai",
    
    // Forms
    "form.name": "Nama",
    "form.email": "Email",
    "form.phone": "Telepon",
    "form.message": "Pesan",
    "form.submit": "Kirim",
    "form.username": "Nama Pengguna",
    "form.password": "Kata Sandi",
    "form.confirm": "Konfirmasi Kata Sandi",
    "form.login": "Masuk",
    "form.register": "Daftar",
    "form.forgot": "Lupa Kata Sandi?",
    "form.required": "Wajib diisi",
    "form.invalid.email": "Email tidak valid",
    "form.invalid.password": "Kata sandi harus minimal 8 karakter",
    "form.password.mismatch": "Kata sandi tidak cocok",

    // Management
    "management.properties": "Properti Saya",
    "management.investments": "Investasi Saya",
    "management.tenants": "Penyewa",
    "management.payments": "Pembayaran",
    "management.add": "Tambah Properti",
    "management.edit": "Edit",
    "management.delete": "Hapus",
    "management.occupied": "Dihuni",
    "management.vacant": "Kosong",

    // General
    "general.loading": "Memuat...",
    "general.error": "Terjadi kesalahan",
    "general.retry": "Coba Lagi",
    "general.success": "Berhasil!",
    "general.welcome": "Selamat datang",
    "general.selectLanguage": "Pilih Bahasa",
    "general.currency": "IDR",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.properties": "Properties",
    "nav.investments": "Investments",
    "nav.management": "Management",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "nav.account": "My Account",

    // Home Page
    "home.hero.title": "Find Your Dream Home",
    "home.hero.subtitle": "Search, Invest, and Manage Properties with Ease",
    "home.hero.cta": "Start Searching",
    "home.featured.title": "Featured Properties",
    "home.featured.viewAll": "View All",
    "home.investment.title": "Investment Opportunities",
    "home.investment.subtitle": "Invest in property projects with attractive returns",
    "home.investment.cta": "Explore All Opportunities",
    "home.testimonials.title": "What They Say",
    "home.virtual.title": "Virtual Tours",
    "home.virtual.subtitle": "Explore properties from the comfort of your home",
    "home.virtual.cta": "View Tours",

    // Property Listing
    "property.search.placeholder": "Search by location, type, etc...",
    "property.filter.title": "Filter",
    "property.filter.price": "Price",
    "property.filter.type": "Property Type",
    "property.filter.purpose": "Purpose",
    "property.filter.bedrooms": "Bedrooms",
    "property.filter.bathrooms": "Bathrooms",
    "property.filter.apply": "Apply Filters",
    "property.filter.reset": "Reset",
    "property.type.house": "House",
    "property.type.apartment": "Apartment",
    "property.type.land": "Land",
    "property.type.commercial": "Commercial",
    "property.purpose.sale": "For Sale",
    "property.purpose.rent": "For Rent",
    "property.card.beds": "Beds",
    "property.card.baths": "Baths",
    "property.card.size": "Size",
    "property.card.viewDetails": "View Details",
    "property.virtual": "Virtual Tour",

    // Property Detail
    "property.detail.description": "Description",
    "property.detail.features": "Features",
    "property.detail.location": "Location",
    "property.detail.contact": "Contact Agent",
    "property.detail.book": "Book Now",
    "property.detail.invest": "Invest",

    // Investment Projects
    "investment.roi": "ROI",
    "investment.duration": "Duration",
    "investment.minInvestment": "Minimum Investment",
    "investment.target": "Target Amount",
    "investment.raised": "Raised",
    "investment.location": "Location",
    "investment.type": "Project Type",
    "investment.ends": "Ends",
    "investment.status": "Status",
    "investment.invest": "Invest Now",
    "investment.status.active": "Active",
    "investment.status.funded": "Funded",
    "investment.status.completed": "Completed",
    
    // Forms
    "form.name": "Name",
    "form.email": "Email",
    "form.phone": "Phone",
    "form.message": "Message",
    "form.submit": "Submit",
    "form.username": "Username",
    "form.password": "Password",
    "form.confirm": "Confirm Password",
    "form.login": "Login",
    "form.register": "Register",
    "form.forgot": "Forgot Password?",
    "form.required": "Required field",
    "form.invalid.email": "Invalid email",
    "form.invalid.password": "Password must be at least 8 characters",
    "form.password.mismatch": "Passwords do not match",

    // Management
    "management.properties": "My Properties",
    "management.investments": "My Investments",
    "management.tenants": "Tenants",
    "management.payments": "Payments",
    "management.add": "Add Property",
    "management.edit": "Edit",
    "management.delete": "Delete",
    "management.occupied": "Occupied",
    "management.vacant": "Vacant",

    // General
    "general.loading": "Loading...",
    "general.error": "An error occurred",
    "general.retry": "Retry",
    "general.success": "Success!",
    "general.welcome": "Welcome",
    "general.selectLanguage": "Select Language",
    "general.currency": "USD",
  },
};

// Currency conversion and formatting functions
const currencyRates = {
  id: 1, // Base rate for Rupiah (will convert later)
  en: 1, // Base rate for USD
};

// Language Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id");

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Function to format currency
  const formatCurrency = (amount: number | string): string => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    // If invalid number, return empty string
    if (isNaN(numAmount)) return '';
    
    // Convert to the appropriate currency
    const convertedAmount = language === 'id' 
      ? numAmount * 15500 // Convert to Rupiah (approximate rate)
      : numAmount;
    
    // Format the currency
    if (language === 'id') {
      // Format as Rupiah
      return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(convertedAmount);
    } else {
      // Format as USD
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(convertedAmount);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}