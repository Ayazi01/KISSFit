import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getAllExercisesByBodyPart } from '../services/exercises';
import SingleExercise from './SingleExercise';
import { useNavigate } from 'react-router-dom';
import { IoMdFitness } from 'react-icons/io';
import { MdClose } from 'react-icons/md';

let exercises = [];

const  RandomExercises= ({ _setLoading, _mistery })=> {

   const location = useLocation();
   const params = useParams();
   const navigate = useNavigate();

   const [bodyPart] = useState(params.bodyPart);
   const [workoutTime] = useState(location.state?.workoutTime);
   const [randomExercises, setRandomExercises] = useState([]);
   const [newExercises, setNewExercises] = useState([]);
   const [usedExercises, setUsedExercises] = useState([]);
   const [replacing, setReplacing] = useState(false);
   const [currentReplace, setCurrentReplace] = useState('');
   const [currentOldExerciseId, setCurrentOldExerciseId] = useState(null);

// get random exercises from server
   const initializeExercises = async ()=> {
      _setLoading(true);
      exercises = await getAllExercisesByBodyPart(bodyPart, workoutTime);
      setRandomExercises(exercises.data.random);
      _setLoading(false);
   }

// confirm exercise replacement 
   const confirmReplaceExercise= (newExercise)=> {
      let index = 0;
      let holder = randomExercises.filter((e, i)=>{ if(e.id === currentOldExerciseId)index=i; return e.id !== currentOldExerciseId });
      holder.splice(index, 0, newExercise);
      setRandomExercises(holder);
      setReplacing(false);
      setCurrentOldExerciseId(null);
   };

// confirm exercise removal
   const confirmRemoveExercise= (exerciseId)=> {
      let holder = randomExercises.filter((e, i)=>{ return e.id !== exerciseId });
      if(holder.length ===0)navigate("/");
      setRandomExercises(holder);
      setCurrentOldExerciseId(null);
   };

   const closeReplaceModal= ()=> {
      setReplacing(false);
      setCurrentOldExerciseId(null);
   } 

   useEffect(()=> {
      if(location.state === undefined || location.state === null || location.state === ''){
          navigate("/");   
      }
   }, []);

   useEffect(()=> {
      if(!_mistery)
         initializeExercises();
      else
         setRandomExercises(location.state?.workoutExercises)
   }, []);

   useEffect(()=> {
      if(randomExercises.length > 0 && !_mistery){
         const allUniqueExercises = exercises.data.all.filter(e=> !randomExercises.some(r=> r.id === e.id));
         setNewExercises(allUniqueExercises.filter(e=> e.used === false));
         setUsedExercises(allUniqueExercises.filter(e=> e.used === true));
      }
   }, [randomExercises]);

   const startWorkout = ()=> {
      navigate(`/workout/exercise/1`, { state: { exercises: randomExercises } });
   }
    
   return (
      <>
         <Container>
            <Title>
               <h1>{bodyPart ? bodyPart : 'Mystery'} exercises - {randomExercises?.length*5}min</h1>
            </Title>
            <Workout>
               {randomExercises?.map((ex,i)=> {
                  return <SingleExercise key= { 'random_'+i } _exercise= { ex } 
                  _newExercisesLength= { newExercises.length } 
                  _usedExercisesLength= { usedExercises.length }
                  _setReplacing= { setReplacing }
                  _replacing={ replacing }
                  _setCurrentReplace= { setCurrentReplace }
                  _currentOldExerciseId= { currentOldExerciseId }
                  _confirmRemoveExercise= { confirmRemoveExercise }
                  _setCurrentOldExerciseId= { setCurrentOldExerciseId }
                  _readOnly= { _mistery } />;
               })}
            </Workout>
            <ButtonContainer>
               <Button disabled= { randomExercises.length === 0 } onClick= { startWorkout }><IoMdFitness/>&nbsp;START WORKOUT</Button>
            </ButtonContainer>
         </Container>
         {replacing &&
            <ModalBg>
               <Container>
                  <Title>
                     <h1>CHOOSE THE {currentReplace} EXERCISE</h1>
                  </Title>
                  <Workout>
                     {
                        currentReplace === 'new' &&
                        newExercises?.map((ex,i)=> {
                           return <SingleExercise key= { 'new_'+i } _exercise= { ex }
                           _replacing={ replacing }
                           _setReplacing= { setReplacing }
                           _confirmReplaceExercise= { confirmReplaceExercise } />;
                        })
                     }
                     {
                        currentReplace === 'used' &&
                        usedExercises?.map((ex,i)=> {
                           return <SingleExercise key= { 'used_'+i } _exercise= { ex }
                           _replacing= { replacing }
                           _setReplacing= { setReplacing }
                           _confirmReplaceExercise= { confirmReplaceExercise } />;
                        })
                     }   
                  </Workout>
                  <MdClose 
                     size= {35} 
                     color= {"#800000"} 
                     className= "close"
                     onClick= { closeReplaceModal }
                  />
               </Container>
            </ModalBg>
         }
      </>
   )
}

export default RandomExercises;

const Container = styled.div`
   height: 100%;
   display: flex;
   width: inherit;
   flex-direction: column;
   & .close {
      position: absolute;
      cursor: pointer;
   }
   & .close:hover {
      color: rgba(128, 0, 0, 0.65) !important;
   }
`;

const Title = styled.div`
   color: rgba(214,214,202,1);
   text-align: center;
   text-transform: uppercase;
   text-shadow: 3px 1px #800000;
`;

const Workout = styled.div`
   height: 100%;
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
   row-gap: 15px;
   padding: 15px;
   overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: rgba(128, 0, 0, 0.65);
  color: rgba(214,214,202,1);
  height: 80px;
  padding: 15px;
  border: 1px solid rgba(214,214,202,1);
  border-radius: 5px;
  margin: 15px 0px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    background: rgba(128, 0, 0, 0.35);
  }
`;

const ModalBg = styled.div`
   background: #000000f0;
   width: 100%;
   height: calc(100% - 156px);
   top: 84px;
   left: -10px;
   position: fixed;
   display: flex;
   padding: 10px;
   justify-content: center;
`;


