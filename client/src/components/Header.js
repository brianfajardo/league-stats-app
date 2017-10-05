import React from 'react'
import { Icon } from 'semantic-ui-react'

const Header = () => (
  <div className="header">
    <h1>
      <Icon name="eye" /> how much do you actually see?
    </h1>
    <p>
      Despite not providing any combat stats, they’re incredibly powerful. Wards
      provide vision, vision is information, and information is power. Warding
      allows you to take fewer risks: less face-checking, getting ganked, and
      throwing at Baron. Check out how much warding affects your 15 most recent
      ranked games!
    </p>
  </div>
)

export default Header
