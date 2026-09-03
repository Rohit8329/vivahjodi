import { useState } from "react";
import "./App.css";

type SearchForm = {
  lookingFor: string;
  age: string;
  community: string;
  education: string;
  city: string;
};

const services = [
  {
    icon: "⌕",
    title: "प्रोफाइल शोध",
    description: "तुमच्या अपेक्षांनुसार योग्य प्रोफाइल्स सहज शोधा.",
  },
  {
    icon: "✓",
    title: "सुरक्षित व्यासपीठ",
    description: "प्रोफाइल पडताळणी आणि गोपनीयतेला आमचे प्राधान्य.",
  },
  {
    icon: "♡",
    title: "योग्य जुळणी",
    description: "तुमच्या पसंतीनुसार संभाव्य जोडीदार शोधा.",
  },
  {
    icon: "♔",
    title: "प्रीमियम सदस्यत्व",
    description: "अधिक सुविधा आणि संपर्काच्या संधी मिळवा.",
  },
];

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

function App() {
  const [searchForm, setSearchForm] = useState<SearchForm>({
    lookingFor: "वधू",
    age: "21 - 30",
    community: "सर्व समाज",
    education: "सर्व शिक्षण",
    city: "सर्व शहर",
  });

  const [searchMessage, setSearchMessage] = useState("");

  const updateSearch = (field: keyof SearchForm, value: string) => {
    setSearchForm((current) => ({
      ...current,
      [field]: value,
    }));
    setSearchMessage("");
  };

  const handleSearch = () => {
    setSearchMessage(
      `शोध तयार आहे — ${searchForm.lookingFor}, ${searchForm.age}, ${searchForm.city}`
    );
  };

  return (
    <div className="app">
      <div className="top-strip">
        <div className="container top-strip-inner">
          <span>महाराष्ट्रातील मराठी विवाह व्यासपीठ</span>
          <span className="top-strip-right">
            सुरक्षितता • गोपनीयता • विश्वास
          </span>
        </div>
      </div>

      <header className="navbar">
        <div className="container navbar-inner">
          <a className="brand" href="#home" aria-label="विवाहजोडी मुख्यपृष्ठ">
            <span className="brand-mark">वि</span>
            <span>
              <strong>विवाहजोडी</strong>
              <small>Marathi Matrimony</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="मुख्य नेव्हिगेशन">
            <a href="#home">होम</a>
            <a href="#search">जोडीदार शोधा</a>
            <a href="#services">आमच्या सेवा</a>
            <a href="#stories">यशोगाथा</a>
            <a href="#contact">संपर्क</a>
          </nav>

          <div className="navbar-actions">
            <button className="login-button" type="button">
              लॉगिन
            </button>
            <button className="register-button" type="button">
              नोंदणी करा
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">♡ विश्वासाने नाते जोडूया</span>

              <h1>
                तुमच्या आयुष्याचा
                <span> योग्य जोडीदार</span>
                शोधण्याची सुरुवात
              </h1>

              <p className="hero-description">
                महाराष्ट्रातील मराठी कुटुंबांसाठी तयार केलेले सुरक्षित,
                विश्वासार्ह आणि आधुनिक विवाह व्यासपीठ.
              </p>

              <div className="hero-actions">
                <a href="#search" className="primary-button">
                  जोडीदार शोधा
                  <span>→</span>
                </a>

                <button className="secondary-button" type="button">
                  सदस्यत्व घ्या
                </button>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <span>✓</span>
                  <div>
                    <strong>गोपनीयता</strong>
                    <small>तुमची माहिती सुरक्षित</small>
                  </div>
                </div>

                <div className="trust-item">
                  <span>✓</span>
                  <div>
                    <strong>पडताळणी</strong>
                    <small>विश्वासार्ह प्रोफाइल्स</small>
                  </div>
                </div>
              </div>
            </div>

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

                  <div className="heart">♥</div>
                </div>

                <div className="hero-visual-caption">
                  <span>तुमची सुंदर कहाणी</span>
                  <strong>इथून सुरू होऊ शकते</strong>
                </div>
              </div>

              <div className="floating-badge badge-one">
                <span>✓</span>
                <div>
                  <strong>Verified</strong>
                  <small>सुरक्षित प्रोफाइल</small>
                </div>
              </div>

              <div className="floating-badge badge-two">
                <span>♡</span>
                <div>
                  <strong>25,000+</strong>
                  <small>संभाव्य सदस्य</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="search-section" id="search">
          <div className="container">
            <div className="search-card">
              <div className="search-heading">
                <span className="search-icon">⌕</span>
                <div>
                  <span>जलद शोध</span>
                  <h2>तुमचा जोडीदार शोधा</h2>
                </div>
              </div>

              <div className="search-fields">
                <label>
                  <span>शोधत आहात</span>
                  <select
                    value={searchForm.lookingFor}
                    onChange={(event) =>
                      updateSearch("lookingFor", event.target.value)
                    }
                  >
                    <option>वधू</option>
                    <option>वर</option>
                  </select>
                </label>

                <label>
                  <span>वय</span>
                  <select
                    value={searchForm.age}
                    onChange={(event) =>
                      updateSearch("age", event.target.value)
                    }
                  >
                    <option>21 - 30</option>
                    <option>25 - 35</option>
                    <option>30 - 40</option>
                    <option>40+</option>
                  </select>
                </label>

                <label>
                  <span>समाज</span>
                  <select
                    value={searchForm.community}
                    onChange={(event) =>
                      updateSearch("community", event.target.value)
                    }
                  >
                    <option>सर्व समाज</option>
                    <option>मराठा</option>
                    <option>ब्राह्मण</option>
                    <option>कुणबी</option>
                    <option>इतर</option>
                  </select>
                </label>

                <label>
                  <span>शिक्षण</span>
                  <select
                    value={searchForm.education}
                    onChange={(event) =>
                      updateSearch("education", event.target.value)
                    }
                  >
                    <option>सर्व शिक्षण</option>
                    <option>पदवी</option>
                    <option>पदव्युत्तर</option>
                    <option>अभियांत्रिकी</option>
                    <option>वैद्यकीय</option>
                  </select>
                </label>

                <label>
                  <span>शहर</span>
                  <select
                    value={searchForm.city}
                    onChange={(event) =>
                      updateSearch("city", event.target.value)
                    }
                  >
                    <option>सर्व शहर</option>
                    <option>पुणे</option>
                    <option>मुंबई</option>
                    <option>नाशिक</option>
                    <option>नागपूर</option>
                    <option>कोल्हापूर</option>
                    <option>सोलापूर</option>
                  </select>
                </label>

                <button
                  className="search-button"
                  type="button"
                  onClick={handleSearch}
                >
                  <span>⌕</span>
                  शोधा
                </button>
              </div>

              {searchMessage && (
                <div className="search-message" role="status">
                  ✓ {searchMessage}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">आम्ही काय देतो?</span>
              <h2>तुमच्या नात्याच्या प्रवासासाठी</h2>
              <p>
                योग्य व्यक्ती शोधण्यापासून सुरक्षित संवादापर्यंत, प्रत्येक
                पायरी विचारपूर्वक तयार केलेली.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button type="button">अधिक जाणून घ्या →</button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section trust-section">
          <div className="container trust-grid">
            <div>
              <span className="section-kicker">विश्वास प्रथम</span>
              <h2>तुमची माहिती, तुमचा निर्णय.</h2>
              <p>
                विवाहजोडीमध्ये प्रत्येक सदस्याला आपल्या प्रोफाइलची माहिती
                कोणाला आणि कधी दाखवायची यावर नियंत्रण ठेवण्याची सुविधा
                देण्याचा आमचा उद्देश आहे.
              </p>

              <div className="trust-points">
                <div>
                  <span>01</span>
                  <p>ईमेल आणि प्रोफाइल पडताळणी</p>
                </div>
                <div>
                  <span>02</span>
                  <p>फोटोसाठी गोपनीयता नियंत्रण</p>
                </div>
                <div>
                  <span>03</span>
                  <p>प्रोफाइल रिपोर्ट आणि ब्लॉक सुविधा</p>
                </div>
              </div>
            </div>

            <div className="trust-panel">
              <div className="shield-icon">✓</div>
              <span>VIVAHJODI SECURITY</span>
              <strong>सुरक्षित नात्यांची सुरुवात</strong>
              <p>
                विश्वास, गोपनीयता आणि जबाबदार वापर या तीन गोष्टी आमच्या
                प्लॅटफॉर्मच्या केंद्रस्थानी असतील.
              </p>
            </div>
          </div>
        </section>

        <section className="section stories-section" id="stories">
          <div className="container">
            <div className="section-heading centered">
              <span className="section-kicker">आमच्या यशोगाथा</span>
              <h2>काही सुंदर जोड्या</h2>
              <p>
                योग्य व्यक्ती भेटली की एक नवीन सुंदर अध्याय सुरू होतो.
              </p>
            </div>

            <div className="stories-grid">
              {stories.map((story) => (
                <article className="story-card" key={story.names}>
                  <div className="story-photo">{story.initials}</div>
                  <div>
                    <strong>{story.names}</strong>
                    <span>{story.location}</span>
                  </div>
                  <span className="story-heart">♥</span>
                </article>
              ))}
            </div>

            <div className="stats">
              <div>
                <strong>25,000+</strong>
                <span>सदस्य</span>
              </div>
              <div>
                <strong>5,000+</strong>
                <span>संभाव्य जोड्या</span>
              </div>
              <div>
                <strong>100+</strong>
                <span>शहरे</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>मराठी अनुभव</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-inner">
            <div>
              <span>तुमची कहाणी सुरू करण्याची वेळ आली आहे.</span>
              <h2>योग्य जोडीदाराच्या शोधाला आजच सुरुवात करा.</h2>
            </div>
            <button type="button" className="cta-button">
              सदस्यत्व घ्या →
            </button>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">वि</span>
              <span>
                <strong>विवाहजोडी</strong>
                <small>Marathi Matrimony</small>
              </span>
            </a>
            <p>
              महाराष्ट्रातील कुटुंबांसाठी सुरक्षित, विश्वासार्ह आणि
              मराठी-केंद्रित विवाह व्यासपीठ.
            </p>
          </div>

          <div>
            <h3>त्वरित दुवे</h3>
            <a href="#home">होम</a>
            <a href="#search">जोडीदार शोधा</a>
            <a href="#services">आमच्या सेवा</a>
            <a href="#stories">यशोगाथा</a>
          </div>

          <div>
            <h3>मदत</h3>
            <a href="#contact">संपर्क</a>
            <a href="#contact">गोपनीयता धोरण</a>
            <a href="#contact">अटी व शर्ती</a>
            <a href="#contact">सुरक्षितता</a>
          </div>

          <div>
            <h3>संपर्क</h3>
            <span>support@vivahjodi.example</span>
            <span>महाराष्ट्र, भारत</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 VivahJodi. सर्व हक्क राखीव.</span>
          <span>Made with ♥ for Marathi families</span>
        </div>
      </footer>
    </div>
  );
}

export default App;