import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  border: solid 2px gray;
  font-family: Helvetica, Arial, Helvetica, sans-serif;
  font-size: 18px;
  width: 100%;
`;

const InputTextArea = styled.textarea`
  border: solid 2px gray;
  height: 30vh;
  width: 100%;
  font-family: Helvetica, Arial, Helvetica, sans-serif;
  font-size: 18px;
`;

export default function Input({
  name,
  type,
  required,
  placeholder,
  value,
  defaultValue,
  onChange
}) {
  return (
    <>
      {name === 'description' ? (
        <InputTextArea
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
        />
      ) : (
        <StyledInput
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      )}
    </>
  );
}
