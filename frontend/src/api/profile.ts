const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

/* =========================================================
   PROFILE REQUEST
   ========================================================= */

export type ProfileRequest = {
  /* -------------------------------------------------------
     BASIC INFORMATION
     ------------------------------------------------------- */

  firstName: string;
  middleName?: string;
  lastName: string;

  gender: string;
  dateOfBirth: string;
  timeOfBirth?: string;
  birthPlace?: string;

  maritalStatus?: string;
  numberOfChildren?: number;

  heightCm?: number;
  weightKg?: number;

  bloodGroup?: string;
  complexion?: string;
  bodyType?: string;

  physicalDisability?: boolean;
  disabilityDetails?: string;

  /* -------------------------------------------------------
     RELIGION / COMMUNITY / CULTURAL
     ------------------------------------------------------- */

  religion?: string;
  caste?: string;
  subCaste?: string;
  gotra?: string;

  zodiacSign?: string;
  nakshatra?: string;
  manglikStatus?: string;

  motherTongue?: string;

  /* -------------------------------------------------------
     LIFESTYLE
     ------------------------------------------------------- */

  eatingHabits?: string;
  drinkingHabits?: string;
  smokingHabits?: string;

  /* -------------------------------------------------------
     CURRENT LOCATION
     ------------------------------------------------------- */

  currentCountry?: string;
  currentAddress?: string;
  currentPincode?: string;

  /* -------------------------------------------------------
     NATIVE LOCATION
     ------------------------------------------------------- */

  nativeCountry?: string;
  nativeState?: string;
  nativeDistrict?: string;
  nativeTaluka?: string;
  nativeCity?: string;

  /* -------------------------------------------------------
     NRI INFORMATION
     ------------------------------------------------------- */

  nri?: boolean;
  livingCountry?: string;
  nriAddress?: string;

  /* -------------------------------------------------------
     LEGACY / COMPATIBILITY LOCATION FIELDS
     ------------------------------------------------------- */

  nativePlace?: string;
  state?: string;
  district?: string;
  taluka?: string;
  city?: string;

    currentState?: string;
    currentDistrict?: string;
    currentTaluka?: string;
    currentCity?: string;

  /* -------------------------------------------------------
     ABOUT
     ------------------------------------------------------- */

  aboutMe?: string;

    /* -------------------------------------------------------
     PARTNER PREFERENCES
     ------------------------------------------------------- */

  partnerMinAge?: number;
  partnerMaxAge?: number;

  partnerMinHeightCm?: number;
  partnerMaxHeightCm?: number;

  partnerMaritalStatus?: string;
  partnerMotherTongue?: string;

  partnerReligion?: string;
  partnerCaste?: string;
  partnerSubCaste?: string;

  partnerZodiacSign?: string;
  partnerNakshatra?: string;
  partnerManglikStatus?: string;

  partnerEducation?: string;
  partnerOccupation?: string;

  partnerMinIncome?: number;
  partnerMaxIncome?: number;

  partnerAbout?: string;

  /* -------------------------------------------------------
     PROFILE VISIBILITY
     ------------------------------------------------------- */

  visibility?: string;
};

/* =========================================================
   PROFILE RESPONSE
   ========================================================= */

export type ProfileResponse = {
  id: string;
  userId: string;

  /* -------------------------------------------------------
     PROFILE ID
     ------------------------------------------------------- */

  profileCode: string | null;

  /* -------------------------------------------------------
     BASIC INFORMATION
     ------------------------------------------------------- */

  firstName: string;
  middleName: string | null;
  lastName: string;

  gender: string;
  dateOfBirth: string;

  timeOfBirth: string | null;
  birthPlace: string | null;

  maritalStatus: string | null;
  numberOfChildren: number | null;

  heightCm: number | null;
  weightKg: number | null;

  bloodGroup: string | null;
  complexion: string | null;
  bodyType: string | null;

  physicalDisability: boolean;
  disabilityDetails: string | null;

  /* -------------------------------------------------------
     RELIGION / COMMUNITY / CULTURAL
     ------------------------------------------------------- */

  religion: string | null;
  caste: string | null;
  subCaste: string | null;
  gotra: string | null;

  zodiacSign: string | null;
  nakshatra: string | null;
  manglikStatus: string | null;

  motherTongue: string | null;

  /* -------------------------------------------------------
     LIFESTYLE
     ------------------------------------------------------- */

  eatingHabits: string | null;
  drinkingHabits: string | null;
  smokingHabits: string | null;

  /* -------------------------------------------------------
     CURRENT LOCATION
     ------------------------------------------------------- */

  currentCountry: string | null;
  currentAddress: string | null;
  currentPincode: string | null;
  
  currentState?: string;
  currentDistrict?: string;
  currentTaluka?: string;
  currentCity?: string;

  /* -------------------------------------------------------
     NATIVE LOCATION
     ------------------------------------------------------- */

  nativeCountry: string | null;
  nativeState: string | null;
  nativeDistrict: string | null;
  nativeTaluka: string | null;
  nativeCity: string | null;

  /* -------------------------------------------------------
     NRI INFORMATION
     ------------------------------------------------------- */

  nri: boolean;
  livingCountry: string | null;
  nriAddress: string | null;

  /* -------------------------------------------------------
     LEGACY / COMPATIBILITY LOCATION
     ------------------------------------------------------- */

  nativePlace: string | null;
  state: string | null;
  district: string | null;
  taluka: string | null;
  city: string | null;

  /* -------------------------------------------------------
     ABOUT
     ------------------------------------------------------- */

  aboutMe: string | null;

    /* -------------------------------------------------------
     PARTNER PREFERENCES
     ------------------------------------------------------- */

  partnerMinAge: number | null;
  partnerMaxAge: number | null;

  partnerMinHeightCm: number | null;
  partnerMaxHeightCm: number | null;

  partnerMaritalStatus: string | null;
  partnerMotherTongue: string | null;

  partnerReligion: string | null;
  partnerCaste: string | null;
  partnerSubCaste: string | null;

  partnerZodiacSign: string | null;
  partnerNakshatra: string | null;
  partnerManglikStatus: string | null;

  partnerEducation: string | null;
  partnerOccupation: string | null;

  partnerMinIncome: number | null;
  partnerMaxIncome: number | null;

  partnerAbout: string | null;




  /* -------------------------------------------------------
     PROFILE STATUS
     ------------------------------------------------------- */

  profileStatus: string;

  visibility: string;

  submittedAt: string | null;
  verifiedAt: string | null;
  rejectionReason: string | null;

  createdAt: string;
  updatedAt: string;
};

/* =========================================================
   GET MY PROFILE
   ========================================================= */

/**
 * Get the currently logged-in user's profile.
 *
 * If the user has not created a profile yet,
 * the backend is expected to return HTTP 404.
 */
export async function getMyProfile(
  token: string,
): Promise<ProfileResponse | null> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status === 404) {
    return null;
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "प्रोफाइल माहिती मिळवता आली नाही.",
    );
  }

  return result;
}

/* =========================================================
   CREATE PROFILE
   ========================================================= */

/**
 * Create the logged-in user's profile.
 */
export async function createProfile(
  token: string,
  data: ProfileRequest,
): Promise<ProfileResponse> {
  const response = await fetch(
    `${API_BASE_URL}/profiles`,
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
        "प्रोफाइल तयार करताना त्रुटी आली.",
    );
  }

  return result;
}

/* =========================================================
   UPDATE MY PROFILE
   ========================================================= */

/**
 * Update the currently logged-in user's profile.
 */
export async function updateMyProfile(
  token: string,
  data: ProfileRequest,
): Promise<ProfileResponse> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me`,
    {
      method: "PUT",
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
        "प्रोफाइल अपडेट करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function submitMyProfileForVerification(
  token: string,
): Promise<ProfileResponse> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/submit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "प्रोफाइल पडताळणीसाठी पाठवताना त्रुटी आली.",
    );
  }

  return result;
}
