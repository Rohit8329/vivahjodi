const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://vivahjodi.pages.dev/api";

export type RegisterRequest = {
  email: string;
  mobile: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  email: string;
  role: string;
  accountStatus: string;
};

export async function registerUser(
  data: RegisterRequest,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "नोंदणी करताना त्रुटी आली.");
  }

  return result;
}

export async function loginUser(
  data: LoginRequest,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "लॉगिन करताना त्रुटी आली.");
  }

  return result;
}

export async function getCurrentUser(token: string) {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "वापरकर्ता माहिती मिळवता आली नाही.");
  }

  return result;
}
