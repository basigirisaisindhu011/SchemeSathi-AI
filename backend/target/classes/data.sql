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
INSERT INTO categories (id, name, icon, description) VALUES (5, 'Child Welfare', 'baby', 'Nutrition, crèche, orphan support, and primary care') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (6, 'Senior Citizen', 'accessibility', 'Old age pensions, concessions, healthcare benefits, and assistance') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (7, 'Disability Support', 'handicap', 'Disability pensions, assistive devices, accessible transport, and jobs') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (8, 'Employment', 'briefcase', 'Job search portals, apprenticeships, MSME loans, and startup assistance') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (9, 'Housing', 'home', 'Affordable housing, toilet construction, and home renovation grants') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO categories (id, name, icon, description) VALUES (10, 'Energy & Environment', 'sun', 'Solar panel subsidies, EV incentives, and rain water harvesting') ON DUPLICATE KEY UPDATE name=name;

-- Populate Government Schemes (Expanded Verified Dataset)

-- 1. PM-Kisan (Central - Agriculture)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (1, 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', TRUE, NULL, NULL, 1, 
'Central government initiative that provides direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across the country.',
'₹6,000 per year directly credited into the bank accounts of farmers in three equal installments of ₹2,000.',
'Must be a farmer, must own cultivable land, should not be an income tax payer, and should not hold institutional positions.',
NULL, 18, 100, 'ALL', 'FARMER', 'Agriculture, Farmers',
'Aadhaar Card, Land Holding Records (Patta Passbook), Bank Passbook copy, Mobile Number.',
'Apply online on PM-Kisan portal (pmkisan.gov.in) or visit nearest Common Service Centre (CSC).',
'ONLINE', 'https://pmkisan.gov.in', '155261 / 1800115526', '2026-12-31', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 2. PM-JAY Ayushman Bharat (Central - Health)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (2, 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)', TRUE, NULL, NULL, 2,
'The largest health assurance scheme in the world which aims to provide a health cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.',
'Cashless health insurance cover up to ₹5,00,000 per family per year for secondary and tertiary hospitalization.',
'Identified as vulnerable or low-income family based on SECC 2011 data, or families holding active Ration Card (NFSA).',
180000, 0, 120, 'ALL', 'ALL', 'Health, Insurance, Healthcare',
'Aadhaar Card, Ration Card, Identity proof, Income certificate.',
'Verify eligibility on pmjay.gov.in, visit an empanelled hospital or Ayushman kiosk to receive the Golden Card.',
'HYBRID', 'https://pmjay.gov.in', '14555 / 1800111565', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 3. PM Scholarship Scheme (Central - Education)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (3, 'Prime Minister Scholarship Scheme (PMSS)', TRUE, NULL, NULL, 3,
'Scheme to encourage higher technical and professional education for the dependent wards and widows of Ex-Servicemen / Ex-Coast Guard personnel.',
'₹3,000 per month for girls and ₹2,500 per month for boys enrolled in professional courses.',
'Must be a student, ward/widow of an Ex-Serviceman. Min 60% marks in Class 12/Diploma/Graduation.',
NULL, 17, 30, 'ALL', 'STUDENT', 'Education, Scholarships, Students',
'Ex-Servicemen Certificate, Class 12 mark sheet, Admission receipt, Bank Passbook, Aadhaar card.',
'Register on National Scholarship Portal (NSP), select PMSS under Ministry of Home Affairs / Defence, and submit.',
'ONLINE', 'https://scholarships.gov.in', '011-26151564', '2026-11-30', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 4. Rythu Bandhu (Telangana - Agriculture)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (4, 'Rythu Bandhu Scheme (Telangana)', FALSE, 1, NULL, 1,
'Agriculture Investment Support Scheme by Telangana Govt to incentivize crop productivity and support farmers direct financial assistance twice a year.',
'Investment support of ₹5,000 per acre per season (Kharif and Rabi) for purchasing seeds, fertilizer, and agricultural inputs.',
'Must own agricultural land in Telangana. Registered landholder in Rythu Bandhu database.',
NULL, 18, 90, 'ALL', 'FARMER', 'Agriculture, Farmers',
'Pattadar Dharani Passbook, Aadhaar Card, Bank Account linked to Aadhaar.',
'Eligible farmers submit details to Agriculture Extension Officers (AEO) or update land record on Dharani portal.',
'OFFLINE', 'https://dharani.telangana.gov.in', '1800 599 1200', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 5. Gruha Lakshmi (Karnataka - Women Welfare)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (5, 'Gruha Lakshmi Scheme (Karnataka)', FALSE, 2, NULL, 4,
'Karnataka government welfare scheme designed to provide financial assistance to the female heads of household in the state.',
'Monthly financial assistance of ₹2,000 directly credited via DBT to the bank account of the designated female head of family.',
'Resident of Karnataka. Woman registered as head of family in BPL, APL, or Antyodaya Ration Cards. Husband must not be an income tax payer.',
NULL, 18, 120, 'FEMALE', 'ALL', 'Women, Pension',
'Ration Card (BPL/APL), Aadhaar Card of self and husband, Mobile linked to Aadhaar, Bank Passbook.',
'Register at Karnataka One, Grama One, or Bangalore One centers. Online submission available on Seva Sindhu.',
'HYBRID', 'https://sevasindhugs.karnataka.gov.in', '1902', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 6. Pudhumai Penn (Tamil Nadu - Education / Women)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (6, 'Pudhumai Penn Scheme (Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme)', FALSE, 3, NULL, 3,
'Tamil Nadu scheme supporting girls from government schools to pursue higher education in colleges, universities, or polytechnics without dropouts.',
'₹1,000 per month directly deposited into the student’s bank account until completion of her degree/diploma.',
'Female student who studied from Class 6 to 12 in Government Schools of Tamil Nadu. Admitted to higher education course.',
NULL, 17, 25, 'FEMALE', 'STUDENT', 'Scholarships, Women, Education, Children',
'School Transfer Certificate (TC), Class 10/12 Marksheets, College ID Card, Aadhaar Card, Bank Passbook.',
'Apply online through the Pudhumai Penn web portal (penkalvi.tn.gov.in) with college node approval.',
'ONLINE', 'https://penkalvi.tn.gov.in', '14417', '2026-10-15', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 7. Mukhya Mantri Amrutam (Gujarat - Health)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (7, 'Mukhya Mantri Amrutam (MA) Yojana (Gujarat)', FALSE, 5, NULL, 2,
'Gujarat state government scheme that provides tertiary medical care and treatment to below poverty line (BPL) and middle-income families.',
'Cashless medical treatment cover up to ₹5,00,000 per family per year for serious illnesses including cardiovascular, renal, and neurological diseases.',
'Resident of Gujarat. Family annual income less than ₹4,00,000 or holding a BPL card.',
400000, 0, 100, 'ALL', 'ALL', 'Health, Insurance',
'Income Certificate, Aadhaar Card, BPL Card (if applicable), Voter ID.',
'Visit the civic center or taluka kiosk, submit details, capture biometrics, and receive the MA Card.',
'OFFLINE', 'http://www.magujarat.com', '18002331022', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 8. PM Mudra Yojana (Central - Employment / Business)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (8, 'Pradhan Mantri MUDRA Yojana (PMMY)', TRUE, NULL, NULL, 8,
'A scheme launched to provide loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises to help start or expand businesses.',
'Collateral-free business loans: Shishu (up to ₹50,000), Kishor (₹50,001 to ₹5 Lakhs), and Tarun (₹5,00,001 to ₹10 Lakhs).',
'Indian citizen seeking to start or grow a micro-enterprise. Must not have defaulted on any bank loan.',
NULL, 18, 65, 'ALL', 'ALL', 'Business, Employment',
'Aadhaar, PAN Card, Business Address Proof, Quotation of Machinery/Assets, Bank Statement.',
'Apply online at Udyamimitra portal or visit any commercial, cooperative, regional, or microfinance bank branch.',
'HYBRID', 'https://www.mudra.org.in', '18001801111', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 9. PM Awas Yojana - Urban (Central - Housing)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (9, 'Pradhan Mantri Awas Yojana (PMAY) - Urban', TRUE, NULL, NULL, 9,
'Affordable housing mission by Central government which targets providing houses for all in urban areas with basic amenities.',
'Interest subsidy of up to 6.5% on housing loans or direct financial assistance of ₹1.5 Lakhs for construction of houses.',
'Families with annual income up to ₹18 lakhs depending on category (EWS/LIG/MIG). Family must not own a pucca house in India.',
1800000, 18, 90, 'ALL', 'ALL', 'Housing',
'Aadhaar Card, Income Proof, Affidavit of not owning a house, Bank details, Address proof.',
'Apply online via pmaymis.gov.in or register at local municipal corporation offices.',
'ONLINE', 'https://pmaymis.gov.in', '1800113300', '2026-12-31', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 10. Atal Pension Yojana (Central - Senior Citizen / Pension)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (10, 'Atal Pension Yojana (APY)', TRUE, NULL, NULL, 6,
'Pension scheme for citizens of India focused on unorganized sector workers, offering guaranteed pension after 60 years based on contributions.',
'Guaranteed minimum pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at the age of 60, depending on contributions.',
'Indian citizen between 18 and 40 years. Must have a savings bank account. Must not be a taxpayer.',
NULL, 18, 40, 'ALL', 'ALL', 'Pension, Senior Citizens',
'Aadhaar Card, Mobile Number, Bank Savings Account Details.',
'Visit the bank where savings account is held, fill APY form, choose auto-debit contribution option.',
'OFFLINE', 'https://www.npscra.nsdl.co.in', '1800110069', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 11. Mission Vatsalya Child Protection Scheme (Central - Children)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (11, 'Mission Vatsalya Child Protection Scheme', TRUE, NULL, NULL, 5,
'Central Child Protection Services Scheme providing institutional care, non-institutional sponsorship of ₹4,000/month, foster care, and emergency child helpline (1098).',
'Monthly financial sponsorship of ₹4,000 per child, free shelter home care, education, and vocational training.',
'Children aged 0-18 in difficult circumstances, orphans, destitute children, or single-parent households with family income under ₹96,000.',
96000, 0, 18, 'ALL', 'ALL', 'Children, Child Protection, Nutrition',
'Child Birth Certificate, Parent/Guardian Aadhaar Card, Income Certificate, Orphan/Single Parent Certificate.',
'Apply through District Child Protection Unit (DCPU) or Child Welfare Committee (CWC).',
'HYBRID', 'https://wcd.nic.in/mission-vatsalya', '1098', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 12. Palna Anganwadi-cum-Crèche Scheme (Central - Children)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (12, 'Palna Anganwadi-cum-Crèche Scheme', TRUE, NULL, NULL, 5,
'Provides day-care facilities, nutritional support, early childhood education, and health check-ups for children of working mothers.',
'Free day crèche care, supplementary nutrition, growth monitoring, and immunization support for infants and toddlers.',
'Children aged 6 months to 6 years of working mothers across rural and urban areas.',
NULL, 0, 6, 'ALL', 'ALL', 'Children, Employment, Women',
'Mother Aadhaar Card, Child Birth Certificate, Employment Proof of Mother, Immunization Card.',
'Register at local Anganwadi-cum-Crèche center.',
'OFFLINE', 'https://wcd.nic.in', '011-23386423', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 13. PM CARES for Children Scheme (Central - Children)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (13, 'PM CARES for Children Scheme', TRUE, NULL, NULL, 5,
'Comprehensive support scheme for children who lost both parents or legal guardians during the COVID-19 pandemic.',
'Corpus of ₹10 Lakhs at age 18, monthly stipend from age 18 to 23, Ayushman Bharat health insurance of ₹5 Lakhs, and free school education.',
'Children who lost both parents or surviving parent between 11 March 2020 and 28 February 2022.',
NULL, 0, 23, 'ALL', 'ALL', 'Children, Education, Health',
'Death Certificates of Parents, Child Birth Certificate, Aadhaar Card, Guardian Bank Account Details.',
'Register on PM CARES for Children portal (pmcaresforchildren.in) via District Magistrate.',
'ONLINE', 'https://pmcaresforchildren.in', '011-23382743', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 14. Rashtriya Bal Swasthya Karyakram RBSK (Central - Children / Health)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (14, 'Rashtriya Bal Swasthya Karyakram (RBSK)', TRUE, NULL, NULL, 2,
'Early health screening and intervention programme for children (0-18 years) covering 4 Ds: Defects at birth, Diseases, Deficiencies, and Development delays.',
'Free health screening, free surgical interventions, specialized medical treatments, and assistive devices.',
'All children aged 0 to 18 years enrolled in Anganwadis and Government / Govt-Aided schools.',
NULL, 0, 18, 'ALL', 'ALL', 'Children, Health, Disability',
'Child Aadhaar Card / School ID, Birth Certificate, Ration Card.',
'Screening conducted by Mobile Health Teams at Anganwadis and schools; referrals sent to District Early Intervention Centres (DEIC).',
'HYBRID', 'https://nhm.gov.in', '18001801104', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 15. Arogya Lakshmi Scheme (Telangana - Children / Women)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (15, 'Arogya Lakshmi Scheme (Telangana)', FALSE, 1, NULL, 5,
'Telangana state welfare scheme supplying nutritious one full meal, 200ml milk, and eggs to pregnant women, lactating mothers, and children below 6 years.',
'Daily hot cooked meal, 200ml milk, 16-30 eggs monthly, and Balamrutham food supplement for infants.',
'Children aged 7 months to 6 years, pregnant women, and lactating mothers residing in Telangana.',
NULL, 0, 6, 'ALL', 'ALL', 'Children, Women, Health, Nutrition',
'Mother Aadhaar Card, Child Birth Certificate, Telangana Residence Proof, Anganwadi Registration Form.',
'Register at nearest Telangana Anganwadi Center.',
'OFFLINE', 'https://wdcw.tg.nic.in', '040-23733665', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 16. Chief Minister Girl Child Protection Scheme (Tamil Nadu - Children / Women)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (16, 'Chief Minister Girl Child Protection Scheme (Tamil Nadu)', FALSE, 3, NULL, 5,
'Tamil Nadu scheme promoting small family norms, gender equality, and financial deposit for higher education of girl children.',
'Fixed deposit of ₹50,000 for single girl child (or ₹25,000 each for 2 girl children) maturing with interest at age 18.',
'Resident of Tamil Nadu, family annual income up to ₹72,000, 1 or 2 girl children only.',
72000, 0, 18, 'FEMALE', 'ALL', 'Children, Women, Girl Child',
'Birth Certificates of Girl Children, Parent Sterilization Certificate, Income Certificate (below ₹72,000), Tamil Nadu Domicile Certificate.',
'Apply through Social Welfare Extension Officer or e-Sevai Center.',
'HYBRID', 'https://www.tn.gov.in/scheme/data_view/44078', '18004250191', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 17. Palak Mata-Pita Yojana (Gujarat - Children)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (17, 'Palak Mata-Pita Yojana (Gujarat)', FALSE, 5, NULL, 5,
'Financial assistance by Gujarat Social Defense Department to foster parents caring for orphan children to ensure schooling.',
'Monthly financial aid of ₹3,000 per child credited into foster parent bank account until age 18.',
'Orphan children below 18 years residing with foster parents/relatives in Gujarat. Family annual income limit ₹27,000 (rural) / ₹36,000 (urban).',
36000, 0, 18, 'ALL', 'ALL', 'Children, Education, Pension',
'Parents Death Certificate, Child Birth Certificate, Foster Parent Aadhaar Card, Income Certificate.',
'Apply at District Social Defense Officer (SDO) office or Digital Gujarat portal.',
'HYBRID', 'https://sje.gujarat.gov.in', '18002335500', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 18. Bhagyalakshmi Scheme (Karnataka - Children / Girl Child)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (18, 'Bhagyalakshmi Scheme (Karnataka)', FALSE, 2, NULL, 5,
'Karnataka welfare scheme providing financial security, health insurance, and educational support to girl children of BPL families.',
'Maturity amount of ₹1 Lakh at age 18, annual scholarships from Class 1 to 10, and health insurance cover up to ₹25,000/yr.',
'Girl child born to BPL families in Karnataka enrolled within 1 year of birth. Max 2 girls per family.',
NULL, 0, 18, 'FEMALE', 'ALL', 'Children, Women, Girl Child, Health',
'BPL Ration Card, Child Birth Certificate, Parent Aadhaar Card, Karnataka Domicile Certificate.',
'Register through local Anganwadi Worker within 1 year of girl child birth.',
'OFFLINE', 'https://dwcd.karnataka.gov.in', '180042535533', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 19. Atal Vayo Abhyuday Yojana AVYAY (Central - Senior Citizen)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (19, 'Atal Vayo Abhyuday Yojana (AVYAY)', TRUE, NULL, NULL, 6,
'Central umbrella scheme for senior citizens providing shelter, food, healthcare, and capacity building for productive ageing.',
'Free stay, nutritious food, medical care, and continuous care facilities at Senior Citizen Homes.',
'Indigent elderly aged 60 years and above with no family income or support.',
NULL, 60, 120, 'ALL', 'ALL', 'Senior Citizens, Housing, Health',
'Aadhaar Card / Senior Citizen ID, BPL Ration Card / Income Certificate, Passport Photo.',
'Apply through empanelled NGOs or District Social Welfare Officer.',
'HYBRID', 'https://socialjustice.gov.in', '14567', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 20. Rashtriya Vayoshri Yojana RVY (Central - Senior Citizen / Disability)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (20, 'Rashtriya Vayoshri Yojana (RVY)', TRUE, NULL, NULL, 6,
'Provides free physical aids and assisted-living devices to senior citizens suffering from age-related disabilities or infirmities.',
'Free wheelchairs, walking sticks, crutches, hearing aids, spectacles, artificial dentures, and elbow crutches.',
'Senior citizens aged 60+ belonging to BPL category or monthly income up to ₹15,000.',
180000, 60, 120, 'ALL', 'ALL', 'Senior Citizens, Disability, Health',
'Aadhaar Card / Senior Citizen ID, BPL Card / Income Certificate (below ₹15,000/mo), Medical Certificate for Disability.',
'Attend RVY assessment camps organized by ALIMCO / District Administration.',
'OFFLINE', 'https://alimco.in', '18001805129', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 21. Elderline 14567 National Helpline (Central - Senior Citizen)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (21, 'Elderline 14567 National Helpline for Senior Citizens', TRUE, NULL, NULL, 6,
'Toll-free National Helpline (14567) providing free information, emotional support, field rescue of destitute elderly, and legal guidance.',
'Free 24/7 helpline guidance (14567), emergency rescue, elder abuse intervention, and pension status assistance.',
'All senior citizens aged 60+ in India and their caregivers.',
NULL, 60, 120, 'ALL', 'ALL', 'Senior Citizens, Health',
'Please confirm the required documents on the official government portal.',
'Call toll-free helpline number 14567 anywhere in India.',
'ONLINE', 'https://elderline.dosje.gov.in', '14567', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 22. IGNOAPS Old Age Pension (Central - Senior Citizen / Pension)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (22, 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)', TRUE, NULL, NULL, 6,
'National social assistance scheme providing non-contributory monthly old-age pension to senior citizens of BPL households.',
'Monthly pension of ₹500 (aged 60-79) to ₹1,000+ (aged 80+) credited directly into bank account.',
'Senior citizens aged 60+ belonging to a BPL family.',
NULL, 60, 120, 'ALL', 'ALL', 'Senior Citizens, Pension',
'Aadhaar Card, BPL Ration Card, Age Proof Certificate, Bank Savings Passbook.',
'Submit application at Gram Panchayat / Municipal Office or NSAP portal.',
'HYBRID', 'https://nsap.nic.in', '1800111555', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 23. Sandhya Suraksha Scheme (Karnataka - Senior Citizen / Pension)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (23, 'Sandhya Suraksha Scheme (Karnataka)', FALSE, 2, NULL, 6,
'Karnataka Govt social security scheme providing financial assistance to senior citizens, weavers, and unorganized workers.',
'Monthly pension of ₹1,200 deposited via e-governance directly into beneficiary bank account.',
'Resident of Karnataka, age 65 years and above, combined family annual income below ₹20,000.',
20000, 65, 120, 'ALL', 'ALL', 'Senior Citizens, Pension',
'Aadhaar Card, Age Proof, Income Certificate (below ₹20,000), Bank Passbook, Karnataka Domicile Proof.',
'Apply at Nada Kacheri center or Seva Sindhu portal.',
'HYBRID', 'https://ssp.karnataka.gov.in', '080-22230281', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;

-- 24. Aasara Old Age Pension (Telangana - Senior Citizen / Pension)
INSERT INTO schemes (id, name, is_central, state_id, district_id, category_id, description, benefits, eligibility, income_limit, age_min, age_max, gender_restriction, occupation_restriction, categories_tag, required_documents, application_process, application_mode, official_website, helpline, deadline, status)
VALUES (24, 'Aasara Old Age Pension (Telangana)', FALSE, 1, NULL, 6,
'Social security pension scheme by Telangana Govt providing monthly pension and dignity to senior citizens and vulnerable groups.',
'Monthly pension of ₹2,016 credited directly into bank account / post office.',
'Resident of Telangana, age 57 years and above, belonging to BPL / rural poor household.',
NULL, 57, 120, 'ALL', 'ALL', 'Senior Citizens, Pension',
'Aadhaar Card, Food Security Card (Ration Card), Age Proof (Voter ID/Aadhaar), Bank Passbook.',
'Submit application at Meeseva Center or Gram Panchayat Office.',
'HYBRID', 'https://aasara.telangana.gov.in', '18004251980', NULL, 'ACTIVE')
ON DUPLICATE KEY UPDATE name=name;
