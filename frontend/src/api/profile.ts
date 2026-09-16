const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type ProfileRequest = {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus?: string;
  heightCm?: number;
  weightKg?: number;
  religion?: string;
  caste?: string;
  subCaste?: string;
  motherTongue?: string;
  aboutMe?: string;
};

export type ProfileResponse = {
  id: string;
  userId: string;

  firstName: string;
  middleName: string | null;
  lastName: string;

  gender: string;
  dateOfBirth: string;
  maritalStatus: string | null;

  heightCm: number | null;
  weightKg: number | null;

  religion: string | null;
  caste: string | null;
  subCaste: string | null;
  motherTongue: string | null;

  aboutMe: string | null;
  profileStatus: string;

  createdAt: string;
  updatedAt: string;
};

/**
 * Get the currently logged-in user's profile.
 *
 * If the user has not created a profile yet,
 * the backend is expected to return HTTP 404.
 */
export async function getMyProfile(
  token: string,
): Promise<ProfileResponse | null> {
  const response = await fetch(`${API_BASE_URL}/profiles/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    return null;
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "प्रोफाइल माहिती मिळवता आली नाही.",
    );
  }

  return result;
}

/**
 * Create the logged-in user's profile.
 */
export async function createProfile(
  token: string,
  data: ProfileRequest,
): Promise<ProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/profiles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "प्रोफाइल तयार करताना त्रुटी आली.",
    );
  }

  return result;
}

/**
 * Update the currently logged-in user's profile.
 */
export async function updateMyProfile(
  token: string,
  data: ProfileRequest,
): Promise<ProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/profiles/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "प्रोफाइल अपडेट करताना त्रुटी आली.",
    );
  }

  return result;
}