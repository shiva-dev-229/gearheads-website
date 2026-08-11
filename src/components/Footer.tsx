import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import logoImg from '../assets/logos/logo-black-removebg-preview.png'

export default function Footer() {
  return (
    <footer>
      <div>
        <div>
          <img src={logoImg} alt="GEarheads logo" width={32} height={32} />
          <span><em>GE</em>arheads</span>
          <p>
            FTC Team #16460 — Brookfield, Wisconsin. Building competitive robots and bringing STEM
            to our community since 2017.
          </p>
        </div>

        <div>
          <span>Team</span>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/team">Meet the Team</Link></li>
            <li><Link to="/about/awards">Awards</Link></li>
            <li><Link to="/join">Join</Link></li>
          </ul>
        </div>

        <div>
          <span>Design</span>
          <ul>
            <li><Link to="/engineering">Mechanical</Link></li>
            <li><Link to="/programming">Software</Link></li>
          </ul>
        </div>

        <div>
          <span>Community</span>
          <ul>
            <li><Link to="/outreach">Outreach</Link></li>
            <li><Link to="/impact">Impact</Link></li>
            <li><Link to="/sponsors">Sponsors</Link></li>
            <li><Link to="/media">Media</Link></li>
          </ul>
        </div>

        <div>
          <span>Connect</span>
          <ul>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <a href="https://instagram.com/ftcgearheads16460" target="_blank" rel="noopener noreferrer">
                @ftcgearheads16460
              </a>
            </li>
            <li>
              <a href="https://youtube.com/@ftcgearheads" target="_blank" rel="noopener noreferrer">
                @ftcgearheads
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <p>© 2026 FTC GEarheads #16460. All rights reserved.</p>
        <a href="https://github.com/shiva-dev-229" target="_blank" rel="noopener noreferrer">
          <FaGithub />
          Developed by @shiva-dev-229
        </a>
      </div>
    </footer>
  )
}
