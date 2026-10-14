import { useEffect, useState } from "react";

import {
  getProfileView,
  getPublicProfileView,
} from "./api/profile";

type ProfileViewPageProps = {
  profileId: string;
  token?: string;
  canViewCompleteDetails?: boolean;
};

export default function ProfileViewPage({
  profileId,
  token,
  canViewCompleteDetails = false,
}: ProfileViewPageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<
    Awaited<ReturnType<typeof getProfileView>> | null
  >(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

      const result = token
        ? await getProfileView(
            token,
            profileId,
          )
        : await getPublicProfileView(
            profileId,
          );

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "प्रोफाइल लोड करता आली नाही.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [profileId, token]);

  if (loading) {
    return (
      <main className="profile-view-page">
        <div className="profile-view-state">
          प्रोफाइल लोड होत आहे...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="profile-view-page">
        <div className="profile-view-state profile-view-error">
          {error}
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="profile-view-page">
        <div className="profile-view-state">
          प्रोफाइल उपलब्ध नाही.
        </div>
      </main>
    );
  }

  const profile = data.profile;


  const calculateAge = (
  dateOfBirth: string | null | undefined,
) => {
  if (!dateOfBirth) {
    return null;
  }

  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const age = calculateAge(profile.dateOfBirth);







  return (
    <main className="profile-view-page">
      <section className="profile-view-container">

        {/* =====================================================
            PROFILE HEADER
            ===================================================== */}

        <div className="profile-view-header">

          <div className="profile-view-header-info">
            <p className="profile-view-id">
              प्रोफाइल ID: {profile.profileCode}
            </p>

            <h1>
              {profile.firstName}{" "}
              {profile.middleName
                ? `${profile.middleName} `
                : ""}
              {profile.lastName}
            </h1>

            <p className="profile-view-summary">
              {age ?? "—"} वर्षे
              {profile.heightCm
                ? ` • ${profile.heightCm} सेमी`
                : ""}
            </p>

            <p className="profile-view-summary">
              {profile.education?.qualification ||
                "शिक्षण उपलब्ध नाही"}

              {profile.education?.specialization
                ? ` • ${profile.education.specialization}`
                : ""}
            </p>

            <p className="profile-view-summary">
              {profile.occupation?.occupation ||
                "व्यवसाय उपलब्ध नाही"}

              {profile.occupation?.designation
                ? ` • ${profile.occupation.designation}`
                : ""}
            </p>

            <p className="profile-view-summary">
              {profile.caste || ""}

              {profile.subCaste
                ? ` • ${profile.subCaste}`
                : ""}
            </p>

            <p className="profile-view-summary">
              {profile.currentCity ||
                profile.city ||
                "स्थान उपलब्ध नाही"}
            </p>
          </div>

{data.photos.length > 0 && (
  <div className="profile-view-main-photo">
    <img
      src={
        data.photos.find(
          (photo) => photo.primary,
        )?.photoUrl ||
        data.photos[0]?.photoUrl ||
        ""
      }
      alt={
        profile.firstName ||
        "Profile photo"
      }
    />

    {!canViewCompleteDetails && (
      <button
        type="button"
        className="public-profile-login-button"
        onClick={() => {
          localStorage.setItem(
            "vivahjodi_open_login",
            "true",
          );

          window.location.href = "/";
        }}
      >
        Login to View Complete Details
      </button>
    )}
  </div>
)}
        </div>


        {/* =====================================================
            BASIC INFORMATION
            ===================================================== */}

        <section className="profile-view-section">
          <h2>मूलभूत माहिती</h2>

          <div className="profile-view-grid">

            <div className="profile-view-field">
              <span>लिंग</span>
              <strong>
                {profile.gender || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>जन्मतारीख</span>
              <strong>
                {profile.dateOfBirth || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>वय</span>
              <strong>
                {age ?? "—"} वर्षे
              </strong>
            </div>

            <div className="profile-view-field">
              <span>जन्मस्थळ</span>
              <strong>
                {profile.birthPlace || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>उंची</span>
              <strong>
                {profile.heightCm
                  ? `${profile.heightCm} सेमी`
                  : "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>वजन</span>
              <strong>
                {profile.weightKg
                  ? `${profile.weightKg} किलो`
                  : "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>रक्तगट</span>
              <strong>
                {profile.bloodGroup || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>शरीरयष्टी</span>
              <strong>
                {profile.bodyType || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>वर्ण</span>
              <strong>
                {profile.complexion || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>वैवाहिक स्थिती</span>
              <strong>
                {profile.maritalStatus || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>मातृभाषा</span>
              <strong>
                {profile.motherTongue || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>अपत्ये</span>
              <strong>
                {profile.numberOfChildren ?? 0}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>आहार</span>
              <strong>
                {profile.eatingHabits || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>धूम्रपान</span>
              <strong>
                {profile.smokingHabits || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>मद्यपान</span>
              <strong>
                {profile.drinkingHabits || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>शारीरिक अपंगत्व</span>
              <strong>
                {profile.physicalDisability
                  ? "होय"
                  : "नाही"}
              </strong>
            </div>

            {profile.physicalDisability &&
              profile.disabilityDetails && (
                <div className="profile-view-field profile-view-field-wide">
                  <span>अपंगत्वाचा तपशील</span>
                  <strong>
                    {profile.disabilityDetails}
                  </strong>
                </div>
              )}

          </div>
        </section>


        {/* =====================================================
            RELIGIOUS INFORMATION
            ===================================================== */}

        <section className="profile-view-section">
          <h2>धर्म आणि समाज</h2>

          <div className="profile-view-grid">

            <div className="profile-view-field">
              <span>धर्म</span>
              <strong>
                {profile.religion || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>जात</span>
              <strong>
                {profile.caste || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>पोटजात</span>
              <strong>
                {profile.subCaste || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>गोत्र</span>
              <strong>
                {profile.gotra || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>राशी</span>
              <strong>
                {profile.zodiacSign || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>नक्षत्र</span>
              <strong>
                {profile.nakshatra || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>मंगळ</span>
              <strong>
                {profile.manglikStatus || "—"}
              </strong>
            </div>

          </div>
        </section>


        {/* =====================================================
            FAMILY INFORMATION
            ===================================================== */}

        {profile.family && (
          <section className="profile-view-section">
            <h2>कौटुंबिक माहिती</h2>

            <div className="profile-view-grid">

              <div className="profile-view-field">
                <span>वडिलांचे नाव</span>
                <strong>
                  {profile.family.fatherName || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>वडिलांचा व्यवसाय</span>
                <strong>
                  {profile.family.fatherOccupation || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>आईचे नाव</span>
                <strong>
                  {profile.family.motherName || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>आईचा व्यवसाय</span>
                <strong>
                  {profile.family.motherOccupation || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>कुटुंबाचा प्रकार</span>
                <strong>
                  {profile.family.familyType || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>कौटुंबिक स्थिती</span>
                <strong>
                  {profile.family.familyStatus || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>कौटुंबिक मूल्ये</span>
                <strong>
                  {profile.family.familyValues || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>एकूण भावंडे</span>
                <strong>
                  {profile.family.siblingsCount ?? "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>भाऊ</span>
                <strong>
                  {profile.family.numberOfBrothers ??
                    profile.family.brothersCount ??
                    0}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>विवाहित भाऊ</span>
                <strong>
                  {profile.family.brothersMarried ?? 0}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>बहिणी</span>
                <strong>
                  {profile.family.numberOfSisters ??
                    profile.family.sistersCount ??
                    0}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>विवाहित बहिणी</span>
                <strong>
                  {profile.family.sistersMarried ?? 0}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>मूळ गाव</span>
                <strong>
                  {profile.family.nativePlace || "—"}
                </strong>
              </div>

              <div className="profile-view-field profile-view-field-wide">
                <span>पालकांची माहिती</span>
                <strong>
                  {profile.family.parentalDetails || "—"}
                </strong>
              </div>

              <div className="profile-view-field profile-view-field-wide">
                <span>कुटुंबाविषयी</span>
                <strong>
                  {profile.family.familyAbout || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>संपर्क</span>
                <strong>
                  {profile.family.familyContact || "—"}
                </strong>
              </div>


            </div>
          </section>
        )}


        {/* =====================================================
            PROFESSIONAL INFORMATION
            ===================================================== */}

        {profile.education && (
          <section className="profile-view-section">
            <h2>शिक्षण</h2>

            <div className="profile-view-grid">

              <div className="profile-view-field">
                <span>शिक्षण स्तर</span>
                <strong>
                  {profile.education.educationLevel || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>शिक्षण शाखा</span>
                <strong>
                  {profile.education.educationStream || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>पात्रता</span>
                <strong>
                  {profile.education.qualification || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>विशेषीकरण</span>
                <strong>
                  {profile.education.specialization || "—"}
                </strong>
              </div>

              <div className="profile-view-field profile-view-field-wide">
                <span>महाविद्यालय / संस्था</span>
                <strong>
                  {profile.education.instituteName || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>उत्तीर्ण वर्ष</span>
                <strong>
                  {profile.education.passingYear ?? "—"}
                </strong>
              </div>

            </div>
          </section>
        )}


        {profile.occupation && (
          <section className="profile-view-section">
            <h2>व्यावसायिक माहिती</h2>

            <div className="profile-view-grid">

              <div className="profile-view-field">
                <span>व्यवसाय</span>
                <strong>
                  {profile.occupation.occupation || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>पद</span>
                <strong>
                  {profile.occupation.designation || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>कंपनी / संस्था</span>
                <strong>
                  {profile.occupation.companyName || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>नोकरीचा प्रकार</span>
                <strong>
                  {profile.occupation.employmentType || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>कार्यरत क्षेत्र</span>
                <strong>
                  {profile.occupation.employedIn || "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>कामाचे ठिकाण</span>
                <strong>
                  {profile.occupation.workLocation ||
                    profile.occupation.workCity ||
                    "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>वार्षिक उत्पन्न</span>
                <strong>
                  {profile.occupation.annualIncome
                    ? `₹ ${profile.occupation.annualIncome}`
                    : profile.occupation.annualIncomeInr
                      ? `₹ ${profile.occupation.annualIncomeInr}`
                      : "—"}
                </strong>
              </div>

              <div className="profile-view-field">
                <span>उत्पन्न चलन</span>
                <strong>
                  {profile.occupation.incomeCurrency || "—"}
                </strong>
              </div>

              {profile.occupation.businessDetails && (
                <div className="profile-view-field profile-view-field-wide">
                  <span>व्यवसायाची माहिती</span>
                  <strong>
                    {profile.occupation.businessDetails}
                  </strong>
                </div>
              )}

            </div>
          </section>
        )}


        {/* =====================================================
            CURRENT LOCATION
            ===================================================== */}

        <section className="profile-view-section">
          <h2>सध्याचे ठिकाण</h2>

          <div className="profile-view-grid">

            <div className="profile-view-field">
              <span>देश</span>
              <strong>
                {profile.currentCountry || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>राज्य</span>
              <strong>
                {profile.currentState || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>जिल्हा</span>
              <strong>
                {profile.currentDistrict || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>तालुका</span>
              <strong>
                {profile.currentTaluka || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>शहर</span>
              <strong>
                {profile.currentCity || "—"}
              </strong>
            </div>

            <div className="profile-view-field profile-view-field-wide">
              <span>सध्याचा पत्ता</span>
              <strong>
                {profile.currentAddress || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>पिन कोड</span>
              <strong>
                {profile.currentPincode || "—"}
              </strong>
            </div>

          </div>
        </section>


        {/* =====================================================
            NATIVE PLACE
            ===================================================== */}

        <section className="profile-view-section">
          <h2>मूळ गाव</h2>

          <div className="profile-view-grid">

            <div className="profile-view-field">
              <span>देश</span>
              <strong>
                {profile.nativeCountry || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>राज्य</span>
              <strong>
                {profile.nativeState || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>जिल्हा</span>
              <strong>
                {profile.nativeDistrict || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>तालुका</span>
              <strong>
                {profile.nativeTaluka || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>शहर</span>
              <strong>
                {profile.nativeCity || "—"}
              </strong>
            </div>

            <div className="profile-view-field profile-view-field-wide">
              <span>मूळ ठिकाण</span>
              <strong>
                {profile.nativePlace || "—"}
              </strong>
            </div>

          </div>
        </section>


        {/* =====================================================
            NRI INFORMATION
            ===================================================== */}

        {profile.nri && (
          <section className="profile-view-section">
            <h2>NRI माहिती</h2>

            <div className="profile-view-grid">

              <div className="profile-view-field">
                <span>सध्या राहण्याचा देश</span>
                <strong>
                  {profile.livingCountry || "—"}
                </strong>
              </div>

              <div className="profile-view-field profile-view-field-wide">
                <span>NRI पत्ता</span>
                <strong>
                  {profile.nriAddress || "—"}
                </strong>
              </div>

            </div>
          </section>
        )}


        {/* =====================================================
            ABOUT MYSELF
            ===================================================== */}

        {profile.aboutMe && (
          <section className="profile-view-section">
            <h2>माझ्याबद्दल</h2>

            <div className="profile-view-about">
              {profile.aboutMe}
            </div>
          </section>
        )}


        {/* =====================================================
            PARTNER PREFERENCES
            ===================================================== */}

        <section className="profile-view-section">
          <h2>जोडीदाराच्या अपेक्षा</h2>

          <div className="profile-view-grid">

            <div className="profile-view-field">
              <span>वय</span>
              <strong>
                {profile.partnerMinAge ?? "—"}
                {" - "}
                {profile.partnerMaxAge ?? "—"} वर्षे
              </strong>
            </div>

            <div className="profile-view-field">
              <span>उंची</span>
              <strong>
                {profile.partnerMinHeightCm ?? "—"}
                {" - "}
                {profile.partnerMaxHeightCm ?? "—"} सेमी
              </strong>
            </div>

            <div className="profile-view-field">
              <span>मातृभाषा</span>
              <strong>
                {profile.partnerMotherTongue || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>वैवाहिक स्थिती</span>
              <strong>
                {profile.partnerMaritalStatus || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>धर्म</span>
              <strong>
                {profile.partnerReligion || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>जात</span>
              <strong>
                {profile.partnerCaste || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>पोटजात</span>
              <strong>
                {profile.partnerSubCaste || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>मंगळ</span>
              <strong>
                {profile.partnerManglikStatus || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>नक्षत्र</span>
              <strong>
                {profile.partnerNakshatra || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>राशी</span>
              <strong>
                {profile.partnerZodiacSign || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>शिक्षण</span>
              <strong>
                {profile.partnerEducation || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>व्यवसाय</span>
              <strong>
                {profile.partnerOccupation || "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>किमान उत्पन्न</span>
              <strong>
                {profile.partnerMinIncome != null
                  ? `₹ ${profile.partnerMinIncome}`
                  : "—"}
              </strong>
            </div>

            <div className="profile-view-field">
              <span>कमाल उत्पन्न</span>
              <strong>
                {profile.partnerMaxIncome != null
                  ? `₹ ${profile.partnerMaxIncome}`
                  : "—"}
              </strong>
            </div>

            {profile.partnerAbout && (
              <div className="profile-view-field profile-view-field-wide">
                <span>जोडीदाराबद्दल अपेक्षा</span>
                <strong>
                  {profile.partnerAbout}
                </strong>
              </div>
            )}

          </div>
        </section>


        {/* =====================================================
            ADDITIONAL PHOTOS
            ===================================================== */}

        {data.photos.length > 1 && (
          <section className="profile-view-section">
            <h2>फोटो</h2>

            <div className="profile-view-photos">
              {data.photos.map((photo) => (
                <img
                  key={photo.id}
                  src={photo.photoUrl || ""}
                  alt={
                    photo.originalFileName ||
                    profile.firstName
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            BACK TO HOME
            ===================================================== */}

        <div className="profile-view-bottom-action">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← मुख्यपृष्ठावर जा
          </button>
        </div>
      </section>
    </main>
  );
}