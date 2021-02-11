import styled from '@emotion/styled';
import React, { cloneElement, HTMLAttributes, Key, ReactElement, useState } from 'react';

const PanelHeader = styled.div`
  cursor: pointer;
  padding: 12px 16px 12px 40px;
  position: relative;
`;

const PanelArrow = styled.span`
  position: absolute;
  top: 25%;
  left: 16px;
`;

const PanelContent = styled.div`
  padding: 16px 16px 0;
  border-top: 1px solid #d9d9d9;
  background-color: #ffffff;
  overflow: hidden;
`;

const PanelContainer = styled.div`
  border-bottom: 1px solid #d9d9d9;
`;

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  header: string;
  isActive?: boolean;
}

export const Panel = ({ header, isActive, children, onClick, ...props }: PanelProps) => (
  <PanelContainer {...props}>
    <PanelHeader onClick={onClick}>
      {isActive && <PanelArrow>↓</PanelArrow>}
      {!isActive && <PanelArrow>→</PanelArrow>}
      {header}
    </PanelHeader>
    {isActive && <PanelContent>{children}</PanelContent>}
  </PanelContainer>
);

const CollapseContainer = styled.div`
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-bottom: 0;
  user-select: none;
`;

const Collapse = (props: HTMLAttributes<HTMLDivElement> & { children?: ReactElement<PanelProps>[] }) => {
  const [activeKey, setActiveKey] = useState<Key>();

  const handleClick = (key: Key) => {
    if (activeKey === key) {
      setActiveKey(undefined);
    } else {
      setActiveKey(key);
    }
  };

  return (
    <CollapseContainer>
      {props.children?.map((child, index) =>
        cloneElement(child, {
          ...child.props,
          isActive: activeKey === index,
          onClick: () => handleClick(index),
        }),
      )}
    </CollapseContainer>
  );
};

export default Collapse;
