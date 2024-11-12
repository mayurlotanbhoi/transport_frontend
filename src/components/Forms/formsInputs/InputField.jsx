import React, { useId, forwardRef } from 'react';

const InputField = forwardRef(({ type = 'text', icon, label, onChange, placeholder, className, errorSms, ...props }, ref) => {
  const id = useId();

  return (

    <div className='col-span-1'>
      <label htmlFor={id} className="mb-2 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          className={` ${className}`}
          ref={ref} // Forward the ref properly
          {...props} // Spread other props (including register ref)
        />
        <span className="absolute right-4 text-[#8E929A] font-bold top-4">
          {icon}
        </span>
      </div>
      {errorSms}
    </div>
  );
});

export default InputField;
