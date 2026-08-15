-- Populate Roles
INSERT INTO roles (id, name) VALUES (1, 'ROLE_CITIZEN') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO roles (id, name) VALUES (2, 'ROLE_ADMIN') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO roles (id, name) VALUES (3, 'ROLE_SUPER_ADMIN') ON DUPLICATE KEY UPDATE name=name;

-- Populate States & UTs (All 28 States + 8 Union Territories + National/Central)
INSERT INTO states (id, name) VALUES (1, 'Telangana') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (2, 'Karnataka') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (3, 'Tamil Nadu') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (4, 'Andhra Pradesh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (5, 'Gujarat') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (6, 'National (Central)') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (7, 'Arunachal Pradesh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (8, 'Assam') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (9, 'Bihar') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (10, 'Chhattisgarh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (11, 'Goa') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (12, 'Haryana') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (13, 'Himachal Pradesh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (14, 'Jharkhand') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (15, 'Kerala') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (16, 'Madhya Pradesh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (17, 'Maharashtra') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (18, 'Manipur') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (19, 'Meghalaya') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (20, 'Mizoram') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (21, 'Nagaland') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (22, 'Odisha') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (23, 'Punjab') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (24, 'Rajasthan') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (25, 'Sikkim') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (26, 'Tripura') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (27, 'Uttar Pradesh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (28, 'Uttarakhand') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (29, 'West Bengal') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (30, 'Andaman and Nicobar Islands') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (31, 'Chandigarh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (32, 'Dadra and Nagar Haveli and Daman and Diu') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (33, 'Delhi (NCT)') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (34, 'Jammu and Kashmir') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (35, 'Ladakh') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (36, 'Lakshadweep') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO states (id, name) VALUES (37, 'Puducherry') ON DUPLICATE KEY UPDATE name=name;

-- Populate Districts
INSERT INTO districts (id, name, state_id) VALUES (1, 'Hyderabad', 1) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (2, 'Medchal-Malkajgiri', 1) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (3, 'Warangal', 1) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (4, 'Bengaluru Urban', 2) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (5, 'Mysuru', 2) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (6, 'Chennai', 3) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (7, 'Coimbatore', 3) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (8, 'Visakhapatnam', 4) ON DUPLICATE KEY UPDATE name=name;
INSERT INTO districts (id, name, state_id) VALUES (9, 'Ahmedabad', 5) ON DUPLICATE KEY UPDATE name=name;

-- Populate Categories
INSERT INTO categories (id, name, icon, description) VALUES (1, 'Agriculture', 'sprout', 'Farmer subsidies, fertilizers, crop insurance, and irrigation support') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (2, 'Health', 'heart-pulse', 'Health insurance, medical treatments, free surgeries, and immunization') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (3, 'Education', 'graduation-cap', 'Scholarships, fee reimbursement, laptop distribution, and textbooks') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (4, 'Women Welfare', 'user-round-plus', 'Loans, entrepreneurship grants, maternity benefits, and pensions') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (5, 'Child Welfare', 'baby', 'Nutrition, savings schemes, orphan assistance, and primary care') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (6, 'Senior Citizen', 'accessibility', 'Old age pensions, concessions, healthcare benefits, and housing assistance') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (7, 'Disability Support', 'handicap', 'Disability pensions, assistive devices, accessible transport, and jobs') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (8, 'Employment', 'briefcase', 'Job search portals, apprenticeships, MSME loans, and startup assistance') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (9, 'Housing', 'home', 'Affordable housing, toilet construction, and home renovation grants') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (10, 'Energy & Environment', 'sun', 'Solar panel subsidies, EV incentives, and rain water harvesting') ON DUPLICATE KEY UPDATE name=name;

-- Populate Government Schemes
-- 1. PM-Kisan (Central - Agriculture)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (1, 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', TRUE, NULL, NULL, 1, 
'Central government initiative that provides direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across the country.',
'₹6,000 per year directly credited into the bank accounts of farmers in three equal installments of ₹2,000.',
'Must be a farmer, must own cultivable land, should not be an income tax payer, and should not hold institutional positions.',
NULL, 18, 100, 'ALL', 'FARMER',
'Aadhaar Card, Land Holding Records (Patta Passbook), Bank Passbook copy, Mobile Number.',
'Apply online on PM-Kisan portal (pmkisan.gov.in) or visit nearest Common Service Centre (CSC).',
'ONLINE', 'https://pmkisan.gov.in', '155261 / 1800115526', '2026-12-31', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 2. PM-JAY Ayushman Bharat (Central - Health)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (2, 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)', TRUE, NULL, NULL, 2,
'The largest health assurance scheme in the world which aims to provide a health cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.',
'Cashless health insurance cover up to ₹5,00,000 per family per year for secondary and tertiary hospitalization.',
'Identified as vulnerable or low-income family based on SECC 2011 data, or families holding active Ration Card (NFSA).',
180000, 0, 120, 'ALL', 'ALL',
'Aadhaar Card, Ration Card, Identity proof, Income certificate.',
'Verify eligibility on pmjay.gov.in, visit an empanelled hospital or Ayushman kiosk to receive the Golden Card.',
'HYBRID', 'https://pmjay.gov.in', '14555 / 1800111565', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 3. PM Scholarship Scheme (Central - Education)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (3, 'Prime Minister Scholarship Scheme (PMSS)', TRUE, NULL, NULL, 3,
'Scheme to encourage higher technical and professional education for the dependent wards and widows of Ex-Servicemen / Ex-Coast Guard personnel.',
'₹3,000 per month for girls and ₹2,500 per month for boys enrolled in professional courses.',
'Must be a student, ward/widow of an Ex-Serviceman. Min 60% marks in Class 12/Diploma/Graduation.',
NULL, 17, 30, 'ALL', 'STUDENT',
'Ex-Servicemen Certificate, Class 12 mark sheet, Admission receipt, Bank Passbook, Aadhaar card.',
'Register on National Scholarship Portal (NSP), select PMSS under Ministry of Home Affairs / Defence, and submit.',
'ONLINE', 'https://scholarships.gov.in', '011-26151564', '2026-11-30', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 4. Rythu Bandhu (Telangana - Agriculture)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (4, 'Rythu Bandhu Scheme (Telangana)', FALSE, 1, NULL, 1,
'Agriculture Investment Support Scheme by Telangana Govt to incentivize crop productivity and support farmers direct financial assistance twice a year.',
'Investment support of ₹5,000 per acre per season (Kharif and Rabi) for purchasing seeds, fertilizer, and agricultural inputs.',
'Must own agricultural land in Telangana. Registered landholder in Rythu Bandhu database.',
NULL, 18, 90, 'ALL', 'FARMER',
'Pattadar Dharani Passbook, Aadhaar Card, Bank Account linked to Aadhaar.',
'Eligible farmers submit details to Agriculture Extension Officers (AEO) or update land record on Dharani portal.',
'OFFLINE', 'https://dharani.telangana.gov.in', '1800 599 1200', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 5. Gruha Lakshmi (Karnataka - Women Welfare)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (5, 'Gruha Lakshmi Scheme (Karnataka)', FALSE, 2, NULL, 4,
'Karnataka government welfare scheme designed to provide financial assistance to the female heads of household in the state.',
'Monthly financial assistance of ₹2,000 directly credited via DBT to the bank account of the designated female head of family.',
'Resident of Karnataka. Woman registered as head of family in BPL, APL, or Antyodaya Ration Cards. Husband must not be an income tax payer.',
NULL, 18, 120, 'FEMALE', 'ALL',
'Ration Card (BPL/APL), Aadhaar Card of self and husband, Mobile linked to Aadhaar, Bank Passbook.',
'Register at Karnataka One, Grama One, or Bangalore One centers. Online submission available on Seva Sindhu.',
'HYBRID', 'https://sevasindhugs.karnataka.gov.in', '1902', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 6. Pudhumai Penn (Tamil Nadu - Education / Women)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (6, 'Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme)', FALSE, 3, NULL, 3,
'Tamil Nadu scheme supporting girls from government schools to pursue higher education in colleges, universities, or polytechnics without dropouts.',
'₹1,000 per month directly deposited into the student’s bank account until completion of her degree/diploma.',
'Female student who studied from Class 6 to 12 in Government Schools of Tamil Nadu. Admitted to higher education course.',
NULL, 17, 25, 'FEMALE', 'STUDENT',
'School Transfer Certificate (TC), Class 10/12 Marksheets, College ID Card, Aadhaar Card, Bank Passbook.',
'Apply online through the Pudhumai Penn web portal (penkalvi.tn.gov.in) with college node approval.',
'ONLINE', 'https://penkalvi.tn.gov.in', '14417', '2026-10-15', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 7. Mukhya Mantri Amrutam (Gujarat - Health)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (7, 'Mukhya Mantri Amrutam (MA) Yojana (Gujarat)', FALSE, 5, NULL, 2,
'Gujarat state government scheme that provides tertiary medical care and treatment to below poverty line (BPL) and middle-income families.',
'Cashless medical treatment cover up to ₹5,00,000 per family per year for serious illnesses including cardiovascular, renal, and neurological diseases.',
'Resident of Gujarat. Family annual income less than ₹4,00,000 or holding a BPL card.',
400000, 0, 100, 'ALL', 'ALL',
'Income Certificate, Aadhaar Card, BPL Card (if applicable), Voter ID.',
'Visit the civic center or taluka kiosk, submit details, capture biometrics, and receive the MA Card.',
'OFFLINE', 'http://www.magujarat.com', '18002331022', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 8. PM Mudra Yojana (Central - Employment / Business)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (8, 'Pradhan Mantri MUDRA Yojana (PMMY)', TRUE, NULL, NULL, 8,
'A scheme launched to provide loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises to help start or expand businesses.',
'Collateral-free business loans: Shishu (up to ₹50,000), Kishor (₹50,001 to ₹5 Lakhs), and Tarun (₹5,00,001 to ₹10 Lakhs).',
'Indian citizen seeking to start or grow a micro-enterprise. Must not have defaulted on any bank loan.',
NULL, 18, 65, 'ALL', 'ALL',
'Aadhaar, PAN Card, Business Address Proof, Quotation of Machinery/Assets, Bank Statement.',
'Apply online at Udyamimitra portal or visit any commercial, cooperative, regional, or microfinance bank branch.',
'HYBRID', 'https://www.mudra.org.in', '18001801111', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 9. PM Awas Yojana - Urban (Central - Housing)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (9, 'Pradhan Mantri Awas Yojana (PMAY) - Urban', TRUE, NULL, NULL, 9,
'Affordable housing mission by Central government which targets providing houses for all in urban areas with basic amenities.',
'Interest subsidy of up to 6.5% on housing loans or direct financial assistance of ₹1.5 Lakhs for construction of houses.',
'Families with annual income up to ₹18 lakhs depending on category (EWS/LIG/MIG). Family must not own a pucca house in India.',
1800000, 18, 90, 'ALL', 'ALL',
'Aadhaar Card, Income Proof, Affidavit of not owning a house, Bank details, Address proof.',
'Apply online via pmaymis.gov.in or register at local municipal corporation offices.',
'ONLINE', 'https://pmaymis.gov.in', '1800113300', '2026-12-31', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 10. Atal Pension Yojana (Central - Senior Citizen / Pension)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (10, 'Atal Pension Yojana (APY)', TRUE, NULL, NULL, 6,
'Pension scheme for citizens of India focused on unorganized sector workers, offering guaranteed pension after 60 years based on contributions.',
'Guaranteed minimum pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at the age of 60, depending on contributions.',
'Indian citizen between 18 and 40 years. Must have a savings bank account. Must not be a taxpayer.',
NULL, 18, 40, 'ALL', 'ALL',
'Aadhaar Card, Mobile Number, Bank Savings Account Details.',
'Visit the bank where savings account is held, fill APY form, choose auto-debit contribution option.',
'OFFLINE', 'https://www.npscra.nsdl.co.in', '1800110069', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;
