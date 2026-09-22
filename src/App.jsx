import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import bannerImg from './assets/finalbanner.jpg'
import bannerImgMobile from './assets/mobileview-01.jpg'
import bjpLogo from './assets/bjp logo.png'
import modiLogo from './assets/Modi_Circular_Logos.png'
import hamVideo from './assets/hamvideo.mp4'
import aboutImg from './assets/about-us-section .png'
import aboutImg2 from './assets/final02.png'
import aboutImg3 from './assets/Gurme_Suresh_B&W_Outline_3.png'
import gallery1 from './assets/gallery/IMG-20220218-WA0004.jpg'
import gallery2 from './assets/gallery/IMG-20220221-WA0046.jpg'
import gallery3 from './assets/gallery/IMG-20220221-WA0061.jpg'
import gallery4 from './assets/gallery/IMG-20220221-WA0087.jpg'
import gallery5 from './assets/gallery/IMG-20220221-WA0117.jpg'
import gallery6 from './assets/gallery/IMG-20220826-WA0053.jpg'
import gallery7 from './assets/gallery/IMG-20220911-WA0003.jpg'
import gallery8 from './assets/gallery/IMG-20220911-WA0004.jpg'
import gallery9 from './assets/gallery/IMG-20230227-WA0002.jpg'
import gallery10 from './assets/gallery/IMG-20230304-WA0010.jpg'
import gallery11 from './assets/gallery/IMG-20230517-WA0053.jpg'
import gallery12 from './assets/gallery/IMG-20230529-WA0076.jpg'
import gallery13 from './assets/gallery/IMG-20230715-WA0026.jpg'
import pwdImg from './assets/Public Works Department.jpg'
import mlaFundImg from './assets/MLA Local Area Development Fund, 2023-24 to 2026-27.jpg'
import fisheriesImg from './assets/Fisheries, Ports and Inland Water Transport Department.jpg'
import rdprImg from './assets/Rural Development & Panchayat Raj Department.jpg'
import minorityWelfareImg from './assets/Minority Welfare Department.jpg'
import './App.css'

const aboutImages = [aboutImg, aboutImg2, aboutImg3]

const workIcons = {
  grant: (
    <path d="M3 10h18M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9M9 20v-5h6v5M3 10l2.5-6h13L21 10" />
  ),
}

const newsIcons = {
  clipping: (
    <>
      <path d="M5 4h11a2 2 0 0 1 2 2v12.5a1.5 1.5 0 0 0 1.5 1.5H7a2 2 0 0 1-2-2V4Z" />
      <path d="M18 8h1.5A1.5 1.5 0 0 1 21 9.5V18a2 2 0 0 1-2 2" />
      <path d="M8 8h6M8 11.5h6M8 15h3.5" />
    </>
  ),
  interview: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.7v6.6l5.5-3.3-5.5-3.3Z" fill="currentColor" stroke="none" />
    </>
  ),
  social: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="6" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
}

const galleryImages = [
  { src: gallery1 },
  { src: gallery2 },
  { src: gallery3 },
  { src: gallery4 },
  { src: gallery5 },
  { src: gallery6 },
  { src: gallery7 },
  { src: gallery8 },
  { src: gallery9 },
  { src: gallery10 },
  { src: gallery11 },
  { src: gallery12 },
  { src: gallery13 },
]

// Index-aligned with content.<lang>.funds.categories (same order in kn and en)
const fundsCardImages = [
  pwdImg, // 0: Public Works Department
  mlaFundImg, // 1: MLA Local Area Development Fund
  rdprImg, // 2: Rural Development & Panchayat Raj Department
  minorityWelfareImg, // 3: Minority Welfare Department
  fisheriesImg, // 4: Fisheries, Ports and Inland Water Transport Department
  null, // 5: Social Welfare Department
  null, // 6: Religious Endowment and Muzrai Department
  null, // 7: Minor Irrigation & Groundwater Development Department
  null, // 8: Health Department
  null, // 9: Animal Husbandry & Other Departments
]

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
  'ಕಾಪು ಪುರಸಭೆ',
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
  'Kaup Purasabhe',
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

// Falls back to production so the site still works if VITE_API_BASE_URL is
// unset, but that should never happen in a real deploy — warn loudly so a
// missing env var is caught immediately instead of silently hitting prod.
if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
  console.warn(
    'VITE_API_BASE_URL is not set — falling back to the production API. Set it in frontend/.env.',
  )
}
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
      relatedFunds: 'ಸಂಬಂಧಿತ ಅನುದಾನ ವಿವರ',
      grantsCategory: 'ಅನುದಾನ ವಿವರ',
      grantsDesc: 'ಈ ಇಲಾಖೆಯಡಿ ಕಾಪು ವಿಧಾನ ಸಭಾ ಕ್ಷೇತ್ರಕ್ಕೆ ಮಂಜೂರಾದ ಅನುದಾನದ ಸಂಪೂರ್ಣ ವಿವರಕ್ಕಾಗಿ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    },
    gallery: {
      kicker: 'ಗ್ಯಾಲರಿ',
      heading: 'ಫೋಟೋ ಗ್ಯಾಲರಿ',
      subtitle: 'ಕ್ಷೇತ್ರದ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಭೇಟಿಗಳ ಕೆಲವು ಕ್ಷಣಗಳು.',
    },
    funds: {
      categories: [
        {
          title: 'ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ',
          items: [
            'ರಾಜ್ಯ ಹೆದ್ದಾರಿ ಹಾಗೂ ಜಿಲ್ಲಾ ರಸ್ತೆಗಳ ಅಭಿವೃದ್ಧಿ, ಸೇತುವೆಗಳ ನಿರ್ಮಾಣಕ್ಕೆ 1832.67 ಲಕ್ಷ (18.32 ಕೋಟಿ) ಅನುದಾನ ಬಿಡುಗಡೆ ಆಗಿರುತ್ತದೆ.',
            'ಕಿರು ಸೇತುವೆ ಮತ್ತು ಕಾಲು ಸಂಕಗಳಿಗೆ 185.00 ಲಕ್ಷ (1.85 ಕೋಟಿ) ಅನುದಾನ ಬಿಡುಗಡೆ.',
            'ಸಿ.ಆರ್.ಐ.ಎಫ್ ಅನುದಾನದಲ್ಲಿ ರೂ 600.00 ಲಕ್ಷ (6.00 ಕೋಟಿ) ಅನುದಾನ ಬಿಡುಗಡೆಗೊಂಡಿರುತ್ತದೆ.',
            '2025-26ನೇ ಸಾಲಿನ ಮುಖ್ಯ ಮಂತ್ರಿ ಮೂಲ ಭೂತ ಸೌಕರ್ಯ ಯೋಜನೆಯಡಿ 3.00 ಕೋಟಿ ಅನುದಾನ ಮಂಜೂರು.',
          ],
        },
        {
          title: '2023-24 ರಿಂದ 2026-27ರವರೆಗೆ ಶಾಸಕರ ಸ್ಥಳೀಯ ಪ್ರದೇಶಾಭಿವೃದ್ಧಿ ನಿಧಿ',
          items: [
            '2023-24ನೇ ಸಾಲಿನ ಶಾಸಕರ ಸ್ಥಳೀಯ ಪ್ರದೇಶಾಭಿವೃದ್ಧಿ ನಿಧಿ ಯೋಜನೆಯಲ್ಲಿ 200 ಲಕ್ಷ ಅನುದಾನ.',
            '2024-25ನೇ ಸಾಲಿನ ಶಾಸಕರ ಸ್ಥಳೀಯ ಪ್ರದೇಶಾಭಿವೃದ್ಧಿ ನಿಧಿ ಯೋಜನೆಯಲ್ಲಿ 200 ಲಕ್ಷ ಅನುದಾನ.',
            '2025-26ನೇ ಸಾಲಿನ ಶಾಸಕರ ಸ್ಥಳೀಯ ಪ್ರದೇಶಾಭಿವೃದ್ಧಿ ನಿಧಿ ಯೋಜನೆಯಲ್ಲಿ 200 ಲಕ್ಷ ಅನುದಾನ.',
            '2026-27ನೇ ಸಾಲಿನಲ್ಲಿ ರೂ 50.00 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆ ಆಗಿರುತ್ತದೆ.',
          ],
        },
        {
          title: 'ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ',
          items: [
            '2024-25ನೇ ಸಾಲಿನಲ್ಲಿ ಲೆಕ್ಕ ಶೀರ್ಷಿಕೆ 5054 ರಡಿಯಲ್ಲಿ ಗ್ರಾಮೀಣ ರಸ್ತೆಗಳ ಅಭಿವೃದ್ಧಿಗೆ ರೂ 10 ಕೋಟಿ ಅನುದಾನ ಮಂಜೂರು.',
            'ಗ್ರಾಮೀಣ ರಸ್ತೆಗಳ ಪ್ರಗತಿ ಪಥ ಯೋಜನೆಯಡಿ 16.04 ಕೋಟಿ ಅನುದಾನ ಮಂಜೂರು.',
            '2025-26ನೇ ಸಾಲಿನ ಲೆಕ್ಕ ಶೀರ್ಷಿಕೆ 5054 ರಡಿ ಗ್ರಾಮೀಣ ರಸ್ತೆಗಳ ಅಭಿವೃದ್ಧಿಗೆ 9.40 ಕೋಟಿ ಅನುದಾನ ಮಂಜೂರು.',
            '2025-26ನೇ ಸಾಲಿನ ಮುಖ್ಯ ಮಂತ್ರಿ ಮೂಲ ಭೂತ ಸೌಕರ್ಯ ಕಾಮಗಾರಿಯಡಿ 15.75 ಕೋಟಿ ಗ್ರಾಮೀಣ ರಸ್ತೆಗಳಿಗೆ ಅನುದಾನ ಮಂಜೂರು.',
            '2026-27ನೇ ಸಾಲಿನ ಲೆಕ್ಕ ಶೀರ್ಷಿಕೆ 3054 ಮುಖ್ಯಮಂತ್ರಿಗಳ ಗ್ರಾಮೀಣ ರಸ್ತೆಗಳ ನಿರ್ವಹಣೆಯಲ್ಲಿ 94.54 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರಾಗಿರುತ್ತದೆ.',
          ],
        },
        {
          title: 'ಅಲ್ಪಸಂಖ್ಯಾತ ಕಲ್ಯಾಣ ಇಲಾಖೆ',
          items: [
            'ಅಲ್ಪಸಂಖ್ಯಾತರ ಕಾಲನಿಗಳ ಸಮಗ್ರ ಅಭಿವೃದ್ಧಿಗೆ ರೂ 3.00 ಕೋಟಿ ಅನುದಾನ ಮಂಜೂರು.',
          ],
        },
        {
          title: 'ಮೀನುಗಾರಿಕಾ, ಬಂದರು ಮತ್ತು ಒಳನಾಡು ಜಲಸಾರಿಗೆ ಇಲಾಖೆ',
          items: [
            'ಪಡುಬಿದ್ರೆ, ಹೆಜಮಾಡಿ, ನಡಿಪಟ್ಟ ಇಲ್ಲಿನ ಸಮುದ್ರ ಕೊರತ ತಡೆಗೋಡೆ ಸಂರಕ್ಷಣೆಗೆ 2023-24ನೇ ಸಾಲಿನಲ್ಲಿ 450 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆ.',
            '2024-25ನೇ ಸಾಲಿನಲ್ಲಿ 118.77 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆಗೊಂಡಿರುತ್ತದೆ.',
            '2024-25ನೇ ಸಾಲಿನಲ್ಲಿ ಮೀನುಗಾರಿಕಾ ಕೊಂಡಿ ರಸ್ತೆಗಳಿಗೆ 100 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆಗೊಂಡಿರುತ್ತದೆ.',
          ],
        },
        {
          title: 'ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆ — ಪ.ಜಾತಿ ಕಾಲನಿಗಳ ರಸ್ತೆಗಳ ಅಭಿವೃದ್ಧಿ',
          items: [
            '2024-25ನೇ ಸಾಲಿನಲ್ಲಿ 400.00 ಲಕ್ಷ ಅನುದಾನ ಪ.ಜಾತಿ ಕಾಲನಿಗಳ ಅಭಿವೃದ್ಧಿಗೆ ಬಿಡುಗಡೆಗೊಂಡಿರುತ್ತದೆ.',
            '2025-26ನೇ ಸಾಲಿನಲ್ಲಿ 350.00 ಲಕ್ಷ ಅನುದಾನ ಪ.ಜಾತಿ ಕಾಲನಿಗಳ ಅಭಿವೃದ್ಧಿಗೆ ಬಿಡುಗಡೆಗೊಂಡಿರುತ್ತದೆ.',
          ],
        },
        {
          title: 'ಧಾರ್ಮಿಕ ದತ್ತಿ ಹಾಗೂ ಮುಜರಾಯಿ ಇಲಾಖೆ',
          items: [
            'ಕಾಪು ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರದ ವಿವಿಧ ಪ್ರಾರ್ಥನಾ ಮಂದಿರಗಳಿಗೆ 2024-25ನೇ ಸಾಲಿನಲ್ಲಿ 30.00 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆಗೊಂಡಿರುತ್ತದೆ.',
            '2025-26ನೇ ಸಾಲಿನ ಮುಖ್ಯ ಮಂತ್ರಿಗಳ ಮೂಲ ಸೌಕರ್ಯ ಅಭಿವೃದ್ಧಿ ಅನುದಾನ ಯೋಜನೆಯಡಿ ಪ್ರಾರ್ಥನಾ ಮಂದಿರದ ಅಭಿವೃದ್ಧಿ ಹಾಗೂ ಸಮುದಾಯ ಭವನ ಕಾಮಗಾರಿಗೆ ರೂ 625.00 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆಗೊಂಡಿರುತ್ತದೆ.',
          ],
        },
        {
          title: 'ಸಣ್ಣ ನೀರಾವರಿ ಹಾಗೂ ಅಂತರ್ಜಲ ಅಭಿವೃದ್ಧಿ ಇಲಾಖೆ — ನದಿದಂಡೆಗಳ ಸಂರಕ್ಷಣೆ',
          items: [
            'ಕಟಪಾಡಿ ಗ್ರಾ.ಪಂ ವ್ಯಾಪ್ತಿಯ ಮೂಡುಬೆಟ್ಟು ಗ್ರಾಮ ಕಟ್ಟೀಕೆರೆ ಕೆರೆ ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗೆ 150.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರಾಗಿರುತ್ತದೆ.',
            'ಕಾಪು ತಾಲೂಕು ತೆಂಕ ಮತ್ತು ಕಾಮಿನಿ ನದಿಯ ಮಧ್ಯ ಹರಿಯುವ ಕಾಮಿನಿ ಹೊಳೆಯ ಹೂಳೆತ್ತಿ ಮತ್ತು ಆಯ್ದ ಭಾಗಗಳಲ್ಲಿ ನದಿ ದಂಡೆ ಸಂರಕ್ಷಣಾ ಕಾಮಗಾರಿಗೆ 200 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರಾಗಿರುತ್ತದೆ.',
            'ಬೈರಂಪಳ್ಳಿ, ಮಣಿಪುರ, ಕಟಪಾಡಿ ಭಾಗಗಳಲ್ಲಿ ನದಿ ದಂಡೆ ಸಂರಕ್ಷಣಾ ಕಾಮಗಾರಿಗೆ 90.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರಾಗಿರುತ್ತದೆ.',
            'ಬಡಗುಬೆಟ್ಟು ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿಯ ನಲ್ಲೂರು ಬೊಮ್ಮು ಪೂಜಾರಿ ಮನೆ ಬಳಿ ಬೈಲು ತೋಡಿಗೆ ಕಿಂಡಿ ಆಣೆಕಟ್ಟು ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಗೆ 73.00 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆ.',
            'ಎಲ್ಲೂರು ಶ್ರೀ ವಿಶ್ವೇಶ್ವರ ದೇವಸ್ಥಾನದ ಉಪಸಾನಿಧ್ಯವಾದ ವೀರಾಂಜನೇಯ ಗುಡಿಯ ಸಮೀಪದ ಕೆರೆ ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗೆ ರೂ 200.00 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆ.',
            'ಉಚ್ಚಿಲ ಶ್ರೀ ಮಹಾಲಿಂಗೇಶ್ವರ ಮಹಾಗಣಪತಿ ದೇವಸ್ಥಾನದ ಪಡು ಬದಿ ತಡೆಗೋಡೆ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಗೆ 50.00 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆ.',
            'ಬಡಾ ಗ್ರಾಮದ 6ನೇ ವಾರ್ಡಿನ ಶ್ರೀ ರಾಮ ಮಂದಿರ ಎಮ್ಮಾಳ್ ಜ್ಯೂನಿಯರ್ ಕಾಲೇಜಿನ ತೋಡಿಗೆ 2 ಬದಿ ತಡೆಗೋಡೆ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಗೆ ರೂ 25.00 ಲಕ್ಷ ಬಿಡುಗಡೆ.',
            'ಉದ್ಯಾವರ ಕೊಪ್ಪಳ ಇಲ್ಲಿನ ರಾಮ ಭಜನಾ ಮಂದಿರದ ಮೂಡು ಬದಿಯಲ್ಲಿ ಮಳೆಯಿಂದ ಕೊರೆತಕ್ಕೊಳಗಾದ ಭಾಗದಲ್ಲಿ ತಡೆಗೋಡೆ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಗೆ ರೂ 50.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
          ],
        },
        {
          title: 'ಆರೋಗ್ಯ ಇಲಾಖೆ',
          items: [
            'ಕೊಡಿಬೆಟ್ಟು ಗ್ರಾ.ಪಂ ವ್ಯಾಪ್ತಿಯ ಕುದಿ ಗ್ರಾಮದ ಅಂಗಾರಕಟ್ಟೆ ಇಲ್ಲಿ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಕೇಂದ್ರ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ 65.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            'ಬೆಳ್ವಾಡಿ ಎಂಬಲ್ಲಿ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಕೇಂದ್ರ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ 65.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            'ಎಲ್ಲೂರು ಗ್ರಾ.ಪಂ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ ರೂ 65.00 ಲಕ್ಷ ಮಂಜೂರು.',
            'ಪಡುಬಿದ್ರೆ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದಲ್ಲಿ ಶೀತಲೀಕೃತ ಶವಗಾರ ನಿರ್ಮಾಣಕ್ಕೆ (ಎಂ.ಆರ್.ಪಿ.ಎಲ್) 8.00 ಲಕ್ಷ ಅನುದಾನ.',
            'ಕಾಪು ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದಲ್ಲಿ ಶೀತಲೀಕೃತ ಶವಗಾರ ನಿರ್ಮಾಣಕ್ಕೆ 18.50 ಲಕ್ಷ ಅನುದಾನ.',
            'ಶಿರ್ವ ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರ ಕಟ್ಟಡದ ದುರಸ್ತಿ ಕಾಮಗಾರಿಗೆ ರೂ 10.00 ಲಕ್ಷ ಅನುದಾನ.',
            'ಕಾಪು ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದ ಉನ್ನತೀಕರಣ ಕಾಮಗಾರಿಗೆ 20.00 ಲಕ್ಷ ಅನುದಾನ.',
            'ಕುತ್ಯಾರು ಎಂಬಲ್ಲಿ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಕೇಂದ್ರ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ 65.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            'ಬೈರಂಪಳ್ಳಿ ಶಿರೂರು 41ರಲ್ಲಿ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಕೇಂದ್ರ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ 65.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            'ಕಾಪು ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರವನ್ನು ಬ್ಲಾಕ್ ಆರೋಗ್ಯ ಕೇಂದ್ರವಾಗಿ ಮೇಲ್ದರ್ಜೆಗೇರಿಸಿ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ 5.75 ಕೋಟಿ ಅನುದಾನ.',
            'ಹೆರೂರು ಎಂಬಲ್ಲಿ ಆರೋಗ್ಯ ಮತ್ತು ಕ್ಷೇಮ ಕೇಂದ್ರ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ 65.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
          ],
        },
        {
          title: 'ಪಶು ಸಂಗೋಪನೆ ಮತ್ತು ಇತರೆ ಇಲಾಖೆಗಳು',
          items: [
            'ಎಲ್ಲೂರು ಗ್ರಾ.ಪಂ ವ್ಯಾಪ್ತಿಯ ಗೋ ರುದ್ರ ಭೂಮಿ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ ರೂ 50.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            'ಎಲ್ಲೂರು ಗ್ರಾ.ಪಂ ವ್ಯಾಪ್ತಿಯ ಗೋ ಶಾಲೆಯ ಸಮೀಪ ಉಗ್ರಾಣ ನಿರ್ಮಾಣಕ್ಕೆ ರೂ 17.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            'ಕೋಟೆ ಕಟಪಾಡಿ ಪಶು ಚಿಕಿತ್ಸಾಲಯ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಗೆ 49.98 ಲಕ್ಷ ಅನುದಾನ ಬಿಡುಗಡೆ.',
            'ಪಿ.ಎಂ. ಜನ್ ಮನ್ ಯೋಜನೆಯಡಿ ಎಂ.ಪಿ.ಸಿ ಕೇಂದ್ರ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ ಐ.ಟಿ.ಡಿ.ಪಿ ಇಲಾಖೆಗೆ ರೂ 60.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            'ಹೆಜಮಾಡಿ ಬಳಿ ಕೆ.ಸೇಫ್-2 ಯೋಜನೆಯಡಿ ಅಗ್ನಿ ಶಾಮಕ ಕಟ್ಟಡ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಗೆ ರೂ 2.33 ಕೋಟಿ ಅನುದಾನ ಬಿಡುಗಡೆ.',
            'ಕಾಪು ಹೆಜಮಾಡಿ ಬಂದರು ನಿರ್ಮಾಣ ಕಾಮಗಾರಿಗೆ 2023-24ರಿಂದ 2025-26ರವರೆಗೆ ರೂ 103.77 ಕೋಟಿ ಅನುದಾನ ಮಂಜೂರು.',
            '2025-26ನೇ ಸಾಲಿನ ಕರಾವಳಿ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರ ಯೋಜನೆಯಡಿ ರೂ 35.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
            '2026-27ನೇ ಸಾಲಿನ ಕರಾವಳಿ ಅಭಿವೃದ್ಧಿ ಪ್ರಾಧಿಕಾರ ಯೋಜನೆಯಡಿ ರೂ 25.00 ಲಕ್ಷ ಅನುದಾನ ಮಂಜೂರು.',
          ],
        },
      ],
    },
    news: {
      kicker: 'ಸುದ್ದಿ',
      heading: 'ಪತ್ರಿಕಾ ವರದಿಗಳು ಮತ್ತು ಸಂದರ್ಶನಗಳು',
      subtitle:
        'ಶಾಸಕ ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ ಅವರ ಇತ್ತೀಚಿನ ಪತ್ರಿಕಾ ವರದಿಗಳು ಮತ್ತು ಸಂದರ್ಶನಗಳ ಸಂಗ್ರಹ.',
      clippingLabel: 'ಪತ್ರಿಕಾ ವರದಿ',
      interviewLabel: 'ಸಂದರ್ಶನ',
      socialLabel: 'ಇನ್‌ಸ್ಟಾಗ್ರಾಂ ಪೋಸ್ಟ್',
      linkLabel: 'ಪೂರ್ಣ ವರದಿ ನೋಡಿ',
      prevLabel: 'ಹಿಂದಿನದು',
      nextLabel: 'ಮುಂದಿನದು',
      items: [
        {
          type: 'interview',
          title:
            "'ಹೋಟೆಲ್ ಕೆಲ್ಸ 30 ವರ್ಷ ಬಳ್ಳಾರಿ ಬದುಕು' ಕರಾವಳಿಗರ ಪ್ರೀತಿಗೆ ಬಿಜೆಪಿ ಶಾಸಕ ಭಾವುಕ ಮಾತು!",
          source: 'ವಿಶ್ವವಾಣಿ ಟಿವಿ',
          date: '',
          link: 'https://www.youtube.com/watch?v=0TauEYTnsOs',
          image: 'https://img.youtube.com/vi/0TauEYTnsOs/hqdefault.jpg',
        },
        {
          type: 'interview',
          title:
            "ಶಾಸಕ ಗುರ್ಮೆ ಮಾತು ಕಡಿಮೆ, ಕೆಲ್ಸ ಜಾಸ್ತಿ 'ಕೈ' ಕೆಣಕಿ ಬಿಜೆಪಿಗೆ ಜೈ ಎಂದ ಕಾಪು ಜನ!",
          source: 'ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ',
          date: '',
          link: 'https://www.youtube.com/watch?v=dDKLPZ-IMIA',
          image: 'https://img.youtube.com/vi/dDKLPZ-IMIA/hqdefault.jpg',
        },
        {
          type: 'interview',
          title: 'ಅಧ್ಯಕ್ಷರೇ ನೀವು ತಾಯಿ ಸ್ಥಾನದಲ್ಲಿದ್ದೀರಿ, ಎಲ್ಲರ ಸಮಸ್ಯೆ ಕೇಳಿ.',
          source: 'ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ',
          date: '',
          link: 'https://youtu.be/mkbXNYpvvoM',
          image: 'https://img.youtube.com/vi/mkbXNYpvvoM/hqdefault.jpg',
        },
        {
          type: 'interview',
          title: 'ಸನ್ಮಾನ್ಯ ಅಧ್ಯಕ್ಷರೇ..! ನೀವು ಗಟ್ಟಿ ಮನಸ್ಸು ಮಾಡಬೇಕು',
          source: 'ಉದಯವಾಣಿ',
          date: '',
          link: 'https://www.youtube.com/watch?v=xElp9HVfgXk',
          image: 'https://img.youtube.com/vi/xElp9HVfgXk/hqdefault.jpg',
        },
      ],
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
        'From infrastructure and civic amenities to youth development and community welfare, his focus remains on practical, lasting change built hand-in-hand with the people of the constituency.',
      ],
    },
    works: {
      kicker: 'Achievements',
      heading: 'Development Works',
      subtitle: 'A look at major development works completed in Kaup.',
      readMore: 'Read More',
      relatedFunds: 'Related Grants & Funds',
      grantsCategory: 'Grants & Funds',
      grantsDesc:
        'Click to view the full list of grants sanctioned for this department in Kaup Assembly Constituency.',
    },
    gallery: {
      kicker: 'Gallery',
      heading: 'Photo Gallery',
      subtitle: 'Moments from constituency programs and visits.',
    },
    funds: {
      categories: [
        {
          title: 'Public Works Department',
          items: [
            'Rs. 1832.67 lakh (Rs. 18.32 crore) released for development of state highways and district roads, and bridge construction.',
            'Rs. 185.00 lakh (Rs. 1.85 crore) released for small bridges and footbridges.',
            'Rs. 600.00 lakh (Rs. 6.00 crore) released under the CRIF grant.',
            'Rs. 3.00 crore sanctioned under the 2025-26 CM’s Basic Infrastructure Scheme.',
          ],
        },
        {
          title: 'MLA Local Area Development Fund, 2023-24 to 2026-27',
          items: [
            'Rs. 200 lakh sanctioned under the MLA Local Area Development Fund for 2023-24.',
            'Rs. 200 lakh sanctioned under the MLA Local Area Development Fund for 2024-25.',
            'Rs. 200 lakh sanctioned under the MLA Local Area Development Fund for 2025-26.',
            'Rs. 50.00 lakh released in 2026-27.',
          ],
        },
        {
          title: 'Rural Development & Panchayat Raj Department',
          items: [
            'Rs. 10 crore sanctioned in 2024-25 under account head 5054 for rural road development.',
            'Rs. 16.04 crore sanctioned under the Rural Roads Pragati Patha scheme.',
            'Rs. 9.40 crore sanctioned in 2025-26 under account head 5054 for rural road development.',
            'Rs. 15.75 crore sanctioned for rural roads under the 2025-26 CM’s Basic Infrastructure works.',
            'Rs. 94.54 lakh sanctioned in 2026-27 under account head 3054 for CM’s rural roads maintenance.',
          ],
        },
        {
          title: 'Minority Welfare Department',
          items: [
            'Rs. 3.00 crore sanctioned for comprehensive development of minority colonies.',
          ],
        },
        {
          title: 'Fisheries, Ports and Inland Water Transport Department',
          items: [
            'Rs. 450 lakh released in 2023-24 for sea erosion protection walls at Padubidri, Hejamadi and Nadipatta.',
            'Rs. 118.77 lakh released in 2024-25.',
            'Rs. 100 lakh released in 2024-25 for fisheries link roads.',
          ],
        },
        {
          title: 'Social Welfare Department — SC Colony Road Development',
          items: [
            'Rs. 400.00 lakh released in 2024-25 for development of Scheduled Caste colonies.',
            'Rs. 350.00 lakh released in 2025-26 for development of Scheduled Caste colonies.',
          ],
        },
        {
          title: 'Religious Endowment and Muzrai Department',
          items: [
            'Rs. 30.00 lakh released in 2024-25 for various places of worship in Kaup constituency.',
            'Rs. 625.00 lakh released under the 2025-26 CM’s Basic Infrastructure Development Grant Scheme for places of worship and community hall works.',
          ],
        },
        {
          title: 'Minor Irrigation & Groundwater Development Department — River Bank Protection',
          items: [
            'Rs. 150.00 lakh sanctioned for Kattikere lake development at Mudubettu village, Katapadi GP.',
            'Rs. 200 lakh sanctioned for desilting of the Kamini river between Thenka and Kamini, and river bank protection at selected stretches, Kaup taluk.',
            'Rs. 90.00 lakh sanctioned for river bank protection works at Bairampalli, Manipura and Katapadi.',
            'Rs. 73.00 lakh released for a check dam on the Bailu creek near Nalluru Bommu Pujari house, Badagubettu Gram Panchayat.',
            'Rs. 200.00 lakh released for lake development near the Veeranjaneya shrine, Sri Vishweshwara Temple, Yellur.',
            'Rs. 50.00 lakh released for a retaining wall at Sri Mahalingeshwara Mahaganapati Temple, Uchila.',
            'Rs. 25.00 lakh released for a retaining wall along the creek near Sri Rama Mandira / MLA Junior College, Ward 6, Bada village.',
            'Rs. 50.00 lakh sanctioned for a retaining wall at the rain-eroded stretch near Rama Bhajana Mandira, Koppala, Udyavara.',
          ],
        },
        {
          title: 'Health Department',
          items: [
            'Rs. 65.00 lakh sanctioned for a Health and Wellness Centre building at Angarakatte, Kudi village, Kodibettu GP.',
            'Rs. 65.00 lakh sanctioned for a Health and Wellness Centre building at Belvadi.',
            'Rs. 65.00 lakh sanctioned for a Health and Wellness Centre building in Yellur Gram Panchayat.',
            'Rs. 8.00 lakh (MRPL) for a refrigerated mortuary at Padubidri Primary Health Centre.',
            'Rs. 18.50 lakh for a refrigerated mortuary at Kaup Primary Health Centre.',
            'Rs. 10.00 lakh for repair works at Shirva Community Health Centre building.',
            'Rs. 20.00 lakh for upgradation works at Kaup Primary Health Centre.',
            'Rs. 65.00 lakh sanctioned for a Health and Wellness Centre building at Kuthyaru.',
            'Rs. 65.00 lakh sanctioned for a Health and Wellness Centre building at Bairampalli Shiroor 41.',
            'Rs. 5.75 crore for upgrading Kaup Primary Health Centre to a Block Health Centre with a new building.',
            'Rs. 65.00 lakh sanctioned for a Health and Wellness Centre building at Heroor.',
          ],
        },
        {
          title: 'Animal Husbandry & Other Departments',
          items: [
            'Rs. 50.00 lakh sanctioned for a cattle cremation ground (Go Rudra Bhoomi) building, Yellur GP.',
            'Rs. 17.00 lakh sanctioned for a godown near the Goshala, Yellur GP.',
            'Rs. 49.98 lakh released for construction of a veterinary dispensary at Kote Katapadi.',
            'Rs. 60.00 lakh sanctioned to the ITDP Department for an MPC centre building under the PM-JANMAN scheme.',
            'Rs. 2.33 crore released for a fire station building near Hejamadi under the K-SAFE-2 scheme.',
            'Rs. 103.77 crore sanctioned for Kaup-Hejamadi port construction works, 2023-24 to 2025-26.',
            'Rs. 35.00 lakh sanctioned under the 2025-26 Coastal Development Authority scheme.',
            'Rs. 25.00 lakh sanctioned under the 2026-27 Coastal Development Authority scheme.',
          ],
        },
      ],
    },
    news: {
      kicker: 'News',
      heading: 'Press Clippings & Interviews',
      subtitle:
        'A collection of recent newspaper coverage and interviews featuring MLA Gurme Suresh Shetty.',
      clippingLabel: 'Press Clipping',
      interviewLabel: 'Interview',
      socialLabel: 'Instagram Post',
      linkLabel: 'View Full Story',
      prevLabel: 'Previous',
      nextLabel: 'Next',
      items: [
        {
          type: 'interview',
          title:
            "'30 Years of Hotel Work, a Life in Ballari' — BJP MLA Gets Emotional Over the Coastal People's Love!",
          source: 'Vishwavani TV',
          date: '',
          link: 'https://www.youtube.com/watch?v=0TauEYTnsOs',
          image: 'https://img.youtube.com/vi/0TauEYTnsOs/hqdefault.jpg',
        },
        {
          type: 'interview',
          title:
            "'Less Talk, More Work' — MLA Gurme Takes a Dig at the 'Hand', Kaup People Hail BJP!",
          source: 'Gurme Suresh Shetty',
          date: '',
          link: 'https://www.youtube.com/watch?v=dDKLPZ-IMIA',
          image: 'https://img.youtube.com/vi/dDKLPZ-IMIA/hqdefault.jpg',
        },
        {
          type: 'interview',
          title:
            "'Madam Chairperson, You Hold a Mother's Place — Listen to Everyone's Problems'",
          source: 'Gurme Suresh Shetty',
          date: '',
          link: 'https://youtu.be/mkbXNYpvvoM',
          image: 'https://img.youtube.com/vi/mkbXNYpvvoM/hqdefault.jpg',
        },
        {
          type: 'interview',
          title: "Honourable Chairperson..! You Must Stay Firm",
          source: 'Udayavani',
          date: '',
          link: 'https://www.youtube.com/watch?v=xElp9HVfgXk',
          image: 'https://img.youtube.com/vi/xElp9HVfgXk/hqdefault.jpg',
        },
      ],
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

  const allWorkCards = t.funds.categories.map((category, idx) => ({
    icon: 'grant',
    image: fundsCardImages[idx] || null,
    category: t.works.grantsCategory,
    title: category.title,
    desc: t.works.grantsDesc,
    fundsIndexes: [idx],
  }))

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
  const [activeWork, setActiveWork] = useState(null)
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
    document.body.style.overflow =
      menuOpen || chatOpen || activeWork !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, chatOpen, activeWork])

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

  const newsTrackRef = useRef(null)

  const scrollNews = (direction) => {
    const track = newsTrackRef.current
    if (!track) return
    const card = track.querySelector('.news-card')
    const amount = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.8
    const maxScroll = track.scrollWidth - track.clientWidth

    if (direction > 0 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (direction < 0 && track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: direction * amount, behavior: 'smooth' })
    }
  }

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
                  href="https://x.com/GurmeSuresh"
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
              {allWorkCards.map((w, i) => (
                <div className="work-card" key={w.title}>
                  <div className="work-image">
                    {w.image ? (
                      <img src={w.image} alt={w.title} />
                    ) : (
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
                    )}
                  </div>
                  <div className="work-card-body">
                    <h3>{w.title}</h3>
                    <button
                      type="button"
                      className="work-read-more"
                      onClick={() => setActiveWork(i)}
                    >
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


      <section id="news" className="news-section">
        <div className="news-heading">
          <p className="news-kicker">{t.news.kicker}</p>
          <h2>{t.news.heading}</h2>
          <p className="news-subtitle">{t.news.subtitle}</p>
        </div>

        <div className="news-slider">
          <div className="news-track" ref={newsTrackRef}>
            {t.news.items.map((n, i) => (
              <a
                className="news-card"
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                key={`${n.title}-${i}`}
              >
                <div className="news-card-media">
                  {n.image ? (
                    <img src={n.image} alt={n.title} />
                  ) : (
                    <div className="news-card-placeholder">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {newsIcons[n.type]}
                      </svg>
                    </div>
                  )}
                  <span className="news-card-badge">
                    {
                      {
                        clipping: t.news.clippingLabel,
                        interview: t.news.interviewLabel,
                        social: t.news.socialLabel,
                      }[n.type]
                    }
                  </span>
                </div>
                <div className="news-card-body">
                  <p className="news-card-meta">
                    {n.date ? `${n.source} · ${n.date}` : n.source}
                  </p>
                  <h3>{n.title}</h3>
                  <span className="news-card-link">
                    {t.news.linkLabel}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="news-slider-controls">
            <button
              type="button"
              className="news-slider-arrow news-slider-arrow-prev"
              aria-label={t.news.prevLabel}
              onClick={() => scrollNews(-1)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              className="news-slider-arrow news-slider-arrow-next"
              aria-label={t.news.nextLabel}
              onClick={() => scrollNews(1)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
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
                href="https://x.com/GurmeSuresh"
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

      {activeWork !== null && allWorkCards[activeWork] && (
        <div className="work-modal-overlay" onClick={() => setActiveWork(null)}>
          <div
            className="work-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="work-modal-close"
              aria-label={t.meta.closeLabel}
              onClick={() => setActiveWork(null)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>

            <p className="work-modal-category">
              {allWorkCards[activeWork].category}
            </p>
            <h3 className="work-modal-title">{allWorkCards[activeWork].title}</h3>
            <p className="work-modal-desc">{allWorkCards[activeWork].desc}</p>

            {allWorkCards[activeWork].fundsIndexes?.length > 0 && (
              <div className="work-modal-funds">
                {allWorkCards[activeWork].fundsIndexes.some(
                  (idx) =>
                    t.funds.categories[idx]?.title !== allWorkCards[activeWork].title,
                ) && <h4>{t.works.relatedFunds}</h4>}
                {allWorkCards[activeWork].fundsIndexes.map((idx) => {
                  const category = t.funds.categories[idx]
                  if (!category) return null
                  const isCardTitle = category.title === allWorkCards[activeWork].title
                  return (
                    <div className="work-modal-fund-group" key={category.title}>
                      {!isCardTitle && (
                        <p className="work-modal-fund-title">{category.title}</p>
                      )}
                      <ul>
                        {category.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

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
