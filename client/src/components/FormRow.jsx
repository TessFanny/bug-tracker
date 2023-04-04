const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
      <div className=' mb-[1rem]'>
        <label htmlFor={name} className=' block mb-[0.5rem] capitalize text-[0.875rem] tracking-[1px] '>
          {labelText || name}
        </label>
  
        <input
        id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className=' w-full py-[0.375rem] px-[0.75rem]  rounded-[0.25rem] border-[1px] border-[#bcccdc] h-[35px] bg-[#f0f4f8] '
        />
      </div>
    );
  };
  
  export default FormRow;