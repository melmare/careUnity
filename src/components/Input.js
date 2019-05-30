import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  border: solid 2px gray;
`;

const InputTextArea = styled.textarea`
  border: solid 2px gray;
  height: 100px;
  width: 300px;
`;

export default function Input({ name, type, required, placeholder }) {
  return (
    <>
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
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};
