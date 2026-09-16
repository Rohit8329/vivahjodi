const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type CreatePaymentRequest = {
  membershipId: string;
};

export type Payment = {
  id: string;
  userId: string;
  membershipId: string;
  paymentGateway: string;
  gatewayOrderId: string;
  gatewayPaymentId: string | null;
  amountInr: number;
  currency: string;
  paymentStatus: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type VerifyPaymentRequest = {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
};

export async function createPayment(
  token: string,
  membershipId: string,
): Promise<Payment> {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      membershipId,
    } satisfies CreatePaymentRequest),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "पेमेंट ऑर्डर तयार करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function verifyPayment(
  token: string,
  data: VerifyPaymentRequest,
): Promise<Payment> {
  const response = await fetch(`${API_BASE_URL}/payments/verify`, {
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
      result.message || "पेमेंट पडताळताना त्रुटी आली.",
    );
  }

  return result;
}
