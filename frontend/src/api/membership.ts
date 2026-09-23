const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://49568846.vivahjodi.pages.dev/api";

export type MembershipStatus =
  | "PENDING_PAYMENT"
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED";

export type Membership = {
  id: string;
  userId: string;
  planCode: string;
  planName: string;
  amountInr: number;
  membershipStatus: MembershipStatus | string;
  startedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function createMembership(
  token: string,
  planCode: string,
): Promise<Membership> {
  const response = await fetch(`${API_BASE_URL}/memberships`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      planCode,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "सदस्यत्व तयार करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function getMyMembership(
  token: string,
): Promise<Membership> {
  const response = await fetch(`${API_BASE_URL}/memberships/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "सदस्यत्व माहिती मिळवता आली नाही.",
    );
  }

  return result;
}
