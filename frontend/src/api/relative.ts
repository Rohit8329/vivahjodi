const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type RelativeRequest = {
  name?: string;
  relation?: string;
  surname?: string;
  city?: string;
  occupation?: string;
  location?: string;
  notes?: string;
  contactVisible?: boolean;
};

export type RelativeDetail = {
  id: string;
  profileId: string;

  name?: string | null;
  relation?: string | null;
  surname?: string | null;
  city?: string | null;
  occupation?: string | null;
  location?: string | null;
  notes?: string | null;
  contactVisible?: boolean | null;

  createdAt: string;
  updatedAt: string;
};

export async function createRelative(
  token: string,
  data: RelativeRequest,
): Promise<RelativeDetail> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/relatives`,
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
      result.message || "नातेवाईक माहिती जतन करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function getMyRelatives(
  token: string,
): Promise<RelativeDetail[]> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/relatives`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "नातेवाईक माहिती मिळवताना त्रुटी आली.",
    );
  }

  return Array.isArray(result) ? result : [];
}

export async function updateRelative(
  token: string,
  relativeId: string,
  data: RelativeRequest,
): Promise<RelativeDetail> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/relatives/${relativeId}`,
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
      result.message || "नातेवाईक माहिती अपडेट करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function deleteRelative(
  token: string,
  relativeId: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/relatives/${relativeId}`,
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
      result.message || "नातेवाईक माहिती हटवताना त्रुटी आली.",
    );
  }
}