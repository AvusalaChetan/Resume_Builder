import React from 'react'

const Button = ({type,bool,value}) => {
  return (
    <div>
      <button type={type}
      disabled={bool}
        className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:cursor-pointer transition"
      >{value}</button>
    </div>
  )
}

export default Button