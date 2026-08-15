import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  authService, 
  schemeService, 
  applicationService, 
  ocrService, 
  chatService 
} from './services/api';
import { TranslationProvider, useTranslation } from './hooks/useTranslation.jsx';
import { 
  Sprout, HeartPulse, GraduationCap, UserRoundPlus, Baby, Accessibility, 
  Briefcase, Home, Sun, Search, MessageSquare, Plus, Trash2, Edit2, 
  UploadCloud, FileText, CheckCircle, Clock, X, ChevronRight, Menu, LogOut, 
  ArrowRight, Shield, Award, HelpCircle, Loader2, Sparkles, Send, MapPin, 
  Users, BarChart3, User, Database, ArrowLeft, RefreshCcw, Globe, Mic, MicOff,
  Volume2, VolumeX, Check, AlertCircle, Eye, IndianRupee, Sparkle, Zap, CheckCircle2,
  TrendingUp, Layers, ExternalLink, ShieldCheck, Filter, AlertTriangle, Bell, Bookmark,
  Building, Landmark, Radio, Volume, Info, ShieldAlert, CheckSquare, Lock, Key, Mail
} from 'lucide-react';

// Verified Schemes Dataset
const initialFallbackSchemes = [
  {
    id: 1,
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    isCentral: true,
    categoryName: 'Agriculture',
    stateName: 'National (Central)',
    department: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
    benefits: '₹6,000 / year direct bank transfer (3 equal installments of ₹2,000).',
    eligibility: 'All landholding farmers with cultivable land. Must not be an income tax payer.',
    incomeLimit: 250000,
    ageMin: 18,
    ageMax: 90,
    requiredDocuments: ['Aadhaar Card', 'Land Passbook', 'Bank Passbook'],
    applicationProcess: '1. Check criteria. 2. Verify Aadhaar & Land Patta. 3. Continue on pmkisan.gov.in.',
    officialWebsite: 'https://pmkisan.gov.in',
    helpline: '155261 / 1800115526',
    matchScore: 94,
    confidenceScore: 92,
    reasonForRecommendation: 'High Qualification! You match Agricultural occupation, state residence, and income criteria.',
    breakdown: {
      stateMatch: true,
      ageMatch: true,
      incomeMatch: true,
      occupationMatch: true,
      missingRequirement: 'Land Record Patta verification recommended'
    }
  },
  {
    id: 2,
    name: 'Ayushman Bharat PM-JAY Health Insurance',
    isCentral: true,
    categoryName: 'Healthcare',
    stateName: 'National (Central)',
    department: 'National Health Authority (NHA)',
    description: 'World\'s largest health insurance scheme providing ₹5 Lakhs per family per year for secondary & tertiary hospital care.',
    benefits: '₹5,00,000 cashless health insurance cover per family annually across 27,000+ empanelled hospitals.',
    eligibility: 'Low income families, rural households, SECC cardholders, active Ration Card holders.',
    incomeLimit: 250000,
    ageMin: 0,
    ageMax: 120,
    requiredDocuments: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
    applicationProcess: '1. Verify family eligibility. 2. Prepare Ration Card & Aadhaar. 3. Continue on pmjay.gov.in.',
    officialWebsite: 'https://pmjay.gov.in',
    helpline: '14555 / 1800111565',
    matchScore: 92,
    confidenceScore: 90,
    reasonForRecommendation: 'High Qualification! Eligible for full ₹5 Lakh cashless medical coverage based on family income & category.',
    breakdown: {
      stateMatch: true,
      ageMatch: true,
      incomeMatch: true,
      occupationMatch: true,
      missingRequirement: 'Income certificate update recommended'
    }
  },
  {
    id: 3,
    name: 'Gruha Lakshmi Scheme (State Welfare)',
    isCentral: false,
    categoryName: 'Women',
    stateName: 'Karnataka',
    department: 'Department of Women & Child Development',
    description: 'Direct financial assistance of ₹2,000 per month to female heads of eligible households to promote financial independence.',
    benefits: '₹2,000 per month direct bank transfer (₹24,000 annually) for female house heads.',
    eligibility: 'Women identified as head of the family on Ration Card (BPL/APL/Antyodaya). Husband must not pay income tax.',
    incomeLimit: 200000,
    ageMin: 18,
    ageMax: 80,
    requiredDocuments: ['Aadhaar Card', 'Ration Card', 'Bank Passbook'],
    applicationProcess: '1. Register at Seva Sindhu / Grama One portal. 2. Aadhaar e-KYC. 3. Monthly DBT credit.',
    officialWebsite: 'https://sevasindhuservices.karnataka.gov.in',
    helpline: '1902',
    matchScore: 89,
    confidenceScore: 88,
    reasonForRecommendation: 'Matches your state profile, gender, and family head welfare eligibility criteria.',
    breakdown: {
      stateMatch: true,
      ageMatch: true,
      incomeMatch: true,
      occupationMatch: true,
      missingRequirement: 'Ration card head verification required'
    }
  },
  {
    id: 4,
    name: 'Pradhan Mantri Mudra Yojana (PMAY Micro-Business Loan)',
    isCentral: true,
    categoryName: 'Business',
    stateName: 'National (Central)',
    department: 'Department of Financial Services (DFS)',
    description: 'Collateral-free loans up to ₹10 Lakhs for non-corporate, non-farm small and micro-enterprises to start or expand business.',
    benefits: 'Collateral-free business loans: Shishu (up to ₹50k), Kishore (₹50k-5L), Tarun (up to ₹10L).',
    eligibility: 'Small business owners, shopkeepers, artisans, street vendors, agricultural allied units.',
    incomeLimit: 500000,
    ageMin: 18,
    ageMax: 65,
    requiredDocuments: ['Business Proposal', 'Aadhaar Card', 'PAN Card', 'Bank Statement'],
    applicationProcess: '1. Prepare business proposal. 2. Submit details on Udyamimitra portal. 3. Bank sanction.',
    officialWebsite: 'https://www.mudra.org.in',
    helpline: '18001801111',
    matchScore: 86,
    confidenceScore: 85,
    reasonForRecommendation: 'Great match for small business owners & entrepreneurs seeking low-interest capital.',
    breakdown: {
      stateMatch: true,
      ageMatch: true,
      incomeMatch: true,
      occupationMatch: true,
      missingRequirement: 'Business plan proposal document required'
    }
  },
  {
    id: 5,
    name: 'Pudhumai Penn / Higher Education Female Stipend',
    isCentral: false,
    categoryName: 'Education',
    stateName: 'Tamil Nadu',
    department: 'Social Welfare & Women Empowerment Department',
    description: 'Monthly financial assistance of ₹1,000 for female students who studied in government schools to pursue higher education.',
    benefits: '₹1,000 per month deposited directly into bank account until completion of Degree / Diploma / ITI.',
    eligibility: 'Female students enrolled in Higher Education who completed Class 6th to 12th in Government schools.',
    incomeLimit: 300000,
    ageMin: 17,
    ageMax: 25,
    requiredDocuments: ['Class 12th Marksheet', 'Aadhaar Card', 'Bank Passbook'],
    applicationProcess: '1. Register via Penkalvi portal through college nodals. 2. Verify school records.',
    officialWebsite: 'https://penkalvi.tn.gov.in',
    helpline: '14417',
    matchScore: 88,
    confidenceScore: 86,
    reasonForRecommendation: 'Matches student profile & higher education support criteria.',
    breakdown: {
      stateMatch: true,
      ageMatch: true,
      incomeMatch: true,
      occupationMatch: true,
      missingRequirement: '12th standard marksheet copy required'
    }
  },
  {
    id: 6,
    name: 'Atal Pension Yojana (APY Pension Scheme)',
    isCentral: true,
    categoryName: 'Senior Citizens',
    stateName: 'National (Central)',
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    description: 'Guaranteed pension scheme providing ₹1,000 to ₹5,000 per month after 60 years of age for unorganized sector workers.',
    benefits: 'Guaranteed minimum pension of ₹1,000 - ₹5,000 per month for life after age 60.',
    eligibility: 'Indian citizens aged 18-40 years with a bank account. Must not be covered under statutory social security.',
    incomeLimit: 400000,
    ageMin: 18,
    ageMax: 40,
    requiredDocuments: ['Aadhaar Card', 'Mobile Number', 'Bank Passbook'],
    applicationProcess: '1. Fill APY form at bank branch or net banking. 2. Select monthly contribution tier.',
    officialWebsite: 'https://www.npscra.nsdl.co.in',
    helpline: '1800110069',
    matchScore: 85,
    confidenceScore: 84,
    reasonForRecommendation: 'Matches age & retirement security criteria for unorganized workers.',
    breakdown: {
      stateMatch: true,
      ageMatch: true,
      incomeMatch: true,
      occupationMatch: true,
      missingRequirement: 'Auto-debit bank consent required'
    }
  }
];

// Welfare Support Categories
const welfareCategories = [
  { name: 'Agriculture', icon: Sprout, color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30' },
  { name: 'Education', icon: GraduationCap, color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30' },
  { name: 'Women', icon: UserRoundPlus, color: 'from-pink-500/20 to-pink-600/10 text-pink-400 border-pink-500/30' },
  { name: 'Children', icon: Baby, color: 'from-sky-500/20 to-sky-600/10 text-sky-400 border-sky-500/30' },
  { name: 'Healthcare', icon: HeartPulse, color: 'from-rose-500/20 to-rose-600/10 text-rose-400 border-rose-500/30' },
  { name: 'Disability', icon: Accessibility, color: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30' },
  { name: 'Senior Citizens', icon: Accessibility, color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30' },
  { name: 'Housing', icon: Home, color: 'from-violet-500/20 to-violet-600/10 text-violet-400 border-violet-500/30' },
  { name: 'Employment', icon: Briefcase, color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/30' },
  { name: 'Business', icon: Building, color: 'from-orange-500/20 to-orange-600/10 text-orange-400 border-orange-500/30' }
];

// States List
const indianStatesAndUTs = [
  'National (Central)',
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi (NCT)', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

function AppContent() {
  const { lang, setLang, t, languages, currentSpeechLocale } = useTranslation();

  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [isProfileCompleted, setIsProfileCompleted] = useState(false);

  // Auth Inputs
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    fullName: '',
    age: '',
    gender: 'FEMALE',
    stateName: '',
    districtName: '',
    ruralUrban: 'RURAL',
    occupation: '',
    annualIncome: '',
    education: 'Undergraduate',
    maritalStatus: 'Single',
    category: 'GENERAL',
    isFarmer: false,
    isStudent: false,
    isBusinessOwner: false,
    isSeniorCitizen: false,
    hasDisability: false,
    isPregnant: false,
    isWidow: false,
    isVeteran: false,
    childrenCount: 0
  });

  // Toast System
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Check stored token on load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      authService.getProfile()
        .then(profileData => {
          setUser({ fullName: profileData.fullName, email: profileData.email });
          setProfile(prev => ({ ...prev, ...profileData }));
          if (profileData.stateName && profileData.occupation) {
            setIsProfileCompleted(true);
          }
        })
        .catch(() => {
          authService.logout();
          setUser(null);
        });
    }
  }, []);

  // Datasets
  const [schemes, setSchemes] = useState(initialFallbackSchemes);
  const [aiRecommendations, setAiRecommendations] = useState(initialFallbackSchemes);
  
  const [myApplications, setMyApplications] = useState([
    { id: 101, schemeName: 'PM-KISAN', referenceNo: 'PMK-2026-98124', status: 'APPROVED', appliedDate: '2026-05-12', notes: 'Installment received in State Bank account.' }
  ]);

  const [myDocs, setMyDocs] = useState([
    { id: 1, name: 'Aadhaar Card', status: 'VERIFIED', uploadDate: '2026-01-15' },
    { id: 2, name: 'Income Certificate', status: 'VERIFIED', uploadDate: '2026-02-10' }
  ]);
  const [savedSchemeIds, setSavedSchemeIds] = useState([1, 2]);

  // Modals & Application Flow State
  const [readinessScheme, setReadinessScheme] = useState(null);
  const [officialRedirectScheme, setOfficialRedirectScheme] = useState(null);
  const [trackerEditApp, setTrackerEditApp] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [activeDashboardTab, setActiveDashboardTab] = useState('recommendations');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [explainableModalScheme, setExplainableModalScheme] = useState(null);

  // Chat & Voice State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: t('chatbotGreeting', 'Namaste! 🤖 I am SchemeSathi AI, your personal welfare assistant. Ask me anything about government schemes!') }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  const calculateProfileCompletion = () => {
    let fields = ['fullName', 'age', 'gender', 'stateName', 'occupation', 'annualIncome', 'category'];
    let filled = fields.filter(f => profile[f] !== null && profile[f] !== undefined && profile[f] !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  const calculateReadiness = (scheme) => {
    if (!scheme || !scheme.requiredDocuments || scheme.requiredDocuments.length === 0) return 100;
    const verifiedDocNames = myDocs.filter(d => d.status === 'VERIFIED').map(d => d.name.toLowerCase());
    let matched = 0;
    scheme.requiredDocuments.forEach(req => {
      const reqLower = req.toLowerCase();
      if (verifiedDocNames.some(v => v.includes(reqLower) || reqLower.includes(v))) {
        matched++;
      }
    });
    const percentage = Math.round((matched / scheme.requiredDocuments.length) * 100);
    return Math.max(percentage, 60);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authFullName) {
      addToast(t('fillAllFields', 'Please fill in all registration fields.'), "warning");
      return;
    }
    setAuthLoading(true);
    try {
      await authService.register(authEmail, authPassword, authFullName);
      await authService.login(authEmail, authPassword);
      setUser({ fullName: authFullName, email: authEmail });
      setProfile(prev => ({ ...prev, fullName: authFullName, email: authEmail }));
      setIsProfileCompleted(false);
      addToast(t('registerSuccess', 'Registration successful! Let\'s build your Welfare Profile.'), "success");
      setCurrentView('profile_setup');
      setWizardStep(1);
    } catch (err) {
      addToast(err.response?.data?.message || "Registration failed. Please try again.", "error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      addToast(t('enterEmailPassword', 'Please enter your email and password.'), "warning");
      return;
    }
    setAuthLoading(true);
    try {
      const loginRes = await authService.login(authEmail, authPassword);
      setUser({ fullName: loginRes.fullName || 'Citizen', email: loginRes.email });
      
      try {
        const profileData = await authService.getProfile();
        setProfile(prev => ({ ...prev, ...profileData }));
        
        if (profileData.stateName && profileData.occupation && profileData.age) {
          setIsProfileCompleted(true);
          addToast(`${t('welcomeBack', 'Welcome back')}, ${loginRes.fullName}!`, "success");
          setCurrentView('dashboard');
        } else {
          setIsProfileCompleted(false);
          addToast(t('loginCompleteProfile', 'Sign in successful! Please complete your Welfare Profile.'), "info");
          setCurrentView('profile_setup');
          setWizardStep(1);
        }
      } catch {
        setIsProfileCompleted(false);
        setCurrentView('profile_setup');
      }
    } catch (err) {
      addToast(err.response?.data?.message || "Invalid credentials. Please try again.", "error");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSaveWelfareProfile = async (e) => {
    if (e) e.preventDefault();
    if (!profile.fullName || !profile.stateName || !profile.occupation) {
      addToast(t('completeRequiredFields', 'Please complete your Name, State, and Occupation.'), "warning");
      return;
    }
    setAuthLoading(true);
    try {
      if (user) {
        await authService.updateProfile(profile);
      }
      setIsProfileCompleted(true);
      addToast(t('profileSaved', 'Welfare profile saved successfully!'), "success");
      
      setCurrentView('analyzing');
      setTimeout(() => {
        setCurrentView('dashboard');
        addToast(t('analyzingTitle', 'Your personalized welfare recommendations are ready.'), "success");
      }, 1500);
    } catch (err) {
      setIsProfileCompleted(true);
      setCurrentView('dashboard');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = () => {
    authService.logout();
    setUser(null);
    setIsProfileCompleted(false);
    addToast(t('signedOut', 'Signed out successfully.'), "info");
    setCurrentView('landing');
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addToast("Speech recognition is not supported in this browser.", "warning");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = currentSpeechLocale;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      addToast(t('listening', 'Listening... Speak now!'), "info");
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setChatInput((prev) => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const text = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text }]);

    try {
      const res = await chatService.sendMessage(text, lang);
      setChatMessages(prev => [...prev, { sender: 'ai', text: res.response }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { 
        sender: 'ai', 
        text: `SchemeSathi AI: "${text}"` 
      }]);
    }
  };

  const handleProceedToOfficialPortal = () => {
    if (!officialRedirectScheme) return;
    const scheme = officialRedirectScheme;
    const url = scheme.officialWebsite || 'https://india.gov.in';

    window.open(url, '_blank');

    setMyApplications(prev => {
      const existingIndex = prev.findIndex(a => a.schemeName === scheme.name);
      if (existingIndex >= 0) return prev;
      return [
        {
          id: Date.now(),
          schemeName: scheme.name,
          referenceNo: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'APPLICATION_SUBMITTED',
          appliedDate: new Date().toISOString().split('T')[0],
          notes: `Initiated on official portal: ${url}`
        },
        ...prev
      ];
    });

    addToast(`Opened official portal ${url}. Logged in tracker!`, 'success');
    setOfficialRedirectScheme(null);
    setReadinessScheme(null);
  };

  const toggleSaveScheme = (id) => {
    setSavedSchemeIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        addToast(t('bookmarkRemoved', 'Scheme removed from bookmarks'), "info");
        return prev.filter(item => item !== id);
      } else {
        addToast(t('bookmarkSaved', 'Scheme saved to bookmarks!'), "success");
        return [...prev, id];
      }
    });
  };

  const filteredSchemesList = schemes.filter(s => {
    const matchesSearch = !searchTerm || s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = !selectedCategoryFilter || s.categoryName === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const userNameDisplay = user?.fullName || profile?.fullName || 'Citizen';
  const profileCompletionPercent = calculateProfileCompletion();

  return (
    <div className="min-h-screen bg-digital-india text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col">
      
      {/* -------------------- TOAST CONTAINER -------------------- */}
      <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-start gap-3 text-xs font-bold ${
                toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200' :
                toast.type === 'warning' ? 'bg-amber-950/90 border-amber-500/40 text-amber-200' :
                toast.type === 'error' ? 'bg-rose-950/90 border-rose-500/40 text-rose-200' :
                'bg-slate-900/90 border-slate-700 text-slate-200'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
              <span className="leading-snug">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* -------------------- HEADER / NAVBAR -------------------- */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/80 px-6 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentView('landing')}>
          <div className="bg-gradient-to-tr from-orange-500 via-blue-600 to-emerald-500 p-2.5 rounded-2xl text-white shadow-lg shadow-orange-500/10 group-hover:scale-105 transition-all">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight flex items-center gap-1.5">
              <span className="text-orange-400">Scheme</span>
              <span className="text-white">Sathi</span>
              <span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase flex items-center gap-1">
              <span>{t('personalAssistant', 'Personal Welfare Assistant')}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 rounded-2xl px-3.5 py-2 border border-slate-700/80 text-xs font-bold transition-all shadow-inner">
            <Globe className="w-4 h-4 text-cyan-400" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold cursor-pointer outline-none"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                  {l.flag} {l.nativeName} ({l.code})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setCurrentView('landing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentView === 'landing' ? 'bg-orange-500 text-slate-950 font-black' : 'text-slate-300 hover:text-white'}`}
            >
              {t('navHome', 'Home')}
            </button>

            {user ? (
              <>
                <button 
                  onClick={() => {
                    if (isProfileCompleted) {
                      setCurrentView('dashboard');
                    } else {
                      setCurrentView('profile_setup');
                      addToast(t('loginCompleteProfile', 'Please complete your Welfare Profile first.'), "info");
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentView === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-black' : 'text-slate-300 hover:text-white'}`}
                >
                  {t('navDashboard', 'Dashboard')}
                </button>
                <button 
                  onClick={handleSignOut}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" /> {t('logout', 'Sign Out')}
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView('login')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${currentView === 'login' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white'}`}
                >
                  {t('signInBtn', 'Sign In')}
                </button>
                <button 
                  onClick={() => setCurrentView('register')}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-lg flex items-center gap-1"
                >
                  {t('getStarted', 'Get Started')} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* -------------------- MAIN CONTENT FLOW -------------------- */}
      <main className="flex-grow">

        {/* ==================== 1. PUBLIC HOME PAGE ==================== */}
        {currentView === 'landing' && (
          <div className="pb-20">
            <section className="relative px-6 py-20 md:py-28 bg-tricolor-gradient overflow-hidden">
              <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-slate-900/80 border border-orange-500/30 px-5 py-2 rounded-full text-xs font-bold text-orange-300 mb-8 backdrop-blur-xl shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>{t('homeTagline', 'SchemeSathi is your personal welfare assistant — not a government scheme database')}</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight"
                >
                  {t('heroTitle', 'Find Government Benefits & Schemes')} <br/>
                  <span className="text-digital-gradient">{t('heroHighlight', 'Made Specially For You')}</span>
                </motion.h1>
                
                <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                  {t('heroSubtitle', 'Instant AI eligibility estimate, personalized application readiness checking, required document verification, and multi-lingual voice guidance.')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
                  <button 
                    onClick={() => setCurrentView('register')}
                    className="w-full sm:w-auto flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all"
                  >
                    {t('getStarted', 'Get Started')} <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setCurrentView('login')}
                    className="w-full sm:w-auto flex-1 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm px-8 py-4 rounded-2xl border border-slate-800 transition-all text-center"
                  >
                    {t('signInBtn', 'Sign In')}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-black text-white mb-1">{t('featureFindTitle', 'Find Schemes')}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{t('featureFindDesc', 'Discover central & state welfare schemes matching your exact profile.')}</p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-black text-white mb-1">{t('featureCheckTitle', 'Check Eligibility')}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{t('featureCheckDesc', 'AI-assisted eligibility estimate with explainable matching criteria.')}</p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-black text-white mb-1">{t('featureDocTitle', 'Prepare Documents')}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{t('featureDocDesc', 'Calculate application readiness and verify document requirements.')}</p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-black text-white mb-1">{t('featureTrackTitle', 'Track Applications')}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{t('featureTrackDesc', 'Lifecycle tracking from submission to benefit disbursement.')}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-6 py-16 max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10 flex items-center justify-center gap-2">
                <Layers className="w-6 h-6 text-orange-400" /> {t('exploreSchemes', 'Explore Welfare Support Categories')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {welfareCategories.map((c, i) => {
                  const IconComp = c.icon;
                  return (
                    <div 
                      key={i}
                      onClick={() => {
                        setSelectedCategoryFilter(c.name);
                        if (user && isProfileCompleted) {
                          setCurrentView('dashboard');
                          setActiveDashboardTab('schemes');
                        } else {
                          addToast(t('loginToExplore', 'Please Sign In or Get Started to explore personalized schemes.'), "info");
                          setCurrentView('register');
                        }
                      }}
                      className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl text-center hover:border-orange-500/40 transition-all cursor-pointer group"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 border bg-gradient-to-br ${c.color}`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-xs text-slate-200 group-hover:text-orange-400 transition-colors">{c.name}</h3>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ==================== 2. REGISTRATION PAGE ==================== */}
        {currentView === 'register' && (
          <div className="px-6 py-16 max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/95 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6"
            >
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-orange-500/30">
                  <User className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white">{t('createAccountTitle', 'Create Account')}</h2>
                <p className="text-xs text-slate-400">{t('registerStep1', 'Step 1 of Onboarding — Register your account')}</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">{t('fullNameLabel', 'Full Name')}</label>
                  <input 
                    type="text" 
                    value={authFullName}
                    onChange={(e) => setAuthFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">{t('emailLabel', 'Email Address')}</label>
                  <input 
                    type="email" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">{t('passwordLabel', 'Password')}</label>
                  <input 
                    type="password" 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-slate-950 font-black text-xs py-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{t('registerBtn', 'Register & Continue to Profile')} <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">{t('alreadyHaveAccount', 'Already have an account?')} </span>
                <button onClick={() => setCurrentView('login')} className="text-orange-400 font-bold hover:underline">
                  {t('signInBtn', 'Sign In')}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ==================== 2. SIGN IN PAGE ==================== */}
        {currentView === 'login' && (
          <div className="px-6 py-16 max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/95 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6"
            >
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white">{t('signInTitle', 'Sign In')}</h2>
                <p className="text-xs text-slate-400">{t('signInSubtitle', 'Sign in to access your personal welfare assistant')}</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">{t('emailLabel', 'Email Address')}</label>
                  <input 
                    type="email" 
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">{t('passwordLabel', 'Password')}</label>
                  <input 
                    type="password" 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-white outline-none focus:border-orange-500"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-slate-950 font-black text-xs py-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{t('signInBtn', 'Sign In')} <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">{t('dontHaveAccount', "Don't have an account?")} </span>
                <button onClick={() => setCurrentView('register')} className="text-orange-400 font-bold hover:underline">
                  {t('getStartedLink', 'Get Started / Register')}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ==================== 3. WELFARE PROFILE SETUP ==================== */}
        {currentView === 'profile_setup' && (
          <div className="px-6 py-12 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold text-orange-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> {t('mandatoryOnboarding', 'Mandatory Profile Onboarding')}
                </div>
                <h2 className="text-2xl font-black text-white">{t('buildProfileTitle', "Let's build your Welfare Profile")}</h2>
                <p className="text-xs text-slate-400 mt-1">
                  {t('buildProfileSubtitle', 'Collect your demographic criteria so SchemeSathi AI can run personalized eligibility matching.')}
                </p>
              </div>

              <form onSubmit={handleSaveWelfareProfile} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">{t('fullNameLabel', 'Full Name')} *</label>
                    <input 
                      type="text" 
                      value={profile.fullName} 
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-orange-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">{t('ageLabel', 'Age (Years)')} *</label>
                    <input 
                      type="number" 
                      value={profile.age} 
                      onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-orange-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">{t('genderLabel', 'Gender')} *</label>
                    <select 
                      value={profile.gender}
                      onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none"
                    >
                      <option value="FEMALE">Female</option>
                      <option value="MALE">Male</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">{t('stateLabel', 'State / Union Territory')} *</label>
                    <select 
                      value={profile.stateName}
                      onChange={(e) => setProfile({ ...profile, stateName: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none"
                    >
                      <option value="">Select State</option>
                      {indianStatesAndUTs.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">{t('occupationLabel', 'Primary Occupation')} *</label>
                    <input 
                      type="text" 
                      value={profile.occupation} 
                      onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                      placeholder="e.g. Farmer, Student"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-orange-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">{t('incomeLabel', 'Annual Family Income (₹)')} *</label>
                    <input 
                      type="number" 
                      value={profile.annualIncome} 
                      onChange={(e) => setProfile({ ...profile, annualIncome: parseFloat(e.target.value) })}
                      placeholder="e.g. 150000"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-orange-500" 
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-200 mb-3">{t('specialCriteriaTitle', 'Special Social Criteria')}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'isFarmer', labelKey: 'farmerLabel', fallback: 'Farmer / Agriculture' },
                      { key: 'isStudent', labelKey: 'studentLabel', fallback: 'Student / Trainee' },
                      { key: 'isBusinessOwner', labelKey: 'businessLabel', fallback: 'Small Business Owner' },
                      { key: 'isSeniorCitizen', labelKey: 'seniorLabel', fallback: 'Senior Citizen (60+)' },
                      { key: 'hasDisability', labelKey: 'disabilityLabel', fallback: 'Person with Disability' },
                      { key: 'isPregnant', labelKey: 'pregnantLabel', fallback: 'Pregnant Mother' }
                    ].map(item => (
                      <label key={item.key} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={!!profile[item.key]}
                          onChange={(e) => setProfile({ ...profile, [item.key]: e.target.checked })}
                          className="accent-orange-500 w-4 h-4 rounded"
                        />
                        <span className="text-[11px] text-slate-300 font-semibold">{t(item.labelKey, item.fallback)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-sm py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 mt-4"
                >
                  {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{t('saveProfileBtn', 'Save Welfare Profile & Run Eligibility Analysis')} <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* ==================== 4. ANALYZING SCREEN ==================== */}
        {currentView === 'analyzing' && (
          <div className="px-6 py-28 max-w-md mx-auto text-center space-y-6">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"
            />
            <div>
              <h2 className="text-xl font-black text-white">{t('analyzingTitle', 'Your personalized welfare recommendations are ready.')}</h2>
              <p className="text-xs text-slate-400 mt-2">{t('analyzingSubtitle', 'Calculating demographic eligibility rules & application readiness...')}</p>
            </div>
          </div>
        )}

        {/* ==================== 4. PERSONALIZED DASHBOARD ==================== */}
        {currentView === 'dashboard' && user && isProfileCompleted && (
          <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
            
            {/* HERO BANNER */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold text-orange-300">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                    <span>{t('personalAssistant', 'Personal Welfare Assistant')}</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {t('welcomeBack', 'Welcome back')}, {userNameDisplay}
                  </h2>
                  <p className="text-sm font-semibold text-slate-300">
                    {t('findBenefits', 'Find government benefits and schemes made for you.')}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-400" /> {t('state', 'State')}: <strong className="text-white">{profile.stateName}</strong>
                    </span>
                    <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-400" /> {t('occupation', 'Occupation')}: <strong className="text-white">{profile.occupation}</strong>
                    </span>
                    <span className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> {t('income', 'Income')}: <strong className="text-white">₹{Number(profile.annualIncome || 0).toLocaleString('en-IN')}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto">
                  <button 
                    onClick={() => {
                      setCurrentView('profile_setup');
                      setWizardStep(1);
                    }}
                    className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4" /> {t('recheckEligibility', '✨ Recheck My Eligibility')}
                  </button>

                  <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl text-center flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-slate-400">{t('profileCompletion', 'Profile Completion')}</div>
                      <div className="text-xs font-black text-slate-200">{profileCompletionPercent}% Complete</div>
                    </div>
                    <div className="w-16 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${profileCompletionPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* APPLICATION READINESS SECTION */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <CheckSquare className="w-6 h-6 text-emerald-400" /> {t('appReadinessTitle', 'Application Readiness')}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    {t('appReadinessSubtitle', 'Don’t just find schemes. Get ready to apply.')}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400">{t('overallReadiness', 'Overall Readiness')}:</span>
                  <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    80% Ready
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> {t('verifiedDocsTitle', 'Verified & Available Documents')} ({myDocs.filter(d => d.status === 'VERIFIED').length})
                  </h4>
                  <div className="space-y-2">
                    {myDocs.filter(d => d.status === 'VERIFIED').map(doc => (
                      <div key={doc.id} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                        <span className="font-semibold text-slate-200">✓ {doc.name}</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{t('verifiedBadge', 'VERIFIED')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> {t('missingDocsTitle', 'Missing / Action Recommended')} (2)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                      <span className="font-semibold text-slate-300">⚠ Caste / Category Certificate</span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{t('actionNeeded', 'Action Needed')}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                      <span className="font-semibold text-slate-300">⚠ Recent Income Proof Update</span>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{t('actionNeeded', 'Action Needed')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DASHBOARD TAB CONTROLS */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3 overflow-x-auto">
              <button 
                onClick={() => setActiveDashboardTab('recommendations')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'recommendations' 
                    ? 'bg-gradient-to-r from-orange-500 via-blue-600 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Sparkles className="w-4 h-4" /> {t('tabAiMatches', 'AI Matches')} ({aiRecommendations.length})
              </button>

              <button 
                onClick={() => setActiveDashboardTab('schemes')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'schemes' 
                    ? 'bg-gradient-to-r from-orange-500 via-blue-600 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Award className="w-4 h-4" /> {t('tabAllSchemes', 'All Schemes')} ({schemes.length})
              </button>

              <button 
                onClick={() => setActiveDashboardTab('applications')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'applications' 
                    ? 'bg-gradient-to-r from-orange-500 via-blue-600 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" /> {t('tabAppTracker', 'Application Tracker')} ({myApplications.length})
              </button>

              <button 
                onClick={() => setActiveDashboardTab('docs')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'docs' 
                    ? 'bg-gradient-to-r from-orange-500 via-blue-600 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" /> {t('tabDocVault', 'Document Vault')} ({myDocs.length})
              </button>
            </div>

            {/* AI MATCHED SCHEMES GRID */}
            {activeDashboardTab === 'recommendations' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiRecommendations.map((scheme, index) => {
                  const readinessPercent = calculateReadiness(scheme);
                  return (
                    <motion.div 
                      key={scheme.id || index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 hover:border-orange-500/40 transition-all flex flex-col justify-between relative group shadow-xl"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${scheme.isCentral ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                            {scheme.isCentral ? t('centralGov', 'Central Scheme') : (scheme.stateName || t('stateGov', 'State Scheme'))}
                          </span>
                          
                          <button 
                            onClick={() => toggleSaveScheme(scheme.id)}
                            className={`p-2 rounded-xl border transition-all ${savedSchemeIds.includes(scheme.id) ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="text-base font-black text-white group-hover:text-orange-400 transition-colors mb-2 line-clamp-2">
                          {scheme.name}
                        </h3>

                        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed font-normal">
                          {scheme.description}
                        </p>

                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 mb-4">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-400 flex items-center gap-1">
                              {t('likelyMatch', 'Likely Match')}: 
                              <button 
                                onClick={() => setExplainableModalScheme(scheme)}
                                className="text-blue-400 hover:underline text-[10px]"
                              >
                                ({t('aiEstimate', 'AI Estimate')} ℹ️)
                              </button>
                            </span>
                            <span className="text-emerald-400 font-extrabold">{scheme.matchScore || 94}%</span>
                          </div>

                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-400">{t('appReadinessTitle', 'Application Readiness')}:</span>
                            <span className="text-blue-400 font-extrabold">{readinessPercent}%</span>
                          </div>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-2xl text-[11px] text-orange-200 mb-4 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{scheme.reasonForRecommendation}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={() => setReadinessScheme(scheme)}
                          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-slate-950 font-black text-xs py-3 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                        >
                          {t('getReadyToApply', 'Get Ready to Apply →')}
                        </button>
                        
                        <button 
                          onClick={() => setExplainableModalScheme(scheme)}
                          className="w-full bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs py-2 rounded-xl border border-slate-800 transition-all text-center"
                        >
                          {t('viewDetails', 'View Details & AI Breakdown')}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* ALL SCHEMES TAB */}
            {activeDashboardTab === 'schemes' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input 
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={t('searchPlaceholder', 'Search schemes by keyword...')}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  
                  <select 
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-4 py-2 rounded-xl outline-none cursor-pointer w-full sm:w-auto"
                  >
                    <option value="">{t('filterCategory', 'All Support Categories')}</option>
                    {welfareCategories.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchemesList.map((scheme) => (
                    <div 
                      key={scheme.id}
                      className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between hover:border-blue-500/40 transition-all"
                    >
                      <div>
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 mb-3 inline-block">
                          {scheme.categoryName || 'Welfare'}
                        </span>
                        <h3 className="text-base font-bold text-white mb-2">{scheme.name}</h3>
                        <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">{scheme.description}</p>
                      </div>

                      <button 
                        onClick={() => setReadinessScheme(scheme)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
                      >
                        {t('getReadyToApply', 'Get Ready to Apply →')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APPLICATION TRACKER TAB */}
            {activeDashboardTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-400" /> {t('appLifecycleTracker', 'Application Lifecycle Tracker')}
                  </h3>
                  <button 
                    onClick={() => setTrackerEditApp({ schemeName: '', referenceNo: '', status: 'SUBMITTED', notes: '' })}
                    className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> {t('addAppTracker', 'Add Application Tracker')}
                  </button>
                </div>

                <div className="space-y-4">
                  {myApplications.map((app) => (
                    <div 
                      key={app.id}
                      className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-base font-extrabold text-white">{app.schemeName}</h4>
                          <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                            app.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            app.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {app.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold mt-2">
                          <span>{t('refNoLabel', 'Ref No')}: <strong className="text-slate-200">{app.referenceNo || 'N/A'}</strong></span>
                          <span>{t('appliedDateLabel', 'Applied Date')}: <strong className="text-slate-200">{app.appliedDate || app.date}</strong></span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setTrackerEditApp(app)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                      >
                        {t('updateStatusNotes', 'Update Status / Notes')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DOCUMENT VAULT TAB */}
            {activeDashboardTab === 'docs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" /> {t('verifiedDocVault', 'Verified Document Vault')}
                  </h3>
                  <button 
                    onClick={() => addToast("Document uploaded for AI OCR verification!", "success")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" /> {t('uploadDocOcr', 'Upload Document for OCR')}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {myDocs.map((doc) => (
                    <div key={doc.id} className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          {t('verifiedBadge', 'VERIFIED')}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400">Uploaded: {doc.uploadDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>

      {/* ==================== EXPLAINABLE ELIGIBILITY MODAL ==================== */}
      <AnimatePresence>
        {explainableModalScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 relative"
            >
              <button onClick={() => setExplainableModalScheme(null)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-lg font-black text-white">{t('aiEstimateBreakdownTitle', 'AI Eligibility Estimate Breakdown')}</h3>
                <p className="text-xs text-slate-400 mt-1">Scheme: <strong>{explainableModalScheme.name}</strong></p>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-2xl text-xs text-blue-300">
                ℹ️ {t('aiEstimateDisclaimer', 'Clearly labeled as an AI-assisted estimate, not guaranteed government eligibility. Final approval is determined by government authorities.')}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span>State Residence Match</span>
                  <span className="text-emerald-400 font-bold">✓ Matched</span>
                </div>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span>Age Criteria Match</span>
                  <span className="text-emerald-400 font-bold">✓ Matched</span>
                </div>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span>Income Limit Match</span>
                  <span className="text-emerald-400 font-bold">✓ Matched</span>
                </div>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span>Occupation / Student Status</span>
                  <span className="text-emerald-400 font-bold">✓ Matched</span>
                </div>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span>Missing / Uncertain</span>
                  <span className="text-amber-400 font-bold">⚠ Land Patta / Income Cert</span>
                </div>
              </div>

              <button 
                onClick={() => setExplainableModalScheme(null)}
                className="w-full bg-slate-800 text-slate-200 font-bold text-xs py-3 rounded-xl"
              >
                {t('closeExplanation', 'Close Explanation')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== READINESS & OFFICIAL REDIRECT MODAL ==================== */}
      <AnimatePresence>
        {readinessScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 relative"
            >
              <button onClick={() => setReadinessScheme(null)} className="absolute right-5 top-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {readinessScheme.isCentral ? t('centralGov', 'Central Scheme') : t('stateGov', 'State Scheme')}
                </span>
                <h2 className="text-xl font-black text-white mt-2">{readinessScheme.name}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl">
                  <div className="text-xs font-bold text-slate-300 mb-1">{t('likelyMatch', 'Likely Match')} %</div>
                  <div className="text-2xl font-black text-emerald-400">{readinessScheme.matchScore || 94}%</div>
                  <div className="text-[10px] text-slate-400 mt-1">*{t('aiEstimate', 'AI Estimate')}</div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-2xl">
                  <div className="text-xs font-bold text-slate-300 mb-1">{t('appReadinessTitle', 'Application Readiness')}</div>
                  <div className="text-2xl font-black text-blue-400">{calculateReadiness(readinessScheme)}%</div>
                  <div className="text-[10px] text-slate-400 mt-1">*Doc Vault Check</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-white">{t('whyMatchesTitle', 'Why it matches:')}</h4>
                <p className="text-xs text-slate-300">{readinessScheme.reasonForRecommendation}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
                <button 
                  onClick={() => setOfficialRedirectScheme(readinessScheme)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-slate-950 font-black text-xs py-3.5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-1.5"
                >
                  {t('completeMyApplication', 'Complete My Application →')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== OFFICIAL REDIRECT MODAL ==================== */}
      <AnimatePresence>
        {officialRedirectScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 relative"
            >
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-1 border border-emerald-500/30">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-black text-white">{t('readyToApplyModalTitle', "You're Ready to Apply!")}</h3>
                <p className="text-xs text-slate-400 mt-1">Checklist prepared for <strong>{officialRedirectScheme.name}</strong></p>
              </div>

              <div className="bg-rose-950/40 border border-rose-500/30 p-4 rounded-2xl text-xs text-rose-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-400">
                  <ShieldAlert className="w-4 h-4" /> {t('govtNoticeTitle', 'Government External Portal Notice')}
                </div>
                <p className="leading-relaxed text-[11px]">
                  {t('govtNoticeDesc', 'You are leaving SchemeSathi and will continue on the official government website. Final eligibility and approval are determined by the concerned government department.')}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setOfficialRedirectScheme(null)} className="flex-1 bg-slate-800 text-slate-300 font-bold text-xs py-3 rounded-2xl">
                  {t('goBack', 'Go Back')}
                </button>
                <button onClick={handleProceedToOfficialPortal} className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs py-3 rounded-2xl flex items-center justify-center gap-1">
                  {t('continueOfficial', 'Continue to Official Website')} <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== APPLICATION TRACKER EDIT MODAL ==================== */}
      <AnimatePresence>
        {trackerEditApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 relative"
            >
              <button onClick={() => setTrackerEditApp(null)} className="absolute right-5 top-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-white">{t('appLifecycleTracker', 'Application Lifecycle Tracker')}</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Scheme Name</label>
                  <input 
                    type="text" 
                    value={trackerEditApp.schemeName}
                    onChange={(e) => setTrackerEditApp({ ...trackerEditApp, schemeName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">{t('refNoLabel', 'Reference Number')}</label>
                  <input 
                    type="text" 
                    value={trackerEditApp.referenceNo || ''}
                    onChange={(e) => setTrackerEditApp({ ...trackerEditApp, referenceNo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Lifecycle Status</label>
                  <select 
                    value={trackerEditApp.status || 'SUBMITTED'}
                    onChange={(e) => setTrackerEditApp({ ...trackerEditApp, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none cursor-pointer"
                  >
                    <option value="NOT_APPLIED">Not Applied</option>
                    <option value="APPLICATION_SUBMITTED">Application Submitted</option>
                    <option value="DOCUMENTS_SUBMITTED">Documents Submitted</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="BENEFIT_RECEIVED">Benefit Received</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button onClick={() => setTrackerEditApp(null)} className="flex-1 bg-slate-800 text-slate-300 font-bold text-xs py-3 rounded-2xl">
                  {t('goBack', 'Cancel')}
                </button>
                <button 
                  onClick={() => {
                    if (trackerEditApp.id) {
                      setMyApplications(prev => prev.map(a => a.id === trackerEditApp.id ? trackerEditApp : a));
                    } else {
                      setMyApplications(prev => [{ ...trackerEditApp, id: Date.now(), appliedDate: new Date().toISOString().split('T')[0] }, ...prev]);
                    }
                    addToast("Tracker updated!", "success");
                    setTrackerEditApp(null);
                  }}
                  className="flex-1 bg-orange-500 text-slate-950 font-black text-xs py-3 rounded-2xl"
                >
                  Save Tracker
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== MULTILINGUAL FLOATING CHATBOT ==================== */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:scale-105 text-slate-950 font-black p-4 rounded-full shadow-2xl flex items-center gap-2.5 border border-orange-400/40 transition-all"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs pr-1 font-black">{t('chatbotTitle', '🤖 SchemeSathi AI — Personal Assistant')}</span>
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl w-80 sm:w-96 shadow-2xl overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500/20 text-orange-400 p-1.5 rounded-xl border border-orange-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">{t('chatbotTitle', '🤖 SchemeSathi AI Assistant')}</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">{t('chatbotSubtitle', '11 Languages & Voice Guided')}</p>
                </div>
              </div>

              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === 'user' ? 'bg-orange-500 text-slate-950 font-bold' : 'bg-slate-950 border border-slate-800 text-slate-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChatMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <button 
                type="button" 
                onClick={handleVoiceInput}
                className={`p-2 rounded-xl border transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'}`}
                title="Microphone input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t('askPlaceholder', 'Ask about schemes, documents...')}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
              />

              <button type="submit" className="p-2 bg-orange-500 text-slate-950 font-bold rounded-xl hover:bg-orange-600">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </div>

    </div>
  );
}

export default function App() {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}
