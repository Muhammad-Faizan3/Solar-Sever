import '../Services/Services.css'

const plans = [
  { badge: 'BASIC', icon: 'https://solarsaver.vercel.app/assets/png1-CHwXHQYP.svg', title: 'STANDARD', subtitle: 'PLAN', desc: 'Efficient and affordable solar solutions for every Household. Perfect for Residential use.', features: ['Up to 5kW System', 'Basic Monitoring', '1 Year Warranty'], price: '$1.50', unit: '/ watt', popular: false },
  { badge: 'POPULAR', icon: 'https://solarsaver.vercel.app/assets/png2-BdZxoh61.svg', title: 'PREMIUM', subtitle: 'PLAN', desc: 'Advanced solar technology designed for maximum energy savings. Ideal for larger Homes and Estates.', features: ['Up to 10kW System', 'Advanced Monitoring', '5 Year Warranty', 'Battery Ready'], price: '$1.75', unit: '/ watt', popular: true },
  { badge: 'PRO', icon: 'https://solarsaver.vercel.app/assets/png3-DQyZYqFR.svg', title: 'COMMERCIAL', subtitle: 'PLAN', desc: 'High-capacity solar systems tailored for Businesses and Enterprises. Reliable and Robust solutions.', features: ['Up to 50kW System', 'Premium Monitoring', '10 Year Warranty', 'Battery Included', 'Tax Credit Help'], price: '$2.00', unit: '/ watt', popular: false },
]

function PricingSection() {
  return (
    <>
      <div className="transper">
        <h1 id="one1">TRANSPARENT PRICING</h1>
      </div>
      <div className="cards">
        {plans.map((plan, i) => (
          <div key={i} className={`plan-card tilt-card ${plan.popular ? 'popular' : ''}`}>
            <div className={`plan-badge ${plan.popular ? 'popular-badge' : ''}`}>{plan.badge}</div>
            <div className="icon"><img src={plan.icon} alt="solar-icon" /></div>
            <h2><span>{plan.title}</span> {plan.subtitle}</h2>
            <p>{plan.desc}</p>
            <div className="features">
              {plan.features.map((f, j) => (
                <p key={j} className="feature-item">&#10003; {f}</p>
              ))}
            </div>
            <h3 className="plan-price">{plan.price} <span className="price-unit">{plan.unit}</span></h3>
            <button>Calculate Solar</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default PricingSection
