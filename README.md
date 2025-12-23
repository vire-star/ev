VERCEL URL = https://ev-phi-beryl.vercel.app




✅ Phone/Email OTP Login (1234 test OTP)
✅ New User → Profile Setup (Name + Vehicle)
✅ Existing User → Direct Dashboard  
✅ User Dashboard with Name + Car Display
✅ Find CPO → Nearby stations modal (4 stations)
✅ Responsive design (Mobile + Desktop)
✅ localStorage user state management
✅ Smooth animations + gradients
✅ Logout with clean redirect



Quick start

# 1. Clone & Install
git clone <your-repo>
cd ev-charge-app
npm install

# 2. Run Development Server
npm run dev

# 3. Open http://localhost:5173


Test flow

1. Login → +91 9876543210 → OTP: 1234
2. Profile Setup → Name + Tata Nexon EV
3. Home → See "Tata Nexon EV • Your Name"
4. Find CPO → See 4 nearby stations
5. Logout → Clean login screen


project structure


src/
├── components/
│   └── LoginForm.jsx      # OTP Login UI
├── pages/
│   ├── Home.jsx          # Dashboard + CPO Modal
│   └── ProfileSetup.jsx   # Onboarding form
├── utils/
│   └── validation.js      # Input validation
└── App.jsx               # Router setup




#Responsive breakpoints

Mobile: grid-cols-2 (Cards)
Tablet: grid-cols-3  
Desktop: grid-cols-4 + max-w-6xl


Environment variables


No env vars needed (localStorage simulation)
Production: Add VITE_API_URL for real backend
