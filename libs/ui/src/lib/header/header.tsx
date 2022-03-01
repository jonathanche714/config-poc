import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100vw;
`;

const StyledAccount = styled.div`
  padding-right: 20px;
`;

const StyledImg = styled.img`
  padding-left: 20px;
`;

export function Header() {
  return (
    <StyledHeader>
      <StyledImg
        alt="logo"
        height={80}
        width={80}
        src="https://admin.shipt.com/img/menu/shipt-logo.svg"
      />
      <StyledAccount>My account</StyledAccount>
    </StyledHeader>
  );
}

export default Header;
