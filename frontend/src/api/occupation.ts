const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type OccupationRequest = {
  occupation?: string;
  designation?: string;
  companyName?: string;
  employmentType?: string;

  workCity?: string;
  workState?: string;

  annualIncomeInr?: number;

  businessDetails?: string;
  subOccupation?: string;
  employedIn?: string;
  workLocation?: string;

  annualIncome?: string;
  incomeCurrency?: string;
};

export type OccupationDetail = {
  id: string;
  profileId: string;

  occupation?: string | null;
  designation?: string | null;
  companyName?: string | null;
  employmentType?: string | null;

  workCity?: string | null;
  workState?: string | null;

  annualIncomeInr?: number | null;

  businessDetails?: string | null;
  subOccupation?: string | null;
  employedIn?: string | null;
  workLocation?: string | null;

  annualIncome?: string | null;
  incomeCurrency?: string | null;

  createdAt: string;
  updatedAt: string;
};

export async function createOrUpdateOccupation(
  token: string,
  data: OccupationRequest,
): Promise<OccupationDetail> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/occupation`,
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
        "व्यवसाय माहिती जतन करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function getMyOccupation(
  token: string,
): Promise<OccupationDetail | null> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/occupation`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status === 204) {
    return null;
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "व्यवसाय माहिती मिळवताना त्रुटी आली.",
    );
  }

  return result;
}

export async function deleteMyOccupation(
  token: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/occupation`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok && response.status !== 204) {
    const result = await response.json().catch(() => ({}));

    throw new Error(
      result.message ||
        "व्यवसाय माहिती हटवताना त्रुटी आली.",
    );
  }
}