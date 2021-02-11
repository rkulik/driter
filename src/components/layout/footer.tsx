import styled from '@emotion/styled';

const Footer = styled.div`
  padding: 16px 0;
  div {
    display: inline-block;
  }
  & > *:not(:last-child) {
    margin-right: 16px;
  }
  @media (max-width: 920px) {
    width: 100%;
    margin: 16px 0 0;
    div {
      display: block;
      margin-top: 16px;
    }
  }
`;

export default Footer;
