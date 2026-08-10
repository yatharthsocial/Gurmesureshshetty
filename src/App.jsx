import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import bannerImg from './assets/finalbanner.jpg'
import galleryImg1 from './assets/banner-01.jpg'
import bannerImgMobile from './assets/mobileview-01.jpg'
import bjpLogo from './assets/bjp logo.png'
import modiLogo from './assets/Modi_Circular_Logos.png'
import hamVideo from './assets/hamvideo.mp4'
import aboutImg from './assets/about-us-section .png'
import aboutImg2 from './assets/final02.png'
import aboutImg3 from './assets/Gurme_Suresh_B&W_Outline_3.png'
import './App.css'

const taglines = [
  {
    accent: 'ಪ್ರಗತಿಗೆ',
    rest: 'ಸಮರ್ಪಿತ.',
    sub: 'ಕಾಪು ಮತ್ತು ಉಡುಪಿನ ಸೇವೆಗೆ ಸಮರ್ಪಿತ.',
  },
  {
    accent: 'ಪ್ರತಿ ನಾಗರಿಕನಿಗೂ',
    rest: 'ಬದ್ಧ.',
    sub: 'ಉಡುಪಿ ಜಿಲ್ಲೆಯ ಅಭಿವೃದ್ಧಿಗೆ ಸೇವೆ.',
  },
  {
    accent: 'ಉಜ್ವಲ ಭವಿಷ್ಯದ',
    rest: 'ನಿರ್ಮಾಣ.',
    sub: 'ಕಾಪು ಮತ್ತು ಉಡುಪಿನ ಅಭಿವೃದ್ಧಿಗಾಗಿ.',
  },
]

const aboutImages = [aboutImg, aboutImg2, aboutImg3]

const workIcons = {
  road: (
    <path d="M10 3 4 21m10-18 6 18M9 14h6M10.5 9h3" />
  ),
  water: (
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
  ),
  education: (
    <path d="m12 4 9 4-9 4-9-4 9-4Zm-6 6v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
  ),
  health: (
    <path d="M12 21s-7-4.4-9.5-9C.6 8.3 2.4 5 5.6 5c1.9 0 3.3 1 4.4 2.5C11.1 6 12.5 5 14.4 5 17.6 5 19.4 8.3 21.5 12 19 16.6 12 21 12 21Z" />
  ),
  infra: (
    <path d="m13 2-9 12h6l-1 8 9-12h-6l1-8Z" />
  ),
  youth: (
    <path d="M8 21h8M12 17v4M6 4h12v4a6 6 0 0 1-12 0V4ZM6 6H3a3 3 0 0 0 3 5M18 6h3a3 3 0 0 1-3 5" />
  ),
}

const works = [
  {
    icon: 'road',
    category: 'ರಸ್ತೆ ಅಭಿವೃದ್ಧಿ',
    location: 'ಕಾಪು',
    title: 'ಪ್ರಮುಖ ರಸ್ತೆಗಳ ಡಾಂಬರೀಕರಣ',
    desc: 'ಕಾಪಿನ ಪ್ರಮುಖ ಸಂಪರ್ಕ ರಸ್ತೆಗಳ ವಿಸ್ತರಣೆ ಮತ್ತು ಡಾಂಬರೀಕರಣ ಕಾಮಗಾರಿ ಪೂರ್ಣ.',
  },
  {
    icon: 'water',
    category: 'ಕುಡಿಯುವ ನೀರು',
    location: 'ಉಡುಪಿ',
    title: 'ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಯೋಜನೆ',
    desc: 'ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಿಗೆ ನಿರಂತರ, ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಸೌಲಭ್ಯ ಒದಗಿಸಲಾಗಿದೆ.',
  },
  {
    icon: 'education',
    category: 'ಶಿಕ್ಷಣ',
    location: 'ಕಾಪು',
    title: 'ಸರ್ಕಾರಿ ಶಾಲಾ ಮೂಲಸೌಕರ್ಯ',
    desc: 'ಸರ್ಕಾರಿ ಶಾಲೆಗಳಲ್ಲಿ ಹೊಸ ಕೊಠಡಿ, ಪೀಠೋಪಕರಣ ಹಾಗೂ ಡಿಜಿಟಲ್ ಸೌಲಭ್ಯ ಒದಗಿಸಲಾಗಿದೆ.',
  },
  {
    icon: 'health',
    category: 'ಆರೋಗ್ಯ',
    location: 'ಉಡುಪಿ',
    title: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ ಬಲವರ್ಧನೆ',
    desc: 'ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳಿಗೆ ಅಗತ್ಯ ಉಪಕರಣ ಮತ್ತು ಸಿಬ್ಬಂದಿ ಸೌಲಭ್ಯ ಹೆಚ್ಚಳ.',
  },
  {
    icon: 'infra',
    category: 'ಮೂಲಸೌಕರ್ಯ',
    location: 'ಕಾಪು',
    title: 'ವಿದ್ಯುತ್ ಮತ್ತು ಒಳಚರಂಡಿ ಸುಧಾರಣೆ',
    desc: 'ವಿದ್ಯುತ್ ಪೂರೈಕೆ ಮತ್ತು ಒಳಚರಂಡಿ ವ್ಯವಸ್ಥೆಯ ಆಧುನೀಕರಣ ಕಾಮಗಾರಿ.',
  },
  {
    icon: 'youth',
    category: 'ಯುವಜನ ಮತ್ತು ಕ್ರೀಡೆ',
    location: 'ಉಡುಪಿ',
    title: 'ಕ್ರೀಡಾ ಮೈದಾನ ಹಾಗೂ ಸಮುದಾಯ ಭವನ',
    desc: 'ಯುವಜನರಿಗಾಗಿ ಹೊಸ ಕ್ರೀಡಾ ಮೈದಾನ ಮತ್ತು ಸಮುದಾಯ ಭವನ ನಿರ್ಮಾಣ.',
  },
]

const galleryImages = [
  { src: galleryImg1 },
  { src: null },
  { src: bannerImg },
  { src: null },
  { src: null },
]

const navLinks = [
  { id: 'hero', label: 'ಮುಖಪುಟ' },
  { id: 'about', label: 'ನಾಯಕರ ಬಗ್ಗೆ' },
  { id: 'works', label: 'ಸಾಧನೆಗಳು' },
  { id: 'gallery', label: 'ಗ್ಯಾಲರಿ' },
  { id: 'news', label: 'ಸುದ್ದಿ' },
  { id: 'contact', label: 'ಸಂಪರ್ಕ' },
]

function App() {
  const [index, setIndex] = useState(0)
  const [aboutIndex, setAboutIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const goToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % taglines.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setAboutIndex((i) => (i + 1) % aboutImages.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const worksWrapRef = useRef(null)
  const worksTrackRef = useRef(null)

  useLayoutEffect(() => {
    const wrap = worksWrapRef.current
    const track = worksTrackRef.current
    if (!wrap || !track) return

    let startOffset = 0
    let travel = 0
    let ticking = false

    const update = () => {
      ticking = false
      if (travel <= 0) return
      const rect = wrap.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const x = startOffset - progress * travel
      track.style.transform = `translateX(${x}px)`
    }

    const measure = () => {
      const viewportW = track.parentElement.clientWidth
      startOffset = viewportW
      travel = startOffset + track.scrollWidth
      wrap.style.height = `calc(100svh + ${travel}px)`
      update()
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const galleryRowRef = useRef(null)
  const galleryTrackRef = useRef(null)
  const galleryItemRefs = useRef([])

  useEffect(() => {
    const row = galleryRowRef.current
    const track = galleryTrackRef.current
    if (!row || !track) return

    let x = 0
    let raf
    const speed = 0.55

    const tick = () => {
      x -= speed
      const setWidth = track.scrollWidth / 2
      if (setWidth > 0 && Math.abs(x) >= setWidth) {
        x += setWidth
      }
      track.style.transform = `translateX(${x}px)`

      const rowRect = row.getBoundingClientRect()
      const centerX = rowRect.left + rowRect.width / 2

      let closestEl = null
      let closestDist = Infinity
      galleryItemRefs.current.forEach((el) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const itemCenter = r.left + r.width / 2
        const dist = Math.abs(itemCenter - centerX)
        if (dist < closestDist) {
          closestDist = dist
          closestEl = el
        }
      })

      galleryItemRefs.current.forEach((el) => {
        if (!el) return
        if (el === closestEl && closestDist < 160) {
          el.classList.add('is-focused')
        } else {
          el.classList.remove('is-focused')
        }
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <section
        id="hero"
        className="hero-banner"
        style={{
          '--bg-desktop': `url(${bannerImg})`,
          '--bg-mobile': `url(${bannerImgMobile})`,
        }}
      >
        <div className="hero-brand">
          <img src={bjpLogo} alt="ಬಿಜೆಪಿ" className="hero-logo" />
          <div className="hero-brand-text">
            <p className="hero-brand-name">ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ</p>
            <p className="hero-brand-role">ಕಾಪು ಶಾಸಕ</p>
          </div>
        </div>

        <button
          type="button"
          className={`hero-menu${menuOpen ? ' open' : ''}`}
          aria-label="ಮೆನು"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-overlay${menuOpen ? ' open' : ''}`}>
          <button
            type="button"
            className="nav-overlay-backdrop"
            aria-label="ಮುಚ್ಚಿ"
            onClick={() => setMenuOpen(false)}
          ></button>
          <nav className="nav-overlay-panel">
            <video
              className="nav-overlay-video-bg"
              src={hamVideo}
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="nav-overlay-content">
              <div className="nav-overlay-logo-modi">
                <img src={modiLogo} alt="ನರೇಂದ್ರ ಮೋದಿ" />
              </div>
              <div className="nav-overlay-links">
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          goToSection(link.id)
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="nav-overlay-social">
                <a
                  href="https://www.instagram.com/gurmesureshshetty/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4.2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="17" cy="7" r="1.1" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/sureshshettygurme/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M13.5 21v-7.2h2.4l.36-2.8h-2.76V9.1c0-.8.22-1.35 1.37-1.35h1.47V5.24C15.9 5.16 15.1 5.1 14.2 5.1c-1.94 0-3.27 1.18-3.27 3.36v1.86H8.5v2.8h2.43V21h2.57Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://x.com/GurmeShetty?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 5l14 14M19 5 5 19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-taglines">
          {taglines.map((t, i) => (
            <div key={t.accent} className={i === index ? 'active' : ''}>
              <p className="main">
                <span className="accent">{t.accent}</span> {t.rest}
              </p>
              <p className="sub">
                <span>{t.sub}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-image">
          {aboutImages.map((img, i) => (
            <img
              key={img}
              src={img}
              alt="ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ"
              className={i === aboutIndex ? 'active' : ''}
            />
          ))}
        </div>

        <div className="about-text">
          <div className="about-header">
            <p className="about-kicker">ನಾಯಕರ ಬಗ್ಗೆ</p>
            <h2>
              <span className="accent">ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ</span>
            </h2>
            <p className="about-role">ಬಿಜೆಪಿ &middot; ಕಾಪು, ಉಡುಪಿ</p>
          </div>

          <div className="about-body">
            <p>
              ಕಾಪು ಮತ್ತು ಉಡುಪಿಯ ಜನರೊಂದಿಗೆ ವರ್ಷಗಳಿಂದ ನಿಕಟವಾಗಿ
              ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಾ, ಅವರ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಕಳಕಳಿಗಳನ್ನು ಆಲಿಸಿ,
              ಪ್ರತಿಯೊಂದು ಹೆಜ್ಜೆಯಲ್ಲೂ ಅವರೊಂದಿಗೆ ನಿಂತಿರುವ ಸಮರ್ಪಿತ ಜನಪರ ನಾಯಕ.
            </p>
            <p>
              ತಾವು ಸೇವೆ ಸಲ್ಲಿಸುವ ಸಮುದಾಯದಲ್ಲಿ ಬೇರೂರಿರುವ ಅವರು, ಪಾರದರ್ಶಕ ಹಾಗೂ
              ಸುಲಭವಾಗಿ ಜನರನ್ನು ತಲುಪಬಹುದಾದ ನಾಯಕತ್ವದಲ್ಲಿ ನಂಬಿಕೆ ಇಟ್ಟು,
              ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ದೈನಂದಿನ ಬದುಕಿನಲ್ಲಿ ನೈಜ ಪ್ರಗತಿಯನ್ನು ಸಾಧಿಸಲು
              ಸದಾ ಶ್ರಮಿಸುತ್ತಿದ್ದಾರೆ.
            </p>
            <p>
              ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ನಾಗರಿಕ ಸೌಲಭ್ಯಗಳಿಂದ ಹಿಡಿದು ಯುವಜನರ ಅಭಿವೃದ್ಧಿ ಹಾಗೂ
              ಸಮುದಾಯದ ಕಲ್ಯಾಣದವರೆಗೆ, ಅವರ ಗಮನ ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಶಾಶ್ವತ
              ಬದಲಾವಣೆಯ ಮೇಲಿದೆ&mdash;ಈ ಬದಲಾವಣೆ ಕ್ಷೇತ್ರದ ಜನರೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ
              ನಿರ್ಮಿಸಲ್ಪಟ್ಟಿದೆ.
            </p>
          </div>
        </div>
      </section>

      <section id="works" className="works-section">
        <div className="works-scroll-wrap" ref={worksWrapRef}>
          <div className="works-sticky">
            <div className="works-heading">
              <p className="works-kicker">ಸಾಧನೆಗಳು</p>
              <h2>ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳು</h2>
              <p className="works-subtitle">
                ಕಾಪು ಮತ್ತು ಉಡುಪಿಯಲ್ಲಿ ಪೂರ್ಣಗೊಂಡ ಪ್ರಮುಖ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳ
                ಒಂದು ನೋಟ.
              </p>
            </div>

            <div className="works-track" ref={worksTrackRef}>
              {works.map((w) => (
                <div className="work-card" key={w.title}>
                  <div className="work-image">
                    <div className="work-image-placeholder">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {workIcons[w.icon]}
                      </svg>
                    </div>
                  </div>
                  <div className="work-card-body">
                    <h3>{w.title}</h3>
                    <button type="button" className="work-read-more">
                      ಇನ್ನಷ್ಟು ಓದಿ
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="gallery-heading">
          <p className="gallery-kicker">ಗ್ಯಾಲರಿ</p>
          <h2>ಫೋಟೋ ಗ್ಯಾಲರಿ</h2>
          <p className="gallery-subtitle">
            ಕ್ಷೇತ್ರದ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಭೇಟಿಗಳ ಕೆಲವು ಕ್ಷಣಗಳು.
          </p>
        </div>

        <div className="gallery-row" ref={galleryRowRef}>
          <div className="gallery-track" ref={galleryTrackRef}>
            {[...galleryImages, ...galleryImages].map((g, i) => (
              <div
                className="gallery-item"
                key={i}
                ref={(el) => (galleryItemRefs.current[i] = el)}
              >
                {g.src ? (
                  <img src={g.src} alt="ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ" />
                ) : (
                  <div className="gallery-placeholder">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="9" cy="10.5" r="1.6" />
                      <path d="m3 17 5.5-5.5a2 2 0 0 1 2.8 0L17 17M14.5 14.5l1.3-1.3a2 2 0 0 1 2.8 0L21 15.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default App
