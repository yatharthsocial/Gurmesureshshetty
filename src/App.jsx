import { useEffect, useState } from 'react'
import bannerImg from './assets/finalbanner.jpg'
import bannerImgMobile from './assets/mobileview-01.jpg'
import bjpLogo from './assets/bjp logo.png'
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

const aboutImages = [
  { src: aboutImg, scale: 0.788 },
  { src: aboutImg2, scale: 1 },
  { src: aboutImg3, scale: 0.877 },
]

function App() {
  const [index, setIndex] = useState(0)
  const [aboutIndex, setAboutIndex] = useState(0)

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
        <img src={bjpLogo} alt="ಬಿಜೆಪಿ" className="hero-logo" />

        <button type="button" className="hero-menu" aria-label="ಮೆನು">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="hero-taglines">
          {taglines.map((t, i) => (
            <div key={t.accent} className={i === index ? 'active' : ''}>
              <p className="main">
                <span className="accent">{t.accent}</span> {t.rest}
              </p>
              <p className="sub">{t.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="about-image">
          {aboutImages.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt="ಗುರ್ಮೆ ಸುರೇಶ್ ಶೆಟ್ಟಿ"
              className={i === aboutIndex ? 'active' : ''}
              style={{ '--img-scale': img.scale }}
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
    </>
  )
}

export default App
