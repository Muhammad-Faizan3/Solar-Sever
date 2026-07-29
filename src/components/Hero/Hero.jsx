import './Hero.css'

function Hero() {
  return (
    <div className="does">
      <h1 id="hero-heading">
        <span>Does Your Home </span>Need Quality <br />Solar Panel Installation?
      </h1>
      <p>Trust our experienced solar power experts to customize the perfect solution for your home.</p>
      <button>Calculate Solar</button>
      <div className="image" id="hero-image-3d">
        <img
          src="https://solarsaver.vercel.app/assets/cover-C4PYW05n.webp"
          alt="Solar panels on home"
        />
      </div>
    </div>
  )
}

export default Hero