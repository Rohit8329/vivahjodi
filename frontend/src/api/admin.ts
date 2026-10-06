const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export type AdminProfile = {
  id: string;
  userId: string;

  profileCode: string | null;

  firstName: string;
  middleName?: string | null;
  lastName: string;

  gender?: string | null;
  dateOfBirth?: string | null;
  maritalStatus?: string | null;

  religion?: string | null;
  caste?: string | null;
  subCaste?: string | null;
  motherTongue?: string | null;

  state?: string | null;
  district?: string | null;
  taluka?: string | null;
  city?: string | null;

  education?: {
  id: string;
  educationLevel: string | null;
  educationStream: string | null;
  qualification: string | null;
  specialization: string | null;
  instituteName: string | null;
  passingYear: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
} | null;

  family?: {
    id: string;
    profileId: string;

    fatherName: string | null;
    fatherOccupation: string | null;

    motherName: string | null;
    motherOccupation: string | null;

    familyType: string | null;
    familyValues: string | null;
    familyStatus: string | null;

    siblingsCount: number | null;
    brothersCount: number | null;
    sistersCount: number | null;

    nativePlace: string | null;
    familyAbout: string | null;

    numberOfBrothers: number | null;
    brothersMarried: number | null;

    numberOfSisters: number | null;
    sistersMarried: number | null;

    parentalDetails: string | null;

    createdAt?: string | null;
    updatedAt?: string | null;
  } | null;


  occupation?: {
  id: string;
  profileId: string;
  occupation: string | null;
  designation: string | null;
  companyName: string | null;
  employmentType: string | null;
  workCity: string | null;
  workState: string | null;
  annualIncomeInr: number | null;
  businessDetails: string | null;
  subOccupation: string | null;
  employedIn: string | null;
  workLocation: string | null;
  annualIncome: string | null;
  incomeCurrency: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
} | null;

  profileStatus: string;
  paymentStatus?: string | null;
  submittedAt?: string | null;
  verifiedAt?: string | null;

  rejectionReason?: string | null;

  visibility?: string | null;
};

export async function getPendingAdminProfiles(
  token: string,
): Promise<AdminProfile[]> {
  const response = await fetch(
    `${API_BASE_URL}/admin/profiles/pending`,
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
      result.message ||
        "प्रलंबित प्रोफाइल मिळवताना त्रुटी आली.",
    );
  }

  return result;
}

export async function approveAdminProfile(
  token: string,
  profileId: string,
): Promise<AdminProfile> {
  const response = await fetch(
    `${API_BASE_URL}/admin/profiles/${profileId}/approve`,
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
        "प्रोफाइल मंजूर करताना त्रुटी आली.",
    );
  }

  return result;
}

export async function rejectAdminProfile(
  token: string,
  profileId: string,
  reason: string,
): Promise<AdminProfile> {
  const response = await fetch(
    `${API_BASE_URL}/admin/profiles/${profileId}/reject`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reason,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "प्रोफाइल नाकारताना त्रुटी आली.",
    );
  }

  return result;
}