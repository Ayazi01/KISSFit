import { Link } from 'react-router-dom';
import styled from 'styled-components';

const  Header= ()=> {

  return (
    <Container>
      <HeaderImg>
      <Link to='/'>
        <img src='/assets/img/logo.png' />
      </Link>
      </HeaderImg>
      <TextDiv> For personalized trainings call us at <a href="tel:PHONE_NUM"> +1 (888)-KISSFIT </a> </TextDiv>
      
      
    </Container>
  )

}

export default Header;

const Container = styled.div`
  background: rgba(214,214,202,1);
  display: flex;
  align-items: left;
  justify-content: space-between;
  color: rgba(24,30,53,0.8);
  height: 90px;
  @media (max-width: 860px){
    flex-direction: column;
    align-items: center;
    padding: 5px;
    height: fit-content;
  }
`;

const HeaderImg = styled.div`
margin-left: 90px;
@media (max-width: 860px){
    margin: 0px;
  }
`

const TextDiv = styled.div`
margin-top: 30px;
margin-right: 60px;
text-align: center;
@media (max-width: 860px){
    font-size: 14px;
    margin: 0px;
  }
`