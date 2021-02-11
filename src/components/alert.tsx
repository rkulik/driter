import React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';

type AlertType = 'success' | 'info' | 'warning' | 'error';

const success = css`
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
`;

const info = css`
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
`;

const warning = css`
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
`;

const error = css`
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
`;

const AlertContainer = styled.div<{ type: AlertType }>`
  padding: 8px 15px;
  ${props => props.type === 'success' && success}
  ${props => props.type === 'info' && info}
  ${props => props.type === 'warning' && warning}
  ${props => props.type === 'error' && error}
`;

const Alert = ({ message, type }: { message: string; type: AlertType }) => (
  <AlertContainer type={type}>{message}</AlertContainer>
);

export default Alert;
