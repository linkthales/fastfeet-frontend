import React, { useRef, useEffect, useState } from 'react';
import Async from 'react-select/async';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

export default function AsyncSelect({
  name,
  label,
  options,
  multiple,
  onChange,
  loadOptions,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef;
    if (!multiple) {
      return selectValue ? selectValue.value : '';
    }

    return selectValue ? selectValue.map(option => option.value) : [];
  }

  const [value, setDefaultValue] = useState();

  useEffect(() => {
    if (defaultValue) {
      if (!multiple && defaultValue.includes) {
        setDefaultValue(
          options.filter(option => defaultValue.includes(option.value))
        );
      }

      setDefaultValue(options.find(option => option.value === defaultValue));
    }
  }, [defaultValue, multiple, options]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
      getValue: reference => {
        if (rest.isMulti) {
          if (!reference.props.value) {
            return [];
          }

          return reference.props.value.map(option => option.value);
        }
        if (!reference.props.value) {
          return undefined;
        }
        return reference.props.value.value;
      },
    });
  }, [fieldName]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Async
        name={fieldName}
        aria-label={fieldName}
        defaultOptions={options}
        isMulti={multiple}
        value={value}
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        onChange={newValue => {
          setDefaultValue(newValue);
          onChange(newValue);
        }}
        ref={ref}
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
        loadingMessage={() => 'Carregando...'}
        {...rest}
      />

      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </>
  );
}

AsyncSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  loadOptions: PropTypes.func,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

AsyncSelect.defaultProps = {
  label: '',
  multiple: false,
  loadOptions: () => {},
  onChange: () => {},
};
