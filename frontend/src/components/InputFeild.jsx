
const InputField = ({ label, type, value, onChange, placeholder , ...res}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
{...res}
      className="border p-2 rounded focus:outline-none"
    />
  </div>
);

export default InputField;