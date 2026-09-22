-- ============================================================
-- VivahJodi - V9 Master / Reference Data
-- States, Union Territories, Education, Zodiac, Nakshatra
-- ============================================================

-- ============================================================
-- 1. STATES AND UNION TERRITORIES
-- ============================================================

INSERT INTO states (name, code, country_name, is_active)
VALUES
    ('Andhra Pradesh', 'AP', 'India', true),
    ('Arunachal Pradesh', 'AR', 'India', true),
    ('Assam', 'AS', 'India', true),
    ('Bihar', 'BR', 'India', true),
    ('Chhattisgarh', 'CG', 'India', true),
    ('Goa', 'GA', 'India', true),
    ('Gujarat', 'GJ', 'India', true),
    ('Haryana', 'HR', 'India', true),
    ('Himachal Pradesh', 'HP', 'India', true),
    ('Jharkhand', 'JH', 'India', true),
    ('Karnataka', 'KA', 'India', true),
    ('Kerala', 'KL', 'India', true),
    ('Madhya Pradesh', 'MP', 'India', true),
    ('Maharashtra', 'MH', 'India', true),
    ('Manipur', 'MN', 'India', true),
    ('Meghalaya', 'ML', 'India', true),
    ('Mizoram', 'MZ', 'India', true),
    ('Nagaland', 'NL', 'India', true),
    ('Odisha', 'OD', 'India', true),
    ('Punjab', 'PB', 'India', true),
    ('Rajasthan', 'RJ', 'India', true),
    ('Sikkim', 'SK', 'India', true),
    ('Tamil Nadu', 'TN', 'India', true),
    ('Telangana', 'TS', 'India', true),
    ('Tripura', 'TR', 'India', true),
    ('Uttar Pradesh', 'UP', 'India', true),
    ('Uttarakhand', 'UK', 'India', true),
    ('West Bengal', 'WB', 'India', true),

    -- Union Territories
    ('Andaman and Nicobar Islands', 'AN', 'India', true),
    ('Chandigarh', 'CH', 'India', true),
    ('Dadra and Nagar Haveli and Daman and Diu', 'DN', 'India', true),
    ('Delhi', 'DL', 'India', true),
    ('Jammu and Kashmir', 'JK', 'India', true),
    ('Ladakh', 'LA', 'India', true),
    ('Lakshadweep', 'LD', 'India', true),
    ('Puducherry', 'PY', 'India', true);

-- ============================================================
-- 2. EDUCATION LEVELS
-- ============================================================

INSERT INTO education_levels (name, display_order, is_active)
VALUES
    ('शालेय शिक्षण', 10, true),
    ('१० वी', 20, true),
    ('१२ वी', 30, true),
    ('ITI', 40, true),
    ('Diploma', 50, true),
    ('Undergraduate / पदवी', 60, true),
    ('Postgraduate / पदव्युत्तर', 70, true),
    ('Doctorate / PhD', 80, true),
    ('Professional', 90, true),
    ('Other', 100, true);

-- ============================================================
-- 3. EDUCATION STREAMS
-- ============================================================

INSERT INTO education_streams (name, display_order, is_active)
VALUES
    ('Arts / कला', 10, true),
    ('Commerce / वाणिज्य', 20, true),
    ('Science / विज्ञान', 30, true),
    ('Engineering / अभियांत्रिकी', 40, true),
    ('Medical / वैद्यकीय', 50, true),
    ('Law / कायदा', 60, true),
    ('Management / व्यवस्थापन', 70, true),
    ('Computer / IT', 80, true),
    ('Agriculture / कृषी', 90, true),
    ('Pharmacy / औषधनिर्माण', 100, true),
    ('Architecture / वास्तुकला', 110, true),
    ('Education / शिक्षणशास्त्र', 120, true),
    ('Fine Arts / ललित कला', 130, true),
    ('Hotel Management / हॉटेल मॅनेजमेंट', 140, true),
    ('Social Work / सामाजिक कार्य', 150, true),
    ('Journalism / पत्रकारिता', 160, true),
    ('Design / डिझाइन', 170, true),
    ('Aviation / विमान वाहतूक', 180, true),
    ('Other', 190, true);

-- ============================================================
-- 4. ZODIAC SIGNS / RAASHI
-- ============================================================

INSERT INTO zodiac_signs (name, display_order, is_active)
VALUES
    ('मेष (Aries)', 10, true),
    ('वृषभ (Taurus)', 20, true),
    ('मिथुन (Gemini)', 30, true),
    ('कर्क (Cancer)', 40, true),
    ('सिंह (Leo)', 50, true),
    ('कन्या (Virgo)', 60, true),
    ('तूळ (Libra)', 70, true),
    ('वृश्चिक (Scorpio)', 80, true),
    ('धनु (Sagittarius)', 90, true),
    ('मकर (Capricorn)', 100, true),
    ('कुंभ (Aquarius)', 110, true),
    ('मीन (Pisces)', 120, true);

-- ============================================================
-- 5. NAKSHATRAS
-- ============================================================

INSERT INTO nakshatras (name, display_order, is_active)
VALUES
    ('अश्विनी', 10, true),
    ('भरणी', 20, true),
    ('कृत्तिका', 30, true),
    ('रोहिणी', 40, true),
    ('मृगशीर्ष', 50, true),
    ('आर्द्रा', 60, true),
    ('पुनर्वसू', 70, true),
    ('पुष्य', 80, true),
    ('आश्लेषा', 90, true),
    ('मघा', 100, true),
    ('पूर्वाफाल्गुनी', 110, true),
    ('उत्तराफाल्गुनी', 120, true),
    ('हस्त', 130, true),
    ('चित्रा', 140, true),
    ('स्वाती', 150, true),
    ('विशाखा', 160, true),
    ('अनुराधा', 170, true),
    ('ज्येष्ठा', 180, true),
    ('मूल', 190, true),
    ('पूर्वाषाढा', 200, true),
    ('उत्तराषाढा', 210, true),
    ('श्रवण', 220, true),
    ('धनिष्ठा', 230, true),
    ('शतभिषा', 240, true),
    ('पूर्वाभाद्रपदा', 250, true),
    ('उत्तराभाद्रपदा', 260, true),
    ('रेवती', 270, true);

-- ============================================================
-- END V9
-- ============================================================