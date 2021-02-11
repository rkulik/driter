import css from '@emotion/css';
import styled from '@emotion/styled';
import React, { useEffect, useRef } from 'react';

const TTL = 2000;

export type SnackbarType = 'success' | 'info' | 'warning' | 'error';

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

const SnackbarContainer = styled.div<{ type: SnackbarType }>`
  padding: 8px 15px;
  position: fixed;
  top: 16px;
  right: 16px;
  ${props => props.type === 'success' && success}
  ${props => props.type === 'info' && info}
  ${props => props.type === 'warning' && warning}
  ${props => props.type === 'error' && error}
`;

const Handle = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const Snackbar = ({ message, type, handleClose }: { message: string; type: SnackbarType; handleClose: () => void }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleClose();
    }, TTL);

    return () => {
      timeoutRef.current && clearInterval(timeoutRef.current);
    };
  });

  return (
    <SnackbarContainer type={type}>
      {message}
      <Handle onClick={handleClose}>✗</Handle>
    </SnackbarContainer>
  );
};

export default Snackbar;
