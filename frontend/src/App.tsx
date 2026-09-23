import { useEffect, useState } from "react";
import "./App.css";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  type AuthResponse,
} from "./api/auth";

import {
  createMembership,
  getMyMembership,
  type Membership,
} from "./api/membership";

import {
  createPayment,
  verifyPayment,
} from "./api/payment";

import {
  createProfile,
  getMyProfile,
  updateMyProfile,
  type ProfileRequest,
  type ProfileResponse,
} from "./api/profile";

import {
  createOrUpdateFamily,
  getMyFamily,
  type FamilyDetail,
} from "./api/family";

import {
  createOrUpdateEducation,
  getMyEducation,
  type EducationDetail,
} from "./api/education";

import {
  createRelative,
  getMyRelatives,
  updateRelative,
  deleteRelative,
  type RelativeDetail,
} from "./api/relative";

import {
  createOrUpdateOccupation,
  getMyOccupation,
  type OccupationDetail,
} from "./api/occupation";

/* =========================================================
   RAZORPAY TYPES
   ========================================================= */

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions,
    ) => RazorpayInstance;
  }
}

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: string,
    callback: (response: {
      error?: {
        description?: string;
      };
    }) => void,
  ) => void;
};

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

/* =========================================================
   APPLICATION TYPES
   ========================================================= */

type SearchForm = {
  lookingFor: string;
  age: string;
  community: string;
  education: string;
  city: string;
};

type ModalType =
  | "login"
  | "register"
  | "membership"
  | null;

type ProfileForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  timeOfBirth: string;
  birthPlace: string;
  numberOfChildren: string;
  heightCm: string;
  weightKg: string;
  bloodGroup: string;
  complexion: string;
  bodyType: string;
  physicalDisability: string;
  disabilityDetails: string;
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string;
  zodiacSign: string;
  nakshatra: string;
  manglikStatus: string;
  motherTongue: string;

  educationLevel: string;
  educationStream: string;
  qualification: string;
  specialization: string;
  instituteName: string;
  passingYear: string;

  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblingsCount: string;
  brothersCount: string;
  sistersCount: string;
  numberOfBrothers: string;
  brothersMarried: string;
  numberOfSisters: string;
  sistersMarried: string;
  familyType: string;
  familyValues: string;
  familyStatus: string;
  familyAbout: string;
  parentalDetails: string;
  relativeName: string;
  relativeRelation: string;
  relativeSurname: string;
  relativeCity: string;
  relativeOccupation: string;
  relativeLocation: string;
  relativeNotes: string;
  relativeContactVisible: boolean;

  occupation: string;
  subOccupation: string;
  employmentType: string;
  employedIn: string;
  companyName: string;
  designation: string;
  workLocation: string;
  annualIncome: string;
  incomeCurrency: string;

  eatingHabits: string;
  drinkingHabits: string;
  smokingHabits: string;

  currentCountry: string;
  currentAddress: string;
  currentPincode: string;
  state: string;
  district: string;
  taluka: string;
  city: string;

  nativeCountry: string;
  nativeState: string;
  nativeDistrict: string;
  nativeTaluka: string;
  nativeCity: string;
  nativePlace: string;

  nri: string;
  livingCountry: string;
  nriAddress: string;

  aboutMe: string;

  partnerMinAge: string;
  partnerMaxAge: string;
  partnerMinHeightCm: string;
  partnerMaxHeightCm: string;
  partnerMaritalStatus: string;
  partnerMotherTongue: string;
  partnerDisability: string;
  partnerChildren: string;
  partnerEatingHabits: string;
  partnerSmokingHabits: string;
  partnerDrinkingHabits: string;
  partnerReligion: string;
  partnerCaste: string;
  partnerSubCaste: string;
  partnerZodiacSign: string;
  partnerNakshatra: string;
  partnerManglikStatus: string;
  partnerEducation: string;
  partnerOccupation: string;
  partnerMinIncome: string;
  partnerMaxIncome: string;
  partnerAbout: string;

  visibility: string;
};

type ProfilePhotoDraft = {
  id: string;
  file: File;
  preview: string;
  isPrimary: boolean;
};

const emptyProfileForm: ProfileForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  maritalStatus: "NEVER_MARRIED",
  timeOfBirth: "",
  birthPlace: "",
  numberOfChildren: "",
  heightCm: "",
  weightKg: "",
  bloodGroup: "",
  complexion: "",
  bodyType: "",
  physicalDisability: "false",
  disabilityDetails: "",
  religion: "",
  caste: "",
  subCaste: "",
  gotra: "",
  zodiacSign: "",
  nakshatra: "",
  manglikStatus: "",
  motherTongue: "मराठी",

  educationLevel: "",
  educationStream: "",
  qualification: "",
  specialization: "",
  instituteName: "",
  passingYear: "",

  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",

  siblingsCount: "",
  brothersCount: "",
  sistersCount: "",

  numberOfBrothers: "",
  brothersMarried: "",
  numberOfSisters: "",
  sistersMarried: "",
  familyType: "",
  familyValues: "",
  familyStatus: "",
  familyAbout: "",
  parentalDetails: "",
  relativeName: "",
  relativeRelation: "",
  relativeSurname: "",
  relativeCity: "",
  relativeOccupation: "",
  relativeLocation: "",
  relativeNotes: "",
  relativeContactVisible: false,

  occupation: "",
  subOccupation: "",
  employmentType: "",
  employedIn: "",
  companyName: "",
  designation: "",
  workLocation: "",
  annualIncome: "",
  incomeCurrency: "INR",

  eatingHabits: "",
  drinkingHabits: "",
  smokingHabits: "",

  currentCountry: "India",
  currentAddress: "",
  currentPincode: "",
  state: "",
  district: "",
  taluka: "",
  city: "",

  nativeCountry: "India",
  nativeState: "",
  nativeDistrict: "",
  nativeTaluka: "",
  nativeCity: "",
  nativePlace: "",

  nri: "false",
  livingCountry: "",
  nriAddress: "",

  aboutMe: "",

  partnerMinAge: "",
  partnerMaxAge: "",
  partnerMinHeightCm: "",
  partnerMaxHeightCm: "",
  partnerMaritalStatus: "",
  partnerMotherTongue: "",
  partnerDisability: "",
  partnerChildren: "",
  partnerEatingHabits: "",
  partnerSmokingHabits: "",
  partnerDrinkingHabits: "",
  partnerReligion: "",
  partnerCaste: "",
  partnerSubCaste: "",
  partnerZodiacSign: "",
  partnerNakshatra: "",
  partnerManglikStatus: "",
  partnerEducation: "",
  partnerOccupation: "",
  partnerMinIncome: "",
  partnerMaxIncome: "",
  partnerAbout: "",

  visibility: "PRIVATE",
};

const profileStepLabels = [
  "मूलभूत",
  "धर्म व समाज",
  "शिक्षण",
  "कुटुंब",
  "नातेवाईक",
  "व्यवसाय",
  "जीवनशैली",
  "पत्ता",
  "NRI माहिती",
  "माझ्याबद्दल",
  "जोडीदाराच्या अपेक्षा",
  "गोपनीयता",
];

/* =========================================================
   SERVICES
   ========================================================= */

const services = [
  {
    icon: "⌕",
    title: "प्रोफाइल शोध",
    description:
      "तुमच्या अपेक्षांनुसार योग्य प्रोफाइल्स सहज शोधा.",
  },
  {
    icon: "✓",
    title: "सुरक्षित व्यासपीठ",
    description:
      "प्रोफाइल पडताळणी आणि गोपनीयतेला आमचे प्राधान्य.",
  },
  {
    icon: "♡",
    title: "योग्य जुळणी",
    description:
      "तुमच्या पसंतीनुसार संभाव्य जोडीदार शोधा.",
  },
  {
    icon: "♔",
    title: "प्रीमियम सदस्यत्व",
    description:
      "अधिक सुविधा आणि संपर्काच्या संधी मिळवा.",
  },
];

/* =========================================================
   SUCCESS STORIES
   ========================================================= */

const stories = [
  {
    initials: "अ",
    names: "अमोल & स्वाती",
    location: "पुणे",
  },
  {
    initials: "र",
    names: "रोहन & प्रिया",
    location: "नाशिक",
  },
  {
    initials: "स",
    names: "सचिन & नेहा",
    location: "कोल्हापूर",
  },
];

/* =========================================================
   APP
   ========================================================= */

function App() {
  /* =======================================================
     SEARCH STATE
     ======================================================= */

  const [searchForm, setSearchForm] =
    useState<SearchForm>({
      lookingFor: "वधू",
      age: "21 - 30",
      community: "सर्व समाज",
      education: "सर्व शिक्षण",
      city: "सर्व शहर",
    });

  const [searchMessage, setSearchMessage] =
    useState("");

  /* =======================================================
     MODAL STATE
     ======================================================= */

  const [modal, setModal] =
    useState<ModalType>(null);

  /* =======================================================
     LOGIN STATE
     ======================================================= */

  const [loginEmail, setLoginEmail] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  /* =======================================================
     REGISTER STATE
     ======================================================= */

  const [registerFirstName, setRegisterFirstName] =
    useState("");

  const [registerLastName, setRegisterLastName] =
    useState("");

  const [registerEmail, setRegisterEmail] =
    useState("");

  const [registerMobile, setRegisterMobile] =
    useState("");

  const [registerPassword, setRegisterPassword] =
    useState("");

  /* =======================================================
     AUTH STATE
     ======================================================= */

  const [authMessage, setAuthMessage] =
    useState("");

  const [authError, setAuthError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [currentUser, setCurrentUser] =
    useState<any>(null);

  /* =======================================================
     MEMBERSHIP STATE
     ======================================================= */

  const [membership, setMembership] =
    useState<Membership | null>(null);

  const [membershipLoading, setMembershipLoading] =
    useState(false);

  const [membershipError, setMembershipError] =
    useState("");

  /* =======================================================
     PROFILE STATE
     ======================================================= */

  const [profile, setProfile] =
    useState<ProfileResponse | null>(null);

  const [profileView, setProfileView] =
    useState(false);

  const [profileStep, setProfileStep] = 
    useState(1);
    
  const [profileLoading, setProfileLoading] =
    useState(false);

  const [profileSaving, setProfileSaving] =
    useState(false);

  const [profileError, setProfileError] =
    useState("");

  const [profileMessage, setProfileMessage] =
    useState("");

  const [profileForm, setProfileForm] =
    useState<ProfileForm>({ ...emptyProfileForm });

  const [profilePhotos, setProfilePhotos] =
    useState<ProfilePhotoDraft[]>([]);

  const [relatives, setRelatives] =
    useState<RelativeDetail[]>([]);


  const [editingRelativeId, setEditingRelativeId] =
  useState<string | null>(null);

const [editingRelativeForm, setEditingRelativeForm] =
  useState({
    name: "",
    relation: "",
    surname: "",
    city: "",
    occupation: "",
    location: "",
    notes: "",
    contactVisible: false,
  });
    

  
  const [photoError, setPhotoError] =
    useState("");

  /* =======================================================
     LOAD CURRENT USER
     ======================================================= */

  useEffect(() => {
    const token =
      localStorage.getItem(
        "vivahjodi_token",
      );

    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem(
          "vivahjodi_token",
        );

        setCurrentUser(null);
        setMembership(null);
      });

    /* =====================================================
       LOAD MEMBERSHIP
       ===================================================== */

    setMembershipLoading(true);
    setMembershipError("");

    getMyMembership(token)
      .then((data) => {
        setMembership(data);
      })
      .catch(() => {
        /*
         * A newly registered user may not
         * have a membership yet.
         */
        setMembership(null);
      })
      .finally(() => {
        setMembershipLoading(false);
      });
  }, []);

  /* =======================================================
     PROFILE HELPERS
     ======================================================= */

  const profileToForm = (
    data: ProfileResponse,
    family: FamilyDetail | null = null,
    education: EducationDetail | null = null,
    occupation: OccupationDetail | null = null,
  ): ProfileForm => ({
    ...emptyProfileForm,
    firstName: data.firstName || "",
    middleName: data.middleName || "",
    lastName: data.lastName || "",
    gender: data.gender || "",
    dateOfBirth: data.dateOfBirth || "",
    maritalStatus: data.maritalStatus || "NEVER_MARRIED",
    timeOfBirth: data.timeOfBirth || "",
    birthPlace: data.birthPlace || "",
    numberOfChildren:
      data.numberOfChildren !== null &&
      data.numberOfChildren !== undefined
        ? String(data.numberOfChildren)
        : "",
    heightCm:
      data.heightCm !== null && data.heightCm !== undefined
        ? String(data.heightCm)
        : "",
    weightKg:
      data.weightKg !== null && data.weightKg !== undefined
        ? String(data.weightKg)
        : "",
    bloodGroup: data.bloodGroup || "",
    complexion: data.complexion || "",
    bodyType: data.bodyType || "",
    physicalDisability:
      data.physicalDisability ? "true" : "false",
    disabilityDetails: data.disabilityDetails || "",
    religion: data.religion || "",
    caste: data.caste || "",
    subCaste: data.subCaste || "",
    gotra: data.gotra || "",
    zodiacSign: data.zodiacSign || "",
    nakshatra: data.nakshatra || "",
    manglikStatus: data.manglikStatus || "",
    motherTongue: data.motherTongue || "मराठी",
  
    eatingHabits: data.eatingHabits || "",
    drinkingHabits: data.drinkingHabits || "",
    smokingHabits: data.smokingHabits || "",
    currentCountry: data.currentCountry || "India",
    currentAddress: data.currentAddress || "",
    currentPincode: data.currentPincode || "",
    state: data.state || "",
    district: data.district || "",
    taluka: data.taluka || "",
    city: data.city || "",
    nativeCountry: data.nativeCountry || "India",
    nativeState: data.nativeState || "",
    nativeDistrict: data.nativeDistrict || "",
    nativeTaluka: data.nativeTaluka || "",
    nativeCity: data.nativeCity || "",
    nativePlace: data.nativePlace || "",
    nri: data.nri ? "true" : "false",
    livingCountry: data.livingCountry || "",
    nriAddress: data.nriAddress || "",
    aboutMe: data.aboutMe || "",
    visibility: data.visibility || "PRIVATE",

    educationLevel:
      education?.educationLevel || "",

    educationStream:
      education?.educationStream || "",

    qualification:
      education?.qualification || "",

    specialization:
      education?.specialization || "",

    instituteName:
      education?.instituteName || "",

    passingYear:
      education?.passingYear !== null &&
      education?.passingYear !== undefined
        ? String(education.passingYear)
        : "",

    occupation:
      occupation?.occupation || "",

    subOccupation:
      occupation?.subOccupation || "",

    employmentType:
      occupation?.employmentType || "",

    employedIn:
      occupation?.employedIn || "",

    companyName:
      occupation?.companyName || "",

    designation:
      occupation?.designation || "",

    workLocation:
      occupation?.workLocation || "",

    annualIncome:
      occupation?.annualIncome ||
      (occupation?.annualIncomeInr !== null &&
      occupation?.annualIncomeInr !== undefined
        ? String(occupation.annualIncomeInr)
        : ""),

    incomeCurrency:
      occupation?.incomeCurrency || "INR",


    fatherName: family?.fatherName || "",
    fatherOccupation: family?.fatherOccupation || "",
    motherName: family?.motherName || "",
    motherOccupation: family?.motherOccupation || "",

    siblingsCount:
      family?.siblingsCount !== null &&
      family?.siblingsCount !== undefined
        ? String(family.siblingsCount)
        : "",

    brothersCount:
      family?.brothersCount !== null &&
      family?.brothersCount !== undefined
        ? String(family.brothersCount)
        : "",

    sistersCount:
      family?.sistersCount !== null &&
      family?.sistersCount !== undefined
        ? String(family.sistersCount)
        : "",


    familyAbout: family?.familyAbout || "",

    numberOfBrothers:
      family?.numberOfBrothers !== null &&
      family?.numberOfBrothers !== undefined
        ? String(family.numberOfBrothers)
        : "",

    brothersMarried:
      family?.brothersMarried !== null &&
      family?.brothersMarried !== undefined
        ? String(family.brothersMarried)
        : "",

    numberOfSisters:
      family?.numberOfSisters !== null &&
      family?.numberOfSisters !== undefined
        ? String(family.numberOfSisters)
        : "",

    sistersMarried:
      family?.sistersMarried !== null &&
      family?.sistersMarried !== undefined
        ? String(family.sistersMarried)
        : "",

    familyType: family?.familyType || "",
    familyValues: family?.familyValues || "",
    familyStatus: family?.familyStatus || "",
    parentalDetails: family?.parentalDetails || "",

  });

  const loadProfile = async (
    token: string,
    openEditor = false,
  ) => {
    setProfileLoading(true);
    setProfileError("");

    try {
    const data = await getMyProfile(token);

    
      const education = data
        ? await getMyEducation(token)
        : null;

      const family = data
        ? await getMyFamily(token)
        : null;

      const loadedRelatives = data
        ? await getMyRelatives(token)
        : [];

      const loadedOccupation =data 
        ? await getMyOccupation(token) 
        : null;




      setProfile(data);

      setRelatives(loadedRelatives);


      if (data) {
        setProfileForm(
          profileToForm(
            data,
            family,
            education,
            loadedOccupation,
          )
        );
      }

      if (openEditor) {
        setProfileView(true);
      }

      return data;
    } catch (error) {
      setProfileError(
        error instanceof Error
          ? error.message
          : "प्रोफाइल माहिती मिळवता आली नाही.",
      );
      return null;
    } finally {
      setProfileLoading(false);
    }
  };

  const updateProfileField = (
    field: keyof ProfileForm,
    value: string,
  ) => {
    setProfileForm((current) => ({
      ...current,
      [field]: value,
    }));
    setProfileError("");
    setProfileMessage("");
  };

  const handlePhotoSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setPhotoError("");

    const availableSlots = 6 - profilePhotos.length;

    if (availableSlots <= 0) {
      setPhotoError("जास्तीत जास्त 6 फोटो अपलोड करता येतील.");
      event.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      setPhotoError(
        "जास्तीत जास्त 6 फोटो ठेवता येतील. उर्वरित फोटो निवडले गेले नाहीत.",
      );
    }

    const invalidFile = selectedFiles.find(
      (file) =>
        !file.type.startsWith("image/") ||
        file.size > 5 * 1024 * 1024,
    );

    if (invalidFile) {
      setPhotoError(
        "फोटो JPG, PNG किंवा WebP असावा आणि आकार 5 MB पेक्षा कमी असावा.",
      );
      event.target.value = "";
      return;
    }

    const newPhotos = selectedFiles.map((file, index) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}-${index}`,
      file,
      preview: URL.createObjectURL(file),
      isPrimary: profilePhotos.length === 0 && index === 0,
    }));

    setProfilePhotos((current) => [...current, ...newPhotos]);
    event.target.value = "";
  };

  const removeProfilePhoto = (id: string) => {
    setProfilePhotos((current) => {
      const removed = current.find((photo) => photo.id === id);

      if (removed) URL.revokeObjectURL(removed.preview);

      const remaining = current.filter((photo) => photo.id !== id);

      if (removed?.isPrimary && remaining.length > 0) {
        return remaining.map((photo, index) => ({
          ...photo,
          isPrimary: index === 0,
        }));
      }

      return remaining;
    });

    setPhotoError("");
  };

  const setPrimaryProfilePhoto = (id: string) => {
    setProfilePhotos((current) =>
      current.map((photo) => ({
        ...photo,
        isPrimary: photo.id === id,
      })),
    );
  };

  const handleProfileSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const token = localStorage.getItem(
      "vivahjodi_token",
    );

    if (!token) {
      setProfileError(
        "प्रोफाइल जतन करण्यासाठी कृपया पुन्हा लॉगिन करा.",
      );
      setModal("login");
      return;
    }

    setProfileSaving(true);
    setProfileError("");
    setProfileMessage("");

    const payload: ProfileRequest = {
      firstName: profileForm.firstName.trim(),
      middleName:
        profileForm.middleName.trim() || undefined,
      lastName: profileForm.lastName.trim(),
      gender: profileForm.gender,
      dateOfBirth: profileForm.dateOfBirth,
      maritalStatus:
        profileForm.maritalStatus || undefined,

      timeOfBirth:
        profileForm.timeOfBirth.trim() || undefined,
      birthPlace:
        profileForm.birthPlace.trim() || undefined,
      numberOfChildren:
        profileForm.numberOfChildren
          ? Number(profileForm.numberOfChildren)
          : undefined,

      heightCm: profileForm.heightCm
        ? Number(profileForm.heightCm)
        : undefined,
      weightKg: profileForm.weightKg
        ? Number(profileForm.weightKg)
        : undefined,

      bloodGroup:
        profileForm.bloodGroup || undefined,
      complexion:
        profileForm.complexion || undefined,
      bodyType:
        profileForm.bodyType || undefined,

      physicalDisability:
        profileForm.physicalDisability === "true",
      disabilityDetails:
        profileForm.disabilityDetails.trim() || undefined,

      religion:
        profileForm.religion.trim() || undefined,
      caste:
        profileForm.caste.trim() || undefined,
      subCaste:
        profileForm.subCaste.trim() || undefined,
      gotra:
        profileForm.gotra.trim() || undefined,
      zodiacSign:
        profileForm.zodiacSign.trim() || undefined,
      nakshatra:
        profileForm.nakshatra.trim() || undefined,
      manglikStatus:
        profileForm.manglikStatus || undefined,
      motherTongue:
        profileForm.motherTongue.trim() || undefined,

      eatingHabits:
        profileForm.eatingHabits || undefined,
      drinkingHabits:
        profileForm.drinkingHabits || undefined,
      smokingHabits:
        profileForm.smokingHabits || undefined,

      currentCountry:
        profileForm.currentCountry.trim() || "India",
      currentAddress:
        profileForm.currentAddress.trim() || undefined,
      currentPincode:
        profileForm.currentPincode.trim() || undefined,

      state:
        profileForm.state.trim() || undefined,
      district:
        profileForm.district.trim() || undefined,
      taluka:
        profileForm.taluka.trim() || undefined,
      city:
        profileForm.city.trim() || undefined,

      nativeCountry:
        profileForm.nativeCountry.trim() || "India",
      nativeState:
        profileForm.nativeState.trim() || undefined,
      nativeDistrict:
        profileForm.nativeDistrict.trim() || undefined,
      nativeTaluka:
        profileForm.nativeTaluka.trim() || undefined,
      nativeCity:
        profileForm.nativeCity.trim() || undefined,
      nativePlace:
        profileForm.nativePlace.trim() || undefined,

      nri: profileForm.nri === "true",
      livingCountry:
        profileForm.livingCountry.trim() || undefined,
      nriAddress:
        profileForm.nriAddress.trim() || undefined,

      aboutMe:
        profileForm.aboutMe.trim() || undefined,

      visibility:
        profileForm.visibility || "PRIVATE",
    };

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.gender ||
      !payload.dateOfBirth
    ) {
      setProfileError(
        "कृपया नाव, लिंग आणि जन्मतारीख भरा.",
      );
      setProfileSaving(false);
      setProfileStep(1);
      return;
    }

    if (
      payload.heightCm !== undefined &&
      (!Number.isFinite(payload.heightCm) ||
        payload.heightCm <= 0)
    ) {
      setProfileError("उंची शून्यापेक्षा जास्त असावी.");
      setProfileSaving(false);
      setProfileStep(1);
      return;
    }

    if (
      payload.weightKg !== undefined &&
      (!Number.isFinite(payload.weightKg) ||
        payload.weightKg <= 0)
    ) {
      setProfileError("वजन शून्यापेक्षा जास्त असावे.");
      setProfileSaving(false);
      setProfileStep(1);
      return;
    }

    if (
      payload.numberOfChildren !== undefined &&
      (!Number.isFinite(payload.numberOfChildren) ||
        payload.numberOfChildren < 0)
    ) {
      setProfileError(
        "मुलांची संख्या 0 किंवा त्यापेक्षा जास्त असावी.",
      );
      setProfileSaving(false);
      setProfileStep(1);
      return;
    }

    try {
      const savedProfile = profile
        ? await updateMyProfile(token, payload)
        : await createProfile(token, payload);

      const educationData = {
        educationLevel:
          profileForm.educationLevel || undefined,

        educationStream:
          profileForm.educationStream || undefined,

        qualification:
          profileForm.qualification.trim() || undefined,

        specialization:
          profileForm.specialization.trim() || undefined,

        instituteName:
          profileForm.instituteName.trim() || undefined,

        passingYear:
          profileForm.passingYear
            ? Number(profileForm.passingYear)
            : undefined,
      };

      const savedEducation =
        await createOrUpdateEducation(
          token,
          educationData,
        );


      const familyData = {
        fatherName:
          profileForm.fatherName.trim() || undefined,

        fatherOccupation:
          profileForm.fatherOccupation.trim() || undefined,

        motherName:
          profileForm.motherName.trim() || undefined,

        motherOccupation:
          profileForm.motherOccupation.trim() || undefined,

        familyType:
          profileForm.familyType || undefined,

        familyValues:
          profileForm.familyValues || undefined,

        familyStatus:
          profileForm.familyStatus || undefined,

        siblingsCount:
          profileForm.siblingsCount
            ? Number(profileForm.siblingsCount)
            : undefined,

        brothersCount:
          profileForm.brothersCount
            ? Number(profileForm.brothersCount)
            : undefined,

        sistersCount:
          profileForm.sistersCount
            ? Number(profileForm.sistersCount)
            : undefined,

        nativePlace:
          profileForm.nativePlace.trim() || undefined,

        familyAbout:
          profileForm.familyAbout.trim() || undefined,

        numberOfBrothers:
          profileForm.numberOfBrothers
            ? Number(profileForm.numberOfBrothers)
            : undefined,

        brothersMarried:
          profileForm.brothersMarried
            ? Number(profileForm.brothersMarried)
            : undefined,

        numberOfSisters:
          profileForm.numberOfSisters
            ? Number(profileForm.numberOfSisters)
            : undefined,

        sistersMarried:
          profileForm.sistersMarried
            ? Number(profileForm.sistersMarried)
            : undefined,

        parentalDetails:
          profileForm.parentalDetails.trim() || undefined,
      };

      const savedFamily =
        await createOrUpdateFamily(token, familyData);

      const occupationData = {
        occupation:
          profileForm.occupation.trim() || undefined,

        subOccupation:
          profileForm.subOccupation.trim() || undefined,

        employmentType:
          profileForm.employmentType || undefined,

        employedIn:
          profileForm.employedIn.trim() || undefined,

        companyName:
          profileForm.companyName.trim() || undefined,

        designation:
          profileForm.designation.trim() || undefined,

        workLocation:
          profileForm.workLocation.trim() || undefined,

        annualIncome:
          profileForm.annualIncome.trim() || undefined,

        incomeCurrency:
          profileForm.incomeCurrency || "INR",
      };

      const savedOccupation =
        await createOrUpdateOccupation(
          token,
          occupationData,
        );

      setProfile(savedProfile);

      setProfileForm(
        profileToForm(
          savedProfile,
          savedFamily,
          savedEducation,
          savedOccupation,
        ),
      );

      setProfileMessage(
        profile
          ? "तुमचे प्रोफाइल यशस्वीरीत्या अपडेट झाले आहे."
          : "तुमचे प्रोफाइल यशस्वीरीत्या तयार झाले आहे.",
      );

      setTimeout(() => {
        setProfileView(false);
        setProfileMessage("");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 900);
    } catch (error) {
      setProfileError(
        error instanceof Error
          ? error.message
          : "प्रोफाइल जतन करताना त्रुटी आली.",
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const openProfileView = async () => {
    setAuthMessage("");
    setAuthError("");
    setMembershipError("");
    setProfileMessage("");
    setProfileError("");

    const token = localStorage.getItem(
      "vivahjodi_token",
    );

    if (!token) {
      setModal("login");
      return;
    }

    setProfileStep(1);
    setProfileView(true);

    await loadProfile(token, true);
  };

  const closeProfileView = () => {
    if (profileSaving) {
      return;
    }

    setProfileView(false);
    setProfileError("");
    setProfileMessage("");
  };

  /* =======================================================
     SEARCH
     ======================================================= */

  const updateSearch = (
    field: keyof SearchForm,
    value: string,
  ) => {
    setSearchForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSearchMessage("");
  };

  const handleSearch = () => {
    setSearchMessage(
      `शोध तयार आहे — ${searchForm.lookingFor}, ${searchForm.age}, ${searchForm.city}`,
    );
  };

  /* =======================================================
     MODAL FUNCTIONS
     ======================================================= */

  const openModal = (type: ModalType) => {
    setAuthMessage("");
    setAuthError("");
    setMembershipError("");

    setModal(type);
  };

  const closeModal = () => {
    if (
      isSubmitting ||
      membershipLoading
    ) {
      return;
    }

    setModal(null);

    setAuthMessage("");
    setAuthError("");
    setMembershipError("");
  };

  const switchModal = (
    type: "login" | "register",
  ) => {
    setAuthMessage("");
    setAuthError("");
    setMembershipError("");

    setModal(type);
  };

  /* =======================================================
     LOGIN
     ======================================================= */

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setAuthMessage("");
    setAuthError("");
    setMembershipError("");
    setIsSubmitting(true);

    try {
      const response: AuthResponse =
        await loginUser({
          email: loginEmail.trim(),
          password: loginPassword,
        });

      localStorage.setItem(
        "vivahjodi_token",
        response.token,
      );

      setCurrentUser({
        email: response.email,
        role: response.role,
        accountStatus:
          response.accountStatus,
      });

      setAuthMessage(
        response.message ||
          "लॉगिन यशस्वी झाले.",
      );

      setLoginPassword("");

      /* ===============================================
         LOAD MEMBERSHIP AFTER LOGIN
         =============================================== */

      setMembershipLoading(true);

      try {
        const membershipData =
          await getMyMembership(
            response.token,
          );

        setMembership(
          membershipData,
        );
      } catch {
        setMembership(null);
      } finally {
        setMembershipLoading(false);
      }
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "लॉगिन करताना अनपेक्षित त्रुटी आली.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     REGISTER
     ======================================================= */

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setAuthMessage("");
    setAuthError("");
    setMembershipError("");
    setIsSubmitting(true);

    try {
      const response: AuthResponse =
        await registerUser({
          firstName:
            registerFirstName.trim(),

          lastName:
            registerLastName.trim(),

          email:
            registerEmail.trim(),

          mobile:
            registerMobile.trim(),

          password:
            registerPassword,
        });

      setAuthMessage(
        response.message ||
          "नोंदणी यशस्वी झाली. पुढील पायरीसाठी सदस्यत्व घ्या.",
      );

      setRegisterPassword("");

      setTimeout(() => {
        setModal("login");

        setAuthMessage(
          "नोंदणी यशस्वी झाली. आता आपल्या ईमेल आणि पासवर्डने लॉगिन करा.",
        );
      }, 1200);
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "नोंदणी करताना अनपेक्षित त्रुटी आली.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     LOGOUT
     ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "vivahjodi_token",
    );

    setCurrentUser(null);
    setMembership(null);
    setProfile(null);
    setProfileView(false);
    setProfileError("");
    setProfileMessage("");

    setAuthMessage("");
    setAuthError("");
    setMembershipError("");

    setModal(null);
  };

  /* =======================================================
     RAZORPAY PAYMENT
     ======================================================= */

  const handlePayment = async () => {
    const token =
      localStorage.getItem(
        "vivahjodi_token",
      );

    /* =====================================================
       USER MUST BE LOGGED IN
       ===================================================== */

    if (!token) {
      setModal("login");
      return;
    }

    setMembershipLoading(true);
    setMembershipError("");
    setAuthError("");
    setAuthMessage("");

    try {
      /* ===================================================
         STEP 1
         CREATE MEMBERSHIP IF NECESSARY
         =================================================== */

      let selectedMembership =
        membership;

      if (!selectedMembership) {
        selectedMembership =
          await createMembership(
            token,
            "BASIC_1_MONTH",
          );

        setMembership(
          selectedMembership,
        );
      }

      /* ===================================================
         STEP 2
         CREATE RAZORPAY ORDER
         =================================================== */

      const payment =
        await createPayment(
          token,
          selectedMembership.id,
        );

      if (!payment.gatewayOrderId) {
        throw new Error(
          "पेमेंट ऑर्डर तयार झाली नाही.",
        );
      }

      /* ===================================================
         STEP 3
         CHECK RAZORPAY SCRIPT
         =================================================== */

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout लोड झाले नाही. कृपया पेज refresh करून पुन्हा प्रयत्न करा.",
        );
      }

      /* ===================================================
         STEP 4
         OPEN RAZORPAY CHECKOUT
         =================================================== */

      const razorpay =
        new window.Razorpay({
          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

          amount: Math.round(
            Number(
              payment.amountInr,
            ) * 100,
          ),

          currency:
            payment.currency ||
            "INR",

          name: "विवाहजोडी",

          description:
            "Basic Membership - 1 Month",

          order_id:
            payment.gatewayOrderId,

          prefill: {
            email:
              currentUser?.email ||
              "",
          },

          theme: {
            color: "#8e2444",
          },

          /* =============================================
             PAYMENT SUCCESS
             ============================================= */

          handler:
            async (
              response,
            ) => {
              try {
                /* =========================================
                   STEP 5
                   VERIFY PAYMENT ON BACKEND
                   ========================================= */

                const verifyResult =
                  await verifyPayment(
                    token,
                    {
                      razorpayOrderId:
                        response.razorpay_order_id,

                      razorpayPaymentId:
                        response.razorpay_payment_id,

                      razorpaySignature:
                        response.razorpay_signature,
                    },
                  );

                /* =========================================
                   STEP 6
                   UPDATE MEMBERSHIP UI
                   ========================================= */

                setMembership(
                  (current) =>
                    current
                      ? {
                          ...current,

                          membershipStatus:
                            verifyResult.paymentStatus ===
                            "SUCCESS"
                              ? "ACTIVE"
                              : current.membershipStatus,

                          startedAt:
                            verifyResult.paymentStatus ===
                            "SUCCESS"
                              ? verifyResult.paidAt
                              : current.startedAt,
                        }
                      : current,
                );

                setMembershipError("");

                setAuthMessage(
                  "पेमेंट यशस्वी झाले! तुमचे सदस्यत्व सक्रिय झाले आहे.",
                );

            const paidProfile =
              await getMyProfile(token);

            const paidFamily =
              await getMyFamily(token);

            setProfile(paidProfile);

            if (paidProfile) {
              setProfileForm(
                profileToForm(
                  paidProfile,
                  paidFamily,
                ),
              );
            } else {
              setProfileForm({
                ...emptyProfileForm,
              });
            }

                setProfileStep(1);
                setModal(null);
                setProfileView(true);

              } catch (error) {
                setMembershipError(
                  error instanceof Error
                    ? error.message
                    : "पेमेंट पडताळताना त्रुटी आली.",
                );
              } finally {
                setMembershipLoading(
                  false,
                );
              }
            },
        });

      /* ===================================================
         PAYMENT FAILURE
         =================================================== */

      razorpay.on(
        "payment.failed",
        (response) => {
          setMembershipError(
            response.error
              ?.description ||
              "पेमेंट अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.",
          );

          setMembershipLoading(
            false,
          );
        },
      );

      /* ===================================================
         OPEN CHECKOUT
         =================================================== */

      razorpay.open();
    } catch (error) {
      setMembershipError(
        error instanceof Error
          ? error.message
          : "पेमेंट सुरू करताना त्रुटी आली.",
      );

      setMembershipLoading(false);
    }
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className="app">
      {/* ===================================================
          TOP STRIP
          =================================================== */}

      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>
            महाराष्ट्रातील मराठी विवाह व्यासपीठ
          </span>

          <span className="top-strip-right">
            सुरक्षितता • गोपनीयता • विश्वास
          </span>
        </div>
      </div>

      {/* ===================================================
          NAVBAR
          =================================================== */}

      <header className="navbar">
        <div className="container navbar-inner">
          <a
            className="brand"
            href="#home"
            aria-label="विवाहजोडी मुख्यपृष्ठ"
          >
            <span className="brand-mark">
              वि
            </span>

            <span>
              <strong>
                विवाहजोडी
              </strong>

              <small>
                Marathi Matrimony
              </small>
            </span>
          </a>

          <nav
            className="desktop-nav"
            aria-label="मुख्य नेव्हिगेशन"
          >
            <a href="#home">
              होम
            </a>

            <a href="#search">
              जोडीदार शोधा
            </a>

            <a href="#services">
              आमच्या सेवा
            </a>

            <a href="#stories">
              यशोगाथा
            </a>

            <a href="#contact">
              संपर्क
            </a>
          </nav>

          <div className="navbar-actions">
            {currentUser ? (
              <>
                <span className="logged-in-user">
                  {currentUser.email}
                </span>


                <button
                  className="login-button"
                  type="button"
                  onClick={openProfileView}
                >
                  माझे प्रोफाइल
                </button>

                <button
                  className="login-button"
                  type="button"
                  onClick={() =>
                    openModal(
                      "membership",
                    )
                  }
                >
                  सदस्यत्व
                </button>

                <button
                  className="login-button"
                  type="button"
                  onClick={
                    handleLogout
                  }
                >
                  लॉगआउट
                </button>
              </>
            ) : (
              <>
                <button
                  className="login-button"
                  type="button"
                  onClick={() =>
                    openModal("login")
                  }
                >
                  लॉगिन
                </button>

                <button
                  className="register-button"
                  type="button"
                  onClick={() =>
                    openModal(
                      "register",
                    )
                  }
                >
                  नोंदणी करा
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ===================================================
          MAIN
          =================================================== */}

      <main>
        {profileView ? (
          <section
            className="profile-page-section"
            aria-labelledby="profile-page-title"
          >
            <div className="container profile-page-container">
              <div className="profile-page-header">
                <div>
                  <span className="section-kicker">
                    विवाहजोडी
                  </span>
                  <h1 id="profile-page-title">
                    {profile
                      ? "माझे प्रोफाइल अपडेट करा"
                      : "तुमचे प्रोफाइल तयार करा"}
                  </h1>
                  <p>
                    तुमची माहिती पूर्ण करा. पडताळणी सुरू
                    असतानाही तुम्ही तुमचे प्रोफाइल अपडेट करू शकता.
                  </p>
                </div>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={closeProfileView}
                  disabled={profileSaving}
                >
                  ← मुख्यपृष्ठावर जा
                </button>
              </div>

              {profileLoading ? (
                <div className="profile-state-card">
                  <div className="profile-loading-spinner" />
                  <p>प्रोफाइल माहिती लोड होत आहे...</p>
                </div>
              ) : (
                <form
                  className="profile-form-card profile-wizard-card"
                  onSubmit={handleProfileSubmit}
                >
                  <div className="profile-status-banner">
                    <div>
                      <span>प्रोफाइल स्थिती</span>
                      <strong>
                        {profile?.profileStatus || "DRAFT"}
                      </strong>
                    </div>
                    <p>
                      {profile?.profileStatus === "ACTIVE"
                        ? "तुमचे प्रोफाइल सक्रिय आहे."
                        : "तुम्ही माहिती पूर्ण करून प्रोफाइल प्रशासनाच्या पडताळणीसाठी तयार करू शकता."}
                    </p>
                  </div>

                  <div className="profile-wizard-intro">
                    <div>
                      <span className="profile-wizard-eyebrow">
                        तुमची ओळख
                      </span>
                      <h2>
                        तुमची सुंदर ओळख,<br />
                        <em>तुमच्या शब्दांत</em>
                      </h2>
                      <p>
                        खालील टप्प्यांमध्ये तुमचे संपूर्ण
                        वैवाहिक प्रोफाइल तयार करा.
                      </p>
                    </div>
                    <div className="profile-wizard-count">
                      <strong>{profileStep}</strong>
                      <span>/ {profileStepLabels.length}</span>
                    </div>
                  </div>

                  <div
                    className="profile-stepper"
                    aria-label="प्रोफाइल प्रगती"
                  >
                    {profileStepLabels.map((label, index) => {
                      const step = index + 1;
                      return (
                        <div
                          key={label}
                          style={{
                            display: "contents",
                          }}
                        >
                          <div
                            className={`profile-step-item ${
                              profileStep >= step ? "active" : ""
                            } ${
                              profileStep > step ? "completed" : ""
                            }`}
                          >
                            <div className="profile-step-circle">
                              {profileStep > step
                                ? "✓"
                                : String(step).padStart(2, "0")}
                            </div>
                            <span>{label}</span>
                          </div>

                          {step < profileStepLabels.length && (
                            <div
                              className={`profile-step-line ${
                                profileStep > step ? "active" : ""
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* =================================================
                      STEP 1 — BASIC
                      ================================================= */}
                  {profileStep === 1 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">
                              01
                            </span>
                            <h2>मूलभूत माहिती</h2>
                          </div>
                          <span>* आवश्यक माहिती</span>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>पहिले नाव *</span>
                            <input
                              type="text"
                              value={profileForm.firstName}
                              onChange={(event) =>
                                updateProfileField(
                                  "firstName",
                                  event.target.value,
                                )
                              }
                              placeholder="तुमचे पहिले नाव"
                              required
                            />
                          </label>

                          <label>
                            <span>मधले नाव</span>
                            <input
                              type="text"
                              value={profileForm.middleName}
                              onChange={(event) =>
                                updateProfileField(
                                  "middleName",
                                  event.target.value,
                                )
                              }
                              placeholder="मधले नाव"
                            />
                          </label>

                          <label>
                            <span>आडनाव *</span>
                            <input
                              type="text"
                              value={profileForm.lastName}
                              onChange={(event) =>
                                updateProfileField(
                                  "lastName",
                                  event.target.value,
                                )
                              }
                              placeholder="तुमचे आडनाव"
                              required
                            />
                          </label>

                          <label>
                            <span>लिंग *</span>
                            <select
                              value={profileForm.gender}
                              onChange={(event) =>
                                updateProfileField(
                                  "gender",
                                  event.target.value,
                                )
                              }
                              required
                            >
                              <option value="">निवडा</option>
                              <option value="MALE">पुरुष</option>
                              <option value="FEMALE">महिला</option>
                              <option value="OTHER">इतर</option>
                            </select>
                          </label>

                          <label>
                            <span>जन्मतारीख *</span>
                            <input
                              type="date"
                              value={profileForm.dateOfBirth}
                              onChange={(event) =>
                                updateProfileField(
                                  "dateOfBirth",
                                  event.target.value,
                                )
                              }
                              required
                            />
                          </label>

                          <label>
                            <span>जन्मवेळ</span>
                            <input
                              type="time"
                              value={profileForm.timeOfBirth}
                              onChange={(event) =>
                                updateProfileField(
                                  "timeOfBirth",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>जन्मस्थळ</span>
                            <input
                              type="text"
                              value={profileForm.birthPlace}
                              onChange={(event) =>
                                updateProfileField(
                                  "birthPlace",
                                  event.target.value,
                                )
                              }
                              placeholder="शहर / गाव"
                            />
                          </label>

                          <label>
                            <span>वैवाहिक स्थिती</span>
                            <select
                              value={profileForm.maritalStatus}
                              onChange={(event) =>
                                updateProfileField(
                                  "maritalStatus",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="NEVER_MARRIED">
                                अविवाहित
                              </option>
                              <option value="DIVORCED">
                                घटस्फोटित
                              </option>
                              <option value="WIDOWED">
                                विधवा / विधुर
                              </option>
                              <option value="SEPARATED">
                                विभक्त
                              </option>
                            </select>
                          </label>

                          <label>
                            <span>मुलांची संख्या</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.numberOfChildren}
                              onChange={(event) =>
                                updateProfileField(
                                  "numberOfChildren",
                                  event.target.value,
                                )
                              }
                              placeholder="0"
                            />
                          </label>

                          <label>
                            <span>उंची (सेमी)</span>
                            <input
                              type="number"
                              min="1"
                              value={profileForm.heightCm}
                              onChange={(event) =>
                                updateProfileField(
                                  "heightCm",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. 170"
                            />
                          </label>

                          <label>
                            <span>वजन (किलो)</span>
                            <input
                              type="number"
                              min="1"
                              value={profileForm.weightKg}
                              onChange={(event) =>
                                updateProfileField(
                                  "weightKg",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. 65"
                            />
                          </label>

                          <label>
                            <span>रक्तगट</span>
                            <select
                              value={profileForm.bloodGroup}
                              onChange={(event) =>
                                updateProfileField(
                                  "bloodGroup",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              {[
                                "A+",
                                "A-",
                                "B+",
                                "B-",
                                "AB+",
                                "AB-",
                                "O+",
                                "O-",
                              ].map((group) => (
                                <option key={group} value={group}>
                                  {group}
                                </option>
                              ))}
                            </select>
                          </label>

                          <label>
                            <span>वर्ण</span>
                            <select
                              value={profileForm.complexion}
                              onChange={(event) =>
                                updateProfileField(
                                  "complexion",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="FAIR">गोरा</option>
                              <option value="WHEATISH">गव्हाळ</option>
                              <option value="DARK">सावळा</option>
                            </select>
                          </label>

                          <label>
                            <span>शरीरयष्टी</span>
                            <select
                              value={profileForm.bodyType}
                              onChange={(event) =>
                                updateProfileField(
                                  "bodyType",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="SLIM">सडपातळ</option>
                              <option value="AVERAGE">मध्यम</option>
                              <option value="ATHLETIC">ऍथलेटिक</option>
                              <option value="HEAVY">भरदार</option>
                            </select>
                          </label>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={closeProfileView}
                        >
                          ← बाहेर पडा
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => {
                            if (
                              !profileForm.firstName.trim() ||
                              !profileForm.lastName.trim() ||
                              !profileForm.gender ||
                              !profileForm.dateOfBirth
                            ) {
                              setProfileError(
                                "कृपया पुढे जाण्यापूर्वी सर्व आवश्यक माहिती भरा.",
                              );
                              return;
                            }
                            setProfileError("");
                            setProfileStep(2);
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 2 — RELIGION / COMMUNITY
                      ================================================= */}
                  {profileStep === 2 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">
                              02
                            </span>
                            <h2>धर्म व समाज</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>धर्म</span>
                            <input
                              type="text"
                              value={profileForm.religion}
                              onChange={(event) =>
                                updateProfileField(
                                  "religion",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. हिंदू"
                            />
                          </label>

                          <label>
                            <span>जात</span>
                            <input
                              type="text"
                              value={profileForm.caste}
                              onChange={(event) =>
                                updateProfileField(
                                  "caste",
                                  event.target.value,
                                )
                              }
                              placeholder="तुमची जात"
                            />
                          </label>

                          <label>
                            <span>पोटजात</span>
                            <input
                              type="text"
                              value={profileForm.subCaste}
                              onChange={(event) =>
                                updateProfileField(
                                  "subCaste",
                                  event.target.value,
                                )
                              }
                              placeholder="पोटजात"
                            />
                          </label>

                          <label>
                            <span>गोत्र</span>
                            <input
                              type="text"
                              value={profileForm.gotra}
                              onChange={(event) =>
                                updateProfileField(
                                  "gotra",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. कश्यप"
                            />
                          </label>

                          <label>
                            <span>रास / राशी</span>
                            <input
                              type="text"
                              value={profileForm.zodiacSign}
                              onChange={(event) =>
                                updateProfileField(
                                  "zodiacSign",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. मेष"
                            />
                          </label>

                          <label>
                            <span>नक्षत्र</span>
                            <input
                              type="text"
                              value={profileForm.nakshatra}
                              onChange={(event) =>
                                updateProfileField(
                                  "nakshatra",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. रोहिणी"
                            />
                          </label>

                          <label>
                            <span>मंगळिक स्थिती</span>
                            <select
                              value={profileForm.manglikStatus}
                              onChange={(event) =>
                                updateProfileField(
                                  "manglikStatus",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="YES">होय</option>
                              <option value="NO">नाही</option>
                              <option value="UNKNOWN">माहित नाही</option>
                            </select>
                          </label>

                          <label>
                            <span>मातृभाषा</span>
                            <input
                              type="text"
                              value={profileForm.motherTongue}
                              onChange={(event) =>
                                updateProfileField(
                                  "motherTongue",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. मराठी"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(1)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => {
                            setProfileError("");
                            setProfileStep(3);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 3 — EDUCATION
                      ================================================= */}
                  {profileStep === 3 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">03</span>
                            <h2>शिक्षण</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>शिक्षण स्तर</span>
                            <select
                              value={profileForm.educationLevel}
                              onChange={(event) =>
                                updateProfileField(
                                  "educationLevel",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="10TH">१० वी</option>
                              <option value="12TH">१२ वी</option>
                              <option value="DIPLOMA">डिप्लोमा</option>
                              <option value="ITI">ITI</option>
                              <option value="UG">पदवी</option>
                              <option value="PG">पदव्युत्तर</option>
                              <option value="DOCTORATE">डॉक्टरेट</option>
                              <option value="PROFESSIONAL">
                                व्यावसायिक
                              </option>
                              <option value="OTHER">इतर</option>
                            </select>
                          </label>

                          <label>
                            <span>शिक्षण शाखा / Stream</span>
                            <select
                              value={profileForm.educationStream}
                              onChange={(event) =>
                                updateProfileField(
                                  "educationStream",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="ARTS">कला</option>
                              <option value="COMMERCE">वाणिज्य</option>
                              <option value="SCIENCE">विज्ञान</option>
                              <option value="ENGINEERING">अभियांत्रिकी</option>
                              <option value="MEDICAL">वैद्यकीय</option>
                              <option value="LAW">कायदा</option>
                              <option value="MANAGEMENT">व्यवस्थापन</option>
                              <option value="COMPUTER_IT">कॉम्प्युटर / IT</option>
                              <option value="AGRICULTURE">कृषी</option>
                              <option value="PHARMACY">फार्मसी</option>
                              <option value="ARCHITECTURE">आर्किटेक्चर</option>
                              <option value="EDUCATION">शिक्षण</option>
                              <option value="FINE_ARTS">ललित कला</option>
                              <option value="HOTEL_MANAGEMENT">
                                हॉटेल मॅनेजमेंट
                              </option>
                              <option value="OTHER">इतर</option>
                            </select>
                          </label>

                          <label>
                            <span>पदवी / Qualification</span>
                            <input
                              type="text"
                              value={profileForm.qualification}
                              onChange={(event) =>
                                updateProfileField(
                                  "qualification",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. B.E., B.Com., M.B.A."
                            />
                          </label>

                          <label>
                            <span>विशेषीकरण</span>
                            <input
                              type="text"
                              value={profileForm.specialization}
                              onChange={(event) =>
                                updateProfileField(
                                  "specialization",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. Computer Engineering"
                            />
                          </label>

                          <label>
                            <span>महाविद्यालय / संस्था</span>
                            <input
                              type="text"
                              value={profileForm.instituteName}
                              onChange={(event) =>
                                updateProfileField(
                                  "instituteName",
                                  event.target.value,
                                )
                              }
                              placeholder="संस्थेचे नाव"
                            />
                          </label>

                          <label>
                            <span>उत्तीर्ण वर्ष</span>
                            <input
                              type="number"
                              min="1950"
                              max="2100"
                              value={profileForm.passingYear}
                              onChange={(event) =>
                                updateProfileField(
                                  "passingYear",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. 2024"
                            />
                          </label>
                        </div>

                        <div className="profile-step-tip">
                          <span>✦</span>
                          <div>
                            <strong>संपूर्ण शिक्षण माहिती द्या</strong>
                          </div>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(2)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(4)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 4 — FAMILY
                      ================================================= */}
                  {profileStep === 4 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">04</span>
                            <h2>कुटुंब माहिती</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>वडिलांचे नाव</span>
                            <input
                              type="text"
                              value={profileForm.fatherName}
                              onChange={(event) =>
                                updateProfileField(
                                  "fatherName",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>वडिलांचा व्यवसाय</span>
                            <input
                              type="text"
                              value={profileForm.fatherOccupation}
                              onChange={(event) =>
                                updateProfileField(
                                  "fatherOccupation",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>आईचे नाव</span>
                            <input
                              type="text"
                              value={profileForm.motherName}
                              onChange={(event) =>
                                updateProfileField(
                                  "motherName",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>आईचा व्यवसाय</span>
                            <input
                              type="text"
                              value={profileForm.motherOccupation}
                              onChange={(event) =>
                                updateProfileField(
                                  "motherOccupation",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>भाऊ</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.numberOfBrothers}
                              onChange={(event) =>
                                updateProfileField(
                                  "numberOfBrothers",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>विवाहित भाऊ</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.brothersMarried}
                              onChange={(event) =>
                                updateProfileField(
                                  "brothersMarried",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>बहिणी</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.numberOfSisters}
                              onChange={(event) =>
                                updateProfileField(
                                  "numberOfSisters",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>विवाहित बहिणी</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.sistersMarried}
                              onChange={(event) =>
                                updateProfileField(
                                  "sistersMarried",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>कुटुंब प्रकार</span>
                            <select
                              value={profileForm.familyType}
                              onChange={(event) =>
                                updateProfileField(
                                  "familyType",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="JOINT">संयुक्त</option>
                              <option value="NUCLEAR">विभक्त</option>
                              <option value="OTHER">इतर</option>
                            </select>
                          </label>

                          <label>
                            <span>कुटुंब मूल्ये</span>
                            <select
                              value={profileForm.familyValues}
                              onChange={(event) =>
                                updateProfileField(
                                  "familyValues",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="TRADITIONAL">पारंपरिक</option>
                              <option value="MODERATE">मध्यम</option>
                              <option value="LIBERAL">आधुनिक</option>
                            </select>
                          </label>

                          <label>
                            <span>कुटुंबाचा सामाजिक स्तर</span>
                            <input
                              type="text"
                              value={profileForm.familyStatus}
                              onChange={(event) =>
                                updateProfileField(
                                  "familyStatus",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. उच्च मध्यमवर्गीय"
                            />
                          </label>

                          <label>
                            <span>कौटुंबिक / पालकांविषयी अधिक माहिती</span>
                            <input
                              type="text"
                              value={profileForm.parentalDetails}
                              onChange={(event) =>
                                updateProfileField(
                                  "parentalDetails",
                                  event.target.value,
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(3)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(5)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 5 — RELATIVES
                      ================================================= */}
                  {profileStep === 5 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">

                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">05</span>
                            <h2>नातेवाईक</h2>
                          </div>
                        </div>

                        <div className="profile-step-tip">
                          <span>✦</span>
                          <div>
                            <strong>नातेवाईकांची माहिती</strong>
                            <p>
                              एकापेक्षा जास्त नातेवाईक जोडता येतील. प्रत्येक
                              नातेवाईक स्वतंत्रपणे जतन केला जाईल.
                            </p>
                          </div>
                        </div>

                        {/* =================================================
                            SAVED RELATIVES
                            ================================================= */}
                        {relatives.length > 0 && (
                          <div className="profile-form-section">

                            <div className="profile-form-section-heading">
                              <div>
                                <span className="profile-section-number">01</span>
                                <h3>जतन केलेले नातेवाईक</h3>
                              </div>
                            </div>

                            <div className="profile-form-grid">

                              {relatives.map((relative) => {

                                const isEditing =
                                  editingRelativeId === relative.id;

                                return (
                                  <div
                                    key={relative.id}
                                    className="profile-step-tip"
                                    style={{
                                      gridColumn: "1 / -1",
                                    }}
                                  >

                                    {/* =================================================
                                        NORMAL VIEW
                                        ================================================= */}
                                    {!isEditing && (
                                      <div style={{ width: "100%" }}>

                                        <strong>
                                          {relative.name || "नातेवाईक"}
                                          {relative.relation
                                            ? ` — ${relative.relation}`
                                            : ""}
                                        </strong>

                                        <p>
                                          {relative.surname
                                            ? `आडनाव: ${relative.surname} • `
                                            : ""}

                                          {relative.city
                                            ? `शहर: ${relative.city} • `
                                            : ""}

                                          {relative.occupation
                                            ? `व्यवसाय: ${relative.occupation}`
                                            : ""}
                                        </p>

                                        {relative.location && (
                                          <p>
                                            ठिकाण: {relative.location}
                                          </p>
                                        )}

                                        {relative.notes && (
                                          <p>
                                            अधिक माहिती: {relative.notes}
                                          </p>
                                        )}

                                        <p>
                                          संपर्क माहिती दृश्यमान:{" "}
                                          {relative.contactVisible
                                            ? "होय"
                                            : "नाही"}
                                        </p>

                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "10px",
                                            marginTop: "12px",
                                            flexWrap: "wrap",
                                          }}
                                        >

                                          {/* EDIT */}
                                          <button
                                            type="button"
                                            className="secondary-button"
                                            onClick={() => {
                                              setEditingRelativeId(
                                                relative.id,
                                              );

                                              setEditingRelativeForm({
                                                name:
                                                  relative.name || "",
                                                relation:
                                                  relative.relation || "",
                                                surname:
                                                  relative.surname || "",
                                                city:
                                                  relative.city || "",
                                                occupation:
                                                  relative.occupation || "",
                                                location:
                                                  relative.location || "",
                                                notes:
                                                  relative.notes || "",
                                                contactVisible:
                                                  relative.contactVisible ??
                                                  false,
                                              });

                                              setProfileError("");
                                              setProfileMessage("");
                                            }}
                                          >
                                            संपादित करा
                                          </button>

                                          {/* DELETE */}
                                          <button
                                            type="button"
                                            className="secondary-button"
                                            onClick={async () => {

                                              const confirmed =
                                                window.confirm(
                                                  "हा नातेवाईक हटवायचा आहे का?",
                                                );

                                              if (!confirmed) {
                                                return;
                                              }

                                              const token =
                                                localStorage.getItem(
                                                  "vivahjodi_token",
                                                );

                                              if (!token) {
                                                setProfileError(
                                                  "लॉगिन सत्र उपलब्ध नाही.",
                                                );
                                                return;
                                              }

                                              try {
                                                setProfileSaving(true);
                                                setProfileError("");
                                                setProfileMessage("");

                                                await deleteRelative(
                                                  token,
                                                  relative.id,
                                                );

                                                setRelatives(
                                                  (current) =>
                                                    current.filter(
                                                      (item) =>
                                                        item.id !==
                                                        relative.id,
                                                    ),
                                                );

                                                setProfileMessage(
                                                  "नातेवाईक माहिती हटवली.",
                                                );
                                              } catch (error) {
                                                setProfileError(
                                                  error instanceof Error
                                                    ? error.message
                                                    : "नातेवाईक माहिती हटवताना त्रुटी आली.",
                                                );
                                              } finally {
                                                setProfileSaving(false);
                                              }
                                            }}
                                          >
                                            हटवा
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {/* =================================================
                                        INLINE EDIT FORM
                                        ================================================= */}
                                    {isEditing && (
                                      <div
                                        style={{
                                          width: "100%",
                                        }}
                                      >

                                        <div
                                          style={{
                                            marginBottom: "18px",
                                          }}
                                        >
                                          <strong>
                                            नातेवाईक माहिती संपादित करा
                                          </strong>
                                        </div>

                                        <div className="profile-form-grid">

                                          <label>
                                            <span>नातेवाईकाचे नाव</span>

                                            <input
                                              type="text"
                                              value={
                                                editingRelativeForm.name
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    name:
                                                      event.target.value,
                                                  }),
                                                )
                                              }
                                            />
                                          </label>

                                          <label>
                                            <span>नाते</span>

                                            <input
                                              type="text"
                                              value={
                                                editingRelativeForm.relation
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    relation:
                                                      event.target.value,
                                                  }),
                                                )
                                              }
                                              placeholder="उदा. मामा, काका, मावशी"
                                            />
                                          </label>

                                          <label>
                                            <span>आडनाव</span>

                                            <input
                                              type="text"
                                              value={
                                                editingRelativeForm.surname
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    surname:
                                                      event.target.value,
                                                  }),
                                                )
                                              }
                                            />
                                          </label>

                                          <label>
                                            <span>शहर</span>

                                            <input
                                              type="text"
                                              value={
                                                editingRelativeForm.city
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    city:
                                                      event.target.value,
                                                  }),
                                                )
                                              }
                                              placeholder="उदा. पुणे"
                                            />
                                          </label>

                                          <label>
                                            <span>व्यवसाय</span>

                                            <input
                                              type="text"
                                              value={
                                                editingRelativeForm.occupation
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    occupation:
                                                      event.target.value,
                                                  }),
                                                )
                                              }
                                            />
                                          </label>

                                          <label>
                                            <span>ठिकाण</span>

                                            <input
                                              type="text"
                                              value={
                                                editingRelativeForm.location
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    location:
                                                      event.target.value,
                                                  }),
                                                )
                                              }
                                            />
                                          </label>

                                          <label>
                                            <span>अधिक माहिती</span>

                                            <input
                                              type="text"
                                              value={
                                                editingRelativeForm.notes
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    notes:
                                                      event.target.value,
                                                  }),
                                                )
                                              }
                                            />
                                          </label>

                                          <label
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "10px",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={
                                                editingRelativeForm.contactVisible
                                              }
                                              onChange={(event) =>
                                                setEditingRelativeForm(
                                                  (current) => ({
                                                    ...current,
                                                    contactVisible:
                                                      event.target.checked,
                                                  }),
                                                )
                                              }
                                            />

                                            <span>
                                              संपर्क माहिती दृश्यमान ठेवावी
                                            </span>
                                          </label>

                                        </div>

                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "10px",
                                            marginTop: "20px",
                                            flexWrap: "wrap",
                                          }}
                                        >

                                          {/* SAVE EDIT */}
                                          <button
                                            type="button"
                                            className="auth-submit"
                                            disabled={profileSaving}
                                            onClick={async () => {

                                              const token =
                                                localStorage.getItem(
                                                  "vivahjodi_token",
                                                );

                                              if (!token) {
                                                setProfileError(
                                                  "लॉगिन सत्र उपलब्ध नाही.",
                                                );
                                                return;
                                              }

                                              if (
                                                !editingRelativeForm.name.trim() &&
                                                !editingRelativeForm.relation.trim()
                                              ) {
                                                setProfileError(
                                                  "कृपया नातेवाईकाचे नाव किंवा नाते भरा.",
                                                );
                                                return;
                                              }

                                              if (!editingRelativeId) {
                                                return;
                                              }

                                              try {
                                                setProfileSaving(true);
                                                setProfileError("");
                                                setProfileMessage("");

                                                const updated =
                                                  await updateRelative(
                                                    token,
                                                    editingRelativeId,
                                                    {
                                                      name:
                                                        editingRelativeForm.name.trim() ||
                                                        undefined,

                                                      relation:
                                                        editingRelativeForm.relation.trim() ||
                                                        undefined,

                                                      surname:
                                                        editingRelativeForm.surname.trim() ||
                                                        undefined,

                                                      city:
                                                        editingRelativeForm.city.trim() ||
                                                        undefined,

                                                      occupation:
                                                        editingRelativeForm.occupation.trim() ||
                                                        undefined,

                                                      location:
                                                        editingRelativeForm.location.trim() ||
                                                        undefined,

                                                      notes:
                                                        editingRelativeForm.notes.trim() ||
                                                        undefined,

                                                      contactVisible:
                                                        editingRelativeForm.contactVisible,
                                                    },
                                                  );

                                                setRelatives(
                                                  (current) =>
                                                    current.map(
                                                      (item) =>
                                                        item.id ===
                                                        updated.id
                                                          ? updated
                                                          : item,
                                                    ),
                                                );

                                                setEditingRelativeId(null);

                                                setProfileMessage(
                                                  "नातेवाईक माहिती अपडेट झाली.",
                                                );
                                              } catch (error) {
                                                setProfileError(
                                                  error instanceof Error
                                                    ? error.message
                                                    : "नातेवाईक माहिती अपडेट करताना त्रुटी आली.",
                                                );
                                              } finally {
                                                setProfileSaving(false);
                                              }
                                            }}
                                          >
                                            {profileSaving
                                              ? "जतन करत आहे..."
                                              : "बदल जतन करा"}
                                          </button>

                                          {/* CANCEL EDIT */}
                                          <button
                                            type="button"
                                            className="secondary-button"
                                            disabled={profileSaving}
                                            onClick={() => {
                                              setEditingRelativeId(null);
                                              setProfileError("");
                                              setProfileMessage("");
                                            }}
                                          >
                                            रद्द करा
                                          </button>

                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                            </div>
                          </div>
                        )}

                        {/* =================================================
                            ADD NEW RELATIVE
                            ================================================= */}
                        <div className="profile-form-section">

                          <div className="profile-form-section-heading">
                            <div>
                              <span className="profile-section-number">02</span>
                              <h3>नवीन नातेवाईक जोडा</h3>
                            </div>
                          </div>

                          <div className="profile-form-grid">

                            <label>
                              <span>नातेवाईकाचे नाव</span>

                              <input
                                type="text"
                                value={profileForm.relativeName}
                                onChange={(event) =>
                                  updateProfileField(
                                    "relativeName",
                                    event.target.value,
                                  )
                                }
                                placeholder="उदा. अमोल"
                              />
                            </label>

                            <label>
                              <span>नाते</span>

                              <input
                                type="text"
                                value={profileForm.relativeRelation}
                                onChange={(event) =>
                                  updateProfileField(
                                    "relativeRelation",
                                    event.target.value,
                                  )
                                }
                                placeholder="उदा. मामा, काका, मावशी"
                              />
                            </label>

                            <label>
                              <span>आडनाव</span>

                              <input
                                type="text"
                                value={profileForm.relativeSurname}
                                onChange={(event) =>
                                  updateProfileField(
                                    "relativeSurname",
                                    event.target.value,
                                  )
                                }
                              />
                            </label>

                            <label>
                              <span>शहर</span>

                              <input
                                type="text"
                                value={profileForm.relativeLocation}
                                onChange={(event) =>
                                  updateProfileField(
                                    "relativeCity",
                                    event.target.value,
                                  )
                                }
                                placeholder="उदा. पुणे"
                              />
                            </label>

                            <label>
                              <span>व्यवसाय</span>

                              <input
                                type="text"
                                value={profileForm.relativeOccupation}
                                onChange={(event) =>
                                  updateProfileField(
                                    "relativeOccupation",
                                    event.target.value,
                                  )
                                }
                              />
                            </label>

                            <label>
                              <span>ठिकाण</span>

                              <input
                                type="text"
                                value={profileForm.relativeLocation}
                                onChange={(event) =>
                                  updateProfileField(
                                    "relativeLocation",
                                    event.target.value,
                                  )
                                }
                              />
                            </label>

                            <label>
                              <span>अधिक माहिती</span>

                              <input
                                type="text"
                                value={profileForm.relativeNotes}
                                onChange={(event) =>
                                  updateProfileField(
                                    "relativeNotes",
                                    event.target.value,
                                  )
                                }
                              />
                            </label>

                            <label
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={profileForm.relativeContactVisible}
                                onChange={(event) => {
                                    setProfileForm((current) => ({
                                      ...current,
                                      relativeContactVisible: event.target.checked,
                                    }));
                                  }}
                                />
                              <span>
                                संपर्क माहिती दृश्यमान ठेवावी
                              </span>
                            </label>


                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: "20px",
                            }}
                          >
                            <button
                              type="button"
                              className="auth-submit"
                              disabled={profileSaving}
                              onClick={async () => {

                                const token =
                                  localStorage.getItem(
                                    "vivahjodi_token",
                                  );

                                if (!token) {
                                  setProfileError(
                                    "लॉगिन सत्र उपलब्ध नाही.",
                                  );
                                  return;
                                }

                                if (
                                  !profileForm.relativeName.trim() &&
                                  !profileForm.relativeRelation.trim()
                                ) {
                                  setProfileError(
                                    "कृपया नातेवाईकाचे नाव किंवा नाते भरा.",
                                  );
                                  return;
                                }

                                try {
                                  setProfileSaving(true);
                                  setProfileError("");
                                  setProfileMessage("");

                                  const created =
                                    await createRelative(token, {
                                      name:
                                        profileForm.relativeName.trim() ||
                                        undefined,

                                      relation:
                                        profileForm.relativeRelation.trim() ||
                                        undefined,

                                      surname:
                                        profileForm.relativeSurname.trim() ||
                                        undefined,

                                      city:
                                        profileForm.relativeCity.trim() ||
                                        undefined,

                                      occupation:
                                        profileForm.relativeOccupation.trim() ||
                                        undefined,

                                      location:
                                        profileForm.relativeLocation.trim() ||
                                        undefined,

                                      notes:
                                        profileForm.relativeNotes.trim() ||
                                        undefined,

                                      contactVisible:
                                        profileForm.relativeContactVisible,
                                    });

                                  setRelatives(
                                    (current) => [
                                      ...current,
                                      created,
                                    ],
                                  );

                                  updateProfileField(
                                    "relativeName",
                                    "",
                                  );

                                  updateProfileField(
                                    "relativeRelation",
                                    "",
                                  );

                                  updateProfileField(
                                    "relativeSurname",
                                    "",
                                  );

                                  updateProfileField(
                                    "relativeCity",
                                    "",
                                  );


                                  updateProfileField(
                                    "relativeOccupation",
                                    "",
                                  );

                                  updateProfileField(
                                    "relativeLocation",
                                    "",
                                  );

                                  updateProfileField(
                                    "relativeNotes",
                                    "",
                                  );

                                  setProfileForm((current) => ({
                                  ...current,
                                  relativeContactVisible: false,
                                }));


                                  setProfileMessage(
                                    "नातेवाईक माहिती जतन झाली.",
                                  );
                                } catch (error) {
                                  setProfileError(
                                    error instanceof Error
                                      ? error.message
                                      : "नातेवाईक माहिती जतन करताना त्रुटी आली.",
                                  );
                                } finally {
                                  setProfileSaving(false);
                                }
                              }}
                            >
                              {profileSaving
                                ? "जतन करत आहे..."
                                : "नातेवाईक जोडा"}
                            </button>
                          </div>
                        </div>

                        {profileError && (
                          <div className="profile-error-message">
                            {profileError}
                          </div>
                        )}

                        {profileMessage && (
                          <div className="profile-success-message">
                            {profileMessage}
                          </div>
                        )}

                      </div>

                      {/* =================================================
                          WIZARD NAVIGATION
                          ================================================= */}
                      <div className="profile-wizard-actions">

                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(4)}
                        >
                          ← मागे
                        </button>

                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(6)}
                        >
                          पुढे जा <span>→</span>
                        </button>

                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 6 — OCCUPATION
                      ================================================= */}
                  {profileStep === 6 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">06</span>
                            <h2>व्यवसाय व उत्पन्न</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>व्यवसाय</span>
                            <input
                              type="text"
                              value={profileForm.occupation}
                              onChange={(event) =>
                                updateProfileField(
                                  "occupation",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. Software Engineer"
                            />
                          </label>

                          <label>
                            <span>उपव्यवसाय</span>
                            <input
                              type="text"
                              value={profileForm.subOccupation}
                              onChange={(event) =>
                                updateProfileField(
                                  "subOccupation",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>नोकरीचा प्रकार</span>
                            <select
                              value={profileForm.employmentType}
                              onChange={(event) =>
                                updateProfileField(
                                  "employmentType",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="FULL_TIME">पूर्णवेळ</option>
                              <option value="PART_TIME">अर्धवेळ</option>
                              <option value="BUSINESS">व्यवसाय</option>
                              <option value="SELF_EMPLOYED">स्वयंरोजगार</option>
                              <option value="GOVERNMENT">शासकीय</option>
                            </select>
                          </label>

                          <label>
                            <span>कामाचे क्षेत्र</span>
                            <input
                              type="text"
                              value={profileForm.employedIn}
                              onChange={(event) =>
                                updateProfileField(
                                  "employedIn",
                                  event.target.value,
                                )
                              }
                              placeholder="IT / Banking / Government"
                            />
                          </label>

                          <label>
                            <span>कंपनी / संस्थेचे नाव</span>
                            <input
                              type="text"
                              value={profileForm.companyName}
                              onChange={(event) =>
                                updateProfileField(
                                  "companyName",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>पद / Designation</span>
                            <input
                              type="text"
                              value={profileForm.designation}
                              onChange={(event) =>
                                updateProfileField(
                                  "designation",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>कामाचे ठिकाण</span>
                            <input
                              type="text"
                              value={profileForm.workLocation}
                              onChange={(event) =>
                                updateProfileField(
                                  "workLocation",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>वार्षिक उत्पन्न</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.annualIncome}
                              onChange={(event) =>
                                updateProfileField(
                                  "annualIncome",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. 800000"
                            />
                          </label>

                          <label>
                            <span>चलन</span>
                            <select
                              value={profileForm.incomeCurrency}
                              onChange={(event) =>
                                updateProfileField(
                                  "incomeCurrency",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="INR">INR ₹</option>
                              <option value="USD">USD $</option>
                              <option value="GBP">GBP £</option>
                              <option value="AED">AED</option>
                            </select>
                          </label>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(5)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(7)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 7 — LIFESTYLE
                      ================================================= */}
                  {profileStep === 7 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">07</span>
                            <h2>जीवनशैली</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>आहार</span>
                            <select
                              value={profileForm.eatingHabits}
                              onChange={(event) =>
                                updateProfileField(
                                  "eatingHabits",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="VEGETARIAN">शाकाहारी</option>
                              <option value="NON_VEGETARIAN">
                                मांसाहारी
                              </option>
                              <option value="EGGETARIAN">अंडाहारी</option>
                              <option value="VEGAN">Vegan</option>
                            </select>
                          </label>

                          <label>
                            <span>मद्यपान</span>
                            <select
                              value={profileForm.drinkingHabits}
                              onChange={(event) =>
                                updateProfileField(
                                  "drinkingHabits",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="NO">नाही</option>
                              <option value="OCCASIONAL">कधीतरी</option>
                              <option value="YES">होय</option>
                            </select>
                          </label>

                          <label>
                            <span>धूम्रपान</span>
                            <select
                              value={profileForm.smokingHabits}
                              onChange={(event) =>
                                updateProfileField(
                                  "smokingHabits",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="">निवडा</option>
                              <option value="NO">नाही</option>
                              <option value="OCCASIONAL">कधीतरी</option>
                              <option value="YES">होय</option>
                            </select>
                          </label>

                          <label>
                            <span>शारीरिक अपंगत्व</span>
                            <select
                              value={profileForm.physicalDisability}
                              onChange={(event) =>
                                updateProfileField(
                                  "physicalDisability",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="false">नाही</option>
                              <option value="true">होय</option>
                            </select>
                          </label>

                          {profileForm.physicalDisability === "true" && (
                            <label>
                              <span>अपंगत्वाची माहिती</span>
                              <input
                                type="text"
                                value={profileForm.disabilityDetails}
                                onChange={(event) =>
                                  updateProfileField(
                                    "disabilityDetails",
                                    event.target.value,
                                  )
                                }
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(6)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(8)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 8 — LOCATION
                      ================================================= */}
                  {profileStep === 8 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">08</span>
                            <h2>पत्ता</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>देश</span>
                            <input
                              type="text"
                              value={profileForm.currentCountry}
                              onChange={(event) =>
                                updateProfileField(
                                  "currentCountry",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>राज्य</span>
                            <input
                              type="text"
                              value={profileForm.state}
                              onChange={(event) =>
                                updateProfileField(
                                  "state",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. महाराष्ट्र"
                            />
                          </label>

                          <label>
                            <span>जिल्हा</span>
                            <input
                              type="text"
                              value={profileForm.district}
                              onChange={(event) =>
                                updateProfileField(
                                  "district",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. पुणे"
                            />
                          </label>

                          <label>
                            <span>तालुका / तहसील</span>
                            <input
                              type="text"
                              value={profileForm.taluka}
                              onChange={(event) =>
                                updateProfileField(
                                  "taluka",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>शहर / गाव</span>
                            <input
                              type="text"
                              value={profileForm.city}
                              onChange={(event) =>
                                updateProfileField(
                                  "city",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>पिनकोड</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={10}
                              value={profileForm.currentPincode}
                              onChange={(event) =>
                                updateProfileField(
                                  "currentPincode",
                                  event.target.value,
                                )
                              }
                            />
                          </label>
                        </div>

                        <label className="profile-about-field">
                          <span>सध्याचा पत्ता</span>
                          <textarea
                            rows={4}
                            value={profileForm.currentAddress}
                            onChange={(event) =>
                              updateProfileField(
                                "currentAddress",
                                event.target.value,
                              )
                            }
                            placeholder="संपूर्ण सध्याचा पत्ता"
                          />
                        </label>

                        <div className="profile-form-section-heading">
                          <div>
                            <h2>मूळ गाव / Native Place</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>देश</span>
                            <input
                              type="text"
                              value={profileForm.nativeCountry}
                              onChange={(event) =>
                                updateProfileField(
                                  "nativeCountry",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>राज्य</span>
                            <input
                              type="text"
                              value={profileForm.nativeState}
                              onChange={(event) =>
                                updateProfileField(
                                  "nativeState",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>जिल्हा</span>
                            <input
                              type="text"
                              value={profileForm.nativeDistrict}
                              onChange={(event) =>
                                updateProfileField(
                                  "nativeDistrict",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>तालुका / तहसील</span>
                            <input
                              type="text"
                              value={profileForm.nativeTaluka}
                              onChange={(event) =>
                                updateProfileField(
                                  "nativeTaluka",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>शहर / गाव</span>
                            <input
                              type="text"
                              value={profileForm.nativeCity}
                              onChange={(event) =>
                                updateProfileField(
                                  "nativeCity",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>मूळ गावाचे नाव</span>
                            <input
                              type="text"
                              value={profileForm.nativePlace}
                              onChange={(event) =>
                                updateProfileField(
                                  "nativePlace",
                                  event.target.value,
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(7)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(9)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 9 — NRI
                      ================================================= */}
                  {profileStep === 9 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">09</span>
                            <h2>NRI माहिती</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>NRI आहात का?</span>
                            <select
                              value={profileForm.nri}
                              onChange={(event) =>
                                updateProfileField(
                                  "nri",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="false">नाही</option>
                              <option value="true">होय</option>
                            </select>
                          </label>

                          {profileForm.nri === "true" && (
                            <>
                              <label>
                                <span>राहण्याचा देश</span>
                                <input
                                  type="text"
                                  value={profileForm.livingCountry}
                                  onChange={(event) =>
                                    updateProfileField(
                                      "livingCountry",
                                      event.target.value,
                                    )
                                  }
                                  placeholder="उदा. USA"
                                />
                              </label>

                              <label>
                                <span>NRI पत्ता</span>
                                <input
                                  type="text"
                                  value={profileForm.nriAddress}
                                  onChange={(event) =>
                                    updateProfileField(
                                      "nriAddress",
                                      event.target.value,
                                    )
                                  }
                                />
                              </label>
                            </>
                          )}
                        </div>

                        <div className="profile-step-tip">
                          <span>✦</span>
                          <div>
                            <strong>भारताबाहेर राहत असल्यास</strong>
                            <p>
                              राहण्याचा देश आणि पत्ता अचूक द्या.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(8)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(10)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 10 — ABOUT ME + PHOTO
                      ================================================= */}
                  {profileStep === 10 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">10</span>
                            <h2>माझ्याबद्दल</h2>
                          </div>
                        </div>

                        <label className="profile-about-field">
                          <span>तुमच्याबद्दल थोडक्यात</span>
                          <textarea
                            value={profileForm.aboutMe}
                            onChange={(event) =>
                              updateProfileField(
                                "aboutMe",
                                event.target.value,
                              )
                            }
                            placeholder="तुमचे शिक्षण, स्वभाव, आवडी, कुटुंब, करिअर आणि भविष्यातील अपेक्षांबद्दल लिहा."
                            rows={8}
                            maxLength={2000}
                          />
                          <small>
                            {profileForm.aboutMe.length}/2000
                          </small>
                        </label>

                        <div className="profile-form-section-heading">
                          <div>
                            <h2>प्रोफाइल फोटो</h2>
                          </div>
                        </div>

                        <div
                          style={{
                            border: "1px dashed #d8c2b8",
                            borderRadius: "18px",
                            padding: "24px",
                            background: "#fffaf7",
                          }}
                        >
                          <p style={{ marginTop: 0 }}>
                            स्पष्ट, सभ्य आणि अलीकडील फोटो निवडा. एकूण 6 फोटो ठेवता येतील.
                          </p>

                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fill, minmax(135px, 1fr))",
                              gap: "16px",
                              alignItems: "start",
                            }}
                          >
                            {profilePhotos.map((photo) => (
                              <div
                                key={photo.id}
                                style={{
                                  position: "relative",
                                  minWidth: 0,
                                }}
                              >
                                <img
                                  src={photo.preview}
                                  alt="प्रोफाइल फोटो पूर्वदृश्य"
                                  style={{
                                    width: "100%",
                                    aspectRatio: "1 / 1",
                                    objectFit: "cover",
                                    borderRadius: "16px",
                                    border: photo.isPrimary
                                      ? "3px solid #8e2444"
                                      : "1px solid #eadbd5",
                                  }}
                                />

                                {photo.isPrimary && (
                                  <span
                                    style={{
                                      display: "inline-block",
                                      marginTop: "7px",
                                      padding: "4px 8px",
                                      borderRadius: "999px",
                                      background: "#8e2444",
                                      color: "#fff",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    मुख्य फोटो
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => setPrimaryProfilePhoto(photo.id)}
                                  style={{
                                    width: "100%",
                                    marginTop: "8px",
                                    padding: "7px 8px",
                                    borderRadius: "10px",
                                    border: "1px solid #eadbd5",
                                    background: "#fff",
                                    color: "#65182f",
                                    fontWeight: 700,
                                  }}
                                >
                                  {photo.isPrimary ? "मुख्य फोटो" : "मुख्य करा"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => removeProfilePhoto(photo.id)}
                                  style={{
                                    width: "100%",
                                    marginTop: "5px",
                                    padding: "6px 8px",
                                    border: 0,
                                    background: "transparent",
                                    color: "#a33a4f",
                                    fontWeight: 700,
                                  }}
                                >
                                  × फोटो काढा
                                </button>
                              </div>
                            ))}

                            {profilePhotos.length < 6 && (
                              <label
                                style={{
                                  minHeight: "150px",
                                  border: "2px dashed #b58a43",
                                  borderRadius: "16px",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "7px",
                                  padding: "14px",
                                  textAlign: "center",
                                  cursor: "pointer",
                                  background: "#fff",
                                  color: "#65182f",
                                }}
                              >
                                <span style={{ fontSize: "30px", lineHeight: 1 }}>＋</span>
                                <strong>फोटो अपलोड करा</strong>
                                <small>JPG / PNG / WebP<br />5 MB पर्यंत</small>
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp"
                                  multiple
                                  onChange={handlePhotoSelect}
                                  style={{ display: "none" }}
                                />
                              </label>
                            )}
                          </div>

                          {photoError && (
                            <div
                              className="auth-error"
                              role="alert"
                              style={{ marginTop: "14px" }}
                            >
                              {photoError}
                            </div>
                          )}

                          <p
                            style={{
                              marginBottom: 0,
                              marginTop: "16px",
                              fontSize: "0.88rem",
                              color: "#78656a",
                            }}
                          >
                            सध्या फोटोचे preview ब्राउझरमध्ये दिसेल. Supabase Storage जोडल्यावर हे फोटो कायमस्वरूपी server वर जतन केले जातील.
                          </p>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(9)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(11)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 11 — PARTNER PREFERENCES
                      ================================================= */}
                  {profileStep === 11 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">11</span>
                            <h2>जोडीदाराच्या अपेक्षा</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>किमान वय</span>
                            <input
                              type="number"
                              min="18"
                              value={profileForm.partnerMinAge}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMinAge",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>कमाल वय</span>
                            <input
                              type="number"
                              min="18"
                              value={profileForm.partnerMaxAge}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMaxAge",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>किमान उंची (सेमी)</span>
                            <input
                              type="number"
                              min="1"
                              value={profileForm.partnerMinHeightCm}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMinHeightCm",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>कमाल उंची (सेमी)</span>
                            <input
                              type="number"
                              min="1"
                              value={profileForm.partnerMaxHeightCm}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMaxHeightCm",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>वैवाहिक स्थिती</span>
                            <input
                              type="text"
                              value={profileForm.partnerMaritalStatus}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMaritalStatus",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. अविवाहित"
                            />
                          </label>

                          <label>
                            <span>मातृभाषा</span>
                            <input
                              type="text"
                              value={profileForm.partnerMotherTongue}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMotherTongue",
                                  event.target.value,
                                )
                              }
                              placeholder="उदा. मराठी"
                            />
                          </label>

                          <label>
                            <span>धर्म</span>
                            <input
                              type="text"
                              value={profileForm.partnerReligion}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerReligion",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>जात</span>
                            <input
                              type="text"
                              value={profileForm.partnerCaste}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerCaste",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>पोटजात</span>
                            <input
                              type="text"
                              value={profileForm.partnerSubCaste}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerSubCaste",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>रास</span>
                            <input
                              type="text"
                              value={profileForm.partnerZodiacSign}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerZodiacSign",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>नक्षत्र</span>
                            <input
                              type="text"
                              value={profileForm.partnerNakshatra}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerNakshatra",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>मंगळिक</span>
                            <input
                              type="text"
                              value={profileForm.partnerManglikStatus}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerManglikStatus",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>शिक्षण</span>
                            <input
                              type="text"
                              value={profileForm.partnerEducation}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerEducation",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>व्यवसाय</span>
                            <input
                              type="text"
                              value={profileForm.partnerOccupation}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerOccupation",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>किमान उत्पन्न</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.partnerMinIncome}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMinIncome",
                                  event.target.value,
                                )
                              }
                            />
                          </label>

                          <label>
                            <span>कमाल उत्पन्न</span>
                            <input
                              type="number"
                              min="0"
                              value={profileForm.partnerMaxIncome}
                              onChange={(event) =>
                                updateProfileField(
                                  "partnerMaxIncome",
                                  event.target.value,
                                )
                              }
                            />
                          </label>
                        </div>

                        <label className="profile-about-field">
                          <span>जोडीदाराबद्दल अधिक अपेक्षा</span>
                          <textarea
                            rows={6}
                            value={profileForm.partnerAbout}
                            onChange={(event) =>
                              updateProfileField(
                                "partnerAbout",
                                event.target.value,
                              )
                            }
                            maxLength={2000}
                          />
                        </label>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(10)}
                        >
                          ← मागे
                        </button>
                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => setProfileStep(12)}
                        >
                          पुढे जा <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 12 — VISIBILITY + SAVE
                      ================================================= */}
                  {profileStep === 12 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">12</span>
                            <h2>गोपनीयता व प्रोफाइल स्थिती</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
                          <label>
                            <span>प्रोफाइल कोणाला दिसावे?</span>
                            <select
                              value={profileForm.visibility}
                              onChange={(event) =>
                                updateProfileField(
                                  "visibility",
                                  event.target.value,
                                )
                              }
                            >
                              <option value="PRIVATE">
                                फक्त मी / गोपनीय
                              </option>
                              <option value="MEMBERS_ONLY">
                                सदस्यांना
                              </option>
                              <option value="PUBLIC">
                                सार्वजनिक
                              </option>
                            </select>
                          </label>
                        </div>

                        <div className="profile-final-note">
                          <div className="profile-final-icon">✦</div>
                          <div>
                            <strong>
                              तुमचे प्रोफाइल जवळपास तयार आहे!
                            </strong>
                            <p>
                              माहिती तपासा आणि प्रोफाइल जतन करा.
                              तुम्ही पडताळणीच्या काळातही माहिती
                              अपडेट करू शकता.
                            </p>
                          </div>
                        </div>
                      </div>

                      {profileError && (
                        <div
                          className="auth-error profile-form-message"
                          role="alert"
                        >
                          {profileError}
                        </div>
                      )}

                      {profileMessage && (
                        <div
                          className="auth-success profile-form-message"
                          role="status"
                        >
                          ✓ {profileMessage}
                        </div>
                      )}

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => setProfileStep(11)}
                          disabled={profileSaving}
                        >
                          ← मागे
                        </button>

                        <button
                          className="auth-submit profile-save-button"
                          type="submit"
                          disabled={profileSaving}
                        >
                          {profileSaving
                            ? "प्रोफाइल जतन होत आहे..."
                            : profile
                              ? "✓ प्रोफाइल अपडेट करा"
                              : "✓ प्रोफाइल जतन करा"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </section>
        ) : (
          <>
        {/* =================================================
            HERO
            ================================================= */}

        <section
          className="hero"
          id="home"
        >
          <div className="hero-decoration hero-decoration-one" />

          <div className="hero-decoration hero-decoration-two" />

          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">
                ♡ विश्वासाने नाते जोडूया
              </span>

              <h1>
                तुमच्या आयुष्याचा
                <span>
                  {" "}
                  योग्य जोडीदार
                </span>
                शोधण्याची सुरुवात
              </h1>

              <p className="hero-description">
                महाराष्ट्रातील मराठी
                कुटुंबांसाठी तयार केलेले
                सुरक्षित, विश्वासार्ह आणि
                आधुनिक विवाह व्यासपीठ.
              </p>

              <div className="hero-actions">
                <a
                  href="#search"
                  className="primary-button"
                >
                  जोडीदार शोधा
                  <span>→</span>
                </a>

                <button
                  className="secondary-button"
                  type="button"
                  onClick={() =>
                    currentUser
                      ? openModal(
                          "membership",
                        )
                      : openModal(
                          "register",
                        )
                  }
                >
                  सदस्यत्व घ्या
                </button>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <span>✓</span>

                  <div>
                    <strong>
                      गोपनीयता
                    </strong>

                    <small>
                      तुमची माहिती सुरक्षित
                    </small>
                  </div>
                </div>

                <div className="trust-item">
                  <span>✓</span>

                  <div>
                    <strong>
                      पडताळणी
                    </strong>

                    <small>
                      विश्वासार्ह प्रोफाइल्स
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}

            <div className="hero-visual">
              <div className="hero-card">
                <div className="mandala mandala-one" />

                <div className="mandala mandala-two" />

                <div className="couple-illustration">
                  <div className="illustration-halo" />

                  <div className="person person-left">
                    <div className="head">
                      <span className="hair" />
                    </div>

                    <div className="body">
                      <span className="shoulder" />
                    </div>
                  </div>

                  <div className="person person-right">
                    <div className="head">
                      <span className="hair" />
                    </div>

                    <div className="body">
                      <span className="shoulder" />
                    </div>
                  </div>

                  <div className="heart">
                    ♥
                  </div>
                </div>

                <div className="hero-visual-caption">
                  <span>
                    तुमची सुंदर कहाणी
                  </span>

                  <strong>
                    इथून सुरू होऊ शकते
                  </strong>
                </div>
              </div>

              <div className="floating-badge badge-one">
                <span>✓</span>

                <div>
                  <strong>
                    Verified
                  </strong>

                  <small>
                    सुरक्षित प्रोफाइल
                  </small>
                </div>
              </div>

              <div className="floating-badge badge-two">
                <span>♡</span>

                <div>
                  <strong>
                    25,000+
                  </strong>

                  <small>
                    संभाव्य सदस्य
                  </small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            SEARCH
            ================================================= */}

        <section
          className="search-section"
          id="search"
        >
          <div className="container">
            <div className="search-card">
              <div className="search-heading">
                <span className="search-icon">
                  ⌕
                </span>

                <div>
                  <span>
                    जलद शोध
                  </span>

                  <h2>
                    तुमचा जोडीदार शोधा
                  </h2>
                </div>
              </div>

              <div className="search-fields">
                <label>
                  <span>
                    शोधत आहात
                  </span>

                  <select
                    value={
                      searchForm.lookingFor
                    }
                    onChange={(event) =>
                      updateSearch(
                        "lookingFor",
                        event.target
                          .value,
                      )
                    }
                  >
                    <option>
                      वधू
                    </option>

                    <option>
                      वर
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    वय
                  </span>

                  <select
                    value={
                      searchForm.age
                    }
                    onChange={(event) =>
                      updateSearch(
                        "age",
                        event.target
                          .value,
                      )
                    }
                  >
                    <option>
                      21 - 30
                    </option>

                    <option>
                      25 - 35
                    </option>

                    <option>
                      30 - 40
                    </option>

                    <option>
                      40+
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    समाज
                  </span>

                  <select
                    value={
                      searchForm.community
                    }
                    onChange={(event) =>
                      updateSearch(
                        "community",
                        event.target
                          .value,
                      )
                    }
                  >
                    <option>
                      सर्व समाज
                    </option>

                    <option>
                      मराठा
                    </option>

                    <option>
                      ब्राह्मण
                    </option>

                    <option>
                      कुणबी
                    </option>

                    <option>
                      इतर
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    शिक्षण
                  </span>

                  <select
                    value={
                      searchForm.education
                    }
                    onChange={(event) =>
                      updateSearch(
                        "education",
                        event.target
                          .value,
                      )
                    }
                  >
                    <option>
                      सर्व शिक्षण
                    </option>

                    <option>
                      पदवी
                    </option>

                    <option>
                      पदव्युत्तर
                    </option>

                    <option>
                      अभियांत्रिकी
                    </option>

                    <option>
                      वैद्यकीय
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    शहर
                  </span>

                  <select
                    value={
                      searchForm.city
                    }
                    onChange={(event) =>
                      updateSearch(
                        "city",
                        event.target
                          .value,
                      )
                    }
                  >
                    <option>
                      सर्व शहर
                    </option>

                    <option>
                      पुणे
                    </option>

                    <option>
                      मुंबई
                    </option>

                    <option>
                      नाशिक
                    </option>

                    <option>
                      नागपूर
                    </option>

                    <option>
                      कोल्हापूर
                    </option>

                    <option>
                      सोलापूर
                    </option>
                  </select>
                </label>

                <button
                  className="search-button"
                  type="button"
                  onClick={
                    handleSearch
                  }
                >
                  <span>⌕</span>
                  शोधा
                </button>
              </div>

              {searchMessage && (
                <div
                  className="search-message"
                  role="status"
                >
                  ✓ {searchMessage}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            SERVICES
            ================================================= */}

        <section
          className="section services-section"
          id="services"
        >
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">
                आम्ही काय देतो?
              </span>

              <h2>
                तुमच्या नात्याच्या प्रवासासाठी
              </h2>

              <p>
                योग्य व्यक्ती शोधण्यापासून
                सुरक्षित संवादापर्यंत, प्रत्येक
                पायरी विचारपूर्वक तयार केलेली.
              </p>
            </div>

            <div className="services-grid">
              {services.map(
                (service) => (
                  <article
                    className="service-card"
                    key={
                      service.title
                    }
                  >
                    <div className="service-icon">
                      {service.icon}
                    </div>

                    <h3>
                      {service.title}
                    </h3>

                    <p>
                      {
                        service.description
                      }
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        if (
                          service.title ===
                          "प्रीमियम सदस्यत्व"
                        ) {
                          if (
                            currentUser
                          ) {
                            openModal(
                              "membership",
                            );
                          } else {
                            openModal(
                              "register",
                            );
                          }

                          return;
                        }

                        document
                          .getElementById(
                            "search",
                          )
                          ?.scrollIntoView({
                            behavior:
                              "smooth",
                          });
                      }}
                    >
                      अधिक जाणून घ्या →
                    </button>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            TRUST
            ================================================= */}

        <section className="section trust-section">
          <div className="container trust-grid">
            <div>
              <span className="section-kicker">
                विश्वास प्रथम
              </span>

              <h2>
                तुमची माहिती, तुमचा निर्णय.
              </h2>

              <p>
                विवाहजोडीमध्ये प्रत्येक
                सदस्याला आपल्या प्रोफाइलची
                माहिती कोणाला आणि कधी
                दाखवायची यावर नियंत्रण
                ठेवण्याची सुविधा देण्याचा
                आमचा उद्देश आहे.
              </p>

              <div className="trust-points">
                <div>
                  <span>01</span>

                  <p>
                    ईमेल आणि प्रोफाइल
                    पडताळणी
                  </p>
                </div>

                <div>
                  <span>02</span>

                  <p>
                    फोटोसाठी गोपनीयता
                    नियंत्रण
                  </p>
                </div>

                <div>
                  <span>03</span>

                  <p>
                    प्रोफाइल रिपोर्ट आणि
                    ब्लॉक सुविधा
                  </p>
                </div>
              </div>
            </div>

            <div className="trust-panel">
              <div className="shield-icon">
                ✓
              </div>

              <span>
                VIVAHJODI SECURITY
              </span>

              <strong>
                सुरक्षित नात्यांची सुरुवात
              </strong>

              <p>
                विश्वास, गोपनीयता आणि
                जबाबदार वापर या तीन गोष्टी
                आमच्या प्लॅटफॉर्मच्या
                केंद्रस्थानी असतील.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            STORIES
            ================================================= */}

        <section
          className="section stories-section"
          id="stories"
        >
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">
                आमच्या यशोगाथा
              </span>

              <h2>
                काही सुंदर जोड्या
              </h2>

              <p>
                योग्य व्यक्ती भेटली की एक
                नवीन सुंदर अध्याय सुरू होतो.
              </p>
            </div>

            <div className="stories-grid">
              {stories.map(
                (story) => (
                  <article
                    className="story-card"
                    key={
                      story.names
                    }
                  >
                    <div className="story-photo">
                      {
                        story.initials
                      }
                    </div>

                    <div>
                      <strong>
                        {story.names}
                      </strong>

                      <span>
                        {
                          story.location
                        }
                      </span>
                    </div>

                    <span className="story-heart">
                      ♥
                    </span>
                  </article>
                ),
              )}
            </div>

            <div className="stats">
              <div>
                <strong>
                  25,000+
                </strong>

                <span>
                  सदस्य
                </span>
              </div>

              <div>
                <strong>
                  5,000+
                </strong>

                <span>
                  संभाव्य जोड्या
                </span>
              </div>

              <div>
                <strong>
                  100+
                </strong>

                <span>
                  शहरे
                </span>
              </div>

              <div>
                <strong>
                  100%
                </strong>

                <span>
                  मराठी अनुभव
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            CTA
            ================================================= */}

        <section className="cta-section">
          <div className="container cta-inner">
            <div>
              <span>
                तुमची कहाणी सुरू करण्याची वेळ
                आली आहे.
              </span>

              <h2>
                योग्य जोडीदाराच्या शोधाला
                आजच सुरुवात करा.
              </h2>
            </div>

            <button
              type="button"
              className="cta-button"
              onClick={() =>
                currentUser
                  ? openModal(
                      "membership",
                    )
                  : openModal(
                      "register",
                    )
              }
            >
              सदस्यत्व घ्या →
            </button>
          </div>
        </section>
          </>
        )}
      </main>

      {/* ===================================================
          FOOTER
          =================================================== */}

      <footer
        className="footer"
        id="contact"
      >
        <div className="container footer-grid">
          <div>
            <a
              className="brand footer-brand"
              href="#home"
            >
              <span className="brand-mark">
                वि
              </span>

              <span>
                <strong>
                  विवाहजोडी
                </strong>

                <small>
                  Marathi Matrimony
                </small>
              </span>
            </a>

            <p>
              महाराष्ट्रातील कुटुंबांसाठी
              सुरक्षित, विश्वासार्ह आणि
              मराठी-केंद्रित विवाह व्यासपीठ.
            </p>
          </div>

          <div>
            <h3>
              त्वरित दुवे
            </h3>

            <a href="#home">
              होम
            </a>

            <a href="#search">
              जोडीदार शोधा
            </a>

            <a href="#services">
              आमच्या सेवा
            </a>

            <a href="#stories">
              यशोगाथा
            </a>
          </div>

          <div>
            <h3>
              मदत
            </h3>

            <a href="#contact">
              संपर्क
            </a>

            <a href="#contact">
              गोपनीयता धोरण
            </a>

            <a href="#contact">
              अटी व शर्ती
            </a>

            <a href="#contact">
              सुरक्षितता
            </a>
          </div>

          <div>
            <h3>
              संपर्क
            </h3>

            <span>
              support@vivahjodi.example
            </span>

            <span>
              महाराष्ट्र, भारत
            </span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © 2026 VivahJodi. सर्व हक्क
            राखीव.
          </span>

          <span>
            Made with ♥ for Marathi families
          </span>
        </div>
      </footer>

      {/* ===================================================
          MODALS
          =================================================== */}

      {modal && (
        <div
          className="auth-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div
            className={
              modal ===
              "membership"
                ? "auth-modal membership-box"
                : "auth-modal"
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            <button
              className="auth-close"
              type="button"
              aria-label="बंद करा"
              onClick={
                closeModal
              }
            >
              ×
            </button>

            {/* =================================================
                LOGIN
                ================================================= */}

            {modal === "login" && (
              <>
                <div className="auth-header">
                  <span className="section-kicker">
                    विवाहजोडी
                  </span>

                  <h2 id="auth-modal-title">
                    लॉगिन करा
                  </h2>

                  <p>
                    आपल्या विवाहजोडी
                    खात्यात प्रवेश करा.
                  </p>
                </div>

                <form
                  className="auth-form"
                  onSubmit={
                    handleLogin
                  }
                >
                  <label>
                    <span>
                      ईमेल
                    </span>

                    <input
                      type="email"
                      value={
                        loginEmail
                      }
                      onChange={(
                        event,
                      ) =>
                        setLoginEmail(
                          event
                            .target
                            .value,
                        )
                      }
                      placeholder="example@email.com"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label>
                    <span>
                      पासवर्ड
                    </span>

                    <input
                      type="password"
                      value={
                        loginPassword
                      }
                      onChange={(
                        event,
                      ) =>
                        setLoginPassword(
                          event
                            .target
                            .value,
                        )
                      }
                      placeholder="आपला पासवर्ड"
                      autoComplete="current-password"
                      required
                    />
                  </label>

                  {authError && (
                    <div
                      className="auth-error"
                      role="alert"
                    >
                      {
                        authError
                      }
                    </div>
                  )}

                  {authMessage && (
                    <div
                      className="auth-success"
                      role="status"
                    >
                      ✓{" "}
                      {
                        authMessage
                      }
                    </div>
                  )}

                  <button
                    className="auth-submit"
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                  >
                    {isSubmitting
                      ? "लॉगिन होत आहे..."
                      : "लॉगिन करा"}
                  </button>
                </form>

                <div className="auth-switch">
                  खाते नाही?

                  <button
                    type="button"
                    onClick={() =>
                      switchModal(
                        "register",
                      )
                    }
                  >
                    नोंदणी करा
                  </button>
                </div>
              </>
            )}

            {/* =================================================
                REGISTER
                ================================================= */}

            {modal === "register" && (
              <>
                <div className="auth-header">
                  <span className="section-kicker">
                    विवाहजोडी
                  </span>

                  <h2 id="auth-modal-title">
                    नोंदणी करा
                  </h2>

                  <p>
                    विवाहजोडीमध्ये आपले
                    खाते तयार करा.
                  </p>
                </div>

                <form
                  className="auth-form"
                  onSubmit={
                    handleRegister
                  }
                >
                  <div className="auth-two-columns">
                    <label>
                      <span>
                        पहिले नाव
                      </span>

                      <input
                        type="text"
                        value={
                          registerFirstName
                        }
                        onChange={(
                          event,
                        ) =>
                          setRegisterFirstName(
                            event
                              .target
                              .value,
                          )
                        }
                        placeholder="पहिले नाव"
                        autoComplete="given-name"
                        required
                      />
                    </label>

                    <label>
                      <span>
                        आडनाव
                      </span>

                      <input
                        type="text"
                        value={
                          registerLastName
                        }
                        onChange={(
                          event,
                        ) =>
                          setRegisterLastName(
                            event
                              .target
                              .value,
                          )
                        }
                        placeholder="आडनाव"
                        autoComplete="family-name"
                        required
                      />
                    </label>
                  </div>

                  <label>
                    <span>
                      ईमेल
                    </span>

                    <input
                      type="email"
                      value={
                        registerEmail
                      }
                      onChange={(
                        event,
                      ) =>
                        setRegisterEmail(
                          event
                            .target
                            .value,
                        )
                      }
                      placeholder="example@email.com"
                      autoComplete="email"
                      required
                    />
                  </label>

                  <label>
                    <span>
                      मोबाईल क्रमांक
                    </span>

                    <input
                      type="tel"
                      value={
                        registerMobile
                      }
                      onChange={(
                        event,
                      ) =>
                        setRegisterMobile(
                          event
                            .target
                            .value,
                        )
                      }
                      placeholder="10 अंकी मोबाईल क्रमांक"
                      autoComplete="tel"
                      minLength={10}
                      maxLength={15}
                      required
                    />
                  </label>

                  <label>
                    <span>
                      पासवर्ड
                    </span>

                    <input
                      type="password"
                      value={
                        registerPassword
                      }
                      onChange={(
                        event,
                      ) =>
                        setRegisterPassword(
                          event
                            .target
                            .value,
                        )
                      }
                      placeholder="किमान 8 अक्षरे"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </label>

                  <div className="payment-notice">
                    <strong>
                      महत्त्वाची माहिती
                    </strong>

                    <span>
                      नोंदणी विनामूल्य नाही.
                      खाते तयार केल्यानंतर
                      सदस्यत्वाची पुढील पायरी
                      पूर्ण करावी लागेल.
                    </span>
                  </div>

                  {authError && (
                    <div
                      className="auth-error"
                      role="alert"
                    >
                      {
                        authError
                      }
                    </div>
                  )}

                  {authMessage && (
                    <div
                      className="auth-success"
                      role="status"
                    >
                      ✓{" "}
                      {
                        authMessage
                      }
                    </div>
                  )}

                  <button
                    className="auth-submit"
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                  >
                    {isSubmitting
                      ? "नोंदणी होत आहे..."
                      : "नोंदणी पूर्ण करा"}
                  </button>
                </form>

                <div className="auth-switch">
                  आधीपासून खाते आहे?

                  <button
                    type="button"
                    onClick={() =>
                      switchModal(
                        "login",
                      )
                    }
                  >
                    लॉगिन करा
                  </button>
                </div>
              </>
            )}

            {/* =================================================
                MEMBERSHIP
                ================================================= */}

            {modal === "membership" && (
              <>
                <div className="membership-box-header">
                  <span className="section-kicker">
                    विवाहजोडी
                  </span>

                  <h2 id="auth-modal-title">
                    सदस्यत्व घ्या
                  </h2>

                  <p>
                    तुमच्या योग्य
                    जोडीदाराच्या शोधाला
                    पुढची पायरी द्या.
                  </p>
                </div>

                <div className="membership-plan">
                  <h3>
                    मूलभूत सदस्यत्व
                  </h3>

                  <div className="membership-price">
                    <strong>
                      ₹499
                    </strong>

                    <span>
                      / महिना
                    </span>
                  </div>

                  <ul className="membership-features">
                    <li>
                      योग्य प्रोफाइल शोधण्याची
                      सुविधा
                    </li>

                    <li>
                      सुरक्षित वैवाहिक
                      व्यासपीठ
                    </li>

                    <li>
                      सत्यापित प्रोफाइल्स
                    </li>

                    <li>
                      सदस्यांसाठी प्रीमियम
                      सुविधा
                    </li>
                  </ul>

                  {membership && (
                    <div className="membership-current-status">
                      <strong>
                        सदस्यत्व स्थिती
                      </strong>

                      {membership.membershipStatus ===
                      "ACTIVE"
                        ? "सदस्यत्व सक्रिय आहे."
                        : membership.membershipStatus ===
                            "PENDING_PAYMENT"
                          ? "पेमेंट प्रलंबित आहे."
                          : membership.membershipStatus}
                    </div>
                  )}
                </div>

                {membershipError && (
                  <div
                    className="auth-error"
                    role="alert"
                  >
                    {
                      membershipError
                    }
                  </div>
                )}

                {authMessage && (
                  <div
                    className="auth-success"
                    role="status"
                  >
                    ✓{" "}
                    {
                      authMessage
                    }
                  </div>
                )}

                {membership?.membershipStatus !==
                  "ACTIVE" && (
                  <button
                    className="auth-submit"
                    type="button"
                    onClick={
                      handlePayment
                    }
                    disabled={
                      membershipLoading
                    }
                  >
                    {membershipLoading
                      ? "पेमेंट सुरू होत आहे..."
                      : "पेमेंटसाठी पुढे जा"}
                  </button>
                )}

                {membership?.membershipStatus ===
                  "ACTIVE" && (
                  <div className="membership-current-status">
                    <strong>
                      ✓ सदस्यत्व सक्रिय
                    </strong>

                    तुमचे ₹499 Basic
                    Membership सक्रिय झाले
                    आहे.
                  </div>
                )}

                <div className="membership-payment-note">
                  <strong>
                    सुरक्षित पेमेंट
                  </strong>

                  <span>
                    पेमेंट प्रक्रिया Razorpay
                    द्वारे सुरक्षितपणे पूर्ण
                    केली जाईल.
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;