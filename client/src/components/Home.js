import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdFitness } from 'react-icons/io';

const Home = ()=> {

  const navigate = useNavigate();
  
  const [bodyParts] = useState(process.env.REACT_APP_BODY_PARTS.split(', '));
  const [selectedBodyPart, setSelectedBodyPart] = useState();
  const [selectedWorkoutTime, setSelectedWorkoutTime] = useState();
  const [maxWorkTime] = useState(process.env.REACT_APP_MAX_WORK_TIME);
  const [generate, setGenerate] = useState(false)

  const selectedBodyPartHandler = (e)=> {
    setSelectedBodyPart(e.target.value);
  }

  const selectedWorkoutTimeHandler = (e)=> {
    setSelectedWorkoutTime(e.target.value);
  }
  
  const suggestExercises = ()=> {
    navigate(`/exercises/${selectedBodyPart}`, { state: { workoutTime: selectedWorkoutTime } });
  }

  const suggestMysteryWorouts = ()=> {
    navigate(`/mystery`);
  }

const GenerateHandler = ()=>{
  setGenerate(true)
}
  return (
    <Container>
      {!generate && <><Background>
        <Button onClick={ GenerateHandler } ><IoMdFitness/>&nbsp; I Wanna make my own workout</Button>
      </Background></>}
      {generate && <Form>
        <Input>
          <label htmlFor="bodyPart" >I wanna work on my :</label>
          <Select name="bodyPart" id="bodyPart" onChange = {(e)=> selectedBodyPartHandler(e)}>
            <option>Select Body Part</option>
            {bodyParts? bodyParts.map((bodyPart, index)=>{ 
            return  <option key={index} value={bodyPart}>{bodyPart}</option>
            }):""}
          </Select>
        </Input>
        <Input>
          <label htmlFor="workoutTime">Doing </label>
          <Select name="workoutTime" id="workoutTime" onChange = { (e)=> selectedWorkoutTimeHandler(e) }>
            <option>Select number of exercises</option>
            { maxWorkTime ?
              [...Array(+maxWorkTime)].map((t,i)=> {
                return <option key={i} value={i+1}>{i+1} ( {(i+1) * 5  } min)</option>;
              }):""
            }
          </Select>
        </Input>
        <Button onClick={ suggestExercises } disabled={ !selectedWorkoutTime && !selectedBodyPart }><IoMdFitness/>&nbsp; LET'S GO ! 💪</Button>
      </Form>}
     {!generate && <><Or>
          <div style={{ marginTop: "60px" }}>OR</div>
      </Or>
      <Background>
        <Button onClick={ suggestMysteryWorouts } ><IoMdFitness/>&nbsp;Give me Mystery Workouts</Button>
      </Background></>}
    </Container>
  )
}

export default Home;

const Or = styled.div`
    height: 100%;
    width: 20%;
    display: flex;
    color: rgb(27,33,55);
    align-items: center;
    justify-content: center;
    font-size: 45px;
    font-weight: bold;
    @media (max-width: 860px) {
      & div {
        margin-top: 20px;
      }
    }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  background: rgb(214,214,202);
  background: -moz-linear-gradient(90deg, rgba(214,214,202,0.7707457983193278) 61%, rgba(1,1,13,0) 100%);
  background: -webkit-linear-gradient(90deg, rgba(214,214,202,0.7707457983193278) 61%, rgba(1,1,13,0) 100%);
  background: linear-gradient(90deg, rgba(214,214,202,0.7707457983193278) 61%, rgba(1,1,13,0) 100%);
  justify-content: space-around;
  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Form = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 860px) {
    width: 100%;
  }
`;

// background: rgb(1,1,13);
//   background: -moz-linear-gradient(90deg, rgba(1,1,13,0) 0%, rgba(128,0,0,0.4290091036414566) 30%);
//   background: -webkit-linear-gradient(90deg, rgba(1,1,13,0) 0%, rgba(128,0,0,0.4290091036414566) 30%);
//   background: linear-gradient(90deg, rgba(1,1,13,0) 0%, rgba(128,0,0,0.4290091036414566) 30%);
const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  @media (max-width: 860px) {
    width: 100%;
    & button {
      margin-top: 20px !important;
    }
  }
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70px;
  font-size: 20px;
  padding: 25px;
  background: rgba(0,0,0,0.5);
  color: rgba(214,214,202,1);
  margin-top: 35px;
  border-radius: 5px;
`;

const Select = styled.select`
  height: 35px;
  background: white;
  border-radius: 5px;
`; 

const Button = styled.button`
  background: rgba(128, 0, 0, 1);
  color: rgba(214,214,202,1);
  padding: 15px;
  border: 1px solid rgba(214,214,202,1);
  border-radius: 5px;
  margin-top: 60px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover{
    background: rgba(128, 0, 0, 0.50);
  }
`;