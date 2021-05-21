import React from 'react'

const Hero = ({ title, description, bgImg }) => {
  return (
    <div className="bg-image mb-5" style={{ background: `url(${bgImg})` }}>
      <h1 className="mb-0">{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default Hero
