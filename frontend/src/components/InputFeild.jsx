import { useForm } from "react-hook-form"

const InputFeild = ({register,handileOnChange,autoComplete , label,type, id, placeholder }) => {
    return (
    <div>
         {label && (
        <label htmlFor={id} 
        className="capitalize font-semibold block mb-1">
          {label}
        </label>
      )}
            <input
            type={type}
            id={id}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onChange={handileOnChange}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-300 focus:ring-0 placeholder-gray-400"
        />
    </div>
    )
}

export default InputFeild