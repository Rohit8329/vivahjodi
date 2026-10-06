-- ============================================================
-- VivahJodi - V15 Gujarat Districts and Talukas
-- Gujarat state already exists in V9.
-- This migration adds Gujarat districts and talukas.
-- ============================================================

-- ============================================================
-- 1. GUJARAT DISTRICTS
-- ============================================================

INSERT INTO districts (state_id, name, is_active)
SELECT
    s.id,
    d.name,
    true
FROM states s
CROSS JOIN (
    VALUES
        ('Ahmedabad'),
        ('Amreli'),
        ('Anand'),
        ('Aravalli'),
        ('Banaskantha'),
        ('Bharuch'),
        ('Bhavnagar'),
        ('Botad'),
        ('Chhota Udaipur'),
        ('Dahod'),
        ('Dang'),
        ('Devbhumi Dwarka'),
        ('Gandhinagar'),
        ('Gir Somnath'),
        ('Jamnagar'),
        ('Junagadh'),
        ('Kachchh (Kutch)'),
        ('Kheda'),
        ('Mahisagar'),
        ('Mehsana'),
        ('Morbi'),
        ('Narmada'),
        ('Navsari'),
        ('Panchmahal'),
        ('Patan'),
        ('Porbandar'),
        ('Rajkot'),
        ('Sabarkantha'),
        ('Surat'),
        ('Surendranagar'),
        ('Tapi'),
        ('Vadodara'),
        ('Valsad')
) AS d(name)
WHERE s.code = 'GJ'
  AND s.country_name = 'India'
  AND s.is_active = true;


-- ============================================================
-- 2. GUJARAT TALUKAS
-- ============================================================

INSERT INTO talukas (district_id, name, is_active)
SELECT
    d.id,
    t.name,
    true
FROM districts d
JOIN states s
    ON s.id = d.state_id
CROSS JOIN LATERAL (
    SELECT *
    FROM (
        VALUES

        -- Ahmedabad
        ('Ahmedabad', 'Ahmedabad City'),
        ('Ahmedabad', 'Bavla'),
        ('Ahmedabad', 'Daskroi'),
        ('Ahmedabad', 'Detroj-Rampura'),
        ('Ahmedabad', 'Dhandhuka'),
        ('Ahmedabad', 'Dholera'),
        ('Ahmedabad', 'Dholka'),
        ('Ahmedabad', 'Mandal'),
        ('Ahmedabad', 'Sanand'),
        ('Ahmedabad', 'Viramgam'),

        -- Amreli
        ('Amreli', 'Amreli'),
        ('Amreli', 'Babra'),
        ('Amreli', 'Bagasara'),
        ('Amreli', 'Dhari'),
        ('Amreli', 'Jafrabad'),
        ('Amreli', 'Khambha'),
        ('Amreli', 'Kunkavav Vadia'),
        ('Amreli', 'Lathi'),
        ('Amreli', 'Lilia'),
        ('Amreli', 'Rajula'),
        ('Amreli', 'Savarkundla'),

        -- Anand
        ('Anand', 'Anand'),
        ('Anand', 'Anklav'),
        ('Anand', 'Borsad'),
        ('Anand', 'Khambhat'),
        ('Anand', 'Petlad'),
        ('Anand', 'Sojitra'),
        ('Anand', 'Tarapur'),
        ('Anand', 'Umreth'),

        -- Aravalli
        ('Aravalli', 'Bayad'),
        ('Aravalli', 'Bhiloda'),
        ('Aravalli', 'Dhansura'),
        ('Aravalli', 'Malpur'),
        ('Aravalli', 'Meghraj'),
        ('Aravalli', 'Modasa'),
        ('Aravalli', 'Shamlaji'),
        ('Aravalli', 'Sathamba'),

        -- Banaskantha
        ('Banaskantha', 'Vav'),
        ('Banaskantha', 'Tharad'),
        ('Banaskantha', 'Dhanera'),
        ('Banaskantha', 'Dantiwada'),
        ('Banaskantha', 'Amirgadh'),
        ('Banaskantha', 'Danta'),
        ('Banaskantha', 'Vadgam'),
        ('Banaskantha', 'Palanpur'),
        ('Banaskantha', 'Deesa'),
        ('Banaskantha', 'Deodar'),
        ('Banaskantha', 'Bhabhar'),
        ('Banaskantha', 'Kankrej'),
        ('Banaskantha', 'Lakhani'),

        -- Bharuch
        ('Bharuch', 'Bharuch'),
        ('Bharuch', 'Ankleshwar'),
        ('Bharuch', 'Hansot'),
        ('Bharuch', 'Jambusar'),
        ('Bharuch', 'Amod'),
        ('Bharuch', 'Vagra'),
        ('Bharuch', 'Valia'),
        ('Bharuch', 'Netrang'),

        -- Bhavnagar
        ('Bhavnagar', 'Bhavnagar'),
        ('Bhavnagar', 'Ghogha'),
        ('Bhavnagar', 'Sihor'),
        ('Bhavnagar', 'Umrala'),
        ('Bhavnagar', 'Vallabhipur'),
        ('Bhavnagar', 'Palitana'),
        ('Bhavnagar', 'Mahuva'),
        ('Bhavnagar', 'Talaja'),
        ('Bhavnagar', 'Gariadhar'),
        ('Bhavnagar', 'Jesar'),

        -- Botad
        ('Botad', 'Botad'),
        ('Botad', 'Barwala'),
        ('Botad', 'Gadhada'),
        ('Botad', 'Ranpur'),

        -- Chhota Udaipur
        ('Chhota Udaipur', 'Chhota Udepur'),
        ('Chhota Udaipur', 'Kavant'),
        ('Chhota Udaipur', 'Jetpur Pavi'),
        ('Chhota Udaipur', 'Naswadi'),
        ('Chhota Udaipur', 'Sankheda'),
        ('Chhota Udaipur', 'Palej'),

        -- Dahod
        ('Dahod', 'Dahod'),
        ('Dahod', 'Limkheda'),
        ('Dahod', 'Jhalod'),
        ('Dahod', 'Dohad'),
        ('Dahod', 'Devgarh Baria'),
        ('Dahod', 'Garbada'),
        ('Dahod', 'Fatepura'),
        ('Dahod', 'Sanjeli'),

        -- Dang
        ('Dang', 'Ahwa'),
        ('Dang', 'Waghai'),
        ('Dang', 'Subir'),

        -- Devbhumi Dwarka
        ('Devbhumi Dwarka', 'Khambhalia'),
        ('Devbhumi Dwarka', 'Dwarka'),
        ('Devbhumi Dwarka', 'Kalyanpur'),
        ('Devbhumi Dwarka', 'Bhanvad'),

        -- Gandhinagar
        ('Gandhinagar', 'Gandhinagar'),
        ('Gandhinagar', 'Dehgam'),
        ('Gandhinagar', 'Kalol'),
        ('Gandhinagar', 'Mansa'),

        -- Gir Somnath
        ('Gir Somnath', 'Veraval'),
        ('Gir Somnath', 'Sutrapada'),
        ('Gir Somnath', 'Talala'),
        ('Gir Somnath', 'Kodinar'),
        ('Gir Somnath', 'Una'),
        ('Gir Somnath', 'Gir Gadhada'),

        -- Jamnagar
        ('Jamnagar', 'Jamnagar'),
        ('Jamnagar', 'Jodia'),
        ('Jamnagar', 'Dhrol'),
        ('Jamnagar', 'Kalavad'),
        ('Jamnagar', 'Jamjodhpur'),
        ('Jamnagar', 'Lalpur'),

        -- Junagadh
        ('Junagadh', 'Junagadh'),
        ('Junagadh', 'Bhesan'),
        ('Junagadh', 'Visavadar'),
        ('Junagadh', 'Mendarda'),
        ('Junagadh', 'Malia'),
        ('Junagadh', 'Keshod'),
        ('Junagadh', 'Manavadar'),
        ('Junagadh', 'Bantwa'),
        ('Junagadh', 'Vanthali'),

        -- Kachchh
        ('Kachchh (Kutch)', 'Lakhpat'),
        ('Kachchh (Kutch)', 'Rapar'),
        ('Kachchh (Kutch)', 'Bhachau'),
        ('Kachchh (Kutch)', 'Anjar'),
        ('Kachchh (Kutch)', 'Bhuj'),
        ('Kachchh (Kutch)', 'Nakhatrana'),
        ('Kachchh (Kutch)', 'Abdasa'),
        ('Kachchh (Kutch)', 'Mandvi'),
        ('Kachchh (Kutch)', 'Mundra'),
        ('Kachchh (Kutch)', 'Gandhidham'),

        -- Kheda
        ('Kheda', 'Nadiad'),
        ('Kheda', 'Kheda'),
        ('Kheda', 'Matar'),
        ('Kheda', 'Mehmedabad'),
        ('Kheda', 'Mahudha'),
        ('Kheda', 'Thasra'),
        ('Kheda', 'Kapadwanj'),
        ('Kheda', 'Kathlal'),
        ('Kheda', 'Galteshwar'),

        -- Mahisagar
        ('Mahisagar', 'Lunawada'),
        ('Mahisagar', 'Santrampur'),
        ('Mahisagar', 'Balasinor'),
        ('Mahisagar', 'Kadana'),
        ('Mahisagar', 'Virpur'),
        ('Mahisagar', 'Khanpur'),

        -- Mehsana
        ('Mehsana', 'Satlasana'),
        ('Mehsana', 'Kheralu'),
        ('Mehsana', 'Unjha'),
        ('Mehsana', 'Visnagar'),
        ('Mehsana', 'Vadnagar'),
        ('Mehsana', 'Vijapur'),
        ('Mehsana', 'Mehsana'),
        ('Mehsana', 'Becharaji'),
        ('Mehsana', 'Kadi'),
        ('Mehsana', 'Jotana'),

        -- Morbi
        ('Morbi', 'Morbi'),
        ('Morbi', 'Wankaner'),
        ('Morbi', 'Halvad'),
        ('Morbi', 'Tankara'),
        ('Morbi', 'Maliya-Miyana'),

        -- Narmada
        ('Narmada', 'Rajpipla (Nandod)'),
        ('Narmada', 'Dediapada'),
        ('Narmada', 'Sagbara'),
        ('Narmada', 'Tilakwada'),

        -- Navsari
        ('Navsari', 'Navsari'),
        ('Navsari', 'Jalalpore'),
        ('Navsari', 'Gandevi'),
        ('Navsari', 'Chikhli'),
        ('Navsari', 'Khergam'),
        ('Navsari', 'Vansda'),

        -- Panchmahal
        ('Panchmahal', 'Godhra'),
        ('Panchmahal', 'Kalol'),
        ('Panchmahal', 'Halol'),
        ('Panchmahal', 'Jambughoda'),
        ('Panchmahal', 'Ghoghawada'),
        ('Panchmahal', 'Morwa Hadaf'),
        ('Panchmahal', 'Shehra'),

        -- Patan
        ('Patan', 'Santalpur'),
        ('Patan', 'Radhanpur'),
        ('Patan', 'Sidhpur'),
        ('Patan', 'Patan'),
        ('Patan', 'Harij'),
        ('Patan', 'Sami'),
        ('Patan', 'Chanasma'),
        ('Patan', 'Shankheshwar'),

        -- Porbandar
        ('Porbandar', 'Porbandar'),
        ('Porbandar', 'Ranavav'),
        ('Porbandar', 'Kutiyana'),

        -- Rajkot
        ('Rajkot', 'Rajkot'),
        ('Rajkot', 'Lodhika'),
        ('Rajkot', 'Kotda Sangani'),
        ('Rajkot', 'Jasdan'),
        ('Rajkot', 'Dhoraji'),
        ('Rajkot', 'Jamkandorna'),
        ('Rajkot', 'Upleta'),
        ('Rajkot', 'Jetpur'),
        ('Rajkot', 'Gondal'),
        ('Rajkot', 'Paddhari'),
        ('Rajkot', 'Malia'),

        -- Sabarkantha
        ('Sabarkantha', 'Himatnagar'),
        ('Sabarkantha', 'Idar'),
        ('Sabarkantha', 'Bhiloda'),
        ('Sabarkantha', 'Khedbrahma'),
        ('Sabarkantha', 'Vadali'),
        ('Sabarkantha', 'Vijaynagar'),
        ('Sabarkantha', 'Prantij'),
        ('Sabarkantha', 'Talod'),
        ('Sabarkantha', 'Poshina'),

        -- Surat
        ('Surat', 'Surat City'),
        ('Surat', 'Choryasi'),
        ('Surat', 'Olpad'),
        ('Surat', 'Kamrej'),
        ('Surat', 'Bardoli'),
        ('Surat', 'Mahuva'),
        ('Surat', 'Mandvi'),
        ('Surat', 'Mangrol'),
        ('Surat', 'Palsana'),
        ('Surat', 'Umarpada'),

        -- Surendranagar
        ('Surendranagar', 'Wadhwan'),
        ('Surendranagar', 'Muli'),
        ('Surendranagar', 'Sayala'),
        ('Surendranagar', 'Limbadi'),
        ('Surendranagar', 'Chotila'),
        ('Surendranagar', 'Chuda'),
        ('Surendranagar', 'Lakhtar'),
        ('Surendranagar', 'Dasada'),
        ('Surendranagar', 'Halwad'),
        ('Surendranagar', 'Dhrangadhra'),

        -- Tapi
        ('Tapi', 'Vyara'),
        ('Tapi', 'Valod'),
        ('Tapi', 'Songadh'),
        ('Tapi', 'Uchchhal'),
        ('Tapi', 'Nijhar'),
        ('Tapi', 'Kukarmunda'),

        -- Vadodara
        ('Vadodara', 'Vadodara'),
        ('Vadodara', 'Savli'),
        ('Vadodara', 'Vaghodia'),
        ('Vadodara', 'Dabhoi'),
        ('Vadodara', 'Sinor'),
        ('Vadodara', 'Padra'),
        ('Vadodara', 'Karjan'),

        -- Valsad
        ('Valsad', 'Valsad'),
        ('Valsad', 'Pardi'),
        ('Valsad', 'Umbergaon'),
        ('Valsad', 'Navsari'),
        ('Valsad', 'Kaprada'),
        ('Valsad', 'Dharampur')

    ) AS x(district_name, name)
    WHERE x.district_name = d.name
) AS t
WHERE s.code = 'GJ'
  AND s.country_name = 'India'
  AND s.is_active = true
  AND d.state_id = s.id
  AND d.is_active = true;


-- ============================================================
-- 3. VALIDATION
-- ============================================================

DO $$
DECLARE
    district_count INTEGER;
    taluka_count INTEGER;
BEGIN

    SELECT COUNT(*)
    INTO district_count
    FROM districts d
    JOIN states s ON s.id = d.state_id
    WHERE s.code = 'GJ'
      AND s.is_active = true
      AND d.is_active = true;

    IF district_count <> 33 THEN
        RAISE EXCEPTION
            'V15 validation failed. Gujarat must have 33 districts, found %',
            district_count;
    END IF;


    SELECT COUNT(*)
    INTO taluka_count
    FROM talukas t
    JOIN districts d ON d.id = t.district_id
    JOIN states s ON s.id = d.state_id
    WHERE s.code = 'GJ'
      AND s.is_active = true
      AND d.is_active = true
      AND t.is_active = true;

    IF taluka_count <> 245 THEN
        RAISE EXCEPTION
            'V15 validation failed. Gujarat must have 245 talukas according to the supplied list, found %',
            taluka_count;
    END IF;

END $$;


-- ============================================================
-- END V15
-- ============================================================