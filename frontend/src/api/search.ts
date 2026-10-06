const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/* =========================================================
   PROFILE SEARCH REQUEST
   ========================================================= */

export type ProfileSearchRequest = {
  gender?: string;
  maritalStatus?: string;
  motherTongue?: string;

  complexion?: string;
  bodyType?: string;

  minHeightCm?: number;
  maxHeightCm?: number;

  physicalDisability?: boolean;

  minAge?: number;
  maxAge?: number;

  caste?: string;
  subCaste?: string;
  education?: string;

  city?: string;
  religion?: string;
  occupation?: string;

  minIncome?: number;
  maxIncome?: number;

  zodiacSign?: string;
  nakshatra?: string;
  manglikStatus?: string;

  eatingHabits?: string;
  smokingHabits?: string;
  drinkingHabits?: string;

  nri?: boolean;
  nriCountry?: string;

  currentCountry?: string;
  currentAddress?: string;
  currentPincode?: string;
  currentState?: string;
  currentDistrict?: string;
  currentTaluka?: string;
  currentCity?: string;

  nativeState?: string;
  nativeDistrict?: string;
  nativeTaluka?: string;
  nativeCity?: string;

  page?: number;
  size?: number;
};

/* =========================================================
   PROFILE SEARCH RESPONSE
   ========================================================= */

export type ProfileSearchResponse = {
  id: string;
  profileCode: string | null;

  firstName: string;
  middleName: string | null;
  lastName: string;

  gender: string;
  dateOfBirth: string;
  age: number | null;

  heightCm: number | null;
  maritalStatus: string | null;

  religion: string | null;
  caste: string | null;
  subCaste: string | null;
  motherTongue: string | null;

  complexion: string | null;
  bodyType: string | null;
  physicalDisability: boolean;

  zodiacSign: string | null;
  nakshatra: string | null;
  manglikStatus: string | null;

  eatingHabits: string | null;
  smokingHabits: string | null;
  drinkingHabits: string | null;

  nri: boolean;
  livingCountry: string | null;

  city: string | null;
  state: string | null;

  currentState: string | null;
  currentDistrict: string | null;
  currentTaluka: string | null;
  currentCity: string | null;

  nativeState: string | null;
  nativeDistrict: string | null;
  nativeTaluka: string | null;
  nativeCity: string | null;

  education: string | null;
  occupation: string | null;
  annualIncome: number | null;

  aboutMe: string | null;
  visibility: string | null;
  lastLogin: string | null;
};

/* =========================================================
   SEARCH PROFILES
   ========================================================= */

/**
 * Search ACTIVE profiles visible to the logged-in member.
 */
export async function searchProfiles(
  token: string,
  data: ProfileSearchRequest,
): Promise<ProfileSearchResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/search/profiles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "प्रोफाइल शोधताना त्रुटी आली.",
    );
  }

  return result;
}
