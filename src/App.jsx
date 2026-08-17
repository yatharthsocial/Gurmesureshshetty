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

const slogans = [
  {
    sans: 'ಯತೋ ಧರ್ಮಸ್ತತೋ ಜಯಃ',
    kn: 'ರಾಷ್ಟ್ರ ಸೇವೆಯೇ ಧರ್ಮ ಸೇವೆ',
    cite: 'ಮಹಾಭಾರತ',
  },
  {
    sans: 'ಕರ್ಮಣ್ಯೇವಾಧಿಕಾರಸ್ತೇ ಮಾ ಫಲೇಷು ಕದಾಚನ',
    kn: 'ಕರ್ತವ್ಯವೇ ಪ್ರಥಮ, ಫಲಾಪೇಕ್ಷೆ ಅಲ್ಲ',
    cite: 'ಭಗವದ್ಗೀತಾ 2.47',
  },
  {
    sans: 'ಶ್ರೇಯಾನ್ ಸ್ವಧರ್ಮೋ ವಿಗುಣಃ ಪರಧರ್ಮಾತ್ ಸ್ವನುಷ್ಠಿತಾತ್',
    kn: 'ಸ್ವಧರ್ಮದ ಪಾಲನೆಯೇ ನಿಜ ಸೇವೆ',
    cite: 'ಭಗವದ್ಗೀತಾ 3.35',
  },
]

const navLinks = [
  { id: 'hero', label: 'ಮುಖಪುಟ' },
  { id: 'about', label: 'ನಾಯಕರ ಬಗ್ಗೆ' },
  { id: 'works', label: 'ಸಾಧನೆಗಳು' },
  { id: 'gallery', label: 'ಗ್ಯಾಲರಿ' },
  { id: 'report-card', label: 'ವರದಿ ಪತ್ರ' },
  { id: 'news', label: 'ಸುದ್ದಿ' },
  { id: 'contact', label: 'ಸಂಪರ್ಕ' },
]

const reportYears = ['2023', '2024', '2025', '2026']

const panchayats = [
  'ಕೋಟೆ',
  'ಕುರ್ಕಾಲು',
  'ಬೆಳ್ಳೆ',
  'ಶಿರ್ವ',
  'ಮಜೂರು',
  'ಇನ್ನಂಜೆ',
  'ಬೆಳಪು',
  'ಕುತ್ಯಾರು',
  'ಮೂಡರಂಗಡಿ',
  'ಎಲ್ಲೂರು',
  'ತೆಂಕ',
  'ಪಡುಬಿದ್ರಿ',
  'ಹೆಜಮಾಡಿ',
  'ಪಲಿಮಾರು',
  'ಕಟಪಾಡಿ',
  'ಬಡ',
]

const issueTypes = [
  'ರಸ್ತೆ ಸಮಸ್ಯೆ',
  'ಕುಡಿಯುವ ನೀರು',
  'ವಿದ್ಯುತ್',
  'ಚರಂಡಿ / ಒಳಚರಂಡಿ',
  'ಆರೋಗ್ಯ',
  'ಶಿಕ್ಷಣ',
  'ಸ್ವಚ್ಛತೆ',
  'ಇತರೆ',
]

const chatSteps = [
  {
    key: 'name',
    type: 'text',
    bot: 'ನಮಸ್ಕಾರ! ನಾನು ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ ಅವರ ಸಹಾಯಕ ಬಾಟ್. ನಿಮ್ಮ ಸಮಸ್ಯೆ ದಾಖಲಿಸಲು ಸ್ವಲ್ಪ ಮಾಹಿತಿ ಬೇಕಾಗುತ್ತದೆ. ಮೊದಲಿಗೆ, ನಿಮ್ಮ ಹೆಸರು ತಿಳಿಸಿ.',
    placeholder: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು',
    autoComplete: 'name',
  },
  {
    key: 'phone',
    type: 'tel',
    bot: 'ಧನ್ಯವಾದಗಳು! ಈಗ ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ ತಿಳಿಸಿ.',
    placeholder: '10 ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ',
    autoComplete: 'tel',
  },
  {
    key: 'panchayat',
    type: 'select',
    bot: 'ನಿಮ್ಮ ಪಂಚಾಯತ್ ಆಯ್ಕೆಮಾಡಿ.',
    options: panchayats,
  },
  {
    key: 'issue',
    type: 'select',
    bot: 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯ ವಿಧ ಆಯ್ಕೆಮಾಡಿ.',
    options: issueTypes,
  },
  {
    key: 'details',
    type: 'details',
    bot: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಮಸ್ಯೆಯ ವಿವರ ಬರೆಯಿರಿ. ಅಗತ್ಯವಿದ್ದರೆ ಫೋಟೋ ಕೂಡ ಸೇರಿಸಬಹುದು.',
  },
]

const chatDoneReply =
  'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಮಸ್ಯೆ ದಾಖಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.'

const chatErrorReply =
  'ಕ್ಷಮಿಸಿ, ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://gurmesureshshetty-backend-production.up.railway.app'

function App() {
  const [index, setIndex] = useState(0)
  const [aboutIndex, setAboutIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sloganIndex, setSloganIndex] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: chatSteps[0].bot },
  ])
  const [stepIndex, setStepIndex] = useState(0)
  const [fieldValue, setFieldValue] = useState('')
  const [detailsText, setDetailsText] = useState('')
  const [chatSubmitting, setChatSubmitting] = useState(false)
  const [chatForm, setChatForm] = useState({
    name: '',
    phone: '',
    panchayat: '',
    issue: '',
    details: '',
    image: null,
  })
  const chatBodyRef = useRef(null)
  const currentStep = chatSteps[stepIndex]

  const goToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const id = setInterval(() => {
      setSloganIndex((i) => (i + 1) % slogans.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [chatMessages, chatOpen])

  const sendBotReply = (text) => {
    setTimeout(() => {
      setChatMessages((m) => [...m, { from: 'bot', text }])
    }, 500)
  }

  const advanceChatStep = (key, value, displayText) => {
    setChatForm((f) => ({ ...f, [key]: value }))
    setChatMessages((m) => [...m, { from: 'user', text: displayText }])
    const next = stepIndex + 1
    setStepIndex(next)
    setFieldValue('')
    sendBotReply(next < chatSteps.length ? chatSteps[next].bot : chatDoneReply)
  }

  const handleChatFieldSubmit = (e) => {
    e.preventDefault()
    const val = fieldValue.trim()
    if (!val) return
    advanceChatStep(currentStep.key, val, val)
  }

  const submitDetails = async (text, image) => {
    setChatForm((f) => ({ ...f, details: text, image }))
    setChatMessages((m) => [
      ...m,
      { from: 'user', text: image ? `${text} 📎 ${image.name}` : text },
    ])

    setChatSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('name', chatForm.name)
      formData.append('phone', chatForm.phone)
      formData.append('panchayat', chatForm.panchayat)
      formData.append('issueType', chatForm.issue)
      formData.append('details', text)
      if (image) formData.append('image', image)

      const res = await fetch(`${API_URL}/api/grievances`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('submit failed')

      setDetailsText('')
      setStepIndex(chatSteps.length)
      sendBotReply(chatDoneReply)
    } catch {
      sendBotReply(chatErrorReply)
    } finally {
      setChatSubmitting(false)
    }
  }

  const handleChatDetailsSubmit = (e) => {
    e.preventDefault()
    const text = detailsText.trim()
    if (!text) return
    submitDetails(text, null)
  }

  const handleCameraCapture = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    submitDetails(detailsText.trim() || 'ಫೋಟೋ ಕಳುಹಿಸಲಾಗಿದೆ.', file)
    e.target.value = ''
  }

  const resetChat = () => {
    setChatForm({
      name: '',
      phone: '',
      panchayat: '',
      issue: '',
      details: '',
      image: null,
    })
    setStepIndex(0)
    setFieldValue('')
    setDetailsText('')
    setChatSubmitting(false)
    setChatMessages([{ from: 'bot', text: chatSteps[0].bot }])
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen || chatOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, chatOpen])

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

              <div className="nav-overlay-slogan">
                {slogans.map((s, i) => (
                  <div
                    key={s.cite}
                    className={`nav-overlay-slogan-slide${
                      i === sloganIndex ? ' active' : ''
                    }`}
                  >
                    <p className="nav-overlay-slogan-sans">{s.sans}</p>
                    <p className="nav-overlay-slogan-kn">{s.kn}</p>
                    <p className="nav-overlay-slogan-cite">&mdash; {s.cite}</p>
                  </div>
                ))}
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

      <section id="report-card" className="report-section">
        <p className="report-kicker">ವರದಿ ಪತ್ರ</p>
        <h2 className="report-heading">ರಿಪೋರ್ಟ್ ಕಾರ್ಡ್</h2>
        <p className="report-subtitle">
          ವರ್ಷವಾರು ಅಭಿವೃದ್ಧಿ ವರದಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.
        </p>

        <div className="report-buttons">
          {reportYears.map((year) => (
            <a href="#" className="report-btn" key={year}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />
              </svg>
              {year} ವರದಿ
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <img src={bjpLogo} alt="ಬಿಜೆಪಿ" className="footer-logo" />
              <div>
                <p className="footer-name">ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ</p>
                <p className="footer-role">ಕಾಪು ಶಾಸಕ</p>
              </div>
            </div>
            <p className="footer-tagline">
              ಕಾಪು ಮತ್ತು ಉಡುಪಿಯ ಸೇವೆಗೆ ಸಮರ್ಪಿತ.
            </p>
            <div className="footer-social">
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

          <div className="footer-col">
            <h4>ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು</h4>
            <nav className="footer-links">
              {navLinks
                .filter((link) => link.id !== 'hero')
                .map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      goToSection(link.id)
                    }}
                  >
                    {link.label}
                  </a>
                ))}
            </nav>
          </div>

          <div className="footer-col">
            <h4>ಸಂಪರ್ಕಿಸಿ</h4>
            <ul className="footer-contact">
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                </svg>
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <span>info@gurmesureshshetty.in</span>
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.3" />
                </svg>
                <span>ಕಾಪು, ಉಡುಪಿ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ. ಎಲ್ಲಾ
            ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.
          </p>
          <p className="footer-credit">Managed by Yatharth</p>
        </div>
      </footer>

      <div className={`chat-widget${chatOpen ? ' open' : ''}`}>
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-panel-header">
              <span>ಸಹಾಯಕ ಬಾಟ್</span>
              <button
                type="button"
                className="chat-panel-close"
                onClick={() => setChatOpen(false)}
                aria-label="ಚಾಟ್ ಮುಚ್ಚಿ"
              >
                &times;
              </button>
            </div>

            <div className="chat-panel-body" ref={chatBodyRef}>
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-bubble ${msg.from === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}`}
                >
                  {msg.text}
                </div>
              ))}

              {!currentStep && (
                <button
                  type="button"
                  className="chat-reset-btn"
                  onClick={resetChat}
                >
                  ಹೊಸ ಸಮಸ್ಯೆ ದಾಖಲಿಸಿ
                </button>
              )}
            </div>

            {currentStep && currentStep.type === 'select' && (
              <form className="chat-step-form" onSubmit={(e) => e.preventDefault()}>
                <select
                  value={fieldValue}
                  onChange={(e) => {
                    const val = e.target.value
                    if (!val) return
                    setFieldValue(val)
                    advanceChatStep(currentStep.key, val, val)
                  }}
                >
                  <option value="" disabled>
                    -- ಆಯ್ಕೆಮಾಡಿ --
                  </option>
                  {currentStep.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </form>
            )}

            {currentStep && (currentStep.type === 'text' || currentStep.type === 'tel') && (
              <form className="chat-step-form" onSubmit={handleChatFieldSubmit}>
                <input
                  type={currentStep.type}
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  placeholder={currentStep.placeholder}
                  autoComplete={currentStep.autoComplete}
                  inputMode={currentStep.type === 'tel' ? 'numeric' : undefined}
                  maxLength={currentStep.type === 'tel' ? 10 : undefined}
                />
                <button type="submit" disabled={!fieldValue.trim()}>
                  ಮುಂದೆ
                </button>
              </form>
            )}

            {currentStep && currentStep.type === 'details' && (
              <form
                className="chat-details-form"
                onSubmit={handleChatDetailsSubmit}
              >
                <textarea
                  value={detailsText}
                  onChange={(e) => setDetailsText(e.target.value)}
                  placeholder="ಸಮಸ್ಯೆಯ ವಿವರ ಬರೆಯಿರಿ..."
                  rows={3}
                  disabled={chatSubmitting}
                />
                <div className="chat-details-actions">
                  <label
                    className={`chat-camera-btn${chatSubmitting ? ' disabled' : ''}`}
                    aria-label="ಫೋಟೋ ತೆಗೆಯಿರಿ"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 8.5a2 2 0 0 1 2-2h1.2l.8-1.5a1.5 1.5 0 0 1 1.32-.8h5.36a1.5 1.5 0 0 1 1.32.8l.8 1.5H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                      <circle cx="12" cy="12.5" r="3.4" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraCapture}
                      disabled={chatSubmitting}
                      hidden
                    />
                  </label>
                  <button type="submit" disabled={!detailsText.trim() || chatSubmitting}>
                    {chatSubmitting ? 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...' : 'ಸಲ್ಲಿಸಿ'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="chat-fab-row">
          {!chatOpen && (
            <span className="chat-fab-label" onClick={() => setChatOpen(true)}>
              MLA ಜೊತೆ ಮಾತನಾಡಿ
            </span>
          )}

          <button
            type="button"
            className="chat-fab"
            onClick={() => setChatOpen((o) => !o)}
            aria-label="ಚಾಟ್ ಬಾಟ್ ತೆರೆಯಿರಿ"
          >
            {!chatOpen && <span className="chat-fab-ping" aria-hidden="true" />}
            {chatOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 11.2c0-4.53 3.8-8.2 8.5-8.2s8.5 3.67 8.5 8.2c0 4.53-3.8 8.2-8.5 8.2-.98 0-1.92-.16-2.8-.45L5.8 20.9a.6.6 0 0 1-.85-.68l.9-3.32C4.75 15.56 4 13.47 4 11.2Z"
                  fill="currentColor"
                />
                <circle cx="8.6" cy="11.2" r="1.15" fill="#e8720c" />
                <circle cx="12.5" cy="11.2" r="1.15" fill="#e8720c" />
                <circle cx="16.4" cy="11.2" r="1.15" fill="#e8720c" />
              </svg>
            )}
            {!chatOpen && <span className="chat-fab-dot" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
