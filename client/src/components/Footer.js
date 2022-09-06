import styled from 'styled-components';

const  Footer= ()=> {

  return (
    <Container>KISSFIT 2022 - Developed with <Heart>&nbsp;❤&nbsp;</Heart> by Marouane Wahbi</Container>
  )

}

export default Footer;

const Container = styled.div`
  background: rgba(214,214,202,1);
  color: rgba(24,30,53,0.8);
  display: flex;
  padding: 0px 10px;
  align-items: center;
  height: 60px;
  @media (max-width: 400px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
  }
`;

const Heart = styled.div`
  color: #800000;
`;