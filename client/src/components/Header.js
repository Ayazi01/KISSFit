import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {BsFacebook} from "react-icons/bs"

const  Header= ()=> {

  return (
    <Container>
      <HeaderImg>
      <Link to='/'>
        <img src='/assets/img/logo.png' />
      </Link>
      </HeaderImg>
      <TextDiv> For personalized trainings call us at <a href="tel:PHONE_NUM"> +1 (888)-KISSFIT </a> </TextDiv>
      <a href ="/https://www.facebook.com/KissFit-App-100696619460101"> <BsFacebook/></a>
      
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
`;

const HeaderImg = styled.div`
margin-left: 90px;
`

const TextDiv = styled.div`
margin-top: 30px;
margin-right: 60px;
`