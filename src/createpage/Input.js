import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label``;

const StyledInput = styled.input`
  border: solid 2px gray;
  margin: 15px;
`;

const InputTextArea = styled.textarea`
  border: solid 2px gray;
  height: 100px;
  margin: 15px;
  width: 300px;
`;

export default function Input({ name, label, type, required, placeholder }) {
  return (
    <Label>
      {label}
      {name === 'description' ? (
        <InputTextArea
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
        />
      ) : (
        <StyledInput
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
        />
      )}
    </Label>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};
