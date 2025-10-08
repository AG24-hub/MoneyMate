import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const line1 = isOpen ? "rotate-45 translate-y-0.5" : ""
  const line2 = isOpen ? "rotate-[-45deg] -translate-y-0.5" : ""
  const showMenu = () => {
    setIsOpen(!isOpen)
  }


  return (
    <div className="w-[400px] h-16 bg-gray-900 flex items-center justify-between px-4">
      <div className="two-dots h-8 w-8 border-2 border-white border-solid rounded-md flex flex-col items-center justify-center gap-0.5" onClick={showMenu}>
        <div className={`${line1} transition-transform duration-300 h-0.5 w-6 bg-white`}></div>
        <div className={`${line2} transition-transform duration-300 h-0.5 w-6 bg-white`}></div>
      </div>

      

      <h1 className="text-2xl font-bold text-white leading-none">MoneyMate</h1>
    </div>
  )
}

export default Navbar
