import { Link } from "react-router"
import "./footer.css"
const Footer = () => {
  return (
    <div className="footer-main_container ">
      <div className="footer-container container-guttered">
        <div className="footer-body">
          <div className="footer-content">
            <div className="logo">qodex.</div>
            <div className="footer-sitemap">
              <ul>
                <li>
                  <Link>overview</Link>
                </li>
                <li>
                  <Link>features</Link>
                </li>
                <li>
                  <Link>pricing</Link>
                </li>
                <li>
                  <Link>careers</Link>
                </li>
                <li>
                  <Link>help</Link>
                </li>
                <li>
                  <Link>privacy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-newslater">
            <p className="footer-newslater_title">Stay up to date</p>
            <div className="footer-newslater_form">
              <input type="text" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-devider"></div>
        <div className="footer-legal">
          <p className="footer-legal_copyright">
            &copy; 2025 Qodex. All rights reserved.
          </p>
          <ul className="footer-legal_links">
            <li>
              <Link>Terms</Link>
            </li>
            <li>
              <Link>Privacy</Link>
            </li>
            <li>
              <Link>Cookies</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
