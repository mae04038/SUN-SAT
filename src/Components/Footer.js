import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <MainFooter>
      <div id='sunsatLogo'>copyrightⓒ 2022 All rights reserved by SUN-SAT</div>
    </MainFooter>
  );
}

export default Footer;

const MainFooter = styled.div`
  #sunsatLogo {
    text-align: center;
    background-color: #ddeeb7;
    padding-top: 30px;
    width: 100vw;
    height: 50px;
    bottom: 0;
  }
`;
