import './Footer.css'

const footerLinks = [
  { href: '#one1', label: 'Pricing' },
  { href: '#two2', label: 'About' },
  { href: '#three3', label: 'Tools' },
  { href: '#four4', label: 'How It Works' },
  { href: '#five5', label: 'Testimonials' },
  { href: '#six6', label: 'FAQ' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="logo">
          <img src="https://solarsaver.vercel.app/assets/logo-CeUqb7XY.png" alt="Logo" />
        </div>
        <ul className="footer-links">
          {footerLinks.map(link => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="footer-middle">
        <p>&copy; 2024 Solar Saver. All rights reserved.</p>
        
      </div>
      <div className="developer">
        Developed by <span>Muhammad Faizan</span>
      </div>
    </footer>
  )
}

export default Footer
