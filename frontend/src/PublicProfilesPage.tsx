import { useEffect, useState } from "react";
import {
  getPublicProfilesByGender,
  type ProfileSearchResponse,
} from "./api/search";

type PublicProfilesPageProps = {
  gender: "FEMALE" | "MALE";
};

export default function PublicProfilesPage({
  gender,
}: PublicProfilesPageProps) {
  const [profiles, setProfiles] = useState<
    ProfileSearchResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isBridePage = gender === "FEMALE";

  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      try {
        setLoading(true);
        setError("");

        const result =
          await getPublicProfilesByGender(gender);

        if (!cancelled) {
          setProfiles(result);
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

    loadProfiles();

    return () => {
      cancelled = true;
    };
  }, [gender]);

  return (
    <main className="public-profiles-page">
      <section className="public-profiles-container">
        <div className="public-profiles-header">
          <div>
            <span className="section-kicker">
              विवाहजोडी
            </span>

            <h1>
              {isBridePage
                ? "वधू प्रोफाइल"
                : "वर प्रोफाइल"}
            </h1>
{/*
            <p>
              {isBridePage
                ? "अलीकडे लॉगिन केलेल्या वधूंची प्रोफाइल येथे पहा."
                : "अलीकडे लॉगिन केलेल्या वरांची प्रोफाइल येथे पहा."}
            </p> */}
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← मुख्यपृष्ठावर जा
          </button>
        </div>

        {loading && (
          <div className="profile-view-state">
            प्रोफाइल लोड होत आहेत...
          </div>
        )}

        {!loading && error && (
          <div className="profile-view-state profile-view-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          profiles.length === 0 && (
            <div className="profile-view-state">
              {isBridePage
                ? "सध्या कोणतीही वधू प्रोफाइल उपलब्ध नाही."
                : "सध्या कोणतीही वर प्रोफाइल उपलब्ध नाही."}
            </div>
          )}

        {!loading &&
          !error &&
          profiles.length > 0 && (
            <div className="public-profiles-results">
              {profiles.map((profile) => (
                <article
                  className="search-result-card"
                  key={profile.id}
                >
                  <div className="search-result-photo-column">
                    {profile.photoUrl && (
                      <img
                        src={profile.photoUrl}
                        alt={`${profile.firstName} profile`}
                        className="search-result-photo"
                      />
                    )}

                    <button
                      type="button"
                      className="search-result-view-button"
                      onClick={() => {
                        window.location.href =
                          `/profile/${profile.id}`;
                      }}
                    >
                      View Details
                    </button>
                  </div>

                  <div className="search-result-content">
                    <h3>
                      {[
                        profile.firstName,
                        profile.middleName,
                        profile.lastName,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    </h3>

                    <div className="search-result-info-grid">
                      <p>
                        <strong>ID</strong>
                        <span>
                          {profile.profileCode ||
                            profile.id}
                        </span>
                      </p>

                      <p>
                        <strong>नाव</strong>
                        <span>
                          {[
                            profile.firstName,
                            profile.middleName,
                            profile.lastName,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        </span>
                      </p>

                      <p>
                        <strong>लिंग</strong>
                        <span>
                          {profile.gender || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>विवाह स्थिती</strong>
                        <span>
                          {profile.maritalStatus ||
                            "—"}
                        </span>
                      </p>

                      <p>
                        <strong>धर्म</strong>
                        <span>
                          {profile.religion || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>समाज</strong>
                        <span>
                          {profile.caste || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>पोटजात</strong>
                        <span>
                          {profile.subCaste || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>वय</strong>
                        <span>
                          {profile.age
                            ? `${profile.age} वर्षे`
                            : "—"}
                        </span>
                      </p>

                      <p>
                        <strong>उंची</strong>
                        <span>
                          {profile.heightCm
                            ? `${profile.heightCm} सेमी`
                            : "—"}
                        </span>
                      </p>

                      <p>
                        <strong>शिक्षण</strong>
                        <span>
                          {profile.education || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>व्यवसाय</strong>
                        <span>
                          {profile.occupation || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>वार्षिक उत्पन्न</strong>
                        <span>
                          {profile.annualIncome !==
                            null &&
                          profile.annualIncome !==
                            undefined
                            ? `₹ ${profile.annualIncome}`
                            : "—"}
                        </span>
                      </p>

                      <p>
                        <strong>
                          सध्याचे ठिकाण
                        </strong>

                        <span>
                          {[
                            profile.currentCity ||
                              profile.city,
                            profile.currentDistrict,
                            profile.currentState ||
                              profile.state,
                          ]
                            .filter(Boolean)
                            .join(", ") || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>मूळ ठिकाण</strong>

                        <span>
                          {[
                            profile.nativeCity,
                            profile.nativeDistrict,
                            profile.nativeState,
                          ]
                            .filter(Boolean)
                            .join(", ") || "—"}
                        </span>
                      </p>

                      <p>
                        <strong>
                          शेवटचे लॉगिन
                        </strong>

                        <span>
                          {profile.lastLogin
                            ? `${new Date(
                                profile.lastLogin,
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                },
                              )} | ${new Date(
                                profile.lastLogin,
                              ).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                                },
                              )}`
                            : "—"}
                        </span>
                      </p>

                      <p className="search-result-about-field">
                        <strong>माझ्याबद्दल</strong>

                        <span>
                          {profile.aboutMe ||
                            "माहिती उपलब्ध नाही"}
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>
    </main>
  );
}