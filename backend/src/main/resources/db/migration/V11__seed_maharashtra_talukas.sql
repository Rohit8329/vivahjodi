-- ============================================================
-- VivahJodi - V11
-- Maharashtra current Taluka / Tahsil master data
--
-- Based on current Maharashtra administrative structure.
-- Expected total: 360 talukas / tahsils
-- ============================================================


-- ============================================================
-- 1. INSERT TALUKAS
-- ============================================================

INSERT INTO talukas (district_id, name, is_active)
SELECT
    d.id,
    x.taluka_name,
    true
FROM (
    VALUES

    -- ========================================================
    -- KONKAN DIVISION
    -- ========================================================

    -- Mumbai City - 2
    ('Mumbai City', 'Colaba'),
    ('Mumbai City', 'Dadar'),

    -- Mumbai Suburban - 3
    ('Mumbai Suburban', 'Bandra'),
    ('Mumbai Suburban', 'Andheri'),
    ('Mumbai Suburban', 'Borivali'),

    -- Thane - 7
    ('Thane', 'Kalyan'),
    ('Thane', 'Thane'),
    ('Thane', 'Bhiwandi'),
    ('Thane', 'Murbad'),
    ('Thane', 'Ambernath'),
    ('Thane', 'Shahapur'),
    ('Thane', 'Ulhasnagar'),

    -- Palghar - 8
    ('Palghar', 'Vasai'),
    ('Palghar', 'Dahanu'),
    ('Palghar', 'Palghar'),
    ('Palghar', 'Wada'),
    ('Palghar', 'Jawhar'),
    ('Palghar', 'Vikramgad'),
    ('Palghar', 'Talasari'),
    ('Palghar', 'Mokhada'),

    -- Ratnagiri - 9
    ('Ratnagiri', 'Ratnagiri'),
    ('Ratnagiri', 'Rajapur'),
    ('Ratnagiri', 'Dapoli'),
    ('Ratnagiri', 'Khed'),
    ('Ratnagiri', 'Chiplun'),
    ('Ratnagiri', 'Sangameshwar'),
    ('Ratnagiri', 'Lanja'),
    ('Ratnagiri', 'Guhagar'),
    ('Ratnagiri', 'Mandangad'),

    -- Raigad - 16
    ('Raigad', 'Alibag'),
    ('Raigad', 'Panvel'),
    ('Raigad', 'Mahad'),
    ('Raigad', 'Mangaon'),
    ('Raigad', 'Roha'),
    ('Raigad', 'Uran'),
    ('Raigad', 'Pen'),
    ('Raigad', 'Karjat'),
    ('Raigad', 'Matheran'),
    ('Raigad', 'Khalapur'),
    ('Raigad', 'Poladpur'),
    ('Raigad', 'Shrivardhan'),
    ('Raigad', 'Murud'),
    ('Raigad', 'Mhasala'),
    ('Raigad', 'Tala'),
    ('Raigad', 'Sudhagad-Pali'),

    -- Sindhudurg - 8
    ('Sindhudurg', 'Kudal'),
    ('Sindhudurg', 'Malvan'),
    ('Sindhudurg', 'Sawantwadi'),
    ('Sindhudurg', 'Kankavli'),
    ('Sindhudurg', 'Vengurla'),
    ('Sindhudurg', 'Devgad'),
    ('Sindhudurg', 'Vaibhavwadi'),
    ('Sindhudurg', 'Dodamarg'),


    -- ========================================================
    -- PUNE DIVISION
    -- ========================================================

    -- Pune - 14
    ('Pune', 'Baramati'),
    ('Pune', 'Haveli'),
    ('Pune', 'Mulshi'),
    ('Pune', 'Indapur'),
    ('Pune', 'Purandar'),
    ('Pune', 'Ambegaon'),
    ('Pune', 'Bhor'),
    ('Pune', 'Velhe'),
    ('Pune', 'Maval'),
    ('Pune', 'Shirur'),
    ('Pune', 'Khed'),
    ('Pune', 'Daund'),
    ('Pune', 'Junnar'),
    ('Pune', 'Pune City'),

    -- Solapur - 11
    ('Solapur', 'North Solapur'),
    ('Solapur', 'Barshi'),
    ('Solapur', 'Pandharpur'),
    ('Solapur', 'Malshiras'),
    ('Solapur', 'Akkalkot'),
    ('Solapur', 'Sangola'),
    ('Solapur', 'Madha'),
    ('Solapur', 'Mohol'),
    ('Solapur', 'South Solapur'),
    ('Solapur', 'Mangalvedha'),
    ('Solapur', 'Karmala'),

    -- Kolhapur - 12
    ('Kolhapur', 'Karvir'),
    ('Kolhapur', 'Hatkanangale'),
    ('Kolhapur', 'Gadhinglaj'),
    ('Kolhapur', 'Panhala'),
    ('Kolhapur', 'Kagal'),
    ('Kolhapur', 'Chandgad'),
    ('Kolhapur', 'Shirol'),
    ('Kolhapur', 'Shahuwadi'),
    ('Kolhapur', 'Radhanagari'),
    ('Kolhapur', 'Bhudargad'),
    ('Kolhapur', 'Ajra'),
    ('Kolhapur', 'Gaganbawada'),

    -- Sangli - 10
    ('Sangli', 'Miraj'),
    ('Sangli', 'Kavathe-Mahankal'),
    ('Sangli', 'Jat'),
    ('Sangli', 'Tasgaon'),
    ('Sangli', 'Khanapur'),
    ('Sangli', 'Shirala'),
    ('Sangli', 'Walwa'),
    ('Sangli', 'Palus'),
    ('Sangli', 'Kadegaon'),
    ('Sangli', 'Atpadi'),

    -- Satara - 11
    ('Satara', 'Satara'),
    ('Satara', 'Phaltan'),
    ('Satara', 'Karad'),
    ('Satara', 'Koregaon'),
    ('Satara', 'Khatav'),
    ('Satara', 'Man'),
    ('Satara', 'Patan'),
    ('Satara', 'Wai'),
    ('Satara', 'Jaoli'),
    ('Satara', 'Khandala'),
    ('Satara', 'Mahabaleshwar'),


    -- ========================================================
    -- NASHIK DIVISION
    -- ========================================================

    -- Nashik - 15
    ('Nashik', 'Nashik'),
    ('Nashik', 'Igatpuri'),
    ('Nashik', 'Trimbakeshwar'),
    ('Nashik', 'Dindori'),
    ('Nashik', 'Peth'),
    ('Nashik', 'Kalwan'),
    ('Nashik', 'Surgana'),
    ('Nashik', 'Chandwad'),
    ('Nashik', 'Deola'),
    ('Nashik', 'Baglan'),
    ('Nashik', 'Malegaon'),
    ('Nashik', 'Nandgaon'),
    ('Nashik', 'Yeola'),
    ('Nashik', 'Niphad'),
    ('Nashik', 'Sinnar'),

    -- Jalgaon - 15
    ('Jalgaon', 'Jamner'),
    ('Jalgaon', 'Pachora'),
    ('Jalgaon', 'Chalisgaon'),
    ('Jalgaon', 'Chopda'),
    ('Jalgaon', 'Amalner'),
    ('Jalgaon', 'Jalgaon'),
    ('Jalgaon', 'Yawal'),
    ('Jalgaon', 'Raver'),
    ('Jalgaon', 'Parola'),
    ('Jalgaon', 'Bhadgaon'),
    ('Jalgaon', 'Erandol'),
    ('Jalgaon', 'Dharangaon'),
    ('Jalgaon', 'Bhusawal'),
    ('Jalgaon', 'Bodwad'),
    ('Jalgaon', 'Muktainagar'),

    -- Ahilyanagar - 14
    ('Ahilyanagar', 'Ahilyanagar'),
    ('Ahilyanagar', 'Parner'),
    ('Ahilyanagar', 'Sangamner'),
    ('Ahilyanagar', 'Rahuri'),
    ('Ahilyanagar', 'Nevasa'),
    ('Ahilyanagar', 'Akole'),
    ('Ahilyanagar', 'Shrigonda'),
    ('Ahilyanagar', 'Shevgaon'),
    ('Ahilyanagar', 'Pathardi'),
    ('Ahilyanagar', 'Kopargaon'),
    ('Ahilyanagar', 'Jamkhed'),
    ('Ahilyanagar', 'Rahata'),
    ('Ahilyanagar', 'Shrirampur'),
    ('Ahilyanagar', 'Karjat'),

    -- Dhule - 4
    ('Dhule', 'Dhule'),
    ('Dhule', 'Sakri'),
    ('Dhule', 'Sindkheda'),
    ('Dhule', 'Shirpur'),

    -- Nandurbar - 6
    ('Nandurbar', 'Nandurbar'),
    ('Nandurbar', 'Shahada'),
    ('Nandurbar', 'Navapur'),
    ('Nandurbar', 'Akkalkuwa'),
    ('Nandurbar', 'Taloda'),
    ('Nandurbar', 'Akrani'),


    -- ========================================================
    -- AMRAVATI DIVISION
    -- ========================================================

    -- Amravati - 14
    ('Amravati', 'Amravati'),
    ('Amravati', 'Chandurbazar'),
    ('Amravati', 'Morshi'),
    ('Amravati', 'Achalpur'),
    ('Amravati', 'Warud'),
    ('Amravati', 'Daryapur'),
    ('Amravati', 'Nandgaon Khandeshwar'),
    ('Amravati', 'Dhamangaon Railway'),
    ('Amravati', 'Anjangaon Surji'),
    ('Amravati', 'Bhatkuli'),
    ('Amravati', 'Dharni'),
    ('Amravati', 'Tiosa'),
    ('Amravati', 'Chandur Railway'),
    ('Amravati', 'Chikhaldara'),

    -- Buldhana - 13
    ('Buldhana', 'Chikhli'),
    ('Buldhana', 'Khamgaon'),
    ('Buldhana', 'Mehkar'),
    ('Buldhana', 'Buldhana'),
    ('Buldhana', 'Sindkhed Raja'),
    ('Buldhana', 'Motala'),
    ('Buldhana', 'Shegaon'),
    ('Buldhana', 'Lonar'),
    ('Buldhana', 'Nandura'),
    ('Buldhana', 'Deulgaon Raja'),
    ('Buldhana', 'Malkapur'),
    ('Buldhana', 'Sangrampur'),
    ('Buldhana', 'Jalgaon Jamod'),

    -- Yavatmal - 16
    ('Yavatmal', 'Yavatmal'),
    ('Yavatmal', 'Pusad'),
    ('Yavatmal', 'Umarkhed'),
    ('Yavatmal', 'Wani'),
    ('Yavatmal', 'Darwha'),
    ('Yavatmal', 'Mahagaon'),
    ('Yavatmal', 'Ghatanji'),
    ('Yavatmal', 'Arni'),
    ('Yavatmal', 'Ralegaon'),
    ('Yavatmal', 'Kelapur'),
    ('Yavatmal', 'Ner'),
    ('Yavatmal', 'Kalamb'),
    ('Yavatmal', 'Digras'),
    ('Yavatmal', 'Babhulgaon'),
    ('Yavatmal', 'Maregaon'),
    ('Yavatmal', 'Zari Jamani'),

    -- Akola - 7
    ('Akola', 'Akola'),
    ('Akola', 'Akot'),
    ('Akola', 'Balapur'),
    ('Akola', 'Murtizapur'),
    ('Akola', 'Barshitakli'),
    ('Akola', 'Telhara'),
    ('Akola', 'Patur'),

    -- Washim - 6
    ('Washim', 'Washim'),
    ('Washim', 'Risod'),
    ('Washim', 'Karanja'),
    ('Washim', 'Malegaon'),
    ('Washim', 'Mangrulpir'),
    ('Washim', 'Manora'),


    -- ========================================================
    -- CHHATRAPATI SAMBHAJINAGAR DIVISION
    -- ========================================================

    -- Chhatrapati Sambhajinagar - 9
    ('Chhatrapati Sambhajinagar', 'Chhatrapati Sambhajinagar'),
    ('Chhatrapati Sambhajinagar', 'Paithan'),
    ('Chhatrapati Sambhajinagar', 'Vaijapur'),
    ('Chhatrapati Sambhajinagar', 'Gangapur'),
    ('Chhatrapati Sambhajinagar', 'Sillod'),
    ('Chhatrapati Sambhajinagar', 'Kannad'),
    ('Chhatrapati Sambhajinagar', 'Phulambri'),
    ('Chhatrapati Sambhajinagar', 'Khuldabad'),
    ('Chhatrapati Sambhajinagar', 'Soegaon'),

    -- Beed - 11
    ('Beed', 'Beed'),
    ('Beed', 'Georai'),
    ('Beed', 'Ashti'),
    ('Beed', 'Kaij'),
    ('Beed', 'Ambajogai'),
    ('Beed', 'Majalgaon'),
    ('Beed', 'Parli'),
    ('Beed', 'Patoda'),
    ('Beed', 'Shirur Kasar'),
    ('Beed', 'Wadwani'),
    ('Beed', 'Dharur'),

    -- Nanded - 15
    ('Nanded', 'Nanded'),
    ('Nanded', 'Mukhed'),
    ('Nanded', 'Kinwat'),
    ('Nanded', 'Hadgaon'),
    ('Nanded', 'Bhokar'),
    ('Nanded', 'Loha'),
    ('Nanded', 'Deglur'),
    ('Nanded', 'Biloli'),
    ('Nanded', 'Naigaon'),
    ('Nanded', 'Mudkhed'),
    ('Nanded', 'Umri'),
    ('Nanded', 'Ardhapur'),
    ('Nanded', 'Dharmabad'),
    ('Nanded', 'Mahur'),
    ('Nanded', 'Himayatnagar'),

    -- Jalna - 8
    ('Jalna', 'Jalna'),
    ('Jalna', 'Bhokardan'),
    ('Jalna', 'Ambad'),
    ('Jalna', 'Ghansawangi'),
    ('Jalna', 'Jafrabad'),
    ('Jalna', 'Partur'),
    ('Jalna', 'Mantha'),
    ('Jalna', 'Badnapur'),

    -- Latur - 10
    ('Latur', 'Latur'),
    ('Latur', 'Ausa'),
    ('Latur', 'Nilanga'),
    ('Latur', 'Udgir'),
    ('Latur', 'Ahmedpur'),
    ('Latur', 'Chakur'),
    ('Latur', 'Renapur'),
    ('Latur', 'Jalkot'),
    ('Latur', 'Deoni'),
    ('Latur', 'Shirur Anantpal'),

    -- Parbhani - 9
    ('Parbhani', 'Parbhani'),
    ('Parbhani', 'Purna'),
    ('Parbhani', 'Selu'),
    ('Parbhani', 'Jintur'),
    ('Parbhani', 'Palam'),
    ('Parbhani', 'Gangakhed'),
    ('Parbhani', 'Sonpeth'),
    ('Parbhani', 'Pathri'),
    ('Parbhani', 'Manwath'),

    -- Dharashiv - 8
    ('Dharashiv', 'Dharashiv'),
    ('Dharashiv', 'Tuljapur'),
    ('Dharashiv', 'Umarga'),
    ('Dharashiv', 'Bhum'),
    ('Dharashiv', 'Kalamb'),
    ('Dharashiv', 'Paranda'),
    ('Dharashiv', 'Lohara'),
    ('Dharashiv', 'Washi'),

    -- Hingoli - 5
    ('Hingoli', 'Hingoli'),
    ('Hingoli', 'Kalamnuri'),
    ('Hingoli', 'Sengaon'),
    ('Hingoli', 'Vasmat'),
    ('Hingoli', 'Aundha Nagnath'),


    -- ========================================================
    -- NAGPUR DIVISION
    -- ========================================================

    -- Nagpur - 14
    ('Nagpur', 'Nagpur Rural'),
    ('Nagpur', 'Saoner'),
    ('Nagpur', 'Katol'),
    ('Nagpur', 'Ramtek'),
    ('Nagpur', 'Umred'),
    ('Nagpur', 'Narkhed'),
    ('Nagpur', 'Kalameshwar'),
    ('Nagpur', 'Hingna'),
    ('Nagpur', 'Mouda'),
    ('Nagpur', 'Parseoni'),
    ('Nagpur', 'Kuhi'),
    ('Nagpur', 'Bhiwapur'),
    ('Nagpur', 'Nagpur City'),
    ('Nagpur', 'Kamptee'),

    -- Chandrapur - 15
    ('Chandrapur', 'Warora'),
    ('Chandrapur', 'Brahmapuri'),
    ('Chandrapur', 'Bhadravati'),
    ('Chandrapur', 'Chimur'),
    ('Chandrapur', 'Nagbhid'),
    ('Chandrapur', 'Chandrapur'),
    ('Chandrapur', 'Rajura'),
    ('Chandrapur', 'Ballarpur'),
    ('Chandrapur', 'Saoli'),
    ('Chandrapur', 'Gondpimpri'),
    ('Chandrapur', 'Pombhurna'),
    ('Chandrapur', 'Sindewahi'),
    ('Chandrapur', 'Korpana'),
    ('Chandrapur', 'Mul'),
    ('Chandrapur', 'Jiwati'),

    -- Wardha - 8
    ('Wardha', 'Wardha'),
    ('Wardha', 'Samudrapur'),
    ('Wardha', 'Deoli'),
    ('Wardha', 'Seloo'),
    ('Wardha', 'Karanja'),
    ('Wardha', 'Hinganghat'),
    ('Wardha', 'Arvi'),
    ('Wardha', 'Ashti'),

    -- Gadchiroli - 12
    ('Gadchiroli', 'Gadchiroli'),
    ('Gadchiroli', 'Sironcha'),
    ('Gadchiroli', 'Desaiganj'),
    ('Gadchiroli', 'Dhanora'),
    ('Gadchiroli', 'Chamorshi'),
    ('Gadchiroli', 'Mulchera'),
    ('Gadchiroli', 'Armori'),
    ('Gadchiroli', 'Korchi'),
    ('Gadchiroli', 'Aheri'),
    ('Gadchiroli', 'Etapalli'),
    ('Gadchiroli', 'Bhamragad'),
    ('Gadchiroli', 'Kurkheda'),

    -- Bhandara - 7
    ('Bhandara', 'Bhandara'),
    ('Bhandara', 'Mohadi'),
    ('Bhandara', 'Tumsar'),
    ('Bhandara', 'Pauni'),
    ('Bhandara', 'Sakoli'),
    ('Bhandara', 'Lakhani'),
    ('Bhandara', 'Lakhandur'),

    -- Gondia - 8
    ('Gondia', 'Gondia'),
    ('Gondia', 'Tirora'),
    ('Gondia', 'Arjuni Morgaon'),
    ('Gondia', 'Deori'),
    ('Gondia', 'Goregaon'),
    ('Gondia', 'Amgaon'),
    ('Gondia', 'Salekasa'),
    ('Gondia', 'Sadak Arjuni')

) AS x(district_name, taluka_name)
JOIN districts d
    ON d.name = x.district_name
JOIN states s
    ON s.id = d.state_id
   AND s.code = 'MH';


-- ============================================================
-- 2. VERIFY TOTAL
-- ============================================================

DO $$
DECLARE
    total_talukas INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO total_talukas
    FROM talukas t
    JOIN districts d
        ON d.id = t.district_id
    JOIN states s
        ON s.id = d.state_id
    WHERE s.code = 'MH';

    IF total_talukas <> 360 THEN
        RAISE EXCEPTION
            'V11 taluka seed failed. Expected 360 Maharashtra talukas, found %',
            total_talukas;
    END IF;
END $$;


-- ============================================================
-- 3. VERIFY DISTRICT COUNTS
-- ============================================================

DO $$
DECLARE
    expected_count INTEGER;
    actual_count INTEGER;
    district_record RECORD;
BEGIN

    FOR district_record IN
        SELECT *
        FROM (
            VALUES
                ('Mumbai City', 2),
                ('Mumbai Suburban', 3),
                ('Thane', 7),
                ('Palghar', 8),
                ('Ratnagiri', 9),
                ('Raigad', 16),
                ('Sindhudurg', 8),

                ('Pune', 14),
                ('Solapur', 11),
                ('Kolhapur', 12),
                ('Sangli', 10),
                ('Satara', 11),

                ('Nashik', 15),
                ('Jalgaon', 15),
                ('Ahilyanagar', 14),
                ('Dhule', 4),
                ('Nandurbar', 6),

                ('Amravati', 14),
                ('Buldhana', 13),
                ('Yavatmal', 16),
                ('Akola', 7),
                ('Washim', 6),

                ('Chhatrapati Sambhajinagar', 9),
                ('Beed', 11),
                ('Nanded', 15),
                ('Jalna', 8),
                ('Latur', 10),
                ('Parbhani', 9),
                ('Dharashiv', 8),
                ('Hingoli', 5),

                ('Nagpur', 14),
                ('Chandrapur', 15),
                ('Wardha', 8),
                ('Gadchiroli', 12),
                ('Bhandara', 7),
                ('Gondia', 8)
        ) AS expected(district_name, expected_count)
    LOOP

        SELECT COUNT(*)
        INTO actual_count
        FROM talukas t
        JOIN districts d
            ON d.id = t.district_id
        JOIN states s
            ON s.id = d.state_id
        WHERE s.code = 'MH'
          AND d.name = district_record.district_name;

        expected_count := district_record.expected_count;

        IF actual_count <> expected_count THEN
            RAISE EXCEPTION
                'V11 failed for district %. Expected %, found %',
                district_record.district_name,
                expected_count,
                actual_count;
        END IF;

    END LOOP;

END $$;


-- ============================================================
-- END V11
-- ============================================================