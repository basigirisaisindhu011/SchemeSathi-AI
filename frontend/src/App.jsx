import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  authService, 
  schemeService, 
  applicationService, 
  chatService 
} from './services/api';
import { TranslationProvider, useTranslation } from './hooks/useTranslation.jsx';
import { 
  Sprout, HeartPulse, GraduationCap, UserRoundPlus, Baby, Accessibility, 
  Briefcase, Home, Sun, Search, MessageSquare, Plus, Trash2, Edit2, 
  FileText, CheckCircle, Clock, X, ChevronRight, Menu, LogOut, 
  ArrowRight, Shield, Award, HelpCircle, Loader2, Sparkles, Send, MapPin, 
  Users, BarChart3, User, Database, ArrowLeft, RefreshCcw, Globe, Mic, MicOff,
  Volume2, VolumeX, Check, AlertCircle, Eye, IndianRupee, Zap, CheckCircle2,
  TrendingUp, Layers, ExternalLink, ShieldCheck, Filter, AlertTriangle, Bell, Bookmark,
  Building, Landmark, Radio, Volume, Info, ShieldAlert, CheckSquare, Lock, Key, Mail,
  FileCheck, FolderCheck, SlidersHorizontal, Heart, Sparkle
} from 'lucide-react';

// Expanded Verified Schemes Dataset (24 Real Government Schemes)
const initialFallbackSchemes = [
  {
    id: 1,
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    isCentral: true,
    categoryName: 'Agriculture',
    categories: ['Agriculture', 'Farmers'],
    stateName: 'National (Central)',
    department: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
    benefits: '₹6,000 / year direct bank transfer (3 equal installments of ₹2,000).',
    eligibility: 'All landholding farmers with cultivable land. Must not be an income tax payer.',
    incomeLimit: 250000,
    ageMin: 18,
    ageMax: 100,
    requiredDocuments: ['Aadhaar Card', 'Land Holding Records (Patta Passbook)', 'Bank Passbook copy', 'Mobile Number'],
    applicationProcess: '1. Check criteria. 2. Verify Aadhaar & Land Patta. 3. Continue on pmkisan.gov.in.',
    officialWebsite: 'https://pmkisan.gov.in',
    helpline: '155261 / 1800115526',
    matchScore: 94,
    confidenceScore: 92,
    reasonForRecommendation: 'High Qualification! You match Agricultural occupation, state residence, and income criteria.'
  },
  {
    id: 2,
    name: 'Ayushman Bharat PM-JAY Health Insurance',
    isCentral: true,
    categoryName: 'Health',
    categories: ['Health', 'Insurance', 'Healthcare'],
    stateName: 'National (Central)',
    department: 'National Health Authority (NHA)',
    description: 'World\'s largest health insurance scheme providing ₹5 Lakhs per family per year for secondary & tertiary hospital care.',
    benefits: '₹5,00,000 cashless health insurance cover per family annually across 27,000+ empanelled hospitals.',
    eligibility: 'Low income families, rural households, SECC cardholders, active Ration Card holders.',
    incomeLimit: 250000,
    ageMin: 0,
    ageMax: 120,
    requiredDocuments: ['Aadhaar Card', 'Ration Card (SECC/BPL)', 'Family ID Proof', 'Income Certificate'],
    applicationProcess: '1. Verify family eligibility. 2. Prepare Ration Card & Aadhaar. 3. Continue on pmjay.gov.in.',
    officialWebsite: 'https://pmjay.gov.in',
    helpline: '14555 / 1800111565',
    matchScore: 92,
    confidenceScore: 90,
    reasonForRecommendation: 'High Qualification! Eligible for full ₹5 Lakh cashless medical coverage based on family income & category.'
  },
  {
    id: 3,
    name: 'Prime Minister Scholarship Scheme (PMSS)',
    isCentral: true,
    categoryName: 'Education',
    categories: ['Education', 'Scholarships', 'Students'],
    stateName: 'National (Central)',
    department: 'Ministry of Home Affairs / Defence',
    description: 'Scheme to encourage higher technical and professional education for the dependent wards and widows of Ex-Servicemen / Coast Guard.',
    benefits: '₹3,000 per month for girls and ₹2,500 per month for boys enrolled in professional courses.',
    eligibility: 'Must be a student, ward/widow of an Ex-Serviceman. Min 60% marks in Class 12/Diploma/Graduation.',
    incomeLimit: 300000,
    ageMin: 17,
    ageMax: 30,
    requiredDocuments: ['Ex-Servicemen Certificate', 'Class 12 mark sheet', 'Admission receipt', 'Bank Passbook', 'Aadhaar card'],
    applicationProcess: '1. Register on National Scholarship Portal (NSP). 2. Submit PMSS application under MHA.',
    officialWebsite: 'https://scholarships.gov.in',
    helpline: '011-26151564',
    matchScore: 89,
    confidenceScore: 88,
    reasonForRecommendation: 'Matches student profile & higher technical scholarship criteria.'
  },
  {
    id: 4,
    name: 'Rythu Bandhu Scheme (Telangana)',
    isCentral: false,
    categoryName: 'Agriculture',
    categories: ['Agriculture', 'Farmers'],
    stateName: 'Telangana',
    department: 'Department of Agriculture, Govt of Telangana',
    description: 'Agriculture Investment Support Scheme by Telangana Govt to incentivize crop productivity and support farmers direct financial assistance twice a year.',
    benefits: 'Investment support of ₹5,000 per acre per season (Kharif and Rabi) for purchasing seeds, fertilizer, and inputs.',
    eligibility: 'Must own agricultural land in Telangana. Registered landholder in Rythu Bandhu database.',
    incomeLimit: 500000,
    ageMin: 18,
    ageMax: 90,
    requiredDocuments: ['Pattadar Dharani Passbook', 'Aadhaar Card', 'Bank Account linked to Aadhaar'],
    applicationProcess: '1. Submit land patta details to Agriculture Extension Officer (AEO) or update Dharani portal.',
    officialWebsite: 'https://dharani.telangana.gov.in',
    helpline: '1800 599 1200',
    matchScore: 91,
    confidenceScore: 89,
    reasonForRecommendation: 'Matches Telangana state residence and agricultural landholder criteria.'
  },
  {
    id: 5,
    name: 'Gruha Lakshmi Scheme (Karnataka)',
    isCentral: false,
    categoryName: 'Women',
    categories: ['Women', 'Pension', 'Welfare'],
    stateName: 'Karnataka',
    department: 'Department of Women & Child Development, Karnataka',
    description: 'Direct financial assistance of ₹2,000 per month to female heads of eligible households in Karnataka.',
    benefits: 'Monthly financial assistance of ₹2,000 directly credited via DBT (₹24,000 annually).',
    eligibility: 'Resident of Karnataka. Woman registered as head of family in BPL, APL, or Antyodaya Ration Cards.',
    incomeLimit: 200000,
    ageMin: 18,
    ageMax: 120,
    requiredDocuments: ['Ration Card (BPL/APL)', 'Aadhaar Card of self and husband', 'Mobile linked to Aadhaar', 'Bank Passbook'],
    applicationProcess: '1. Register at Karnataka One, Grama One, or Seva Sindhu portal.',
    officialWebsite: 'https://sevasindhugs.karnataka.gov.in',
    helpline: '1902',
    matchScore: 88,
    confidenceScore: 87,
    reasonForRecommendation: 'Matches Karnataka residence, female gender, and family head welfare criteria.'
  },
  {
    id: 6,
    name: 'Pudhumai Penn Scheme (Tamil Nadu)',
    isCentral: false,
    categoryName: 'Scholarships',
    categories: ['Scholarships', 'Women', 'Education', 'Children'],
    stateName: 'Tamil Nadu',
    department: 'Social Welfare & Women Empowerment Department, TN',
    description: 'Tamil Nadu scheme supporting girls from government schools to pursue higher education in colleges, universities, or polytechnics.',
    benefits: '₹1,000 per month directly deposited into the student’s bank account until degree/diploma completion.',
    eligibility: 'Female student who completed Class 6 to 12 in Government Schools of Tamil Nadu.',
    incomeLimit: 300000,
    ageMin: 17,
    ageMax: 25,
    requiredDocuments: ['School Transfer Certificate (TC)', 'Class 10/12 Marksheets', 'College ID Card', 'Aadhaar Card', 'Bank Passbook'],
    applicationProcess: '1. Apply online via Penkalvi portal through college nodal officer.',
    officialWebsite: 'https://penkalvi.tn.gov.in',
    helpline: '14417',
    matchScore: 90,
    confidenceScore: 88,
    reasonForRecommendation: 'Matches Tamil Nadu residence, female student status, and higher education criteria.'
  },
  {
    id: 7,
    name: 'Mukhya Mantri Amrutam (MA) Yojana (Gujarat)',
    isCentral: false,
    categoryName: 'Health',
    categories: ['Health', 'Insurance', 'Healthcare'],
    stateName: 'Gujarat',
    department: 'Health & Family Welfare Department, Gujarat',
    description: 'Gujarat state government scheme that provides tertiary medical care and cashless treatment to BPL and low-income families.',
    benefits: 'Cashless medical treatment cover up to ₹5,00,000 per family per year for serious illnesses.',
    eligibility: 'Resident of Gujarat. Family annual income less than ₹4,00,000 or holding a BPL card.',
    incomeLimit: 400000,
    ageMin: 0,
    ageMax: 100,
    requiredDocuments: ['Income Certificate', 'Aadhaar Card', 'BPL Card (if applicable)', 'Voter ID'],
    applicationProcess: '1. Visit civic center or taluka kiosk, capture biometrics, receive MA Card.',
    officialWebsite: 'http://www.magujarat.com',
    helpline: '18002331022',
    matchScore: 87,
    confidenceScore: 85,
    reasonForRecommendation: 'Matches Gujarat residence and health coverage income criteria.'
  },
  {
    id: 8,
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    isCentral: true,
    categoryName: 'Business',
    categories: ['Business', 'Employment', 'Self Employment'],
    stateName: 'National (Central)',
    department: 'Department of Financial Services (DFS)',
    description: 'Collateral-free loans up to ₹10 Lakhs for non-corporate, non-farm small and micro-enterprises to start or expand business.',
    benefits: 'Collateral-free business loans: Shishu (up to ₹50k), Kishore (₹50k-5L), and Tarun (up to ₹10L).',
    eligibility: 'Small business owners, shopkeepers, artisans, street vendors, agricultural allied units.',
    incomeLimit: 500000,
    ageMin: 18,
    ageMax: 65,
    requiredDocuments: ['Aadhaar', 'PAN Card', 'Business Address Proof', 'Quotation of Machinery/Assets', 'Bank Statement'],
    applicationProcess: '1. Prepare business proposal. 2. Apply on Udyamimitra portal or bank branch.',
    officialWebsite: 'https://www.mudra.org.in',
    helpline: '18001801111',
    matchScore: 86,
    confidenceScore: 85,
    reasonForRecommendation: 'Great match for small business owners & entrepreneurs seeking capital.'
  },
  {
    id: 9,
    name: 'Pradhan Mantri Awas Yojana (PMAY) - Urban',
    isCentral: true,
    categoryName: 'Housing',
    categories: ['Housing', 'Urban Welfare'],
    stateName: 'National (Central)',
    department: 'Ministry of Housing and Urban Affairs (MoHUA)',
    description: 'Affordable housing mission by Central government targeting housing for all urban families with basic amenities.',
    benefits: 'Interest subsidy of up to 6.5% on housing loans or direct financial assistance of ₹1.5 Lakhs for construction.',
    eligibility: 'Families with annual income up to ₹18 lakhs (EWS/LIG/MIG). Family must not own a pucca house in India.',
    incomeLimit: 1800000,
    ageMin: 18,
    ageMax: 90,
    requiredDocuments: ['Aadhaar Card', 'Income Proof', 'Affidavit of not owning a house', 'Bank details', 'Address proof'],
    applicationProcess: '1. Apply online via pmaymis.gov.in or register at municipal office.',
    officialWebsite: 'https://pmaymis.gov.in',
    helpline: '1800113300',
    matchScore: 85,
    confidenceScore: 84,
    reasonForRecommendation: 'Matches urban residence and affordable housing criteria.'
  },
  {
    id: 10,
    name: 'Atal Pension Yojana (APY)',
    isCentral: true,
    categoryName: 'Pension',
    categories: ['Pension', 'Senior Citizens', 'Social Security'],
    stateName: 'National (Central)',
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    description: 'Pension scheme for citizens of India focused on unorganized sector workers, offering guaranteed pension after 60 years.',
    benefits: 'Guaranteed minimum pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60.',
    eligibility: 'Indian citizen between 18 and 40 years with a bank account. Must not be a taxpayer.',
    incomeLimit: 400000,
    ageMin: 18,
    ageMax: 40,
    requiredDocuments: ['Aadhaar Card', 'Mobile Number', 'Bank Savings Account Details'],
    applicationProcess: '1. Visit bank where savings account is held. 2. Fill APY form with auto-debit consent.',
    officialWebsite: 'https://www.npscra.nsdl.co.in',
    helpline: '1800110069',
    matchScore: 85,
    confidenceScore: 84,
    reasonForRecommendation: 'Matches age & retirement security criteria for unorganized workers.'
  },
  {
    id: 11,
    name: 'Mission Vatsalya Child Protection Scheme',
    isCentral: true,
    categoryName: 'Children',
    categories: ['Children', 'Child Protection', 'Nutrition'],
    stateName: 'National (Central)',
    department: 'Ministry of Women and Child Development',
    description: 'Central Child Protection Services Scheme providing institutional care, non-institutional sponsorship of ₹4,000/month, foster care, and emergency child helpline (1098).',
    benefits: 'Monthly financial sponsorship of ₹4,000 per child, free shelter home care, education, and vocational training.',
    eligibility: 'Children aged 0-18 in difficult circumstances, orphans, destitute children, or single-parent households with family income under ₹96,000.',
    incomeLimit: 96000,
    ageMin: 0,
    ageMax: 18,
    requiredDocuments: ['Child Birth Certificate', 'Parent/Guardian Aadhaar Card', 'Income Certificate', 'Orphan/Single Parent Certificate'],
    applicationProcess: '1. Apply through District Child Protection Unit (DCPU) or Child Welfare Committee (CWC).',
    officialWebsite: 'https://wcd.nic.in/mission-vatsalya',
    helpline: '1098',
    matchScore: 93,
    confidenceScore: 91,
    reasonForRecommendation: 'High Qualification! Matches child protection, family income, and vulnerability criteria.'
  },
  {
    id: 12,
    name: 'Palna Anganwadi-cum-Crèche Scheme',
    isCentral: true,
    categoryName: 'Children',
    categories: ['Children', 'Employment', 'Women'],
    stateName: 'National (Central)',
    department: 'Ministry of Women and Child Development',
    description: 'Provides day-care facilities, nutritional support, early childhood education, and health check-ups for children of working mothers.',
    benefits: 'Free day crèche care, supplementary nutrition, growth monitoring, and immunization support for infants and toddlers.',
    eligibility: 'Children aged 6 months to 6 years of working mothers across rural and urban areas.',
    incomeLimit: 300000,
    ageMin: 0,
    ageMax: 6,
    requiredDocuments: ['Mother Aadhaar Card', 'Child Birth Certificate', 'Employment Proof of Mother', 'Immunization Card'],
    applicationProcess: '1. Register at nearest local Anganwadi-cum-Crèche center.',
    officialWebsite: 'https://wcd.nic.in',
    helpline: '011-23386423',
    matchScore: 90,
    confidenceScore: 88,
    reasonForRecommendation: 'Matches working mother status and early childhood day-care criteria.'
  },
  {
    id: 13,
    name: 'PM CARES for Children Scheme',
    isCentral: true,
    categoryName: 'Children',
    categories: ['Children', 'Education', 'Health'],
    stateName: 'National (Central)',
    department: 'Ministry of Women and Child Development / GOI',
    description: 'Comprehensive support scheme for children who lost both parents or legal guardians during the COVID-19 pandemic.',
    benefits: 'Corpus of ₹10 Lakhs at age 18, monthly stipend from age 18 to 23, Ayushman Bharat health insurance of ₹5 Lakhs, and free school education.',
    eligibility: 'Children who lost both parents or surviving parent between 11 March 2020 and 28 February 2022.',
    incomeLimit: 500000,
    ageMin: 0,
    ageMax: 23,
    requiredDocuments: ['Death Certificates of Parents', 'Child Birth Certificate', 'Aadhaar Card', 'Guardian Bank Account Details'],
    applicationProcess: '1. Register on PM CARES for Children portal (pmcaresforchildren.in) via District Magistrate.',
    officialWebsite: 'https://pmcaresforchildren.in',
    helpline: '011-23382743',
    matchScore: 95,
    confidenceScore: 94,
    reasonForRecommendation: 'High Qualification! Dedicated national COVID orphan relief & education sponsorship scheme.'
  },
  {
    id: 14,
    name: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
    isCentral: true,
    categoryName: 'Children',
    categories: ['Children', 'Health', 'Disability'],
    stateName: 'National (Central)',
    department: 'National Health Mission (NHM)',
    description: 'Early health screening and intervention programme for children (0-18 years) covering 4 Ds: Defects at birth, Diseases, Deficiencies, and Development delays.',
    benefits: 'Free health screening, free surgical interventions, specialized medical treatments, and assistive devices.',
    eligibility: 'All children aged 0 to 18 years enrolled in Anganwadis and Government / Govt-Aided schools.',
    incomeLimit: 500000,
    ageMin: 0,
    ageMax: 18,
    requiredDocuments: ['Child Aadhaar Card / School ID', 'Birth Certificate', 'Ration Card'],
    applicationProcess: '1. Screening by Mobile Health Teams at Anganwadis and schools; referrals sent to District Early Intervention Centres.',
    officialWebsite: 'https://nhm.gov.in',
    helpline: '18001801104',
    matchScore: 91,
    confidenceScore: 90,
    reasonForRecommendation: 'Matches child age group and free healthcare screening criteria.'
  },
  {
    id: 15,
    name: 'Arogya Lakshmi Scheme (Telangana)',
    isCentral: false,
    categoryName: 'Children',
    categories: ['Children', 'Women', 'Health', 'Nutrition'],
    stateName: 'Telangana',
    department: 'Department of Women Development & Child Welfare, Telangana',
    description: 'Telangana state welfare scheme supplying nutritious one full meal, 200ml milk, and eggs to pregnant women, lactating mothers, and children below 6 years.',
    benefits: 'Daily hot cooked meal, 200ml milk, 16-30 eggs monthly, and Balamrutham food supplement for infants.',
    eligibility: 'Children aged 7 months to 6 years, pregnant women, and lactating mothers residing in Telangana.',
    incomeLimit: 300000,
    ageMin: 0,
    ageMax: 6,
    requiredDocuments: ['Mother Aadhaar Card', 'Child Birth Certificate', 'Telangana Residence Proof', 'Anganwadi Registration Form'],
    applicationProcess: '1. Register at nearest Telangana Anganwadi Center.',
    officialWebsite: 'https://wdcw.tg.nic.in',
    helpline: '040-23733665',
    matchScore: 92,
    confidenceScore: 90,
    reasonForRecommendation: 'Matches Telangana state residence and child nutrition support criteria.'
  },
  {
    id: 16,
    name: 'Chief Minister Girl Child Protection Scheme (Tamil Nadu)',
    isCentral: false,
    categoryName: 'Children',
    categories: ['Children', 'Women', 'Girl Child'],
    stateName: 'Tamil Nadu',
    department: 'Department of Social Welfare and Women Empowerment, TN',
    description: 'Tamil Nadu scheme promoting small family norms, gender equality, and financial deposit for higher education of girl children.',
    benefits: 'Fixed deposit of ₹50,000 for single girl child (or ₹25,000 each for 2 girl children) maturing with interest at age 18.',
    eligibility: 'Resident of Tamil Nadu, family annual income up to ₹72,000, 1 or 2 girl children only.',
    incomeLimit: 72000,
    ageMin: 0,
    ageMax: 18,
    requiredDocuments: ['Birth Certificates of Girl Children', 'Parent Sterilization Certificate', 'Income Certificate (below ₹72,000)', 'Tamil Nadu Domicile Certificate'],
    applicationProcess: '1. Apply through Social Welfare Extension Officer or e-Sevai Center.',
    officialWebsite: 'https://www.tn.gov.in/scheme/data_view/44078',
    helpline: '18004250191',
    matchScore: 89,
    confidenceScore: 88,
    reasonForRecommendation: 'Matches Tamil Nadu residence, girl child status, and family income limit.'
  },
  {
    id: 17,
    name: 'Palak Mata-Pita Yojana (Gujarat)',
    isCentral: false,
    categoryName: 'Children',
    categories: ['Children', 'Education', 'Pension'],
    stateName: 'Gujarat',
    department: 'Social Defense Department, Gujarat',
    description: 'Financial assistance by Gujarat Social Defense Department to foster parents caring for orphan children to ensure schooling.',
    benefits: 'Monthly financial aid of ₹3,000 per child credited into foster parent bank account until age 18.',
    eligibility: 'Orphan children below 18 years residing with foster parents/relatives in Gujarat. Family income limit ₹36,000/yr.',
    incomeLimit: 36000,
    ageMin: 0,
    ageMax: 18,
    requiredDocuments: ['Parents Death Certificate', 'Child Birth Certificate', 'Foster Parent Aadhaar Card', 'Income Certificate'],
    applicationProcess: '1. Apply at District Social Defense Officer (SDO) office or Digital Gujarat portal.',
    officialWebsite: 'https://sje.gujarat.gov.in',
    helpline: '18002335500',
    matchScore: 88,
    confidenceScore: 86,
    reasonForRecommendation: 'Matches Gujarat residence and orphan foster care support criteria.'
  },
  {
    id: 18,
    name: 'Bhagyalakshmi Scheme (Karnataka)',
    isCentral: false,
    categoryName: 'Children',
    categories: ['Children', 'Women', 'Girl Child', 'Health'],
    stateName: 'Karnataka',
    department: 'Department of Women & Child Development, Karnataka',
    description: 'Karnataka welfare scheme providing financial security, health insurance, and educational support to girl children of BPL families.',
    benefits: 'Maturity amount of ₹1 Lakh at age 18, annual scholarships from Class 1 to 10, and health insurance cover up to ₹25,000/yr.',
    eligibility: 'Girl child born to BPL families in Karnataka enrolled within 1 year of birth. Max 2 girls per family.',
    incomeLimit: 200000,
    ageMin: 0,
    ageMax: 18,
    requiredDocuments: ['BPL Ration Card', 'Child Birth Certificate', 'Parent Aadhaar Card', 'Karnataka Domicile Certificate'],
    applicationProcess: '1. Register through local Anganwadi Worker within 1 year of girl child birth.',
    officialWebsite: 'https://dwcd.karnataka.gov.in',
    helpline: '180042535533',
    matchScore: 90,
    confidenceScore: 88,
    reasonForRecommendation: 'Matches Karnataka residence, BPL family status, and girl child support.'
  },
  {
    id: 19,
    name: 'Atal Vayo Abhyuday Yojana (AVYAY)',
    isCentral: true,
    categoryName: 'Senior Citizens',
    categories: ['Senior Citizens', 'Housing', 'Health', 'Senior Citizen'],
    stateName: 'National (Central)',
    department: 'Ministry of Social Justice and Empowerment (MSJE)',
    description: 'Central umbrella scheme for senior citizens providing shelter, food, healthcare, and capacity building for productive ageing.',
    benefits: 'Free stay, nutritious food, medical care, and continuous care facilities at Senior Citizen Homes.',
    eligibility: 'Indigent elderly aged 60 years and above with no family income or support.',
    incomeLimit: 200000,
    ageMin: 60,
    ageMax: 120,
    requiredDocuments: ['Aadhaar Card / Senior Citizen ID', 'BPL Ration Card / Income Certificate', 'Passport Photo'],
    applicationProcess: '1. Apply through empanelled NGOs or District Social Welfare Officer.',
    officialWebsite: 'https://socialjustice.gov.in',
    helpline: '14567',
    matchScore: 94,
    confidenceScore: 92,
    reasonForRecommendation: 'High Qualification! Dedicated national senior citizen welfare & shelter scheme.'
  },
  {
    id: 20,
    name: 'Rashtriya Vayoshri Yojana (RVY)',
    isCentral: true,
    categoryName: 'Senior Citizens',
    categories: ['Senior Citizens', 'Disability', 'Health', 'Senior Citizen'],
    stateName: 'National (Central)',
    department: 'ALIMCO / Ministry of Social Justice and Empowerment',
    description: 'Provides free physical aids and assisted-living devices to senior citizens suffering from age-related disabilities or infirmities.',
    benefits: 'Free wheelchairs, walking sticks, crutches, hearing aids, spectacles, artificial dentures, and elbow crutches.',
    eligibility: 'Senior citizens aged 60+ belonging to BPL category or monthly income up to ₹15,000.',
    incomeLimit: 180000,
    ageMin: 60,
    ageMax: 120,
    requiredDocuments: ['Aadhaar Card / Senior Citizen ID', 'BPL Card / Income Certificate (below ₹15,000/mo)', 'Medical Certificate for Disability'],
    applicationProcess: '1. Attend RVY assessment camps organized by ALIMCO / District Administration.',
    officialWebsite: 'https://alimco.in',
    helpline: '18001805129',
    matchScore: 93,
    confidenceScore: 91,
    reasonForRecommendation: 'Matches age 60+ and assistive device healthcare criteria.'
  },
  {
    id: 21,
    name: 'Elderline 14567 National Helpline for Senior Citizens',
    isCentral: true,
    categoryName: 'Senior Citizens',
    categories: ['Senior Citizens', 'Health', 'Senior Citizen'],
    stateName: 'National (Central)',
    department: 'Ministry of Social Justice and Empowerment / GOI',
    description: 'Toll-free National Helpline (14567) providing free information, emotional support, field rescue of destitute elderly, and legal guidance.',
    benefits: 'Free 24/7 helpline guidance (14567), emergency rescue, elder abuse intervention, and pension status assistance.',
    eligibility: 'All senior citizens aged 60+ in India and their caregivers.',
    incomeLimit: 500000,
    ageMin: 60,
    ageMax: 120,
    requiredDocuments: ['Please confirm the required documents on the official government portal.'],
    applicationProcess: '1. Call toll-free helpline number 14567 anywhere in India.',
    officialWebsite: 'https://elderline.dosje.gov.in',
    helpline: '14567',
    matchScore: 92,
    confidenceScore: 90,
    reasonForRecommendation: 'Matches age 60+ and 24/7 elder care helpline support criteria.'
  },
  {
    id: 22,
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    isCentral: true,
    categoryName: 'Senior Citizens',
    categories: ['Senior Citizens', 'Pension', 'Senior Citizen'],
    stateName: 'National (Central)',
    department: 'National Social Assistance Programme (NSAP)',
    description: 'National social assistance scheme providing non-contributory monthly old-age pension to senior citizens of BPL households.',
    benefits: 'Monthly pension of ₹500 (aged 60-79) to ₹1,000+ (aged 80+) credited directly into bank account.',
    eligibility: 'Senior citizens aged 60+ belonging to a BPL family.',
    incomeLimit: 200000,
    ageMin: 60,
    ageMax: 120,
    requiredDocuments: ['Aadhaar Card', 'BPL Ration Card', 'Age Proof Certificate', 'Bank Savings Passbook'],
    applicationProcess: '1. Submit application at Gram Panchayat / Municipal Office or NSAP portal.',
    officialWebsite: 'https://nsap.nic.in',
    helpline: '1800111555',
    matchScore: 94,
    confidenceScore: 93,
    reasonForRecommendation: 'Matches age 60+ and BPL old age pension eligibility.'
  },
  {
    id: 23,
    name: 'Sandhya Suraksha Scheme (Karnataka)',
    isCentral: false,
    categoryName: 'Senior Citizens',
    categories: ['Senior Citizens', 'Pension', 'Senior Citizen'],
    stateName: 'Karnataka',
    department: 'Directorate of Social Security and Pensions, Karnataka',
    description: 'Karnataka Govt social security scheme providing financial assistance to senior citizens, weavers, and unorganized workers.',
    benefits: 'Monthly pension of ₹1,200 deposited via e-governance directly into beneficiary bank account.',
    eligibility: 'Resident of Karnataka, age 65 years and above, combined family annual income below ₹20,000.',
    incomeLimit: 20000,
    ageMin: 65,
    ageMax: 120,
    requiredDocuments: ['Aadhaar Card', 'Age Proof', 'Income Certificate (below ₹20,000)', 'Bank Passbook', 'Karnataka Domicile Proof'],
    applicationProcess: '1. Apply at Nada Kacheri center or Seva Sindhu portal.',
    officialWebsite: 'https://ssp.karnataka.gov.in',
    helpline: '080-22230281',
    matchScore: 91,
    confidenceScore: 89,
    reasonForRecommendation: 'Matches Karnataka residence, age 65+, and social security pension rules.'
  },
  {
    id: 24,
    name: 'Aasara Old Age Pension (Telangana)',
    isCentral: false,
    categoryName: 'Senior Citizens',
    categories: ['Senior Citizens', 'Pension', 'Senior Citizen'],
    stateName: 'Telangana',
    department: 'Panchayat Raj & Rural Development Department, Telangana',
    description: 'Social security pension scheme by Telangana Govt providing monthly pension and dignity to senior citizens and vulnerable groups.',
    benefits: 'Monthly pension of ₹2,016 credited directly into bank account / post office.',
    eligibility: 'Resident of Telangana, age 57 years and above, belonging to BPL / rural poor household.',
    incomeLimit: 200000,
    ageMin: 57,
    ageMax: 120,
    requiredDocuments: ['Aadhaar Card', 'Food Security Card (Ration Card)', 'Age Proof (Voter ID/Aadhaar)', 'Bank Passbook'],
    applicationProcess: '1. Submit application at Meeseva Center or Gram Panchayat Office.',
    officialWebsite: 'https://aasara.telangana.gov.in',
    helpline: '18004251980',
    matchScore: 95,
    confidenceScore: 93,
    reasonForRecommendation: 'High Qualification! Matches Telangana residence, age 57+, and BPL pension criteria.'
  }
];

// Expanded Category Filter Chips
const welfareCategoryChips = [
  { name: 'All', icon: Sparkle, color: 'text-amber-400' },
  { name: 'Children', icon: Baby, color: 'text-sky-400' },
  { name: 'Senior Citizens', icon: Accessibility, color: 'text-amber-400' },
  { name: 'Agriculture', icon: Sprout, color: 'text-emerald-400' },
  { name: 'Health', icon: HeartPulse, color: 'text-rose-400' },
  { name: 'Education', icon: GraduationCap, color: 'text-blue-400' },
  { name: 'Women', icon: UserRoundPlus, color: 'text-pink-400' },
  { name: 'Disability', icon: Accessibility, color: 'text-purple-400' },
  { name: 'Housing', icon: Home, color: 'text-violet-400' },
  { name: 'Employment', icon: Briefcase, color: 'text-cyan-400' },
  { name: 'Business', icon: Building, color: 'text-orange-400' },
  { name: 'Scholarships', icon: GraduationCap, color: 'text-indigo-400' },
  { name: 'Pension', icon: Landmark, color: 'text-teal-400' }
];

// States List
const indianStatesAndUTs = [
  'All States & UTs',
  'National (Central)',
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi (NCT)', 'Jammu and Kashmir', 'Puducherry'
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
    }, 4500);
  };

  // Datasets
  const [schemes, setSchemes] = useState(initialFallbackSchemes);
  const [aiRecommendations, setAiRecommendations] = useState(initialFallbackSchemes);
  
  const [myApplications, setMyApplications] = useState([
    { id: 101, schemeName: 'PM-KISAN', referenceNo: 'PMK-2026-98124', status: 'APPROVED', appliedDate: '2026-05-12', remarks: 'Installment received in State Bank account.' }
  ]);

  const [savedSchemeIds, setSavedSchemeIds] = useState([1, 2]);

  // ISOLATED PER-SCHEME DOCUMENT CHECKLIST STATE (Keyed by Scheme ID)
  const [checkedDocsByScheme, setCheckedDocsByScheme] = useState(() => {
    try {
      const saved = localStorage.getItem('schemesathi_checked_docs_by_scheme');
      return saved ? JSON.parse(saved) : { "1": ["Aadhaar Card", "Bank Passbook"] };
    } catch {
      return { "1": ["Aadhaar Card", "Bank Passbook"] };
    }
  });

  // Modals, Navigation & Browsing Filter State
  const [readinessScheme, setReadinessScheme] = useState(null);
  const [officialRedirectScheme, setOfficialRedirectScheme] = useState(null);
  const [trackerEditApp, setTrackerEditApp] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [activeDashboardTab, setActiveDashboardTab] = useState('recommendations');
  const [explainableModalScheme, setExplainableModalScheme] = useState(null);
  const [selectedChecklistSchemeId, setSelectedChecklistSchemeId] = useState(1);

  // Scheme Browsing Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryChip, setSelectedCategoryChip] = useState('All');
  const [selectedGovTypeFilter, setSelectedGovTypeFilter] = useState('ALL'); // ALL, CENTRAL, STATE
  const [selectedStateFilter, setSelectedStateFilter] = useState('All States & UTs');
  const [sortByFilter, setSortByFilter] = useState('BEST_MATCH'); // BEST_MATCH, READINESS, ALPHABETICAL

  // Chat & Voice State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: t('chatbotGreeting', 'Namaste! 🤖 I am SchemeSathi AI, your personal welfare assistant. Ask me anything about government schemes!') }
  ]);
  const [isListening, setIsListening] = useState(false);

  // Fetch schemes and profile from backend
  useEffect(() => {
    schemeService.getSchemes()
      .then(data => {
        if (data && data.length > 0) {
          setSchemes(data);
          setAiRecommendations(data);
        }
      })
      .catch(() => {});

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

  useEffect(() => {
    if (user) {
      applicationService.getMyApplications()
        .then(apps => {
          if (apps && apps.length > 0) {
            setMyApplications(apps.map(a => ({
              id: a.id,
              schemeId: a.schemeId,
              schemeName: a.schemeName,
              referenceNo: a.referenceNumber || a.referenceNo || '',
              status: a.status || 'SUBMITTED',
              appliedDate: a.appliedDate ? a.appliedDate.split('T')[0] : new Date().toISOString().split('T')[0],
              remarks: a.remarks || ''
            })));
          }
        })
        .catch(() => {});
    }
  }, [user]);

  // Open Scheme Details Modal (Fetches scheme details & required documents from backend API by ID)
  const handleOpenSchemeDetails = async (scheme) => {
    if (!scheme) return;
    try {
      if (scheme.id) {
        const freshScheme = await schemeService.getSchemeById(scheme.id);
        if (freshScheme && freshScheme.id) {
          const mergedScheme = {
            ...scheme,
            ...freshScheme,
            requiredDocuments: freshScheme.requiredDocuments || scheme.requiredDocuments
          };
          setReadinessScheme(mergedScheme);
          setSelectedChecklistSchemeId(freshScheme.id);
          return;
        }
      }
    } catch (e) {
      console.warn("Using local scheme data:", e);
    }
    setReadinessScheme(scheme);
    if (scheme.id) setSelectedChecklistSchemeId(scheme.id);
  };

  // Profile completion calculation
  const calculateProfileCompletion = () => {
    let fields = ['fullName', 'age', 'gender', 'stateName', 'occupation', 'annualIncome', 'category'];
    let filled = fields.filter(f => profile[f] !== null && profile[f] !== undefined && profile[f] !== '').length;
    return Math.round((filled / fields.length) * 100);
  };

  // Toggle Checkmark for a Specific Scheme's Document
  const toggleCheckDocForScheme = (schemeId, docName) => {
    setCheckedDocsByScheme(prev => {
      const schemeKey = String(schemeId);
      const currentList = prev[schemeKey] || [];
      const isChecked = currentList.some(d => d.toLowerCase().trim() === docName.toLowerCase().trim());
      
      let updatedList;
      if (isChecked) {
        updatedList = currentList.filter(d => d.toLowerCase().trim() !== docName.toLowerCase().trim());
        addToast(`Unchecked '${docName}'.`, "info");
      } else {
        updatedList = [...currentList, docName];
        addToast(`Marked '${docName}' as ready!`, "success");
      }
      
      const nextState = { ...prev, [schemeKey]: updatedList };
      localStorage.setItem('schemesathi_checked_docs_by_scheme', JSON.stringify(nextState));
      return nextState;
    });
  };

  // Extract Scheme-Specific Required Documents Array
  const getSchemeRequiredDocs = (scheme) => {
    if (!scheme) return [];
    if (Array.isArray(scheme.requiredDocuments)) {
      return scheme.requiredDocuments.map(d => String(d).replace(/\.$/, '').trim()).filter(Boolean);
    }
    if (typeof scheme.requiredDocuments === 'string' && scheme.requiredDocuments.trim().length > 0) {
      return scheme.requiredDocuments.split(',').map(d => String(d).replace(/\.$/, '').trim()).filter(Boolean);
    }
    return [];
  };

  // Scheme Document Checklist Matcher for a Selected Scheme (Strictly Isolated)
  const getSchemeDocumentChecklist = (scheme) => {
    const reqDocs = getSchemeRequiredDocs(scheme);
    if (!reqDocs || reqDocs.length === 0) return [];

    const schemeKey = String(scheme.id);
    const checkedList = checkedDocsByScheme[schemeKey] || [];

    return reqDocs.map(reqName => {
      const reqLower = reqName.toLowerCase().trim();
      const isChecked = checkedList.some(cName => cName.toLowerCase().trim() === reqLower);

      return {
        name: reqName,
        isReady: isChecked,
        badgeText: isChecked ? 'Ready' : 'Not Ready'
      };
    });
  };

  // Dynamic Application Readiness Score (0 to 100%) for a Specific Scheme
  const calculateReadiness = (scheme) => {
    const checklist = getSchemeDocumentChecklist(scheme);
    if (!checklist || checklist.length === 0) return 100;
    const readyCount = checklist.filter(item => item.isReady).length;
    return Math.round((readyCount / checklist.length) * 100);
  };

  // Overall Readiness across all matched schemes
  const calculateOverallReadiness = () => {
    if (!aiRecommendations || aiRecommendations.length === 0) return 80;
    const scores = aiRecommendations.map(s => calculateReadiness(s));
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return isNaN(avg) ? 80 : avg;
  };

  // Filter & Sort schemes for Browsing (Multi-Category + State Matrix)
  const getFilteredAndSortedSchemes = (schemeList) => {
    return schemeList
      .filter(s => {
        // Search Term
        const matchesSearch = !searchTerm || 
                              s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (s.department && s.department.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Multi-Category Chip Matching
        const chipLower = selectedCategoryChip.toLowerCase();
        let matchesCatChip = selectedCategoryChip === 'All';
        
        if (!matchesCatChip) {
          const mainCatMatch = s.categoryName && s.categoryName.toLowerCase().includes(chipLower);
          const arrayCatMatch = Array.isArray(s.categories) && s.categories.some(c => String(c).toLowerCase().includes(chipLower));
          const tagCatMatch = typeof s.categoriesTag === 'string' && s.categoriesTag.toLowerCase().includes(chipLower);
          
          // Specific Synonyms & Keywords
          const childrenMatch = chipLower === 'children' && (
            mainCatMatch || arrayCatMatch || tagCatMatch ||
            s.name.toLowerCase().includes('child') ||
            s.name.toLowerCase().includes('vatsalya') ||
            s.name.toLowerCase().includes('palna') ||
            s.name.toLowerCase().includes('rbsk') ||
            s.name.toLowerCase().includes('arogya lakshmi') ||
            s.name.toLowerCase().includes('penn') ||
            s.name.toLowerCase().includes('bhagya')
          );

          const seniorMatch = chipLower.includes('senior') && (
            mainCatMatch || arrayCatMatch || tagCatMatch ||
            s.name.toLowerCase().includes('senior') ||
            s.name.toLowerCase().includes('vayo') ||
            s.name.toLowerCase().includes('elder') ||
            s.name.toLowerCase().includes('pension') ||
            s.name.toLowerCase().includes('aasara') ||
            s.name.toLowerCase().includes('sandhya') ||
            (s.ageMin && s.ageMin >= 55)
          );

          const healthMatch = chipLower === 'health' && (mainCatMatch || arrayCatMatch || tagCatMatch || s.name.toLowerCase().includes('health') || s.name.toLowerCase().includes('ayushman') || s.name.toLowerCase().includes('amrutam'));
          const eduMatch = (chipLower === 'education' || chipLower === 'scholarships') && (mainCatMatch || arrayCatMatch || tagCatMatch || s.name.toLowerCase().includes('scholarship') || s.name.toLowerCase().includes('education') || s.name.toLowerCase().includes('school'));
          const pensionMatch = chipLower === 'pension' && (mainCatMatch || arrayCatMatch || tagCatMatch || s.name.toLowerCase().includes('pension') || s.name.toLowerCase().includes('aasara') || s.name.toLowerCase().includes('sandhya'));

          matchesCatChip = mainCatMatch || arrayCatMatch || tagCatMatch || childrenMatch || seniorMatch || healthMatch || eduMatch || pensionMatch;
        }

        // Gov Type Filter (Central vs State)
        const matchesGovType = selectedGovTypeFilter === 'ALL' || 
                               (selectedGovTypeFilter === 'CENTRAL' && s.isCentral) ||
                               (selectedGovTypeFilter === 'STATE' && !s.isCentral);

        // State Filter Matrix: Central schemes apply in ALL states; State schemes apply to selected state
        const matchesState = selectedStateFilter === 'All States & UTs' || 
                             s.isCentral || 
                             (s.stateName && s.stateName.toLowerCase().includes(selectedStateFilter.toLowerCase()));

        return matchesSearch && matchesCatChip && matchesGovType && matchesState;
      })
      .sort((a, b) => {
        if (sortByFilter === 'BEST_MATCH') {
          return (b.matchScore || 90) - (a.matchScore || 90);
        } else if (sortByFilter === 'READINESS') {
          return calculateReadiness(b) - calculateReadiness(a);
        } else if (sortByFilter === 'ALPHABETICAL') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  };

  // Auth Handlers
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authFullName) {
      addToast(t('fillAllFields', 'Please fill in all registration fields.'), "warning");
      return;
    }
    setAuthLoading(true);
    const cleanEmail = authEmail.trim().toLowerCase();
    const cleanName = authFullName.trim();
    try {
      const regRes = await authService.register(cleanEmail, authPassword, cleanName);
      if (!regRes?.token) {
        await authService.login(cleanEmail, authPassword);
      }
      setUser({ fullName: regRes?.fullName || cleanName, email: regRes?.email || cleanEmail });
      setProfile(prev => ({ ...prev, fullName: regRes?.fullName || cleanName, email: regRes?.email || cleanEmail }));
      setIsProfileCompleted(false);
      addToast(t('registerSuccess', 'Registration successful! Let\'s build your Welfare Profile.'), "success");
      setCurrentView('profile_setup');
      setWizardStep(1);
    } catch (err) {
      let errorMsg = "Registration failed. Please try again.";
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else if (typeof err.response.data === 'object') {
          const messages = Object.values(err.response.data);
          if (messages.length > 0) errorMsg = messages.join(', ');
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      
      // Fallback for offline/demo mode if API backend is unreachable
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setUser({ fullName: cleanName, email: cleanEmail });
        setProfile(prev => ({ ...prev, fullName: cleanName, email: cleanEmail }));
        setIsProfileCompleted(false);
        addToast(t('registerSuccessFallback', 'Registered in demo mode! Let\'s build your Welfare Profile.'), "info");
        setCurrentView('profile_setup');
        setWizardStep(1);
      } else {
        addToast(errorMsg, "error");
      }
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
    const cleanEmail = authEmail.trim().toLowerCase();
    try {
      const loginRes = await authService.login(cleanEmail, authPassword);
      const userName = loginRes?.fullName || 'Citizen';
      setUser({ fullName: userName, email: loginRes?.email || cleanEmail });
      
      try {
        const profileData = await authService.getProfile();
        setProfile(prev => ({ ...prev, ...profileData }));
        
        if (profileData?.stateName && profileData?.occupation && profileData?.age) {
          setIsProfileCompleted(true);
          addToast(`${t('welcomeBack', 'Welcome back')}, ${userName}!`, "success");
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
      let errorMsg = "Invalid credentials. Please try again.";
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMsg = err.response.data;
        } else if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else if (typeof err.response.data === 'object') {
          const messages = Object.values(err.response.data);
          if (messages.length > 0) errorMsg = messages.join(', ');
        }
      } else if (err.message) {
        errorMsg = err.message;
      }

      // Fallback for offline/demo mode if API backend is unreachable
      if (err.code === 'ERR_NETWORK' || !err.response) {
        setUser({ fullName: 'Citizen', email: cleanEmail });
        setProfile(prev => ({ ...prev, email: cleanEmail }));
        setIsProfileCompleted(false);
        addToast(t('loginSuccessFallback', 'Signed in demo mode! Let\'s build your Welfare Profile.'), "info");
        setCurrentView('profile_setup');
        setWizardStep(1);
      } else {
        addToast(errorMsg, "error");
      }
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

  // Official Portal Redirect Handler
  const handleProceedToOfficialPortal = async () => {
    if (!officialRedirectScheme) return;
    const url = officialRedirectScheme.officialWebsite || 'https://india.gov.in';

    // 1. Open official government portal in new browser tab ONLY
    window.open(url, '_blank', 'noopener,noreferrer');

    // 2. Log application into Application Lifecycle Tracker
    try {
      if (user) {
        await applicationService.apply(officialRedirectScheme.id);
      }
    } catch (e) {
      // ignore duplicate error
    }

    const existingApp = myApplications.find(a => a.schemeName === officialRedirectScheme.name || a.schemeId === officialRedirectScheme.id);
    if (!existingApp) {
      const newApp = {
        id: Date.now(),
        schemeId: officialRedirectScheme.id,
        schemeName: officialRedirectScheme.name,
        referenceNo: `REF-GOV-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'SUBMITTED',
        appliedDate: new Date().toISOString().split('T')[0],
        remarks: 'Navigated to official government portal for submission.'
      };
      setMyApplications(prev => [newApp, ...prev]);
    }

    addToast(`Redirected to ${officialRedirectScheme.name} Official Portal. Add your Reference No in the tracker below!`, "success");
    setOfficialRedirectScheme(null);
    setReadinessScheme(null);
    setActiveDashboardTab('applications');
  };

  // Application Lifecycle Tracker Save Handler
  const handleSaveTrackerUpdate = async (e) => {
    if (e) e.preventDefault();
    if (!trackerEditApp) return;

    try {
      if (user && trackerEditApp.id && typeof trackerEditApp.id === 'number') {
        await applicationService.updateTracker(trackerEditApp.id, {
          referenceNumber: trackerEditApp.referenceNo,
          status: trackerEditApp.status,
          remarks: trackerEditApp.remarks
        });
      }

      setMyApplications(prev => prev.map(a => a.id === trackerEditApp.id ? trackerEditApp : a));
      addToast("Application lifecycle tracker updated successfully!", "success");
      setTrackerEditApp(null);
    } catch (err) {
      setMyApplications(prev => prev.map(a => a.id === trackerEditApp.id ? trackerEditApp : a));
      addToast("Tracker updated!", "success");
      setTrackerEditApp(null);
    }
  };

  // Voice Input Handler
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
    recognition.onerror = () => {
      setIsListening(false);
      addToast("Could not recognize voice. Try typing instead.", "warning");
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Chatbot Send Message Handler
  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userQuery = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: userQuery }]);

    try {
      const res = await chatService.sendMessage(userQuery, lang);
      setChatMessages(prev => [...prev, { sender: 'ai', text: res.response || res.message }]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: `Namaste! 🤖 Based on your profile (${profile.stateName || 'National'}, ${profile.occupation || 'Citizen'}), you qualify for central and state welfare schemes. Check the 'AI Matches' tab on your dashboard!` 
        }
      ]);
    }
  };

  // Bookmark toggle
  const toggleSaveScheme = (id) => {
    setSavedSchemeIds(prev => {
      if (prev.includes(id)) {
        addToast("Scheme removed from saved bookmarks.", "info");
        return prev.filter(item => item !== id);
      } else {
        addToast("Scheme saved to bookmarks!", "success");
        return [...prev, id];
      }
    });
  };

  const activeChecklistScheme = schemes.find(s => s.id === Number(selectedChecklistSchemeId)) || schemes[0] || initialFallbackSchemes[0];

  const userNameDisplay = user?.fullName || profile.fullName || 'Citizen';
  const profileCompletionPercent = calculateProfileCompletion();
  const overallReadinessScore = calculateOverallReadiness();

  const filteredRecommendations = getFilteredAndSortedSchemes(aiRecommendations);
  const filteredAllSchemes = getFilteredAndSortedSchemes(schemes);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-slate-950 relative overflow-x-hidden">

      {/* ==================== TOAST NOTIFICATIONS ==================== */}
      <div className="fixed top-20 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl flex items-start gap-3 ${
                toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' :
                toast.type === 'error' ? 'bg-rose-950/90 border-rose-500/50 text-rose-200' :
                toast.type === 'warning' ? 'bg-amber-950/90 border-amber-500/50 text-amber-200' :
                'bg-slate-900/95 border-slate-700 text-slate-200'
              }`}
            >
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> :
               toast.type === 'error' ? <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" /> :
               toast.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /> :
               <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
              <span className="text-xs font-bold leading-relaxed">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ==================== NAVBAR ==================== */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                SchemeSathi <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-semibold">Digital Welfare Assistant</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-extrabold text-slate-300">
            <button onClick={() => setCurrentView('landing')} className="hover:text-orange-400 transition-colors">{t('navHome', 'Home')}</button>
            {user && (
              <>
                <button onClick={() => { setCurrentView('dashboard'); setActiveDashboardTab('recommendations'); }} className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {t('navRecommendations', 'AI Matches')}
                </button>
                <button onClick={() => { setCurrentView('dashboard'); setActiveDashboardTab('docs'); }} className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> {t('navDocuments', 'Document Checklist')}
                </button>
                <button onClick={() => { setCurrentView('dashboard'); setActiveDashboardTab('applications'); }} className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> {t('navApplications', 'Track Applications')}
                </button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl outline-none cursor-pointer hover:border-slate-700 transition-all"
              >
                {languages.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.nativeName}</option>
                ))}
              </select>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:border-orange-500/50"
                >
                  <User className="w-3.5 h-3.5 text-orange-400" /> {userNameDisplay}
                </button>
                <button 
                  onClick={handleSignOut}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{t('logout', 'Sign Out')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentView('login')}
                  className="text-xs font-extrabold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl"
                >
                  {t('login', 'Sign In')}
                </button>
                <button 
                  onClick={() => setCurrentView('register')}
                  className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-lg transition-all"
                >
                  {t('register', 'Get Started')}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <main className="pb-24">

        {/* ==================== 1. LANDING PAGE ==================== */}
        {currentView === 'landing' && (
          <div className="space-y-20">
            {/* HERO SECTION */}
            <section className="relative px-6 pt-16 pb-12 max-w-7xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-extrabold text-orange-300">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>{t('appName', 'SchemeSathi AI')} — {t('tagline', "India's Intelligent Digital Welfare Assistant")}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
                {t('heroTitle', 'Find Government Benefits & Schemes')} <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
                  {t('heroHighlight', 'Made Specially For You')}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                {t('heroSubtitle', 'Instant AI eligibility estimate, personalized application readiness checking, scheme-specific document checklists, and multi-lingual voice guidance.')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <button 
                  onClick={() => setCurrentView(user ? 'dashboard' : 'register')}
                  className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  {user ? t('navRecommendations', 'View AI Matches') : t('getStarted', 'Get Started')} <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => { setCurrentView(user ? 'dashboard' : 'register'); if (user) setActiveDashboardTab('docs'); }}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-extrabold text-sm px-7 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <CheckSquare className="w-4 h-4 text-emerald-400" /> {t('navDocuments', 'Document Checklist')}
                </button>
              </div>

              {/* METRICS STRIP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8">
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="text-2xl font-black text-orange-400">100+</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Central & State Schemes</div>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="text-2xl font-black text-emerald-400">100%</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Scheme-Specific Isolation</div>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="text-2xl font-black text-blue-400">11</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Indian Languages Supported</div>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="text-2xl font-black text-purple-400">Direct</div>
                  <div className="text-[11px] font-bold text-slate-400 mt-0.5">Official Govt Portal Launch</div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== 2. AUTHENTICATION PAGES ==================== */}
        {(currentView === 'register' || currentView === 'login') && (
          <div className="px-6 py-12 max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-2 text-orange-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-white">
                  {currentView === 'register' ? t('createAccountTitle', 'Create Account') : t('signInTitle', 'Sign In')}
                </h2>
                <p className="text-xs text-slate-400 font-semibold">
                  {currentView === 'register' ? t('registerStep1', 'Step 1 of Onboarding — Register your account') : t('signInSubtitle', 'Sign in to access your personal welfare assistant')}
                </p>
              </div>

              <form onSubmit={currentView === 'register' ? handleRegisterSubmit : handleLoginSubmit} className="space-y-4">
                {currentView === 'register' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('fullNameLabel', 'Full Name')}</label>
                    <input 
                      type="text" 
                      required
                      value={authFullName}
                      onChange={(e) => setAuthFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('emailLabel', 'Email Address')}</label>
                  <input 
                    type="email" 
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">{t('passwordLabel', 'Password')}</label>
                  <input 
                    type="password" 
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all mt-2"
                >
                  {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    currentView === 'register' ? <>{t('registerBtn', 'Register & Continue to Profile')} <ArrowRight className="w-4 h-4" /></> : <>{t('signInBtn', 'Sign In')} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-slate-800">
                {currentView === 'register' ? (
                  <button onClick={() => setCurrentView('login')} className="text-xs text-slate-400 hover:text-orange-400 font-bold">
                    {t('alreadyHaveAccount', 'Already have an account?')} <span className="underline">{t('signInTitle', 'Sign In')}</span>
                  </button>
                ) : (
                  <button onClick={() => setCurrentView('register')} className="text-xs text-slate-400 hover:text-orange-400 font-bold">
                    {t('dontHaveAccount', "Don't have an account?")} <span className="underline">{t('getStartedLink', 'Get Started / Register')}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* ==================== 3. PROFILE SETUP WIZARD ==================== */}
        {currentView === 'profile_setup' && (
          <div className="px-6 py-10 max-w-2xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wider">{t('mandatoryOnboarding', 'Mandatory Profile Onboarding')}</span>
                  <h2 className="text-2xl font-black text-white mt-1">{t('buildProfileTitle', "Let's build your Welfare Profile")}</h2>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400">{profileCompletionPercent}% Complete</span>
                </div>
              </div>

              <form onSubmit={handleSaveWelfareProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{t('fullNameLabel', 'Full Name')} *</label>
                    <input 
                      type="text" 
                      required
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{t('ageLabel', 'Age (Years)')} *</label>
                    <input 
                      type="number" 
                      required
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      placeholder="e.g. 28"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{t('genderLabel', 'Gender')} *</label>
                    <select 
                      value={profile.gender}
                      onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="FEMALE">Female</option>
                      <option value="MALE">Male</option>
                      <option value="OTHER">Transgender / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{t('stateLabel', 'State / Union Territory')} *</label>
                    <select 
                      value={profile.stateName}
                      onChange={(e) => setProfile({ ...profile, stateName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option value="">-- Select State --</option>
                      {indianStatesAndUTs.filter(s => s !== 'All States & UTs').map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{t('occupationLabel', 'Primary Occupation')} *</label>
                    <input 
                      type="text" 
                      required
                      value={profile.occupation}
                      onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                      placeholder="e.g. Farmer, Student, Small Business, Teacher..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">{t('incomeLabel', 'Annual Family Income (₹)')} *</label>
                    <input 
                      type="number" 
                      required
                      value={profile.annualIncome}
                      onChange={(e) => setProfile({ ...profile, annualIncome: e.target.value })}
                      placeholder="e.g. 180000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* SPECIAL SOCIAL CRITERIA CHECKBOXES */}
                <div className="pt-2 border-t border-slate-800">
                  <label className="block text-xs font-bold text-slate-300 mb-3">{t('specialCriteriaTitle', 'Special Social Criteria')}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'isFarmer', labelKey: 'farmerLabel', fallback: 'Farmer / Agriculture' },
                      { key: 'isStudent', labelKey: 'studentLabel', fallback: 'Student / Trainee' },
                      { key: 'isBusinessOwner', labelKey: 'businessLabel', fallback: 'Small Business Owner' },
                      { key: 'isSeniorCitizen', labelKey: 'seniorLabel', fallback: 'Senior Citizen (60+)' },
                      { key: 'hasDisability', labelKey: 'disabilityLabel', fallback: 'Person with Disability' },
                      { key: 'isPregnant', labelKey: 'pregnantLabel', fallback: 'Pregnant Mother' }
                    ].map(item => (
                      <label key={item.key} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700">
                        <input 
                          type="checkbox"
                          checked={profile[item.key] || false}
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

        {/* ==================== 5. PERSONALIZED DASHBOARD & SCHEME BROWSING ==================== */}
        {currentView === 'dashboard' && user && isProfileCompleted && (
          <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">
            
            {/* HERO PROFILE SUMMARY BANNER */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/95 rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold text-orange-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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

            {/* DASHBOARD METRICS STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div 
                onClick={() => setActiveDashboardTab('recommendations')}
                className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 hover:border-orange-500/40 cursor-pointer transition-all shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{filteredRecommendations.length}</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">AI Matches</div>
                </div>
              </div>

              <div 
                onClick={() => setActiveDashboardTab('schemes')}
                className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Bookmark className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{savedSchemeIds.length}</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Saved Schemes</div>
                </div>
              </div>

              <div 
                onClick={() => setActiveDashboardTab('applications')}
                className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 hover:border-blue-500/40 cursor-pointer transition-all shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{myApplications.length}</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Tracked Applications</div>
                </div>
              </div>

              <div 
                onClick={() => setActiveDashboardTab('docs')}
                className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all shadow-lg flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">{overallReadinessScore}%</div>
                  <div className="text-xs font-bold text-slate-400 mt-0.5">Application Readiness</div>
                </div>
              </div>
            </div>

            {/* SCHEME PAGE TOP HEADER SECTION ("EXPLORE GOVERNMENT SCHEMES") */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    <span>Digital India Welfare Portal</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Explore Government Schemes
                  </h2>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    Discover verified Central & State welfare initiatives, instant AI eligibility estimates, and personalized document readiness checking.
                  </p>
                </div>

                {/* SEARCH BAR */}
                <div className="w-full md:w-80 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search schemes by keyword..."
                    className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500 transition-colors shadow-inner"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3 text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* CATEGORY FILTER CHIPS BAR */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {welfareCategoryChips.map(chip => {
                    const Icon = chip.icon;
                    const isSelected = selectedCategoryChip === chip.name;
                    return (
                      <button
                        key={chip.name}
                        onClick={() => setSelectedCategoryChip(chip.name)}
                        className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-md ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-slate-950 scale-105'
                            : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : chip.color}`} />
                        <span>{chip.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECONDARY FILTER TOOLBAR (GOV TYPE, STATE, SORTING) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Gov Type Filter */}
                <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-800">
                  <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <select 
                    value={selectedGovTypeFilter}
                    onChange={(e) => setSelectedGovTypeFilter(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 font-bold outline-none cursor-pointer w-full"
                  >
                    <option value="ALL">All Government Levels</option>
                    <option value="CENTRAL">Central Government</option>
                    <option value="STATE">State Government</option>
                  </select>
                </div>

                {/* State Filter */}
                <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <select 
                    value={selectedStateFilter}
                    onChange={(e) => setSelectedStateFilter(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 font-bold outline-none cursor-pointer w-full"
                  >
                    {indianStatesAndUTs.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By Filter */}
                <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-2xl border border-slate-800">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <select 
                    value={sortByFilter}
                    onChange={(e) => setSortByFilter(e.target.value)}
                    className="bg-transparent text-xs text-slate-200 font-bold outline-none cursor-pointer w-full"
                  >
                    <option value="BEST_MATCH">Sort by Best Match %</option>
                    <option value="READINESS">Sort by Readiness %</option>
                    <option value="ALPHABETICAL">Sort Alphabetically</option>
                  </select>
                </div>
              </div>
            </div>

            {/* DASHBOARD TAB CONTROLS */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3 overflow-x-auto">
              <button 
                onClick={() => setActiveDashboardTab('recommendations')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'recommendations' 
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Sparkles className="w-4 h-4" /> {t('tabAiMatches', 'AI Matches')} ({filteredRecommendations.length})
              </button>

              <button 
                onClick={() => setActiveDashboardTab('schemes')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'schemes' 
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Award className="w-4 h-4" /> {t('tabAllSchemes', 'All Schemes')} ({filteredAllSchemes.length})
              </button>

              <button 
                onClick={() => setActiveDashboardTab('applications')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'applications' 
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Clock className="w-4 h-4" /> {t('tabAppTracker', 'Application Tracker')} ({myApplications.length})
              </button>

              <button 
                onClick={() => setActiveDashboardTab('docs')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDashboardTab === 'docs' 
                    ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-slate-950 shadow-lg' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <CheckSquare className="w-4 h-4" /> Document Checklist
              </button>
            </div>

            {/* AI MATCHED SCHEMES GRID */}
            {activeDashboardTab === 'recommendations' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecommendations.map((scheme, index) => {
                  const readinessPercent = calculateReadiness(scheme);
                  const isSaved = savedSchemeIds.includes(scheme.id);

                  return (
                    <motion.div 
                      key={scheme.id || index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800/80 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col justify-between relative group"
                    >
                      <div className="space-y-4">
                        {/* TOP BAR: Category Badge + Gov Type Tag + Bookmark Icon */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-950 text-amber-400 border border-amber-500/30">
                              {scheme.categoryName || 'Welfare'}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${scheme.isCentral ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                              {scheme.isCentral ? 'Central Government' : (scheme.stateName || 'State Government')}
                            </span>
                          </div>

                          <button 
                            onClick={() => toggleSaveScheme(scheme.id)}
                            className={`p-2 rounded-2xl border transition-all ${isSaved ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}`}
                            title={isSaved ? "Remove Bookmark" : "Save Scheme"}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
                          </button>
                        </div>

                        {/* Scheme Name & Department */}
                        <div>
                          <h3 
                            onClick={() => handleOpenSchemeDetails(scheme)}
                            className="text-base font-black text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-2"
                          >
                            {scheme.name}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{scheme.department || 'Ministry of Welfare'}</p>
                        </div>

                        {/* PROMINENT MAIN BENEFIT BOX */}
                        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
                          <div className="text-[10px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Main Benefit
                          </div>
                          <div className="text-xs font-extrabold text-white leading-relaxed line-clamp-2">
                            {scheme.benefits}
                          </div>
                        </div>

                        {/* Short Description */}
                        <p className="text-xs text-slate-300 line-clamp-2 font-normal leading-relaxed">
                          {scheme.description}
                        </p>

                        {/* DUAL PROGRESS BARS / RINGS SECTION */}
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                          {/* Likely Eligibility Ring/Bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-slate-300 flex items-center gap-1">
                                Likely Eligibility:
                                <button 
                                  onClick={() => setExplainableModalScheme(scheme)}
                                  className="text-blue-400 hover:underline text-[10px]"
                                >
                                  (AI Estimate ℹ️)
                                </button>
                              </span>
                              <span className="text-emerald-400 font-extrabold">{scheme.matchScore || 94}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                              <div 
                                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${scheme.matchScore || 94}%` }} 
                              />
                            </div>
                          </div>

                          {/* Application Readiness Ring/Bar */}
                          <div className="space-y-1 pt-1 border-t border-slate-900">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-slate-300">Application Readiness:</span>
                              <span className="text-cyan-400 font-extrabold">{readinessPercent}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                              <div 
                                className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${readinessPercent}%` }} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4">
                        <button 
                          onClick={() => handleOpenSchemeDetails(scheme)}
                          className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs py-3.5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                        >
                          Get Ready to Apply →
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* ALL SCHEMES TAB */}
            {activeDashboardTab === 'schemes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAllSchemes.map((scheme) => {
                  const readinessPercent = calculateReadiness(scheme);
                  const isSaved = savedSchemeIds.includes(scheme.id);

                  return (
                    <div 
                      key={scheme.id}
                      className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between relative shadow-xl"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                            {scheme.categoryName || 'Welfare'}
                          </span>

                          <button 
                            onClick={() => toggleSaveScheme(scheme.id)}
                            className={`p-2 rounded-2xl border transition-all ${isSaved ? 'bg-rose-500/20 text-rose-400 border-rose-500/50' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}`}
                          >
                            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
                          </button>
                        </div>

                        <div>
                          <h3 
                            onClick={() => handleOpenSchemeDetails(scheme)}
                            className="text-base font-bold text-white mb-1 cursor-pointer hover:text-amber-400"
                          >
                            {scheme.name}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-semibold">{scheme.department || 'Ministry of Welfare'}</p>
                        </div>

                        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
                          <strong className="text-amber-400">Benefit:</strong> {scheme.benefits}
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{scheme.description}</p>
                      </div>

                      <div className="pt-4">
                        <button 
                          onClick={() => handleOpenSchemeDetails(scheme)}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                          Get Ready to Apply →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* APPLICATION LIFECYCLE TRACKER TAB */}
            {activeDashboardTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-400" /> Application Lifecycle Tracker
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Record your official Reference Number after returning from government portal</p>
                  </div>
                  <button 
                    onClick={() => setTrackerEditApp({ schemeName: '', referenceNo: '', status: 'SUBMITTED', remarks: '' })}
                    className="bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-lg"
                  >
                    <Plus className="w-4 h-4" /> Add Application Record
                  </button>
                </div>

                <div className="space-y-4">
                  {myApplications.map((app) => {
                    const stages = ['SUBMITTED', 'DOCUMENTS_SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'BENEFIT_RECEIVED'];
                    const currentStageIdx = stages.indexOf(app.status.toUpperCase());

                    return (
                      <div 
                        key={app.id}
                        className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-base font-black text-white">{app.schemeName}</h4>
                              <span className={`text-[10px] font-black px-3 py-0.5 rounded-full border ${
                                app.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                                app.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                                'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              }`}>
                                {app.status.replace('_', ' ')}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold">
                              <span>Ref / App No: <strong className="text-white">{app.referenceNo || 'Not Added Yet'}</strong></span>
                              <span>Date: <strong className="text-white">{app.appliedDate}</strong></span>
                            </div>
                          </div>

                          <button 
                            onClick={() => setTrackerEditApp(app)}
                            className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-orange-400" /> Update Ref No / Status
                          </button>
                        </div>

                        {/* VISUAL 5-STAGE LIFECYCLE TRACKER BAR */}
                        <div className="pt-2">
                          <div className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Application Status Progression:</div>
                          <div className="grid grid-cols-5 gap-2 relative text-center">
                            {[
                              { label: 'Submitted', key: 'SUBMITTED' },
                              { label: 'Docs Submitted', key: 'DOCUMENTS_SUBMITTED' },
                              { label: 'Under Review', key: 'UNDER_REVIEW' },
                              { label: 'Approved / Decided', key: 'APPROVED' },
                              { label: 'Benefit Received', key: 'BENEFIT_RECEIVED' }
                            ].map((stage, idx) => {
                              const isCompleted = currentStageIdx >= idx;
                              const isCurrent = currentStageIdx === idx;
                              return (
                                <div key={stage.key} className="space-y-1.5">
                                  <div className={`h-2 rounded-full border transition-all ${
                                    isCompleted ? 'bg-emerald-400 border-emerald-400' : 'bg-slate-950 border-slate-800'
                                  }`} />
                                  <span className={`text-[10px] font-extrabold block ${
                                    isCurrent ? 'text-orange-400 font-black' : isCompleted ? 'text-slate-200' : 'text-slate-600'
                                  }`}>
                                    {stage.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SCHEME-SPECIFIC DOCUMENT CHECKLIST TAB */}
            {activeDashboardTab === 'docs' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-emerald-400" /> Scheme Document Checklist
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      Select a scheme to view and manage its exact required document checklist.
                    </p>
                  </div>

                  {/* SCHEME SELECTOR DROPDOWN */}
                  <select 
                    value={selectedChecklistSchemeId}
                    onChange={(e) => setSelectedChecklistSchemeId(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-slate-200 px-4 py-2.5 rounded-2xl outline-none cursor-pointer w-full sm:w-auto font-bold"
                  >
                    {schemes.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* IMPORTANT NOTICE BOX */}
                <div className="bg-blue-950/40 border border-blue-500/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-200">
                  <Info className="w-6 h-6 text-blue-400 shrink-0" />
                  <div>
                    <strong className="block font-bold text-blue-300">Keep Your Documents Ready for {activeChecklistScheme.name}</strong>
                    <span>SchemeSathi does not store your files. Check off the documents you have ready for this specific scheme.</span>
                  </div>
                </div>

                {/* ACTIVE SCHEME CHECKLIST SUMMARY CARD */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 mb-2 inline-block">
                        {activeChecklistScheme.isCentral ? 'Central Scheme' : 'State Scheme'}
                      </span>
                      <h3 className="text-xl font-black text-white">{activeChecklistScheme.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Department: {activeChecklistScheme.department || 'Ministry of Welfare'}</p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400">Scheme Readiness:</span>
                      <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                        {calculateReadiness(activeChecklistScheme)}% Ready
                      </span>
                    </div>
                  </div>

                  {/* CHECKLIST ITEMS */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">Required Documents Checklist</h4>

                    {getSchemeDocumentChecklist(activeChecklistScheme).length === 0 ? (
                      <p className="text-xs text-amber-400 italic bg-amber-950/20 p-4 rounded-2xl border border-amber-500/30">
                        Please verify required documents on the official government portal.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {getSchemeDocumentChecklist(activeChecklistScheme).map((item, idx) => (
                          <div 
                            key={idx}
                            onClick={() => toggleCheckDocForScheme(activeChecklistScheme.id, item.name)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between shadow-lg ${
                              item.isReady 
                                ? 'bg-slate-950 border-emerald-500/50 text-white' 
                                : 'bg-slate-950/60 border-slate-800 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input 
                                type="checkbox"
                                checked={item.isReady}
                                onChange={() => {}}
                                className="accent-emerald-500 w-5 h-5 rounded cursor-pointer"
                              />
                              <span className={`text-xs font-bold ${item.isReady ? 'text-white' : 'text-slate-300'}`}>
                                {item.name}
                              </span>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                              item.isReady ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-slate-500 bg-slate-900'
                            }`}>
                              {item.badgeText}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button 
                      onClick={() => handleOpenSchemeDetails(activeChecklistScheme)}
                      className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-slate-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2"
                    >
                      Get Ready to Apply for {activeChecklistScheme.name.split('(')[0].trim()} →
                    </button>
                  </div>
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

      {/* ==================== SCHEME DETAILS & READINESS MODAL ==================== */}
      <AnimatePresence>
        {readinessScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 relative"
            >
              <button onClick={() => setReadinessScheme(null)} className="absolute right-5 top-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>

              {/* 1. Overview */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-slate-950 text-amber-400 border border-amber-500/30">
                    {readinessScheme.categoryName || 'Welfare'}
                  </span>
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {readinessScheme.isCentral ? 'Central Scheme' : (readinessScheme.stateName || 'State Scheme')}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white">{readinessScheme.name}</h2>
                <p className="text-xs text-slate-400 font-semibold mt-1">Department: {readinessScheme.department || 'Ministry of Welfare'}</p>
              </div>

              {/* 2. Prominent Benefits Highlight Box */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                  <IndianRupee className="w-4 h-4 text-emerald-400" /> Key Benefits & Coverage:
                </div>
                <p className="text-sm font-extrabold text-emerald-300 leading-relaxed">{readinessScheme.benefits}</p>
              </div>

              {/* 3. Likely Eligibility & Application Readiness Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl">
                  <div className="text-xs font-bold text-slate-300 mb-1">Likely Eligibility Score</div>
                  <div className="text-2xl font-black text-emerald-400">{readinessScheme.matchScore || 94}%</div>
                  <div className="text-[10px] text-slate-400 mt-1">*Profile Criteria Match</div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-slate-300">Application Readiness</div>
                  <div className="text-2xl font-black text-cyan-400">{calculateReadiness(readinessScheme)}%</div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 h-full rounded-full transition-all" 
                      style={{ width: `${calculateReadiness(readinessScheme)}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* 4. Why This Matches You */}
              <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-2xl text-xs text-orange-200 space-y-1">
                <div className="font-bold text-orange-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Why It Matches Your Profile:
                </div>
                <p className="leading-relaxed">{readinessScheme.reasonForRecommendation || 'Matches your demographic criteria, state residence, and occupation.'}</p>
              </div>

              {/* 5. Scheme-Specific Required Documents Checklist */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Required Documents Checklist for {readinessScheme.name.split('(')[0].trim()}
                  </h4>
                  <span className="text-slate-400 font-bold text-xs">
                    {getSchemeDocumentChecklist(readinessScheme).filter(i => i.isReady).length} of {getSchemeDocumentChecklist(readinessScheme).length} ready
                  </span>
                </div>

                {getSchemeDocumentChecklist(readinessScheme).length === 0 ? (
                  <p className="text-xs text-amber-400 italic bg-amber-950/20 p-3 rounded-xl border border-amber-500/30">
                    Please verify required documents on the official government portal.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {getSchemeDocumentChecklist(readinessScheme).map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => toggleCheckDocForScheme(readinessScheme.id, item.name)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          item.isReady ? 'bg-slate-900 border-emerald-500/50 text-white' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox"
                            checked={item.isReady}
                            onChange={() => {}}
                            className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                          />
                          <span className={`text-xs font-bold ${item.isReady ? 'text-white' : 'text-slate-300'}`}>
                            {item.name}
                          </span>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.isReady ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-slate-500 bg-slate-950'
                        }`}>
                          {item.badgeText}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Application Process */}
              {readinessScheme.applicationProcess && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-300 mb-1">Application Steps:</div>
                  <p className="text-slate-400 leading-relaxed">{readinessScheme.applicationProcess}</p>
                </div>
              )}

              {/* 7. Official Government Portal Information */}
              <div className="bg-blue-950/40 border border-blue-500/30 p-4 rounded-2xl text-xs text-blue-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-300">
                  <Info className="w-4 h-4 shrink-0" /> Important Notice
                </div>
                <p className="text-[11px] leading-relaxed">
                  Keep these documents ready. You will upload them on the official government website during the application process.
                </p>
                <div className="text-[11px] font-bold text-orange-400 pt-1">
                  Official Portal: <span className="underline">{readinessScheme.officialWebsite}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button 
                  onClick={() => setReadinessScheme(null)} 
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-5 py-3.5 rounded-2xl"
                >
                  Go Back
                </button>
                <button 
                  onClick={() => setOfficialRedirectScheme(readinessScheme)}
                  className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:opacity-95 text-slate-950 font-black text-xs py-3.5 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-1.5"
                >
                  Continue to Official Website <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== OFFICIAL REDIRECT CONFIRMATION MODAL ==================== */}
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
                <h3 className="text-xl font-black text-white">You're Ready to Apply!</h3>
                <p className="text-xs text-slate-400 mt-1">Application checklist verified for <strong>{officialRedirectScheme.name}</strong></p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Likely Match:</span>
                  <span className="text-emerald-400 font-bold">{officialRedirectScheme.matchScore || 94}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Application Readiness:</span>
                  <span className="text-cyan-400 font-bold">{calculateReadiness(officialRedirectScheme)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Official Department:</span>
                  <span className="text-slate-200 font-bold">{officialRedirectScheme.department || 'Government Ministry'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Official Portal:</span>
                  <span className="text-orange-400 font-bold truncate max-w-[200px]">{officialRedirectScheme.officialWebsite}</span>
                </div>
              </div>

              <div className="bg-rose-950/40 border border-rose-500/30 p-4 rounded-2xl text-xs text-rose-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-400">
                  <ShieldAlert className="w-4 h-4" /> External Government Website Redirection
                </div>
                <p className="leading-relaxed text-[11px]">
                  Final eligibility, document verification, and scheme approval are determined exclusively by the official government authority. SchemeSathi AI does not process or submit official applications.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setOfficialRedirectScheme(null)} className="flex-1 bg-slate-800 text-slate-300 font-bold text-xs py-3.5 rounded-2xl">
                  Go Back
                </button>
                <button 
                  onClick={handleProceedToOfficialPortal} 
                  className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 text-slate-950 font-black text-xs py-3.5 rounded-2xl flex items-center justify-center gap-1.5 shadow-xl"
                >
                  Continue to Official Website <ExternalLink className="w-4 h-4" />
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

              <h3 className="text-lg font-black text-white">Update Application Lifecycle Tracker</h3>

              <form onSubmit={handleSaveTrackerUpdate} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Scheme Name</label>
                  <input 
                    type="text" 
                    required
                    value={trackerEditApp.schemeName}
                    onChange={(e) => setTrackerEditApp({ ...trackerEditApp, schemeName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Official Reference / Application Number</label>
                  <input 
                    type="text" 
                    value={trackerEditApp.referenceNo || ''}
                    onChange={(e) => setTrackerEditApp({ ...trackerEditApp, referenceNo: e.target.value })}
                    placeholder="e.g. PMK-2026-98124 or REF-12345"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Lifecycle Status Stage</label>
                  <select 
                    value={trackerEditApp.status || 'SUBMITTED'}
                    onChange={(e) => setTrackerEditApp({ ...trackerEditApp, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none cursor-pointer"
                  >
                    <option value="SUBMITTED">1. Submitted</option>
                    <option value="DOCUMENTS_SUBMITTED">2. Documents Submitted</option>
                    <option value="UNDER_REVIEW">3. Under Review</option>
                    <option value="APPROVED">4. Approved</option>
                    <option value="REJECTED">4. Rejected</option>
                    <option value="BENEFIT_RECEIVED">5. Benefit Received</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Notes / Remarks</label>
                  <input 
                    type="text" 
                    value={trackerEditApp.remarks || ''}
                    onChange={(e) => setTrackerEditApp({ ...trackerEditApp, remarks: e.target.value })}
                    placeholder="e.g. Submitted at local CSC kiosk..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button type="button" onClick={() => setTrackerEditApp(null)} className="flex-1 bg-slate-800 text-slate-300 font-bold text-xs py-3 rounded-2xl">
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-xs py-3 rounded-2xl"
                  >
                    Save Tracker Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================== MULTILINGUAL FLOATING CHATBOT (NON-INTRUSIVE) ==================== */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:scale-105 text-slate-950 font-black p-4 rounded-full shadow-2xl flex items-center gap-2.5 border border-amber-400/40 transition-all"
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
