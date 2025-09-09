
const InputField = ({ label, type, value, onChange, placeholder, ...res }) => (
<div className="relative mt-4">
   <label
    className=" peer-focus:text-blue-600"
  >
    {label}
  </label>
  <input
    type={type}
    onChange={onChange}
    {...res}
    className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-4 pb-1 text-base text-gray-900 focus:border-blue-600 focus:outline-none"
  placeholder={placeholder}
    />
 
</div>


);

export const TextArea = ({ label, type, value, onChange, placeholder, ...res }) => (
  <div className=" flex  flex-col">
    <label className=" font-medium capitalize text-xl ">{label}</label>
    <textarea
      onChange={onChange}
      placeholder={placeholder}
      {...res}
    className="peer w-full border-b-2 border-gray-300 bg-transparent px-2 pt-4 pb-1 text-base text-gray-900 focus:border-blue-600 focus:outline-none"
   />
  </div>
)


export const InputSubmit = ({ type, value }) => (
  <input
    type={type}
    value={value}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               transition duration-200 ease-in-out outline-none mt-3"
  />
);

export default InputField;
