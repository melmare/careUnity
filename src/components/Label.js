import styled from 'styled-components';
import React from 'react';

const StyledLabel = styled.label``;

export default function Label({ htmlFor, label }) {
  return <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>;
}
