import { useEffect, useRef } from 'react'
import './Portfolio.css'

function Portfolio() {
  const sliderRef = useRef(null)
  const afterWrapperRef = useRef(null)
  const dividerRef = useRef(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const slider = sliderRef.current
    const after = afterWrapperRef.current
    const divider = dividerRef.current
    if (!slider || !after || !divider) return

    const setPosition = percent => {
      const w = slider.offsetWidth
      const pos = (percent / 100) * w
      after.style.left = pos + 'px'
      divider.style.left = pos + 'px'
      after.style.width = (100 - percent) + '%'
    }

    const moveSlider = x => {
      const rect = slider.getBoundingClientRect()
      let pos = x - rect.left
      if (pos < 0) pos = 0
      if (pos > rect.width) pos = rect.width
      const pct = (pos / rect.width) * 100
      after.style.left = pos + 'px'
      divider.style.left = pos + 'px'
      after.style.width = (100 - pct) + '%'
    }

    const onMouseDown = () => { isDragging.current = true }
    const onMouseUp = () => { isDragging.current = false }
    const onMouseMove = e => { if (!isDragging.current) return; moveSlider(e.clientX) }
    const onTouchStart = e => { isDragging.current = true; e.preventDefault() }
    const onTouchEnd = () => { isDragging.current = false }
    const onTouchMove = e => {
      if (!isDragging.current) return
      moveSlider(e.touches[0].clientX)
      e.preventDefault()
    }

    divider.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    divider.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    setPosition(50)

    return () => {
      divider.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      divider.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  return (
    <>
      <div className="before">
        <section className="tools-section">
          <h2 className="tools-title"><span>BEFORE</span> & AFTER</h2>
          <p className="tools-subtitle">
            There are countless success stories of Solar Saver transformations, but the majority showcase significant improvements in energy efficiency and cost savings.
          </p>
        </section>
      </div>
      <section className="before-after-container" ref={sliderRef}>
        <div className="before-after-img">
          <div className="label before">BEFORE</div>
          <div className="label after">AFTER</div>
          <img src="https://solarsaver.vercel.app/assets/before-slider-5RDoAMwp.webp" className="before-img" alt="Before" />
          <div className="after-wrapper" ref={afterWrapperRef}>
            <img src="https://solarsaver.vercel.app/assets/after-slider-zGc8hDen.webp" className="after-img" alt="After" />
          </div>
          <div className="divider" ref={dividerRef}>
            <div className="handle">⇆</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Portfolio
