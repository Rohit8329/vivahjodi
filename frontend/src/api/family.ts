const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type FamilyRequest = {
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;

  familyType?: string;
  familyValues?: string;
  familyStatus?: string;

  siblingsCount?: number;
  brothersCount?: number;
  sistersCount?: number;

  nativePlace?: string;
  familyAbout?: string;

  numberOfBrothers?: number;
  brothersMarried?: number;

  numberOfSisters?: number;
  sistersMarried?: number;

  parentalDetails?: string;
};

export type FamilyDetail = {
  id: string;
  profileId: string;

  fatherName?: string | null;
  fatherOccupation?: string | null;
  motherName?: string | null;
  motherOccupation?: string | null;

  familyType?: string | null;
  familyValues?: string | null;
  familyStatus?: string | null;

  siblingsCount?: number | null;
  brothersCount?: number | null;
  sistersCount?: number | null;

  nativePlace?: string | null;
  familyAbout?: string | null;

  numberOfBrothers?: number | null;
  brothersMarried?: number | null;

  numberOfSisters?: number | null;
  sistersMarried?: number | null;

  parentalDetails?: string | null;

  createdAt: string;
  updatedAt: string;
};

export async function createOrUpdateFamily(
  token: string,
  data: FamilyRequest,
): Promise<FamilyDetail> {
  const response = await fetch(`${API_BASE_URL}/profiles/me/family`, {
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
      result.message || "कुटुंब माहिती जतन करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function getMyFamily(
  token: string,
): Promise<FamilyDetail | null> {
  const response = await fetch(`${API_BASE_URL}/profiles/me/family`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "कुटुंब माहिती मिळवताना त्रुटी आली.",
    );
  }

  return result;
}

export async function deleteMyFamily(
  token: string,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/profiles/me/family`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const result = await response.json().catch(() => ({}));

    throw new Error(
      result.message || "कुटुंब माहिती हटवताना त्रुटी आली.",
    );
  }
}