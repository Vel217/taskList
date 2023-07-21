function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="flex items-start flex-col gap-y-2 ">
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <input
        required
        className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type={type}
        value={value}
        onChange={onChange}
        name={label}
        id={label}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
