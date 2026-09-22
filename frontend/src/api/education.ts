const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type EducationRequest = {
  educationLevel?: string;
  educationStream?: string;
  qualification?: string;
  specialization?: string;
  instituteName?: string;
  passingYear?: number;
};

export type EducationDetail = {
  id: string;
  profileId?: string;

  educationLevel?: string | null;
  educationStream?: string | null;
  qualification?: string | null;
  specialization?: string | null;
  instituteName?: string | null;
  passingYear?: number | null;

  createdAt: string;
  updatedAt: string;
};

export async function createOrUpdateEducation(
  token: string,
  data: EducationRequest,
): Promise<EducationDetail> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/education`,
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
      result.message || "शिक्षण माहिती जतन करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function getMyEducation(
  token: string,
): Promise<EducationDetail | null> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/education`,
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
      result.message || "शिक्षण माहिती मिळवताना त्रुटी आली.",
    );
  }

  /*
   * Backend currently returns an array of education records.
   *
   * The profile wizard has one Education section,
   * so use the most recently updated education record.
   */
  if (Array.isArray(result)) {
    if (result.length === 0) {
      return null;
    }

    const sorted = [...result].sort(
      (a: EducationDetail, b: EducationDetail) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    );

    return sorted[0];
  }

  return result;
}

export async function deleteMyEducation(
  token: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/education`,
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
      result.message || "शिक्षण माहिती हटवताना त्रुटी आली.",
    );
  }
}