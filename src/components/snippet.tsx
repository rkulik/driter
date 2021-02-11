import styled from '@emotion/styled';

const Snippet = styled.div<{ isDragging?: boolean }>`
  display: flex;
  justify-content: space-between;
  user-select: none;
  padding: 8px;
  margin-bottom: 16px;
  align-items: stretch;
  align-content: flex-start;
  line-height: 1.5;
  background: #fff;
  border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
`;

export const Clone = styled(Snippet)`
  ~ div {
    transform: none !important;
  }
`;

export const Handle = styled.span`
  display: flex;
  align-items: center;
  align-content: center;
  user-select: none;
  margin: -0.5rem -0.5rem -0.5rem 0.5rem;
  padding: 0.5rem;
  line-height: 1.5;
  background: #fff;
  border-left: 1px solid #ddd;
  color: #000;
  cursor: pointer;
`;

export default Snippet;
