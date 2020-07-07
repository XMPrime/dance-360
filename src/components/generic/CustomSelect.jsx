import React from 'react';
import PropTypes from 'prop-types';
import { findById } from '../../utils/helperFunctions';
// import useForm from 'react-hook-form';

export default function CustomSelect({
  id,
  label,
  options,
  optionText,
  changeFunc,
  defaultOption,
  register,
}) {
  // const { register, handleSubmit, errors } = useForm();
  function handleChange(e, func, data) {
    func(findById(data, e.target.value));
  }
  return (
    <div
      className="label-container"
      style={!label ? { marginTop: 0, marginBottom: 0 } : {}}
    >
      {label && (
        <label className="custom-label" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className="custom-select"
        id={id}
        name={id}
        onChange={(e) => handleChange(e, changeFunc, options)}
        ref={register}
        defaultValue={defaultOption}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {optionText(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

CustomSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  optionText: PropTypes.func.isRequired,
  changeFunc: PropTypes.func.isRequired,
  defaultOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  register: PropTypes.func.isRequired,
};

CustomSelect.defaultProps = {
  label: '',
  defaultOption: '',
};
