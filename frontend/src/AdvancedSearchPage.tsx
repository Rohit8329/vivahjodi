import { useEffect, useState } from "react";

import {
  searchProfiles,
  searchPublicProfiles,
  type ProfileSearchRequest,
  type ProfileSearchResponse,
} from "./api/search";


/* remove the above import and uncomment following import to lock visitor for profile filter
import {
  searchProfiles,
  type ProfileSearchResponse,
} from "./api/search";
*/

import {
  getStates,
  getDistricts,
  getTalukas,
  type MasterState,
  type MasterDistrict,
  type MasterTaluka,
} from "./api/master";

type AdvancedSearchForm = {
  gender: string;
  minAge: string;
  maxAge: string;
  minHeightCm: string;
  maxHeightCm: string;
  maritalStatus: string;
  physicalDisability: string;

  motherTongue: string;
  religion: string;
  caste: string;
  subCaste: string;

  education: string;
  occupation: string;
  minIncome: string;
  maxIncome: string;

  complexion: string;
  bodyType: string;

  zodiacSign: string;
  nakshatra: string;
  manglikStatus: string;

  eatingHabits: string;
  smokingHabits: string;
  drinkingHabits: string;

  nri: string;
  nriCountry: string;

  currentState: string;
  currentDistrict: string;
  currentTaluka: string;

  nativeState: string;
  nativeDistrict: string;
  nativeTaluka: string;
};

/*uncooment the following export and  remove the following export }) {
export default function AdvancedSearchPage() {
*/

export default function AdvancedSearchPage({
  canViewFullSearch,
}: {
  canViewFullSearch: boolean;
}) {

  const [searchForm, setSearchForm] =
    useState<AdvancedSearchForm>({
      gender: "",
      minAge: "",
      maxAge: "",
      minHeightCm: "",
      maxHeightCm: "",
      maritalStatus: "",
      physicalDisability: "",

      motherTongue: "",
      religion: "",
      caste: "",
      subCaste: "",

      education: "",
      occupation: "",
      minIncome: "",
      maxIncome: "",

      complexion: "",
      bodyType: "",

      zodiacSign: "",
      nakshatra: "",
      manglikStatus: "",

      eatingHabits: "",
      smokingHabits: "",
      drinkingHabits: "",

      nri: "",
      nriCountry: "",

      currentState: "",
      currentDistrict: "",
      currentTaluka: "",

      nativeState: "",
      nativeDistrict: "",
      nativeTaluka: "",
    });

  /*
   * ============================================================
   * ADVANCED SEARCH RESULT STATE
   * ============================================================
   */

  const [searchResults, setSearchResults] =
    useState<ProfileSearchResponse[]>([]);

  const [searchLoading, setSearchLoading] =
    useState(false);

  const [searchError, setSearchError] =
    useState("");

  const [searchMessage, setSearchMessage] =
    useState("");

  /*
   * ============================================================
   * CURRENT LOCATION MASTER DATA
   * ============================================================
   */

  const [masterStates, setMasterStates] =
    useState<MasterState[]>([]);

  const [masterStateLoading, setMasterStateLoading] =
    useState(false);

  const [masterDistricts, setMasterDistricts] =
    useState<MasterDistrict[]>([]);

  const [masterDistrictLoading, setMasterDistrictLoading] =
    useState(false);

  const [masterTalukas, setMasterTalukas] =
    useState<MasterTaluka[]>([]);

  const [masterTalukaLoading, setMasterTalukaLoading] =
    useState(false);

  const [selectedDistrict, setSelectedDistrict] =
    useState("");

  const [selectedTaluka, setSelectedTaluka] =
    useState("");

  const [selectedState, setSelectedState] =
    useState("");

  /*
   * ============================================================
   * NATIVE LOCATION MASTER DATA
   * ============================================================
   */

  const [selectedNativeState, setSelectedNativeState] =
    useState("");

  const [nativeMasterDistricts, setNativeMasterDistricts] =
    useState<MasterDistrict[]>([]);

  const [
    nativeMasterDistrictLoading,
    setNativeMasterDistrictLoading,
  ] = useState(false);

  const [nativeMasterTalukas, setNativeMasterTalukas] =
    useState<MasterTaluka[]>([]);

  const [
    nativeMasterTalukaLoading,
    setNativeMasterTalukaLoading,
  ] = useState(false);

  /*
   * ============================================================
   * LOAD STATES
   * ============================================================
   */

  useEffect(() => {
    const loadStates = async () => {
      try {
        setMasterStateLoading(true);

        const states = await getStates();

        setMasterStates(states);
      } catch (error) {
        console.error(
          "Failed to load states:",
          error,
        );
      } finally {
        setMasterStateLoading(false);
      }
    };

    loadStates();
  }, []);

  /*
   * ============================================================
   * CURRENT LOCATION - DISTRICTS
   * ============================================================
   */

  useEffect(() => {
    let cancelled = false;

    async function loadMasterDistricts() {
      if (!selectedState) {
        setMasterDistricts([]);
        return;
      }

      const state = masterStates.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          selectedState.trim().toLowerCase(),
      );

      if (!state) {
        setMasterDistricts([]);
        return;
      }

      try {
        setMasterDistrictLoading(true);

        const districts = await getDistricts(state.id);

        if (!cancelled) {
          setMasterDistricts(districts);
        }
      } catch (error) {
        console.error(
          "Failed to load districts:",
          error,
        );

        if (!cancelled) {
          setMasterDistricts([]);
        }
      } finally {
        if (!cancelled) {
          setMasterDistrictLoading(false);
        }
      }
    }

    loadMasterDistricts();

    return () => {
      cancelled = true;
    };
  }, [selectedState, masterStates]);

  /*
   * ============================================================
   * CURRENT LOCATION - TALUKAS
   * ============================================================
   */

  useEffect(() => {
    let cancelled = false;

    async function loadMasterTalukas() {
      if (!selectedDistrict) {
        setMasterTalukas([]);
        return;
      }

      const district = masterDistricts.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          selectedDistrict.trim().toLowerCase(),
      );

      if (!district) {
        setMasterTalukas([]);
        return;
      }

      try {
        setMasterTalukaLoading(true);

        const talukas = await getTalukas(district.id);

        if (!cancelled) {
          setMasterTalukas(talukas);
        }
      } catch (error) {
        console.error(
          "Failed to load talukas:",
          error,
        );

        if (!cancelled) {
          setMasterTalukas([]);
        }
      } finally {
        if (!cancelled) {
          setMasterTalukaLoading(false);
        }
      }
    }

    loadMasterTalukas();

    return () => {
      cancelled = true;
    };
  }, [selectedDistrict, masterDistricts]);

  /*
   * ============================================================
   * NATIVE LOCATION - DISTRICTS
   * ============================================================
   */

  useEffect(() => {
    let cancelled = false;

    async function loadNativeDistricts() {
      if (!selectedNativeState) {
        setNativeMasterDistricts([]);
        return;
      }

      const state = masterStates.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          selectedNativeState.trim().toLowerCase(),
      );

      if (!state) {
        setNativeMasterDistricts([]);
        return;
      }

      try {
        setNativeMasterDistrictLoading(true);

        const districts = await getDistricts(state.id);

        if (!cancelled) {
          setNativeMasterDistricts(districts);
        }
      } catch (error) {
        console.error(
          "Failed to load native districts:",
          error,
        );

        if (!cancelled) {
          setNativeMasterDistricts([]);
        }
      } finally {
        if (!cancelled) {
          setNativeMasterDistrictLoading(false);
        }
      }
    }

    loadNativeDistricts();

    return () => {
      cancelled = true;
    };
  }, [selectedNativeState, masterStates]);

  /*
   * ============================================================
   * NATIVE LOCATION - TALUKAS
   * ============================================================
   */

  useEffect(() => {
    let cancelled = false;

    async function loadNativeTalukas() {
      if (!searchForm.nativeDistrict) {
        setNativeMasterTalukas([]);
        return;
      }

      const district = nativeMasterDistricts.find(
        (item) =>
          item.name.trim().toLowerCase() ===
          searchForm.nativeDistrict
            .trim()
            .toLowerCase(),
      );

      if (!district) {
        setNativeMasterTalukas([]);
        return;
      }

      try {
        setNativeMasterTalukaLoading(true);

        const talukas = await getTalukas(district.id);

        if (!cancelled) {
          setNativeMasterTalukas(talukas);
        }
      } catch (error) {
        console.error(
          "Failed to load native talukas:",
          error,
        );

        if (!cancelled) {
          setNativeMasterTalukas([]);
        }
      } finally {
        if (!cancelled) {
          setNativeMasterTalukaLoading(false);
        }
      }
    }

    loadNativeTalukas();

    return () => {
      cancelled = true;
    };
  }, [
    searchForm.nativeDistrict,
    nativeMasterDistricts,
  ]);

  /*
   * ============================================================
   * ADVANCED SEARCH API
   * ============================================================
   */

  const handleAdvancedSearch = async () => {
    const token = localStorage.getItem(
      "vivahjodi_token",
    );

    /* uncmment this for lock visitor to filter profile
    if (!token) {
      setSearchResults([]);
      setSearchError(
        "शोध करण्यासाठी कृपया प्रथम लॉगिन करा.",
      );
      setSearchMessage("");
      return;
    } */

    setSearchLoading(true);
    setSearchError("");
    setSearchMessage("");

    try {
     /* uncomment the this const and remove the following cont request to lock visitors for profile filter
     const results = await searchProfiles(token, {
     */
     const request: ProfileSearchRequest = {
        gender:
          searchForm.gender || undefined,

        minAge:
          searchForm.minAge
            ? Number(searchForm.minAge)
            : undefined,

        maxAge:
          searchForm.maxAge
            ? Number(searchForm.maxAge)
            : undefined,

        minHeightCm:
          searchForm.minHeightCm
            ? Number(searchForm.minHeightCm)
            : undefined,

        maxHeightCm:
          searchForm.maxHeightCm
            ? Number(searchForm.maxHeightCm)
            : undefined,

        maritalStatus:
          searchForm.maritalStatus || undefined,

        physicalDisability:
          searchForm.physicalDisability === ""
            ? undefined
            : searchForm.physicalDisability ===
              "true",

        motherTongue:
          searchForm.motherTongue || undefined,

        religion:
          searchForm.religion || undefined,

        caste:
          searchForm.caste.trim() || undefined,

        subCaste:
          searchForm.subCaste.trim() || undefined,

        education:
          searchForm.education || undefined,

        occupation:
          searchForm.occupation.trim() || undefined,

        minIncome:
          searchForm.minIncome
            ? Number(searchForm.minIncome)
            : undefined,

        maxIncome:
          searchForm.maxIncome
            ? Number(searchForm.maxIncome)
            : undefined,

        complexion:
          searchForm.complexion || undefined,

        bodyType:
          searchForm.bodyType || undefined,

        zodiacSign:
          searchForm.zodiacSign || undefined,

        nakshatra:
          searchForm.nakshatra || undefined,

        manglikStatus:
          searchForm.manglikStatus || undefined,

        eatingHabits:
          searchForm.eatingHabits || undefined,

        smokingHabits:
          searchForm.smokingHabits || undefined,

        drinkingHabits:
          searchForm.drinkingHabits || undefined,

        nri:
          searchForm.nri === ""
            ? undefined
            : searchForm.nri === "true",

        nriCountry:
          searchForm.nri === "true" &&
          searchForm.nriCountry.trim()
            ? searchForm.nriCountry.trim()
            : undefined,

        currentState:
          searchForm.currentState || undefined,

        currentDistrict:
          searchForm.currentDistrict || undefined,

        currentTaluka:
          searchForm.currentTaluka || undefined,

        nativeState:
          searchForm.nativeState || undefined,

        nativeDistrict:
          searchForm.nativeDistrict || undefined,

        nativeTaluka:
          searchForm.nativeTaluka || undefined,

       /* uncomment the this const and remove the following page:0 to token & both await to lock visitors for profile filter
          page: 0,
        size: 20,
      }); */

      page: 0,
      size: 20,
      };

      const results =
        token && canViewFullSearch
          ? await searchProfiles(token, request)
          : await searchPublicProfiles(request);

      setSearchResults(results);

      if (results.length === 0) {
        setSearchMessage(
          "तुमच्या पसंतीनुसार कोणतेही प्रोफाइल सापडले नाही.",
        );
      } else {
        setSearchMessage(
          `${results.length} प्रोफाइल सापडले.`,
        );
      }
    } catch (error) {
      console.error(
        "Advanced search failed:",
        error,
      );

      setSearchResults([]);

      setSearchError(
        "शोध करताना काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
      );
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <main className="advanced-search-page">
      <section className="section">
        <div className="container">

          <div className="section-heading">
            {/* <span className="section-kicker">
              प्रगत शोध
            </span> */}

            <h1>
              ऍडव्हान्स शोध
            </h1>

            <p>
              तुमच्या पसंतीनुसार योग्य जोडीदार शोधा.
            </p>
          </div>

          {/* =================================================
              BASIC PREFERENCES
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                मूलभूत पसंती
              </h2>

              <p>
                जोडीदारासाठी तुमच्या प्राथमिक पसंती निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* Looking For */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-looking-for">
                  शोधत आहे
                </label>

                <select
                  id="advanced-looking-for"
                  value={searchForm.gender}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      gender: event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    निवडा
                  </option>

                  <option value="MALE">
                    वर
                  </option>

                  <option value="FEMALE">
                    वधू
                  </option>
                </select>
              </div>

              {/* Age From */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-age-from">
                  वयापासून
                </label>

                <input
                  id="advanced-age-from"
                  type="number"
                  min="18"
                  max="100"
                  placeholder="उदा. 25"
                  value={searchForm.minAge}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      minAge: event.target.value,
                    }));
                  }}
                />
              </div>

              {/* Age To */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-age-to">
                  वयापर्यंत
                </label>

                <input
                  id="advanced-age-to"
                  type="number"
                  min="18"
                  max="100"
                  placeholder="उदा. 30"
                  value={searchForm.maxAge}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      maxAge: event.target.value,
                    }));
                  }}
                />
              </div>

              {/* Height From */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-height-from">
                  उंचीपासून (सेमी)
                </label>

                <input
                  id="advanced-height-from"
                  type="number"
                  min="100"
                  max="250"
                  placeholder="उदा. 155"
                  value={searchForm.minHeightCm}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      minHeightCm:
                        event.target.value,
                    }));
                  }}
                />
              </div>

              {/* Height To */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-height-to">
                  उंचीपर्यंत (सेमी)
                </label>

                <input
                  id="advanced-height-to"
                  type="number"
                  min="100"
                  max="250"
                  placeholder="उदा. 175"
                  value={searchForm.maxHeightCm}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      maxHeightCm:
                        event.target.value,
                    }));
                  }}
                />
              </div>

              {/* Marital Status */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-marital-status">
                  वैवाहिक स्थिती
                </label>

                <select
                  id="advanced-marital-status"
                  value={searchForm.maritalStatus}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      maritalStatus:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणतीही
                  </option>

                  <option value="NEVER_MARRIED">
                    कधीही विवाह न झालेला
                  </option>

                  <option value="DIVORCED">
                    घटस्फोटित
                  </option>

                  <option value="WIDOWED">
                    विधवा / विधुर
                  </option>

                  <option value="SEPARATED">
                    विभक्त
                  </option>
                </select>
              </div>

              {/* Physical Disability */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-physical-disability">
                  शारीरिक अपंगत्व
                </label>

                <select
                  id="advanced-physical-disability"
                  value={searchForm.physicalDisability}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      physicalDisability:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    काहीही
                  </option>

                  <option value="false">
                    सामान्य
                  </option>

                  <option value="true">
                    शारीरिकदृष्ट्या अपंग
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* =================================================
              RELIGION & COMMUNITY
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                धर्म आणि समाज
              </h2>

              <p>
                धर्म, समाज आणि मातृभाषेनुसार शोध निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* Mother Tongue */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-mother-tongue">
                  मातृभाषा
                </label>

                <select
                  id="advanced-mother-tongue"
                  value={searchForm.motherTongue}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      motherTongue:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणतीही
                  </option>

                  <option value="मराठी">
                    मराठी
                  </option>

                  <option value="हिंदी">
                    हिंदी
                  </option>

                  <option value="इंग्रजी">
                    इंग्रजी
                  </option>

                  <option value="गुजराती">
                    गुजराती
                  </option>

                  <option value="कन्नड">
                    कन्नड
                  </option>

                  <option value="तेलुगू">
                    तेलुगू
                  </option>

                  <option value="तमिळ">
                    तमिळ
                  </option>

                  <option value="इतर">
                    इतर
                  </option>
                </select>
              </div>

              {/* Religion */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-religion">
                  धर्म
                </label>

                <select
                  id="advanced-religion"
                  value={searchForm.religion}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      religion:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणताही
                  </option>

                  <option value="हिंदू">
                    हिंदू
                  </option>

                  <option value="बौद्ध">
                    बौद्ध
                  </option>

                  <option value="जैन">
                    जैन
                  </option>

                  <option value="शीख">
                    शीख
                  </option>

                  <option value="ख्रिश्चन">
                    ख्रिश्चन
                  </option>

                  <option value="मुस्लिम">
                    मुस्लिम
                  </option>

                  <option value="इतर">
                    इतर
                  </option>
                </select>
              </div>

              {/* Caste */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-caste">
                  जात
                </label>

                <input
                  id="advanced-caste"
                  type="text"
                  placeholder="उदा. ब्राह्मण"
                  value={searchForm.caste}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      caste: event.target.value,
                    }));
                  }}
                />
              </div>

              {/* Sub Caste */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-sub-caste">
                  उपजात
                </label>

                <input
                  id="advanced-sub-caste"
                  type="text"
                  placeholder="उदा. चित्पावन ब्राह्मण"
                  value={searchForm.subCaste}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      subCaste:
                        event.target.value,
                    }));
                  }}
                />
              </div>

            </div>
          </div>

          {/* =================================================
              EDUCATION & CAREER
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                शिक्षण आणि करिअर
              </h2>

              <p>
                शिक्षण, व्यवसाय आणि वार्षिक उत्पन्नानुसार शोध निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* Education */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-education">
                  शिक्षण
                </label>

                <select
                  id="advanced-education"
                  value={searchForm.education}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      education:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणतेही
                  </option>

                  <option value="UNDERGRADUATE">
                    पदवी
                  </option>

                  <option value="POSTGRADUATE">
                    पदव्युत्तर
                  </option>

                  <option value="ENGINEERING">
                    अभियांत्रिकी
                  </option>

                  <option value="MEDICAL">
                    वैद्यकीय
                  </option>

                  <option value="COMMERCE">
                    वाणिज्य
                  </option>

                  <option value="ARTS">
                    कला
                  </option>

                  <option value="MANAGEMENT">
                    व्यवस्थापन
                  </option>

                  <option value="LAW">
                    कायदा
                  </option>

                  <option value="OTHER">
                    इतर
                  </option>
                </select>
              </div>

              {/* Occupation */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-occupation">
                  व्यवसाय
                </label>

                <input
                  id="advanced-occupation"
                  type="text"
                  placeholder="उदा. डॉक्टर, अभियंता"
                  value={searchForm.occupation}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      occupation:
                        event.target.value,
                    }));
                  }}
                />
              </div>

              {/* Annual Income From */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-income-from">
                  वार्षिक उत्पन्नापासून
                </label>

                <input
                  id="advanced-income-from"
                  type="number"
                  min="0"
                  placeholder="उदा. 500000"
                  value={searchForm.minIncome}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      minIncome:
                        event.target.value,
                    }));
                  }}
                />
              </div>

              {/* Annual Income To */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-income-to">
                  वार्षिक उत्पन्नापर्यंत
                </label>

                <input
                  id="advanced-income-to"
                  type="number"
                  min="0"
                  placeholder="उदा. 1500000"
                  value={searchForm.maxIncome}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      maxIncome:
                        event.target.value,
                    }));
                  }}
                />
              </div>

            </div>
          </div>

          {/* =================================================
              APPEARANCE
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                व्यक्तिमत्त्व आणि शरीरयष्टी
              </h2>

              <p>
                वर्ण आणि शरीरयष्टीनुसार शोध निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* Complexion */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-complexion">
                  वर्ण
                </label>

                <select
                  id="advanced-complexion"
                  value={searchForm.complexion}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      complexion:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणताही
                  </option>

                  <option value="FAIR">
                    गोरा
                  </option>

                  <option value="WHEATISH">
                    गव्हाळ
                  </option>

                  <option value="DARK">
                    सावळा
                  </option>

                  <option value="VERY_FAIR">
                    अतिगोरा
                  </option>

                  <option value="OTHER">
                    इतर
                  </option>
                </select>
              </div>

              {/* Body Type */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-body-type">
                  शरीरयष्टी
                </label>

                <select
                  id="advanced-body-type"
                  value={searchForm.bodyType}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      bodyType:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणतीही
                  </option>

                  <option value="SLIM">
                    सडपातळ
                  </option>

                  <option value="AVERAGE">
                    मध्यम
                  </option>

                  <option value="ATHLETIC">
                    अॅथलेटिक
                  </option>

                  <option value="HEAVY">
                    भरदार
                  </option>

                  <option value="OTHER">
                    इतर
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* =================================================
              ASTROLOGY
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                ज्योतिष
              </h2>

              <p>
                रास, नक्षत्र आणि मंगळिक स्थितीनुसार शोध निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* Zodiac Sign */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-zodiac-sign">
                  रास
                </label>

                <select
                  id="advanced-zodiac-sign"
                  value={searchForm.zodiacSign}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      zodiacSign:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणतीही
                  </option>

                  <option value="मेष">
                    मेष
                  </option>

                  <option value="वृषभ">
                    वृषभ
                  </option>

                  <option value="मिथुन">
                    मिथुन
                  </option>

                  <option value="कर्क">
                    कर्क
                  </option>

                  <option value="सिंह">
                    सिंह
                  </option>

                  <option value="कन्या">
                    कन्या
                  </option>

                  <option value="तुला">
                    तुला
                  </option>

                  <option value="वृश्चिक">
                    वृश्चिक
                  </option>

                  <option value="धनु">
                    धनु
                  </option>

                  <option value="मकर">
                    मकर
                  </option>

                  <option value="कुंभ">
                    कुंभ
                  </option>

                  <option value="मीन">
                    मीन
                  </option>
                </select>
              </div>

              {/* Nakshatra */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-nakshatra">
                  नक्षत्र
                </label>

                <select
                  id="advanced-nakshatra"
                  value={searchForm.nakshatra}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      nakshatra:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणतेही
                  </option>

                  <option value="अश्विनी">
                    अश्विनी
                  </option>

                  <option value="भरणी">
                    भरणी
                  </option>

                  <option value="कृत्तिका">
                    कृत्तिका
                  </option>

                  <option value="रोहिणी">
                    रोहिणी
                  </option>

                  <option value="मृगशीर्ष">
                    मृगशीर्ष
                  </option>

                  <option value="आर्द्रा">
                    आर्द्रा
                  </option>

                  <option value="पुनर्वसू">
                    पुनर्वसू
                  </option>

                  <option value="पुष्य">
                    पुष्य
                  </option>

                  <option value="आश्लेषा">
                    आश्लेषा
                  </option>

                  <option value="मघा">
                    मघा
                  </option>

                  <option value="पूर्वाफाल्गुनी">
                    पूर्वाफाल्गुनी
                  </option>

                  <option value="उत्तराफाल्गुनी">
                    उत्तराफाल्गुनी
                  </option>

                  <option value="हस्त">
                    हस्त
                  </option>

                  <option value="चित्रा">
                    चित्रा
                  </option>

                  <option value="स्वाती">
                    स्वाती
                  </option>

                  <option value="विशाखा">
                    विशाखा
                  </option>

                  <option value="अनुराधा">
                    अनुराधा
                  </option>

                  <option value="ज्येष्ठा">
                    ज्येष्ठा
                  </option>

                  <option value="मूळ">
                    मूळ
                  </option>

                  <option value="पूर्वाषाढा">
                    पूर्वाषाढा
                  </option>

                  <option value="उत्तराषाढा">
                    उत्तराषाढा
                  </option>

                  <option value="श्रवण">
                    श्रवण
                  </option>

                  <option value="धनिष्ठा">
                    धनिष्ठा
                  </option>

                  <option value="शततारका">
                    शततारका
                  </option>

                  <option value="पूर्वाभाद्रपदा">
                    पूर्वाभाद्रपदा
                  </option>

                  <option value="उत्तराभाद्रपदा">
                    उत्तराभाद्रपदा
                  </option>

                  <option value="रेवती">
                    रेवती
                  </option>
                </select>
              </div>

              {/* Manglik */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-manglik-status">
                  मंगळिक स्थिती
                </label>

                <select
                  id="advanced-manglik-status"
                  value={searchForm.manglikStatus}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      manglikStatus:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    कोणतीही
                  </option>

                  <option value="YES">
                    मंगळिक
                  </option>

                  <option value="NO">
                    अमंगळिक
                  </option>

                  <option value="DON'T_KNOW">
                    माहिती नाही
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* =================================================
              LIFESTYLE
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                जीवनशैली
              </h2>

              <p>
                खाण्याच्या, धूम्रपान आणि मद्यपानाच्या सवयी निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* Eating Habits */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-eating-habits">
                  खाण्याच्या सवयी
                </label>

                <select
                  id="advanced-eating-habits"
                  value={searchForm.eatingHabits}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      eatingHabits:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    काहीही
                  </option>

                  <option value="VEGETARIAN">
                    शाकाहारी
                  </option>

                  <option value="NON_VEGETARIAN">
                    मांसाहारी
                  </option>

                  <option value="EGGETARIAN">
                    अंडाहारी
                  </option>
                </select>
              </div>

              {/* Smoking Habits */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-smoking-habits">
                  धूम्रपान
                </label>

                <select
                  id="advanced-smoking-habits"
                  value={searchForm.smokingHabits}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      smokingHabits:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    काहीही
                  </option>

                  <option value="NO">
                    नाही
                  </option>

                  <option value="OCCASIONALLY">
                    अधूनमधून
                  </option>

                  <option value="YES">
                    होय
                  </option>
                </select>
              </div>

              {/* Drinking Habits */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-drinking-habits">
                  मद्यपान
                </label>

                <select
                  id="advanced-drinking-habits"
                  value={searchForm.drinkingHabits}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      drinkingHabits:
                        event.target.value,
                    }));
                  }}
                >
                  <option value="">
                    काहीही
                  </option>

                  <option value="NO">
                    नाही
                  </option>

                  <option value="OCCASIONALLY">
                    अधूनमधून
                  </option>

                  <option value="YES">
                    होय
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* =================================================
              CURRENT LOCATION
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                सध्याचे ठिकाण
              </h2>

              <p>
                सध्या राहत असलेल्या ठिकाणानुसार शोध निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* State */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-current-state">
                  राज्य
                </label>

                <select
                  id="advanced-current-state"
                  value={selectedState}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setSelectedState(value);

                    setSearchForm((current) => ({
                      ...current,
                      currentState: value,
                      currentDistrict: "",
                      currentTaluka: "",
                    }));
                  }}
                >
                  <option value="">
                    सर्व राज्ये
                  </option>

                  {masterStateLoading ? (
                    <option value="" disabled>
                      राज्ये लोड होत आहेत...
                    </option>
                  ) : (
                    masterStates.map((state) => (
                      <option
                        key={state.id}
                        value={state.name}
                      >
                        {state.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* District */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-current-district">
                  जिल्हा
                </label>

                <select
                  id="advanced-current-district"
                  value={selectedDistrict}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setSelectedDistrict(value);

                    setSearchForm((current) => ({
                      ...current,
                      currentDistrict: value,
                      currentTaluka: "",
                    }));
                  }}
                >
                  <option value="">
                    {masterDistrictLoading
                      ? "जिल्हे लोड होत आहेत..."
                      : "सर्व जिल्हे"}
                  </option>

                  {masterDistricts.map(
                    (district) => (
                      <option
                        key={district.id}
                        value={district.name}
                      >
                        {district.name}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* Taluka */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-current-taluka">
                  तालुका
                </label>

                <select
                  id="advanced-current-taluka"
                  value={selectedTaluka}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setSelectedTaluka(value);

                    setSearchForm((current) => ({
                      ...current,
                      currentTaluka: value,
                    }));
                  }}
                >
                  <option value="">
                    {masterTalukaLoading
                      ? "तालुके लोड होत आहेत..."
                      : "सर्व तालुके"}
                  </option>

                  {masterTalukas.map(
                    (taluka) => (
                      <option
                        key={taluka.id}
                        value={taluka.name}
                      >
                        {taluka.name}
                      </option>
                    ),
                  )}
                </select>
              </div>

            </div>
          </div>

          {/* =================================================
              NATIVE PLACE
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                मूळ गाव
              </h2>

              <p>
                मूळ गावाच्या ठिकाणानुसार शोध निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* Native State */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-native-state">
                  राज्य
                </label>

                <select
                  id="advanced-native-state"
                  value={selectedNativeState}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setSelectedNativeState(value);

                    setSearchForm((current) => ({
                      ...current,
                      nativeState: value,
                      nativeDistrict: "",
                      nativeTaluka: "",
                    }));
                  }}
                  disabled={masterStateLoading}
                >
                  <option value="">
                    {masterStateLoading
                      ? "राज्ये लोड होत आहेत..."
                      : "सर्व राज्ये"}
                  </option>

                  {masterStates.map((state) => (
                    <option
                      key={state.id}
                      value={state.name}
                    >
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Native District */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-native-district">
                  जिल्हा
                </label>

                <select
                  id="advanced-native-district"
                  value={searchForm.nativeDistrict}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setSearchForm((current) => ({
                      ...current,
                      nativeDistrict: value,
                      nativeTaluka: "",
                    }));
                  }}
                  disabled={
                    !selectedNativeState ||
                    nativeMasterDistrictLoading
                  }
                >
                  <option value="">
                    {nativeMasterDistrictLoading
                      ? "जिल्हे लोड होत आहेत..."
                      : "सर्व जिल्हे"}
                  </option>

                  {nativeMasterDistricts.map(
                    (district) => (
                      <option
                        key={district.id}
                        value={district.name}
                      >
                        {district.name}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* Native Taluka */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-native-taluka">
                  तालुका
                </label>

                <select
                  id="advanced-native-taluka"
                  value={searchForm.nativeTaluka}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setSearchForm((current) => ({
                      ...current,
                      nativeTaluka: value,
                    }));
                  }}
                  disabled={
                    !searchForm.nativeDistrict ||
                    nativeMasterTalukaLoading
                  }
                >
                  <option value="">
                    {nativeMasterTalukaLoading
                      ? "तालुके लोड होत आहेत..."
                      : "सर्व तालुके"}
                  </option>

                  {nativeMasterTalukas.map(
                    (taluka) => (
                      <option
                        key={taluka.id}
                        value={taluka.name}
                      >
                        {taluka.name}
                      </option>
                    ),
                  )}
                </select>
              </div>

            </div>
          </div>

          {/* =================================================
              NRI SEARCH
              ================================================= */}

          <div className="advanced-search-card">

            <div className="advanced-search-card-heading">
              <h2>
                NRI शोध
              </h2>

              <p>
                NRI स्थितीनुसार शोध निवडा.
              </p>
            </div>

            <div className="advanced-search-grid">

              {/* NRI Status */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-nri">
                  NRI स्थिती
                </label>

                <select
                  id="advanced-nri"
                  value={searchForm.nri}
                  onChange={(event) => {
                    const value =
                      event.target.value;

                    setSearchForm((current) => ({
                      ...current,
                      nri: value,
                      nriCountry:
                        value === "true"
                          ? current.nriCountry
                          : "",
                    }));
                  }}
                >
                  <option value="">
                    सर्व
                  </option>

                  <option value="false">
                    NRI नाही
                  </option>

                  <option value="true">
                    NRI
                  </option>
                </select>
              </div>

              {/* NRI Country */}

              <div className="advanced-search-field">
                <label htmlFor="advanced-nri-country">
                  NRI देश
                </label>

                <input
                  id="advanced-nri-country"
                  type="text"
                  placeholder="उदा. USA"
                  value={searchForm.nriCountry}
                  onChange={(event) => {
                    setSearchForm((current) => ({
                      ...current,
                      nriCountry:
                        event.target.value,
                    }));
                  }}
                  disabled={
                    searchForm.nri !== "true"
                  }
                />
              </div>

            </div>
          </div>

            {/* =================================================
                SEARCH ACTION
                ================================================= */}

            <div className="advanced-search-actions">
            <button
                type="button"
                className="advanced-search-submit"
                onClick={handleAdvancedSearch}
                disabled={searchLoading}
            >
                <span>
                {searchLoading
                    ? "शोध सुरू आहे..."
                    : "जोडीदार शोधा"}
                </span>

                {!searchLoading && (
                <span
                    className="advanced-search-submit-arrow"
                    aria-hidden="true"
                >
                    →
                </span>
                )}
            </button>
            </div>

          {/* =================================================
              SEARCH MESSAGE / ERROR
              ================================================= */}

          {searchError && (
            <div className="search-error">
              {searchError}
            </div>
          )}

          {searchMessage &&
            !searchError && (
              <div className="search-message">
                {searchMessage}
              </div>
            )}

          {/* =================================================
              SEARCH RESULTS
              ================================================= */}

          {!searchLoading &&
            searchResults.length > 0 && (
              <div className="search-results">

                {searchResults.map(
                  (profile) => (
                    <article
                    className="search-result-card"
                    key={profile.id}
                  >
                    <div className="search-result-photo-column">
                      {profile.photoUrl && (
                        <img
                          src={profile.photoUrl}
                          alt={`${profile.firstName} profile`}
                          className="search-result-photo"
                          onContextMenu={(event) => event.preventDefault()}
                          draggable={false}
                        />
                      )}

                      <button
                        type="button"
                        className="search-result-view-button"
                        onClick={() => {
                          window.location.href = `/profile/${profile.id}`;
                        }}
                      >
                        View Details
                      </button>
                    </div>

                    <div className="search-result-content">
                      <h3>
                        {[
                          profile.firstName,
                          profile.middleName,
                          profile.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      </h3>

                      <div className="search-result-info-grid">
                        <p>
                          <strong>ID</strong>
                          <span>
                            {profile.profileCode || profile.id}
                          </span>
                        </p>

                        <p>
                          <strong>नाव</strong>
                          <span>
                            {[
                              profile.firstName,
                              profile.middleName,
                              profile.lastName,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          </span>
                        </p>

                        <p>
                          <strong>लिंग</strong>
                          <span>{profile.gender || "—"}</span>
                        </p>

                        <p>
                          <strong>विवाह स्थिती</strong>
                          <span>{profile.maritalStatus || "—"}</span>
                        </p>

                        <p>
                          <strong>धर्म</strong>
                          <span>{profile.religion || "—"}</span>
                        </p>

                        <p>
                          <strong>समाज</strong>
                          <span>{profile.caste || "—"}</span>
                        </p>

                        <p>
                          <strong>पोटजात</strong>
                          <span>{profile.subCaste || "—"}</span>
                        </p>

                        <p>
                          <strong>वय</strong>
                          <span>
                            {profile.age
                              ? `${profile.age} वर्षे`
                              : "—"}
                          </span>
                        </p>

                        <p>
                          <strong>उंची</strong>
                          <span>
                            {profile.heightCm
                              ? `${profile.heightCm} सेमी`
                              : "—"}
                          </span>
                        </p>

                        <p>
                          <strong>शिक्षण</strong>
                          <span>
                            {profile.education || "—"}
                          </span>
                        </p>

                        <p>
                          <strong>व्यवसाय</strong>
                          <span>
                            {profile.occupation || "—"}
                          </span>
                        </p>

                        <p>
                          <strong>वार्षिक उत्पन्न</strong>
                          <span>
                            {profile.annualIncome !== null &&
                            profile.annualIncome !== undefined
                              ? `₹ ${profile.annualIncome}`
                              : "—"}
                          </span>
                        </p>

                        <p>
                          <strong>सध्याचे ठिकाण</strong>
                          <span>
                            {[
                              profile.currentCity || profile.city,
                              profile.currentDistrict,
                              profile.currentState || profile.state,
                            ]
                              .filter(Boolean)
                              .join(", ") || "—"}
                          </span>
                        </p>

                        <p>
                          <strong>मूळ ठिकाण</strong>
                          <span>
                            {[
                              profile.nativeCity,
                              profile.nativeDistrict,
                              profile.nativeState,
                            ]
                              .filter(Boolean)
                              .join(", ") || "—"}
                          </span>
                        </p>

                        <p>
                          <strong>शेवटचे लॉगिन</strong>
                          <span>
                            {profile.lastLogin
                              ? `${new Date(
                                  profile.lastLogin,
                                ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })} | ${new Date(
                                  profile.lastLogin,
                                ).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                                })}`
                              : "—"}
                          </span>
                        </p>

                        <p className="search-result-about-field">
                          <strong>माझ्याबद्दल</strong>
                          <span>
                            {profile.aboutMe || "माहिती उपलब्ध नाही"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </article>
                  ),
                )}

              </div>
            )}

        </div>
      </section>
    </main>
  );
}