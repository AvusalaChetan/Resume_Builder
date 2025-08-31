
const InputField = ({ label, type, value, onChange, placeholder, ...res }) => (
  <div className="flex flex-col gap-1 mt-4">
    <label className=" font-medium capitalize text-xl">{label}</label>
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      {...res}
      className="border p-2 rounded focus:outline-none"
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
      className="border h-22 w-full mt-2"
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
