const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type ProfilePhoto = {
  id: string;
  storagePath: string;
  originalFileName: string | null;
  mimeType: string | null;
  primary: boolean;
  displayOrder: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type ProfilePhotoRequest = {
  storagePath: string;
  originalFileName?: string;
  mimeType?: string;
  primary?: boolean;
  displayOrder?: number;
};

async function handleResponse<T>(
  response: Response,
): Promise<T> {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "फोटोशी संबंधित विनंती पूर्ण करता आली नाही.",
    );
  }

  return result;
}

export async function getMyProfilePhotos(
  token: string,
): Promise<ProfilePhoto[]> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/photos`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return handleResponse<ProfilePhoto[]>(response);
}

export async function addProfilePhoto(
  token: string,
  data: ProfilePhotoRequest,
): Promise<ProfilePhoto> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/photos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  return handleResponse<ProfilePhoto>(response);
}

export async function updateProfilePhoto(
  token: string,
  photoId: string,
  data: ProfilePhotoRequest,
): Promise<ProfilePhoto> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/photos/${photoId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  return handleResponse<ProfilePhoto>(response);
}

export async function setPrimaryProfilePhoto(
  token: string,
  photoId: string,
): Promise<ProfilePhoto> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/photos/${photoId}/primary`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return handleResponse<ProfilePhoto>(response);
}

export async function deleteProfilePhoto(
  token: string,
  photoId: string,
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/profiles/me/photos/${photoId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const result = await response.json();

    throw new Error(
      result.message || "फोटो हटवता आला नाही.",
    );
  }
}