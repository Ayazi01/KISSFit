import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import GlobalStyles from './GlobalStyles';
import RandomExercises from './RandomExercises';
import Workout from './Workout';
import { FiLoader } from 'react-icons/fi';
import { useState } from 'react';
import Mystery from './Mystery';

const App = ()=> {

  const [loading, setLoading] = useState(false);

  return ( 
    <BrowserRouter>
      <GlobalStyles/>
      <Main>
        <Header/>
        <Routes>
          <Route path="/exercises/:bodyPart" element={ <RandomExercises _setLoading= { setLoading } _mistery= { false }/> } />
          <Route path="/workout/exercise/:number" element={ <Workout/> } />
          <Route path="/mystery" element={ <Mystery _setLoading= { setLoading }/> } />
          <Route path="/mystery/:workout" element={ <RandomExercises _mistery= { true } /> } />
          <Route path="/*" element={ <Home/> } />
        </Routes>
        <Footer />
        { loading &&
          <Loading>
            <FiLoader 
              size= {90} 
              color= {"rgb(214,214,202)"} 
              className= "loading"
            />
          </Loading>
        }
      </Main>
    </BrowserRouter>
  )
};

export default App;

const Main = styled.div`
  background: url("/assets/img/bg.png") no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  background: #000000de;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

