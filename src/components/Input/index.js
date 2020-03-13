import React, { useEffect, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

export default function Input({ name, label, mask, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState();

  useEffect(() => {
    if (defaultValue !== null) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      {mask ? (
        <InputMask
          id={fieldName}
          name={fieldName}
          value={value}
          ref={inputRef}
          onChange={({ target: { value } }) => setValue(value)}
          mask={mask}
          {...rest}
        />
      ) : (
        <input
          id={fieldName}
          name={fieldName}
          defaultValue={value}
          ref={inputRef}
          onChange={({ target: { value } }) => setValue(value)}
          {...rest}
        />
      )}

      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </>
  );
}

Input.defaultProps = {
  label: '',
  mask: null,
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  mask: PropTypes.string,
};
