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
  heightCm: string;
  weightKg: string;
  religion: string;
  caste: string;
  subCaste: string;
  motherTongue: string;
  aboutMe: string;
};

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
    useState<ProfileForm>({
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      maritalStatus: "NEVER_MARRIED",
      heightCm: "",
      weightKg: "",
      religion: "",
      caste: "",
      subCaste: "",
      motherTongue: "मराठी",
      aboutMe: "",
    });

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
  ): ProfileForm => ({
    firstName: data.firstName || "",
    middleName: data.middleName || "",
    lastName: data.lastName || "",
    gender: data.gender || "",
    dateOfBirth: data.dateOfBirth || "",
    maritalStatus:
      data.maritalStatus || "NEVER_MARRIED",
    heightCm:
      data.heightCm !== null && data.heightCm !== undefined
        ? String(data.heightCm)
        : "",
    weightKg:
      data.weightKg !== null && data.weightKg !== undefined
        ? String(data.weightKg)
        : "",
    religion: data.religion || "",
    caste: data.caste || "",
    subCaste: data.subCaste || "",
    motherTongue: data.motherTongue || "मराठी",
    aboutMe: data.aboutMe || "",
  });

  const loadProfile = async (
    token: string,
    openEditor = false,
  ) => {
    setProfileLoading(true);
    setProfileError("");

    try {
      const data = await getMyProfile(token);

      setProfile(data);

      if (data) {
        setProfileForm(profileToForm(data));
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
      heightCm: profileForm.heightCm
        ? Number(profileForm.heightCm)
        : undefined,
      weightKg: profileForm.weightKg
        ? Number(profileForm.weightKg)
        : undefined,
      religion:
        profileForm.religion.trim() || undefined,
      caste:
        profileForm.caste.trim() || undefined,
      subCaste:
        profileForm.subCaste.trim() || undefined,
      motherTongue:
        profileForm.motherTongue.trim() || undefined,
      aboutMe:
        profileForm.aboutMe.trim() || undefined,
    };

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.gender ||
      !payload.dateOfBirth
    ) {
      setProfileError(
        "कृपया सर्व आवश्यक माहिती भरा.",
      );
      setProfileSaving(false);
      return;
    }

    if (
      payload.heightCm !== undefined &&
      (!Number.isFinite(payload.heightCm) ||
        payload.heightCm <= 0)
    ) {
      setProfileError(
        "उंची शून्यापेक्षा जास्त असावी.",
      );
      setProfileSaving(false);
      return;
    }

    if (
      payload.weightKg !== undefined &&
      (!Number.isFinite(payload.weightKg) ||
        payload.weightKg <= 0)
    ) {
      setProfileError(
        "वजन शून्यापेक्षा जास्त असावे.",
      );
      setProfileSaving(false);
      return;
    }

    try {
      const savedProfile = profile
        ? await updateMyProfile(token, payload)
        : await createProfile(token, payload);

      setProfile(savedProfile);
      setProfileForm(profileToForm(savedProfile));

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
      }, 800);      
     
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

    const data = await loadProfile(token, true);

    if (data) {
      setProfileForm(profileToForm(data));
    }
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
                    तुमची माहिती पूर्ण करा. तुम्ही
                    पडताळणी सुरू असतानाही तुमचे प्रोफाइल
                    कधीही अपडेट करू शकता.
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
                  {/* =================================================
                      PROFILE STATUS
                      ================================================= */}

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
                        : "तुमचे प्रोफाइल प्रशासनाच्या पडताळणीसाठी तयार आहे. तुम्ही माहिती अपडेट करू शकता."}
                    </p>
                  </div>

                  {/* =================================================
                      PROGRESS HEADER
                      ================================================= */}

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
                        काही सोप्या टप्प्यांमध्ये तुमचे प्रोफाइल
                        पूर्ण करा.
                      </p>
                    </div>

                    <div className="profile-wizard-count">
                      <strong>{profileStep}</strong>
                      <span>/ 4</span>
                    </div>
                  </div>

                  {/* =================================================
                      STEP PROGRESS
                      ================================================= */}

                  <div
                    className="profile-stepper"
                    aria-label="प्रोफाइल प्रगती"
                  >
                    <div
                      className={`profile-step-item ${
                        profileStep >= 1 ? "active" : ""
                      } ${profileStep > 1 ? "completed" : ""}`}
                    >
                      <div className="profile-step-circle">
                        {profileStep > 1 ? "✓" : "01"}
                      </div>

                      <span>मूलभूत</span>
                    </div>

                    <div
                      className={`profile-step-line ${
                        profileStep > 1 ? "active" : ""
                      }`}
                    />

                    <div
                      className={`profile-step-item ${
                        profileStep >= 2 ? "active" : ""
                      } ${profileStep > 2 ? "completed" : ""}`}
                    >
                      <div className="profile-step-circle">
                        {profileStep > 2 ? "✓" : "02"}
                      </div>

                      <span>व्यक्तिमत्व</span>
                    </div>

                    <div
                      className={`profile-step-line ${
                        profileStep > 2 ? "active" : ""
                      }`}
                    />

                    <div
                      className={`profile-step-item ${
                        profileStep >= 3 ? "active" : ""
                      } ${profileStep > 3 ? "completed" : ""}`}
                    >
                      <div className="profile-step-circle">
                        {profileStep > 3 ? "✓" : "03"}
                      </div>

                      <span>कुटुंब</span>
                    </div>

                    <div
                      className={`profile-step-line ${
                        profileStep > 3 ? "active" : ""
                      }`}
                    />

                    <div
                      className={`profile-step-item ${
                        profileStep >= 4 ? "active" : ""
                      }`}
                    >
                      <div className="profile-step-circle">
                        04
                      </div>

                      <span>माझ्याबद्दल</span>
                    </div>
                  </div>

                  {/* =================================================
                      STEP 1 — BASIC INFORMATION
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
                          पुढे जा
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 2 — PERSONALITY / PHYSICAL
                      ================================================= */}

                  {profileStep === 2 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">
                              02
                            </span>

                            <h2>व्यक्तिमत्व व शारीरिक माहिती</h2>
                          </div>
                        </div>

                        <div className="profile-form-grid">
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
                        </div>

                        <div className="profile-step-tip">
                          <span>✦</span>

                          <div>
                            <strong>
                              तुमच्याबद्दल योग्य माहिती द्या
                            </strong>

                            <p>
                              योग्य माहितीमुळे इतर सदस्यांना
                              तुमचे प्रोफाइल अधिक चांगल्या प्रकारे
                              समजण्यास मदत होते.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="profile-wizard-actions">
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => {
                            setProfileError("");
                            setProfileStep(1);
                          }}
                        >
                          ← मागे
                        </button>

                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => {
                            setProfileError("");
                            setProfileStep(3);

                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          पुढे जा
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 3 — FAMILY & CULTURAL
                      ================================================= */}

                  {profileStep === 3 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">
                              03
                            </span>

                            <h2>कुटुंब व सांस्कृतिक माहिती</h2>
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
                          onClick={() => {
                            setProfileError("");
                            setProfileStep(2);
                          }}
                        >
                          ← मागे
                        </button>

                        <button
                          type="button"
                          className="auth-submit profile-next-button"
                          onClick={() => {
                            setProfileError("");
                            setProfileStep(4);

                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          पुढे जा
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================
                      STEP 4 — ABOUT ME
                      ================================================= */}

                  {profileStep === 4 && (
                    <div className="profile-wizard-panel">
                      <div className="profile-form-section profile-wizard-section">
                        <div className="profile-form-section-heading">
                          <div>
                            <span className="profile-section-number">
                              04
                            </span>

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
                            placeholder="तुमचे शिक्षण, स्वभाव, आवडी, कुटुंब किंवा जोडीदाराबद्दलच्या अपेक्षा याबद्दल लिहा."
                            rows={7}
                            maxLength={2000}
                          />

                          <small>
                            {profileForm.aboutMe.length}/2000
                          </small>
                        </label>

                        <div className="profile-final-note">
                          <div className="profile-final-icon">
                            ✦
                          </div>

                          <div>
                            <strong>
                              तुमचे प्रोफाइल जवळपास तयार आहे!
                            </strong>

                            <p>
                              माहिती तपासा आणि प्रोफाइल जतन करा.
                              तुम्ही नंतरही तुमची माहिती अपडेट करू
                              शकता.
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
                          onClick={() => {
                            setProfileError("");
                            setProfileStep(3);
                          }}
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