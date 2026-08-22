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

const galleryImages = [
  { src: galleryImg1 },
  { src: null },
  { src: bannerImg },
  { src: null },
  { src: null },
]

const reportYears = ['2023', '2024', '2025', '2026']

// Canonical (Kannada) values — always what gets stored/sent, regardless of display language
const PANCHAYATS_KN = [
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
const PANCHAYATS_EN = [
  'Kote',
  'Kurkalu',
  'Belle',
  'Shirva',
  'Majur',
  'Innanje',
  'Belapu',
  'Kuthyaru',
  'Mudarangadi',
  'Yellur',
  'Thenka',
  'Padubidri',
  'Hejamadi',
  'Palimaru',
  'Katapadi',
  'Bada',
]

const ISSUE_TYPES_KN = [
  'ರಸ್ತೆ ಸಮಸ್ಯೆ',
  'ಕುಡಿಯುವ ನೀರು',
  'ವಿದ್ಯುತ್',
  'ಚರಂಡಿ / ಒಳಚರಂಡಿ',
  'ಆರೋಗ್ಯ',
  'ಶಿಕ್ಷಣ',
  'ಸ್ವಚ್ಛತೆ',
  'ಇತರೆ',
]
const ISSUE_TYPES_EN = [
  'Road Issue',
  'Drinking Water',
  'Electricity',
  'Drainage / Sewage',
  'Health',
  'Education',
  'Sanitation',
  'Other',
]

// chatStepsBase holds the language-independent shape of each step.
// Bot prompts/placeholders live in content[lang].chat.steps below, same order.
const chatStepsBase = [
  { key: 'name', type: 'text', autoComplete: 'name' },
  { key: 'phone', type: 'tel', autoComplete: 'tel' },
  { key: 'panchayat', type: 'select', optionsKn: PANCHAYATS_KN, optionsEn: PANCHAYATS_EN },
  { key: 'issue', type: 'select', optionsKn: ISSUE_TYPES_KN, optionsEn: ISSUE_TYPES_EN },
  { key: 'details', type: 'details' },
]

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://gurmesureshshetty-backend-production.up.railway.app'

const content = {
  kn: {
    meta: {
      bjpAlt: 'ಬಿಜೆಪಿ',
      modiAlt: 'ನರೇಂದ್ರ ಮೋದಿ',
      brandName: 'ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ',
      brandRole: 'ಕಾಪು ಶಾಸಕ',
      menuLabel: 'ಮೆನು',
      closeLabel: 'ಮುಚ್ಚಿ',
    },
    nav: [
      { id: 'hero', label: 'ಮುಖಪುಟ' },
      { id: 'about', label: 'ನಾಯಕರ ಬಗ್ಗೆ' },
      { id: 'works', label: 'ಸಾಧನೆಗಳು' },
      { id: 'gallery', label: 'ಗ್ಯಾಲರಿ' },
      { id: 'report-card', label: 'ವರದಿ ಪತ್ರ' },
      { id: 'news', label: 'ಸುದ್ದಿ' },
      { id: 'contact', label: 'ಸಂಪರ್ಕ' },
    ],
    taglines: [
      {
        accent: 'ಪ್ರಗತಿಗೆ',
        rest: 'ಸಮರ್ಪಿತ.',
        sub: 'ಕಾಪುವಿನ ಸೇವೆಗೆ ಸಮರ್ಪಿತ.',
      },
      {
        accent: 'ಪ್ರತಿ ನಾಗರಿಕನಿಗೂ',
        rest: 'ಬದ್ಧ.',
        sub: 'ಕಾಪುವಿನ ಅಭಿವೃದ್ಧಿಗೆ ಸೇವೆ.',
      },
      {
        accent: 'ಉಜ್ವಲ ಭವಿಷ್ಯದ',
        rest: 'ನಿರ್ಮಾಣ.',
        sub: 'ಕಾಪುವಿನ ಅಭಿವೃದ್ಧಿಗಾಗಿ.',
      },
    ],
    slogans: [
      {
        sans: 'ಯತೋ ಧರ್ಮಸ್ತತೋ ಜಯಃ',
        meaning: 'ರಾಷ್ಟ್ರ ಸೇವೆಯೇ ಧರ್ಮ ಸೇವೆ',
        cite: 'ಮಹಾಭಾರತ',
      },
      {
        sans: 'ಕರ್ಮಣ್ಯೇವಾಧಿಕಾರಸ್ತೇ ಮಾ ಫಲೇಷು ಕದಾಚನ',
        meaning: 'ಕರ್ತವ್ಯವೇ ಪ್ರಥಮ, ಫಲಾಪೇಕ್ಷೆ ಅಲ್ಲ',
        cite: 'ಭಗವದ್ಗೀತಾ 2.47',
      },
      {
        sans: 'ಶ್ರೇಯಾನ್ ಸ್ವಧರ್ಮೋ ವಿಗುಣಃ ಪರಧರ್ಮಾತ್ ಸ್ವನುಷ್ಠಿತಾತ್',
        meaning: 'ಸ್ವಧರ್ಮದ ಪಾಲನೆಯೇ ನಿಜ ಸೇವೆ',
        cite: 'ಭಗವದ್ಗೀತಾ 3.35',
      },
    ],
    about: {
      kicker: 'ನಾಯಕರ ಬಗ್ಗೆ',
      role: 'ಬಿಜೆಪಿ · ಕಾಪು',
      body: [
        'ಕಾಪುವಿನ ಜನರೊಂದಿಗೆ ವರ್ಷಗಳಿಂದ ನಿಕಟವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಾ, ಅವರ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಕಳಕಳಿಗಳನ್ನು ಆಲಿಸಿ, ಪ್ರತಿಯೊಂದು ಹೆಜ್ಜೆಯಲ್ಲೂ ಅವರೊಂದಿಗೆ ನಿಂತಿರುವ ಸಮರ್ಪಿತ ಜನಪರ ನಾಯಕ.',
        'ತಾವು ಸೇವೆ ಸಲ್ಲಿಸುವ ಸಮುದಾಯದಲ್ಲಿ ಬೇರೂರಿರುವ ಅವರು, ಪಾರದರ್ಶಕ ಹಾಗೂ ಸುಲಭವಾಗಿ ಜನರನ್ನು ತಲುಪಬಹುದಾದ ನಾಯಕತ್ವದಲ್ಲಿ ನಂಬಿಕೆ ಇಟ್ಟು, ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನ ದೈನಂದಿನ ಬದುಕಿನಲ್ಲಿ ನೈಜ ಪ್ರಗತಿಯನ್ನು ಸಾಧಿಸಲು ಸದಾ ಶ್ರಮಿಸುತ್ತಿದ್ದಾರೆ.',
        'ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ನಾಗರಿಕ ಸೌಲಭ್ಯಗಳಿಂದ ಹಿಡಿದು ಯುವಜನರ ಅಭಿವೃದ್ಧಿ ಹಾಗೂ ಸಮುದಾಯದ ಕಲ್ಯಾಣದವರೆಗೆ, ಅವರ ಗಮನ ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಶಾಶ್ವತ ಬದಲಾವಣೆಯ ಮೇಲಿದೆ—ಈ ಬದಲಾವಣೆ ಕ್ಷೇತ್ರದ ಜನರೊಂದಿಗೆ ಕೈಜೋಡಿಸಿ ನಿರ್ಮಿಸಲ್ಪಟ್ಟಿದೆ.',
      ],
    },
    works: {
      kicker: 'ಸಾಧನೆಗಳು',
      heading: 'ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳು',
      subtitle: 'ಕಾಪುವಿನಲ್ಲಿ ಪೂರ್ಣಗೊಂಡ ಪ್ರಮುಖ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳ ಒಂದು ನೋಟ.',
      readMore: 'ಇನ್ನಷ್ಟು ಓದಿ',
      items: [
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
          location: 'ಕಾಪು',
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
          location: 'ಕಾಪು',
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
          location: 'ಕಾಪು',
          title: 'ಕ್ರೀಡಾ ಮೈದಾನ ಹಾಗೂ ಸಮುದಾಯ ಭವನ',
          desc: 'ಯುವಜನರಿಗಾಗಿ ಹೊಸ ಕ್ರೀಡಾ ಮೈದಾನ ಮತ್ತು ಸಮುದಾಯ ಭವನ ನಿರ್ಮಾಣ.',
        },
      ],
    },
    gallery: {
      kicker: 'ಗ್ಯಾಲರಿ',
      heading: 'ಫೋಟೋ ಗ್ಯಾಲರಿ',
      subtitle: 'ಕ್ಷೇತ್ರದ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಭೇಟಿಗಳ ಕೆಲವು ಕ್ಷಣಗಳು.',
    },
    report: {
      kicker: 'ವರದಿ ಪತ್ರ',
      heading: 'ರಿಪೋರ್ಟ್ ಕಾರ್ಡ್',
      subtitle: 'ವರ್ಷವಾರು ಅಭಿವೃದ್ಧಿ ವರದಿಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
      suffix: 'ವರದಿ',
    },
    footer: {
      tagline: 'ಕಾಪುವಿನ ಸೇವೆಗೆ ಸಮರ್ಪಿತ.',
      quickLinks: 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು',
      contact: 'ಸಂಪರ್ಕಿಸಿ',
      phone: '+91 XXXXX XXXXX',
      email: 'info@gurmesureshshetty.in',
      address: 'ಕಾಪು, ಕರ್ನಾಟಕ',
      copyright: (year) => `© ${year} ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.`,
      credit: 'Managed by Yatharth',
    },
    chat: {
      fabLabel: 'MLA ಜೊತೆ ಮಾತನಾಡಿ',
      fabOpenLabel: 'ಚಾಟ್ ಬಾಟ್ ತೆರೆಯಿರಿ',
      panelTitle: 'ಸಹಾಯಕ ಬಾಟ್',
      closeLabel: 'ಚಾಟ್ ಮುಚ್ಚಿ',
      resetLabel: 'ಹೊಸ ಸಮಸ್ಯೆ ದಾಖಲಿಸಿ',
      selectPlaceholder: '-- ಆಯ್ಕೆಮಾಡಿ --',
      nextLabel: 'ಮುಂದೆ',
      textareaPlaceholder: 'ಸಮಸ್ಯೆಯ ವಿವರ ಬರೆಯಿರಿ...',
      cameraLabel: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
      cameraChangeLabel: 'ಫೋಟೋ ಬದಲಾಯಿಸಿ',
      removeImageLabel: 'ಫೋಟೋ ತೆಗೆದುಹಾಕಿ',
      submitLabel: 'ಸಲ್ಲಿಸಿ',
      sendingLabel: 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
      doneReply: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಮಸ್ಯೆ ದಾಖಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
      errorReply: 'ಕ್ಷಮಿಸಿ, ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      defaultPhotoText: 'ಫೋಟೋ ಕಳುಹಿಸಲಾಗಿದೆ.',
      steps: [
        {
          bot: 'ನಮಸ್ಕಾರ! ನಾನು ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ ಅವರ ಸಹಾಯಕ ಬಾಟ್. ನಿಮ್ಮ ಸಮಸ್ಯೆ ದಾಖಲಿಸಲು ಸ್ವಲ್ಪ ಮಾಹಿತಿ ಬೇಕಾಗುತ್ತದೆ. ಮೊದಲಿಗೆ, ನಿಮ್ಮ ಹೆಸರು ತಿಳಿಸಿ.',
          placeholder: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು',
        },
        {
          bot: 'ಧನ್ಯವಾದಗಳು! ಈಗ ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆ ತಿಳಿಸಿ.',
          placeholder: '10 ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ',
        },
        { bot: 'ನಿಮ್ಮ ಪಂಚಾಯತ್ ಆಯ್ಕೆಮಾಡಿ.' },
        { bot: 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯ ವಿಧ ಆಯ್ಕೆಮಾಡಿ.' },
        { bot: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಮಸ್ಯೆಯ ವಿವರ ಬರೆಯಿರಿ. ಅಗತ್ಯವಿದ್ದರೆ ಫೋಟೋ ಕೂಡ ಸೇರಿಸಬಹುದು.' },
      ],
    },
  },
  en: {
    meta: {
      bjpAlt: 'BJP',
      modiAlt: 'Narendra Modi',
      brandName: 'Gurme Suresh Shetty',
      brandRole: 'MLA, Kaup',
      menuLabel: 'Menu',
      closeLabel: 'Close',
    },
    nav: [
      { id: 'hero', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'works', label: 'Works' },
      { id: 'gallery', label: 'Gallery' },
      { id: 'report-card', label: 'Report Card' },
      { id: 'news', label: 'News' },
      { id: 'contact', label: 'Contact' },
    ],
    taglines: [
      {
        accent: 'Committed to',
        rest: 'Progress.',
        sub: 'Dedicated to serving Kaup.',
      },
      {
        accent: 'Committed to',
        rest: 'Every Citizen.',
        sub: 'Serving the development of Kaup.',
      },
      {
        accent: 'Building a',
        rest: 'Bright Future.',
        sub: 'For the development of Kaup.',
      },
    ],
    slogans: [
      {
        sans: 'Yato Dharmastato Jayah',
        meaning: 'Service to the Nation is Service to Dharma',
        cite: 'Mahabharata',
      },
      {
        sans: 'Karmanye Vadhikaraste Ma Phaleshu Kadachana',
        meaning: 'Duty comes first, not the desire for results',
        cite: 'Bhagavad Gita 2.47',
      },
      {
        sans: 'Shreyan Swadharmo Vigunah Paradharmat Swanushthitat',
        meaning: "Following one's own duty is true service",
        cite: 'Bhagavad Gita 3.35',
      },
    ],
    about: {
      kicker: 'About the Leader',
      role: 'BJP · Kaup',
      body: [
        "A dedicated people's leader who has worked closely with the people of Kaup for years, listening to their concerns and standing with them at every step.",
        'Deeply rooted in the community he serves, he believes in transparent, accessible leadership and works tirelessly to bring real progress to the everyday lives of every citizen.',
        'From infrastructure and civic amenities to youth development and community welfare, his focus remains on practical, lasting change — built hand-in-hand with the people of the constituency.',
      ],
    },
    works: {
      kicker: 'Achievements',
      heading: 'Development Works',
      subtitle: 'A look at major development works completed in Kaup.',
      readMore: 'Read More',
      items: [
        {
          icon: 'road',
          category: 'Road Development',
          location: 'Kaup',
          title: 'Major Road Asphalting',
          desc: 'Widening and asphalting of key connecting roads in Kaup completed.',
        },
        {
          icon: 'water',
          category: 'Drinking Water',
          location: 'Kaup',
          title: 'Clean Drinking Water Scheme',
          desc: 'Continuous, clean drinking water supply provided to rural areas.',
        },
        {
          icon: 'education',
          category: 'Education',
          location: 'Kaup',
          title: 'Government School Infrastructure',
          desc: 'New classrooms, furniture, and digital facilities provided in government schools.',
        },
        {
          icon: 'health',
          category: 'Health',
          location: 'Kaup',
          title: 'Primary Health Centre Strengthening',
          desc: 'Essential equipment and staffing increased at local health centres.',
        },
        {
          icon: 'infra',
          category: 'Infrastructure',
          location: 'Kaup',
          title: 'Electricity and Drainage Improvement',
          desc: 'Modernization of power supply and drainage systems.',
        },
        {
          icon: 'youth',
          category: 'Youth & Sports',
          location: 'Kaup',
          title: 'Sports Ground & Community Hall',
          desc: 'New sports ground and community hall built for the youth.',
        },
      ],
    },
    gallery: {
      kicker: 'Gallery',
      heading: 'Photo Gallery',
      subtitle: 'Moments from constituency programs and visits.',
    },
    report: {
      kicker: 'Report Card',
      heading: 'Report Card',
      subtitle: 'Download year-wise development reports.',
      suffix: 'Report',
    },
    footer: {
      tagline: 'Dedicated to serving Kaup.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      phone: '+91 XXXXX XXXXX',
      email: 'info@gurmesureshshetty.in',
      address: 'Kaup, Karnataka',
      copyright: (year) => `© ${year} Gurme Suresh Shetty. All rights reserved.`,
      credit: 'Managed by Yatharth',
    },
    chat: {
      fabLabel: 'Talk to MLA',
      fabOpenLabel: 'Open chat bot',
      panelTitle: 'Assistant Bot',
      closeLabel: 'Close chat',
      resetLabel: 'File a new grievance',
      selectPlaceholder: '-- Select --',
      nextLabel: 'Next',
      textareaPlaceholder: 'Describe your issue...',
      cameraLabel: 'Take photo',
      cameraChangeLabel: 'Change photo',
      removeImageLabel: 'Remove photo',
      submitLabel: 'Submit',
      sendingLabel: 'Sending...',
      doneReply: 'Thank you! Your grievance has been recorded. We will contact you shortly.',
      errorReply: "Sorry, we couldn't submit that. Please try again.",
      defaultPhotoText: 'Photo sent.',
      steps: [
        {
          bot: "Hello! I'm Gurme Suresh Shetty's assistant bot. I'll need a few details to file your grievance. First, please tell me your name.",
          placeholder: 'Your full name',
        },
        {
          bot: 'Thank you! Now please tell me your phone number.',
          placeholder: '10-digit phone number',
        },
        { bot: 'Select your panchayat.' },
        { bot: 'Select your issue type.' },
        { bot: 'Please describe your issue. You can also attach a photo if needed.' },
      ],
    },
  },
}

function App() {
  const [lang, setLang] = useState('kn')
  const t = content[lang]

  const [index, setIndex] = useState(0)
  const [aboutIndex, setAboutIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sloganIndex, setSloganIndex] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: content.kn.chat.steps[0].bot },
  ])
  const [stepIndex, setStepIndex] = useState(0)
  const [fieldValue, setFieldValue] = useState('')
  const [detailsText, setDetailsText] = useState('')
  const [detailsImage, setDetailsImage] = useState(null)
  const [detailsImagePreview, setDetailsImagePreview] = useState(null)
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

  const stepBase = chatStepsBase[stepIndex]
  const stepText = stepBase ? t.chat.steps[stepIndex] : null
  const currentStep = stepBase && stepText ? { ...stepBase, ...stepText } : null

  const goToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    // Only refresh the greeting if the chat hasn't been used yet
    setChatMessages((m) =>
      m.length === 1 && stepIndex === 0
        ? [{ from: 'bot', text: t.chat.steps[0].bot }]
        : m,
    )
  }, [lang, t, stepIndex])

  useEffect(() => {
    const id = setInterval(() => {
      setSloganIndex((i) => (i + 1) % content.kn.slogans.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [chatMessages, chatOpen])

  useEffect(() => {
    if (!detailsImage) {
      setDetailsImagePreview(null)
      return
    }
    const url = URL.createObjectURL(detailsImage)
    setDetailsImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [detailsImage])

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
    sendBotReply(next < chatStepsBase.length ? t.chat.steps[next].bot : t.chat.doneReply)
  }

  const handleChatFieldSubmit = (e) => {
    e.preventDefault()
    const val = fieldValue.trim()
    if (!val) return
    let displayText = val
    if (currentStep.type === 'select') {
      const idx = currentStep.optionsKn.indexOf(val)
      displayText = (lang === 'en' ? currentStep.optionsEn : currentStep.optionsKn)[idx]
    }
    advanceChatStep(currentStep.key, val, displayText)
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
      setDetailsImage(null)
      setStepIndex(chatStepsBase.length)
      sendBotReply(t.chat.doneReply)
    } catch {
      sendBotReply(t.chat.errorReply)
    } finally {
      setChatSubmitting(false)
    }
  }

  const handleChatDetailsSubmit = (e) => {
    e.preventDefault()
    const text = detailsText.trim() || (detailsImage ? t.chat.defaultPhotoText : '')
    if (!text) return
    submitDetails(text, detailsImage)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDetailsImage(file)
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
    setDetailsImage(null)
    setChatSubmitting(false)
    setChatMessages([{ from: 'bot', text: t.chat.steps[0].bot }])
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen || chatOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, chatOpen])

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % content.kn.taglines.length)
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
        <div className="hero-top-left">
          <div className="hero-brand">
            <img src={bjpLogo} alt={t.meta.bjpAlt} className="hero-logo" />
            <div className="hero-brand-text">
              <p className="hero-brand-name">{t.meta.brandName}</p>
              <p className="hero-brand-role">{t.meta.brandRole}</p>
            </div>
          </div>

          <div className="lang-toggle" role="group" aria-label="Language / ಭಾಷೆ">
            <button
              type="button"
              className={lang === 'kn' ? 'active' : ''}
              onClick={() => setLang('kn')}
            >
              ಕನ್ನಡ
            </button>
            <button
              type="button"
              className={lang === 'en' ? 'active' : ''}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </div>

        <button
          type="button"
          className={`hero-menu${menuOpen ? ' open' : ''}`}
          aria-label={t.meta.menuLabel}
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
            aria-label={t.meta.closeLabel}
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
                <img src={modiLogo} alt={t.meta.modiAlt} />
              </div>
              <div className="nav-overlay-links">
                <ul>
                  {t.nav.map((link) => (
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
                {t.slogans.map((s, i) => (
                  <div
                    key={s.cite}
                    className={`nav-overlay-slogan-slide${
                      i === sloganIndex ? ' active' : ''
                    }`}
                  >
                    <p className="nav-overlay-slogan-sans">{s.sans}</p>
                    <p className="nav-overlay-slogan-kn">{s.meaning}</p>
                    <p className="nav-overlay-slogan-cite">&mdash; {s.cite}</p>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-taglines">
          {t.taglines.map((tl, i) => (
            <div key={tl.rest} className={i === index ? 'active' : ''}>
              <p className="main">
                <span className="accent">{tl.accent}</span> {tl.rest}
              </p>
              <p className="sub">
                <span>{tl.sub}</span>
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
              alt={t.meta.brandName}
              className={i === aboutIndex ? 'active' : ''}
            />
          ))}
        </div>

        <div className="about-text">
          <div className="about-header">
            <p className="about-kicker">{t.about.kicker}</p>
            <h2>
              <span className="accent">{t.meta.brandName}</span>
            </h2>
            <p className="about-role">{t.about.role}</p>
          </div>

          <div className="about-body">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="works-section">
        <div className="works-scroll-wrap" ref={worksWrapRef}>
          <div className="works-sticky">
            <div className="works-heading">
              <p className="works-kicker">{t.works.kicker}</p>
              <h2>{t.works.heading}</h2>
              <p className="works-subtitle">{t.works.subtitle}</p>
            </div>

            <div className="works-track" ref={worksTrackRef}>
              {t.works.items.map((w) => (
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
                      {t.works.readMore}
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
          <p className="gallery-kicker">{t.gallery.kicker}</p>
          <h2>{t.gallery.heading}</h2>
          <p className="gallery-subtitle">{t.gallery.subtitle}</p>
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
                  <img src={g.src} alt={t.meta.brandName} />
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
        <p className="report-kicker">{t.report.kicker}</p>
        <h2 className="report-heading">{t.report.heading}</h2>
        <p className="report-subtitle">{t.report.subtitle}</p>

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
              {year} {t.report.suffix}
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <img src={bjpLogo} alt={t.meta.bjpAlt} className="footer-logo" />
              <div>
                <p className="footer-name">{t.meta.brandName}</p>
                <p className="footer-role">{t.meta.brandRole}</p>
              </div>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
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
            <h4>{t.footer.quickLinks}</h4>
            <nav className="footer-links">
              {t.nav
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
            <h4>{t.footer.contact}</h4>
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
                <span>{t.footer.phone}</span>
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
                <span>{t.footer.email}</span>
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
                <span>{t.footer.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copyright(new Date().getFullYear())}</p>
          <p className="footer-credit">{t.footer.credit}</p>
        </div>
      </footer>

      <div className={`chat-widget${chatOpen ? ' open' : ''}`}>
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-panel-header">
              <span>{t.chat.panelTitle}</span>
              <button
                type="button"
                className="chat-panel-close"
                onClick={() => setChatOpen(false)}
                aria-label={t.chat.closeLabel}
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
                  {t.chat.resetLabel}
                </button>
              )}
            </div>

            {currentStep && currentStep.type !== 'details' && (
              <form className="chat-step-form" onSubmit={handleChatFieldSubmit}>
                {currentStep.type === 'select' ? (
                  <select
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                  >
                    <option value="" disabled>
                      {t.chat.selectPlaceholder}
                    </option>
                    {currentStep.optionsKn.map((val, i) => (
                      <option key={val} value={val}>
                        {(lang === 'en' ? currentStep.optionsEn : currentStep.optionsKn)[i]}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={currentStep.type}
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    placeholder={currentStep.placeholder}
                    autoComplete={currentStep.autoComplete}
                    inputMode={currentStep.type === 'tel' ? 'numeric' : undefined}
                    maxLength={currentStep.type === 'tel' ? 10 : undefined}
                  />
                )}
                <button type="submit" disabled={!fieldValue.trim()}>
                  {t.chat.nextLabel}
                </button>
              </form>
            )}

            {currentStep && currentStep.type === 'details' && (
              <form
                className="chat-details-form"
                onSubmit={handleChatDetailsSubmit}
              >
                {detailsImagePreview && (
                  <div className="chat-image-preview">
                    <img src={detailsImagePreview} alt="" />
                    <button
                      type="button"
                      className="chat-image-remove"
                      onClick={() => setDetailsImage(null)}
                      disabled={chatSubmitting}
                      aria-label={t.chat.removeImageLabel}
                    >
                      &times;
                    </button>
                  </div>
                )}
                <textarea
                  value={detailsText}
                  onChange={(e) => setDetailsText(e.target.value)}
                  placeholder={t.chat.textareaPlaceholder}
                  rows={3}
                  disabled={chatSubmitting}
                />
                <div className="chat-details-actions">
                  <label
                    className={`chat-camera-btn${chatSubmitting ? ' disabled' : ''}`}
                    aria-label={detailsImage ? t.chat.cameraChangeLabel : t.chat.cameraLabel}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 8.5a2 2 0 0 1 2-2h1.2l.8-1.5a1.5 1.5 0 0 1 1.32-.8h5.36a1.5 1.5 0 0 1 1.32.8l.8 1.5H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                      <circle cx="12" cy="12.5" r="3.4" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageSelect}
                      disabled={chatSubmitting}
                      hidden
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={(!detailsText.trim() && !detailsImage) || chatSubmitting}
                  >
                    {chatSubmitting ? t.chat.sendingLabel : t.chat.submitLabel}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="chat-fab-row">
          {!chatOpen && (
            <span className="chat-fab-label" onClick={() => setChatOpen(true)}>
              {t.chat.fabLabel}
            </span>
          )}

          <button
            type="button"
            className="chat-fab"
            onClick={() => setChatOpen((o) => !o)}
            aria-label={t.chat.fabOpenLabel}
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
