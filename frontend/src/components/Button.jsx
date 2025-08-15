import React from 'react'

const Button = ({type,bool,value,clickAction}) => {
  return (
    <div>
      <button type={type}
      onClick={clickAction}
      disabled={bool}
        className="w-full bg-black text-white font-semibold px-2 py-2 rounded-lg hover:cursor-pointer transition"
      >{value}</button>
    </div>
  )
}

export default Button