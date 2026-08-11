import { Link } from 'react-router-dom'
import robotImg from '../assets/photos/home/robot-removebg-preview.png'

export default function HeroSection() {
  return (
    <section>
      <div>
        <h1>FTC Team GEarheads #16460</h1>

        <p>
          A student-led FIRST Tech Challenge team from Brookfield, Wisconsin — a three-time World
          Championship qualifier that designs and fabricates nearly every part of its robot
          in-house, and reaches 1,000+ students a year through outreach. For us, that outreach
          isn't optional — it's who we are.
        </p>

        <div>
          <a href="https://www.instagram.com/ftcgearheads16460/" target="_blank" rel="noopener noreferrer">
            See Us in Action
          </a>
          <Link to="/contact">Get in Touch</Link>
        </div>

        <div>
          <div>
            <span>3×</span>
            <span>World Championship</span>
          </div>
          <div>
            <span>1,000+</span>
            <span>Students reached / yr</span>
          </div>
          <div>
            <span>9</span>
            <span>Seasons since 2017</span>
          </div>
        </div>
      </div>

      <div>
        <img src={robotImg} alt="Gearheads FTC robot" />
      </div>
    </section>
  )
}
