import React from 'react'

const Error = ({ error }) => {
  return (
    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      {error}
    </div>
  )
}

export const Success = ({ success }) => {
  return (
    <div className="mb-4 p-3 text-green-700 border border-green-400 rounded-lg">
      {success}
    </div>
  )
}
export default Error