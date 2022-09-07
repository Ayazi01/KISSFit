import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { getMysteryExercises } from '../services/exercises';
import { useNavigate } from 'react-router-dom';
import SingleWorkout from './SingleWorkout';
import SingleExercise from './SingleExercise';
import { MdClose } from 'react-icons/md';

let workouts = [];

const  Mystery= ({ _setLoading })=> {

   const navigate = useNavigate();

   const [randomWorkouts, setRandomWorkouts] = useState([]);
   const [viewing, setViewing] = useState(false);
   const [currentWorkoutNumber, setCurrentWorkoutNumber] = useState(null);

   const initializeExercises = async ()=> {
      _setLoading(true);
      workouts = await getMysteryExercises();
      setRandomWorkouts(workouts.data.mystery);
      _setLoading(false);
   }

   useEffect(()=> {
        initializeExercises();
       console.log("hello")
   }, []);

   const selectWorkout = (num)=> {
        navigate(`/mystery/${num+1}`, { state: { workoutExercises: randomWorkouts[num] } });
   }

   const viewWorkout = (num)=> {
        setViewing(true);
        setCurrentWorkoutNumber(num);
   }

   const closeViewModal= ()=> {
        setViewing(false);
        setCurrentWorkoutNumber(null);
    } 
    
   return (
      <>
        <Container>
            <Title>
                <h1>MYSTERY WORKOUTS</h1>
            </Title>
            <Workout>
                {randomWorkouts?.map((w,i)=> {
                    return <SingleWorkout key= { 'random_'+i } 
                    _number= { i }
                    _viewWorkout= { viewWorkout }
                    _selectWorkout= { selectWorkout } />;
                })}
            </Workout>
        </Container>
        {viewing &&
            <ModalBg>
                <Container>
                    <Title>
                        <h1>MYSTERY WORKOUT № {currentWorkoutNumber+1}</h1>
                    </Title>
                    <Workout>
                        {
                            randomWorkouts[currentWorkoutNumber]?.map((ex,i)=> {
                                return <SingleExercise key= { 'view_'+i } _exercise= { ex }
                                _readOnly= { true } />;
                            })
                        }  
                    </Workout>
                    <MdClose 
                        size= {35} 
                        color= {"#800000"} 
                        className= "close"
                        onClick= { closeViewModal }
                    />
                </Container>
            </ModalBg>
        }
      </>
   )
}

export default Mystery;

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