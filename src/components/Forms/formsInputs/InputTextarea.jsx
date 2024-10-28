import React, { forwardRef, useId } from 'react';

const InputTextarea = forwardRef(({ type = 'text', icon, label, value, onChange, placeholder, className, ...props }, ref) => {
  const id = useId();
  return (
    <div className='col-span-1'>
      <label htmlFor={id} className="mb-1.5 mt-3 block font-medium  dark:text-white">
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={` ${className}`}
          ref={ref} // This line allows the ref to be passed down
          {...props}
        />
        <span className="absolute right-4 text-[#8E929A] font-bold top-4">
          {icon}
        </span>
      </div>

    </div>
  );
});


{/* <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <FaPhone className="text-gray-500" size={22} />
                    </span>
                  </div>
                </div> */}

export default InputTextarea;
