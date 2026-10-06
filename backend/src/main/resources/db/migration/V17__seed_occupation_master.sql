-- ============================================================
-- V17 — Seed Occupation / Sub-Occupation Master
-- India-wide / General Purpose
-- ============================================================

-- ============================================================
-- IT / Software / Technology
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Software Engineer', 1),
        ('Software Developer', 2),
        ('Full Stack Developer', 3),
        ('Frontend Developer', 4),
        ('Backend Developer', 5),
        ('Mobile App Developer', 6),
        ('Web Developer', 7),
        ('DevOps Engineer', 8),
        ('Cloud Engineer', 9),
        ('Cloud Architect', 10),
        ('Data Analyst', 11),
        ('Data Scientist', 12),
        ('Data Engineer', 13),
        ('AI / ML Engineer', 14),
        ('Machine Learning Engineer', 15),
        ('Cyber Security Engineer', 16),
        ('Cyber Security Analyst', 17),
        ('Network Engineer', 18),
        ('System Administrator', 19),
        ('Database Administrator', 20),
        ('QA / Test Engineer', 21),
        ('Automation Test Engineer', 22),
        ('UI / UX Designer', 23),
        ('Product Manager', 24),
        ('Technical Lead', 25),
        ('Engineering Manager', 26),
        ('IT Consultant', 27),
        ('Business Analyst', 28),
        ('IT Support Engineer', 29),
        ('Solution Architect', 30),
        ('Other IT / Technology', 31)
) AS v(name, display_order)
WHERE c.name = 'IT / Software / Technology';


-- ============================================================
-- Engineering
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Mechanical Engineer', 1),
        ('Civil Engineer', 2),
        ('Electrical Engineer', 3),
        ('Electronics Engineer', 4),
        ('Electronics & Telecommunication Engineer', 5),
        ('Computer Engineer', 6),
        ('Chemical Engineer', 7),
        ('Industrial Engineer', 8),
        ('Production Engineer', 9),
        ('Automobile Engineer', 10),
        ('Environmental Engineer', 11),
        ('Biomedical Engineer', 12),
        ('Instrumentation Engineer', 13),
        ('Mechatronics Engineer', 14),
        ('Aerospace Engineer', 15),
        ('Agricultural Engineer', 16),
        ('Petroleum Engineer', 17),
        ('Textile Engineer', 18),
        ('Marine Engineer', 19),
        ('Engineering Consultant', 20),
        ('Other Engineering', 21)
) AS v(name, display_order)
WHERE c.name = 'Engineering';


-- ============================================================
-- Medical / Healthcare
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('General Physician', 1),
        ('Medical Doctor', 2),
        ('Surgeon', 3),
        ('Dentist', 4),
        ('Ayurvedic Doctor', 5),
        ('Homeopathic Doctor', 6),
        ('Veterinary Doctor', 7),
        ('Physiotherapist', 8),
        ('Occupational Therapist', 9),
        ('Psychologist', 10),
        ('Psychiatrist', 11),
        ('Nurse', 12),
        ('Staff Nurse', 13),
        ('Dietitian / Nutritionist', 14),
        ('Medical Officer', 15),
        ('Lab Technician', 16),
        ('Radiologist / Radiology Technician', 17),
        ('Medical Representative', 18),
        ('Healthcare Administrator', 19),
        ('Hospital Administrator', 20),
        ('Other Healthcare Professional', 21)
) AS v(name, display_order)
WHERE c.name = 'Medical / Healthcare';


-- ============================================================
-- Pharmacy
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Pharmacist', 1),
        ('Hospital Pharmacist', 2),
        ('Community Pharmacist', 3),
        ('Pharmaceutical Sales Executive', 4),
        ('Pharmaceutical Researcher', 5),
        ('Drug Inspector', 6),
        ('Clinical Research Associate', 7),
        ('Pharmacy Manager', 8),
        ('Other Pharmacy Professional', 9)
) AS v(name, display_order)
WHERE c.name = 'Pharmacy';


-- ============================================================
-- Science / Research
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Scientist', 1),
        ('Research Scientist', 2),
        ('Research Associate', 3),
        ('Biologist', 4),
        ('Biotechnologist', 5),
        ('Chemist', 6),
        ('Physicist', 7),
        ('Mathematician', 8),
        ('Statistician', 9),
        ('Environmental Scientist', 10),
        ('Geologist', 11),
        ('Research Fellow', 12),
        ('Laboratory Researcher', 13),
        ('Other Science Professional', 14)
) AS v(name, display_order)
WHERE c.name = 'Science / Research';


-- ============================================================
-- Education / Teaching
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('School Teacher', 1),
        ('Primary Teacher', 2),
        ('Secondary Teacher', 3),
        ('Higher Secondary Teacher', 4),
        ('College Professor', 5),
        ('Assistant Professor', 6),
        ('Associate Professor', 7),
        ('Lecturer', 8),
        ('Principal', 9),
        ('School Administrator', 10),
        ('Education Coordinator', 11),
        ('Special Education Teacher', 12),
        ('Tutor', 13),
        ('Coaching Teacher', 14),
        ('Education Consultant', 15),
        ('Other Education Professional', 16)
) AS v(name, display_order)
WHERE c.name = 'Education / Teaching';


-- ============================================================
-- Government / Public Administration
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('IAS Officer', 1),
        ('IPS Officer', 2),
        ('IFS Officer', 3),
        ('IRS Officer', 4),
        ('Government Officer', 5),
        ('Government Employee', 6),
        ('Administrative Officer', 7),
        ('Revenue Officer', 8),
        ('Tehsildar', 9),
        ('Naib Tehsildar', 10),
        ('Government Clerk', 11),
        ('Government Teacher', 12),
        ('Government Engineer', 13),
        ('Government Doctor', 14),
        ('Public Administration Officer', 15),
        ('Other Government Employee', 16)
) AS v(name, display_order)
WHERE c.name = 'Government / Public Administration';


-- ============================================================
-- Defence / Armed Forces
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Indian Army Officer', 1),
        ('Indian Army Personnel', 2),
        ('Indian Navy Officer', 3),
        ('Indian Navy Personnel', 4),
        ('Indian Air Force Officer', 5),
        ('Indian Air Force Personnel', 6),
        ('Defence Civilian', 7),
        ('Coast Guard Personnel', 8),
        ('Defence Engineer', 9),
        ('Other Defence Personnel', 10)
) AS v(name, display_order)
WHERE c.name = 'Defence / Armed Forces';


-- ============================================================
-- Police / Security
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Police Officer', 1),
        ('Police Inspector', 2),
        ('Police Sub Inspector', 3),
        ('Police Constable', 4),
        ('IPS / Senior Police Officer', 5),
        ('Security Officer', 6),
        ('Security Supervisor', 7),
        ('Private Security Professional', 8),
        ('Fire Officer', 9),
        ('Firefighter', 10),
        ('Other Police / Security Professional', 11)
) AS v(name, display_order)
WHERE c.name = 'Police / Security';


-- ============================================================
-- Law / Legal
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Advocate / Lawyer', 1),
        ('Corporate Lawyer', 2),
        ('Legal Advisor', 3),
        ('Legal Consultant', 4),
        ('Judge', 5),
        ('Legal Executive', 6),
        ('Legal Officer', 7),
        ('Notary', 8),
        ('Law Clerk', 9),
        ('Other Legal Professional', 10)
) AS v(name, display_order)
WHERE c.name = 'Law / Legal';


-- ============================================================
-- Finance / Banking / Insurance
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Bank Manager', 1),
        ('Bank Officer', 2),
        ('Bank Employee', 3),
        ('Investment Banker', 4),
        ('Financial Analyst', 5),
        ('Financial Advisor', 6),
        ('Wealth Manager', 7),
        ('Insurance Officer', 8),
        ('Insurance Advisor', 9),
        ('Insurance Agent', 10),
        ('Loan Officer', 11),
        ('Credit Analyst', 12),
        ('Relationship Manager', 13),
        ('Stock Market Professional', 14),
        ('Investment Professional', 15),
        ('Other Finance Professional', 16)
) AS v(name, display_order)
WHERE c.name = 'Finance / Banking / Insurance';


-- ============================================================
-- Accounting / Taxation
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Chartered Accountant', 1),
        ('Cost Accountant', 2),
        ('Company Secretary', 3),
        ('Accountant', 4),
        ('Senior Accountant', 5),
        ('Tax Consultant', 6),
        ('GST Consultant', 7),
        ('Audit Professional', 8),
        ('Internal Auditor', 9),
        ('Accounts Executive', 10),
        ('Other Accounting Professional', 11)
) AS v(name, display_order)
WHERE c.name = 'Accounting / Taxation';


-- ============================================================
-- Business / Entrepreneurship
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Business Owner', 1),
        ('Entrepreneur', 2),
        ('Startup Founder', 3),
        ('Family Business Owner', 4),
        ('Business Partner', 5),
        ('Manufacturer', 6),
        ('Trader', 7),
        ('Wholesaler', 8),
        ('Distributor', 9),
        ('Import / Export Business', 10),
        ('Retail Business Owner', 11),
        ('Other Business Owner', 12)
) AS v(name, display_order)
WHERE c.name = 'Business / Entrepreneurship';


-- ============================================================
-- Sales / Marketing
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Sales Executive', 1),
        ('Sales Manager', 2),
        ('Business Development Executive', 3),
        ('Business Development Manager', 4),
        ('Marketing Executive', 5),
        ('Marketing Manager', 6),
        ('Digital Marketing Specialist', 7),
        ('Brand Manager', 8),
        ('Product Marketing Manager', 9),
        ('Social Media Manager', 10),
        ('Market Research Analyst', 11),
        ('Other Sales / Marketing Professional', 12)
) AS v(name, display_order)
WHERE c.name = 'Sales / Marketing';


-- ============================================================
-- Human Resources
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('HR Executive', 1),
        ('HR Manager', 2),
        ('Recruiter', 3),
        ('Talent Acquisition Specialist', 4),
        ('HR Business Partner', 5),
        ('Payroll Specialist', 6),
        ('Learning & Development Professional', 7),
        ('Other HR Professional', 8)
) AS v(name, display_order)
WHERE c.name = 'Human Resources';


-- ============================================================
-- Management / Administration
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Manager', 1),
        ('General Manager', 2),
        ('Operations Manager', 3),
        ('Project Manager', 4),
        ('Program Manager', 5),
        ('Administration Manager', 6),
        ('Office Administrator', 7),
        ('Executive', 8),
        ('Director', 9),
        ('Vice President', 10),
        ('Chief Executive Officer', 11),
        ('Chief Financial Officer', 12),
        ('Chief Technology Officer', 13),
        ('Other Management Professional', 14)
) AS v(name, display_order)
WHERE c.name = 'Management / Administration';


-- ============================================================
-- Agriculture / Farming
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Farmer', 1),
        ('Agriculturalist', 2),
        ('Dairy Farmer', 3),
        ('Poultry Farmer', 4),
        ('Horticulturist', 5),
        ('Organic Farmer', 6),
        ('Agricultural Consultant', 7),
        ('Agricultural Officer', 8),
        ('Farm Manager', 9),
        ('Agribusiness Owner', 10),
        ('Other Agriculture Professional', 11)
) AS v(name, display_order)
WHERE c.name = 'Agriculture / Farming';


-- ============================================================
-- Architecture / Planning
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Architect', 1),
        ('Landscape Architect', 2),
        ('Urban Planner', 3),
        ('Town Planner', 4),
        ('Interior Architect', 5),
        ('Planning Consultant', 6),
        ('Other Architecture Professional', 7)
) AS v(name, display_order)
WHERE c.name = 'Architecture / Planning';


-- ============================================================
-- Construction / Civil / Real Estate
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Civil Contractor', 1),
        ('Builder', 2),
        ('Real Estate Developer', 3),
        ('Real Estate Agent', 4),
        ('Property Consultant', 5),
        ('Site Engineer', 6),
        ('Quantity Surveyor', 7),
        ('Construction Manager', 8),
        ('Site Supervisor', 9),
        ('Other Construction Professional', 10)
) AS v(name, display_order)
WHERE c.name = 'Construction / Civil / Real Estate';


-- ============================================================
-- Skilled Trades / Technical Services
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Electrician', 1),
        ('Plumber', 2),
        ('Carpenter', 3),
        ('Mason', 4),
        ('Welder', 5),
        ('Fitter', 6),
        ('Technician', 7),
        ('AC / Refrigeration Technician', 8),
        ('Electrical Technician', 9),
        ('Machine Operator', 10),
        ('Other Skilled Trade Professional', 11)
) AS v(name, display_order)
WHERE c.name = 'Skilled Trades / Technical Services';


-- ============================================================
-- Manufacturing / Production
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Production Manager', 1),
        ('Production Supervisor', 2),
        ('Factory Manager', 3),
        ('Plant Manager', 4),
        ('Quality Control Engineer', 5),
        ('Quality Analyst', 6),
        ('Machine Operator', 7),
        ('Production Worker', 8),
        ('Manufacturing Engineer', 9),
        ('Other Manufacturing Professional', 10)
) AS v(name, display_order)
WHERE c.name = 'Manufacturing / Production';


-- ============================================================
-- Automobile / Transport
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Automobile Engineer', 1),
        ('Automobile Technician', 2),
        ('Mechanic', 3),
        ('Vehicle Service Advisor', 4),
        ('Transport Manager', 5),
        ('Truck Driver', 6),
        ('Bus Driver', 7),
        ('Commercial Driver', 8),
        ('Taxi / Cab Driver', 9),
        ('Other Transport Professional', 10)
) AS v(name, display_order)
WHERE c.name = 'Automobile / Transport';


-- ============================================================
-- Aviation
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Pilot', 1),
        ('Commercial Pilot', 2),
        ('Airline Pilot', 3),
        ('Cabin Crew', 4),
        ('Air Hostess / Flight Attendant', 5),
        ('Aviation Engineer', 6),
        ('Airport Manager', 7),
        ('Ground Staff', 8),
        ('Air Traffic Controller', 9),
        ('Other Aviation Professional', 10)
) AS v(name, display_order)
WHERE c.name = 'Aviation';


-- ============================================================
-- Hospitality / Tourism
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Hotel Manager', 1),
        ('Restaurant Manager', 2),
        ('Chef', 3),
        ('Cook', 4),
        ('Baker', 5),
        ('Event Manager', 6),
        ('Travel Consultant', 7),
        ('Tour Guide', 8),
        ('Hospitality Professional', 9),
        ('Other Hospitality Professional', 10)
) AS v(name, display_order)
WHERE c.name = 'Hospitality / Tourism';


-- ============================================================
-- Media / Journalism / Communication
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Journalist', 1),
        ('Reporter', 2),
        ('News Anchor', 3),
        ('Editor', 4),
        ('Content Writer', 5),
        ('Copywriter', 6),
        ('Public Relations Professional', 7),
        ('Communications Manager', 8),
        ('Digital Content Creator', 9),
        ('Other Media Professional', 10)
) AS v(name, display_order)
WHERE c.name = 'Media / Journalism / Communication';


-- ============================================================
-- Arts / Design / Creative
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Graphic Designer', 1),
        ('UI / UX Designer', 2),
        ('Fashion Designer', 3),
        ('Interior Designer', 4),
        ('Artist', 5),
        ('Painter', 6),
        ('Photographer', 7),
        ('Videographer', 8),
        ('Animator', 9),
        ('Illustrator', 10),
        ('Musician', 11),
        ('Singer', 12),
        ('Actor', 13),
        ('Writer', 14),
        ('Other Creative Professional', 15)
) AS v(name, display_order)
WHERE c.name = 'Arts / Design / Creative';


-- ============================================================
-- Social Work / NGO
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Social Worker', 1),
        ('NGO Professional', 2),
        ('NGO Manager', 3),
        ('Community Worker', 4),
        ('Development Professional', 5),
        ('Social Work Consultant', 6),
        ('Other Social Work Professional', 7)
) AS v(name, display_order)
WHERE c.name = 'Social Work / NGO';


-- ============================================================
-- Sports / Fitness
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Professional Athlete', 1),
        ('Cricketer', 2),
        ('Football Player', 3),
        ('Sports Coach', 4),
        ('Fitness Trainer', 5),
        ('Personal Trainer', 6),
        ('Yoga Instructor', 7),
        ('Sports Manager', 8),
        ('Other Sports Professional', 9)
) AS v(name, display_order)
WHERE c.name = 'Sports / Fitness';


-- ============================================================
-- Beauty / Fashion / Personal Care
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Beautician', 1),
        ('Hair Stylist', 2),
        ('Makeup Artist', 3),
        ('Beauty Therapist', 4),
        ('Fashion Stylist', 5),
        ('Fashion Consultant', 6),
        ('Salon Owner', 7),
        ('Other Beauty / Fashion Professional', 8)
) AS v(name, display_order)
WHERE c.name = 'Beauty / Fashion / Personal Care';


-- ============================================================
-- Retail / E-commerce
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Retail Store Owner', 1),
        ('Shop Owner', 2),
        ('Store Manager', 3),
        ('Retail Executive', 4),
        ('E-commerce Business Owner', 5),
        ('E-commerce Manager', 6),
        ('Online Seller', 7),
        ('Other Retail Professional', 8)
) AS v(name, display_order)
WHERE c.name = 'Retail / E-commerce';


-- ============================================================
-- Logistics / Supply Chain
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Logistics Manager', 1),
        ('Supply Chain Manager', 2),
        ('Warehouse Manager', 3),
        ('Procurement Manager', 4),
        ('Procurement Executive', 5),
        ('Operations Executive', 6),
        ('Logistics Executive', 7),
        ('Other Logistics Professional', 8)
) AS v(name, display_order)
WHERE c.name = 'Logistics / Supply Chain';


-- ============================================================
-- Consulting / Freelancing
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Consultant', 1),
        ('Management Consultant', 2),
        ('IT Consultant', 3),
        ('Business Consultant', 4),
        ('Freelancer', 5),
        ('Freelance Developer', 6),
        ('Freelance Designer', 7),
        ('Freelance Writer', 8),
        ('Independent Professional', 9),
        ('Other Consultant / Freelancer', 10)
) AS v(name, display_order)
WHERE c.name = 'Consulting / Freelancing';


-- ============================================================
-- Domestic / Homemaker
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Homemaker', 1),
        ('Home Manager', 2),
        ('Family Caregiver', 3)
) AS v(name, display_order)
WHERE c.name = 'Domestic / Homemaker';


-- ============================================================
-- Student / Intern
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Student', 1),
        ('College Student', 2),
        ('University Student', 3),
        ('Postgraduate Student', 4),
        ('Research Student', 5),
        ('Intern', 6),
        ('Trainee', 7)
) AS v(name, display_order)
WHERE c.name = 'Student / Intern';


-- ============================================================
-- Retired
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Retired Government Employee', 1),
        ('Retired Private Employee', 2),
        ('Retired Defence Personnel', 3),
        ('Retired Business Professional', 4),
        ('Other Retired Professional', 5)
) AS v(name, display_order)
WHERE c.name = 'Retired';


-- ============================================================
-- Other
-- ============================================================

INSERT INTO occupations (category_id, name, display_order)
SELECT id, v.name, v.display_order
FROM occupation_categories c
CROSS JOIN (
    VALUES
        ('Other Professional', 1),
        ('Other Occupation', 2),
        ('Not Specified', 3)
) AS v(name, display_order)
WHERE c.name = 'Other';


-- ============================================================
-- Verification
-- ============================================================

DO $$
DECLARE
    category_count INTEGER;
    occupation_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO category_count
    FROM occupation_categories
    WHERE is_active = TRUE;

    SELECT COUNT(*)
    INTO occupation_count
    FROM occupations
    WHERE is_active = TRUE;

    IF category_count <> 36 THEN
        RAISE EXCEPTION
            'V17 validation failed: expected 36 active occupation categories, found %',
            category_count;
    END IF;

    IF occupation_count < 300 THEN
        RAISE EXCEPTION
            'V17 validation failed: expected at least 300 active occupations, found %',
            occupation_count;
    END IF;

    RAISE NOTICE
        'V17 validation successful: % categories, % occupations',
        category_count,
        occupation_count;
END $$;