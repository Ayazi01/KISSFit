import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Exercise from './Exercise';
import { markExerciseAsUsed } from '../services/exercises';
import { TbArrowBigLeftLines, TbArrowBigRightLines } from 'react-icons/tb';
import { MdPlayCircleOutline, MdPauseCircleOutline } from 'react-icons/md';
import Countdown from 'react-countdown';

const  Workout= ()=> {

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    const [timeOfExercise, setTimeOfExercise] = useState(Date.now() + (+process.env.REACT_APP_DEFAULT_TIME_OF_EXERCISE_MS));
    const [exercises] = useState(location.state?.exercises);
    const [mappedExercises, setMappedExercises] = useState(location.state?.exercises.map(e=> { return { id: e.id, used: e.used, sets: 0 } }));
    const [number, setNumber] = useState(params.number);
    const [start, setStart] = useState(false);
    const [complete, setComplete] = useState(false);
    const clockRef = useRef();

    useEffect(()=> {
        if(location.state === undefined || location.state === null || location.state === '' 
            || number <= 0 || number > exercises.length){
            navigate("/");   
        }
    }, []);

    useEffect(()=> {
        if(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_WORKOUT) !== JSON.stringify(mappedExercises)){
            localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_WORKOUT,JSON.stringify(mappedExercises));
        }
    }, [mappedExercises]);

    useEffect(()=> {
       setNumber(params.number);
       setComplete(false);
       setTimeOfExercise(Date.now() + (+process.env.REACT_APP_DEFAULT_TIME_OF_EXERCISE_MS));
    }, [params.number]);

    const isArrowDisabled = (way)=> {
        if(start) return true;
        if(way === 'left'){
            if(number > 1 && (complete || mappedExercises[number-2]?.sets > 0 || mappedExercises[number-1]?.sets > 0)) {
                return false;
            }

        }else if(way === 'right'){
            if(number < exercises.length  && (complete || mappedExercises[number]?.sets > 0 || mappedExercises[number-1]?.sets > 0)) {
                return false;
            }
        }
        return true;
    }

    const startExercise= ()=> {
        clockRef.current.start();
    }

    const pauseExercise= ()=> {
        clockRef.current.pause();
    }

    const nextExercise = ()=> {
        if(number < exercises.length && !isArrowDisabled('right'))
        navigate(`/workout/exercise/${+number+1}`, { state: { exercises } });
    }

    const pereviousExercise = ()=> {
        if(number > 1 && !isArrowDisabled('left'))
        navigate(`/workout/exercise/${+number-1}`, { state: { exercises } });
    }

    const countdownRenderer = ({ formatted }) => {
        return <span>{formatted.minutes} min {formatted.seconds} s</span>;
    };

    const onCounterPlay = ()=> {
        setStart(true);
    }

    const onCounterPause = ()=> {
        setStart(false);
    }

    const onCounterComplete = ()=> {
        const newMappedExercise = mappedExercises.map(e=> {
            if(e.id === exercises[number-1].id){
                if(!e.used)markExerciseAsUsed(e.id);
                return { id: e.id, used: true, sets: (+e.sets+1) } 
            }
            return e;
        });
        if ( number == exercises.length ){
           
            window.alert("congrats your workout is finished")
        }
        setMappedExercises(newMappedExercise);
        setTimeOfExercise(Date.now() + (+process.env.REACT_APP_DEFAULT_TIME_OF_EXERCISE_MS));
        setStart(false);
        setComplete(true);
    }

    return (
      <Container>
        {
            (exercises && number > 0 && number <= exercises.length) &&
            <>
                <Exercise _exercise= { exercises[number-1] } _number= { number } _total= { exercises.length }/>
                <Timer>
                    {
                        timeOfExercise &&
                        <Countdown date= { timeOfExercise } 
                            autoStart= { false }
                            renderer= { countdownRenderer }
                            onStart= { onCounterPlay }
                            onPause= { onCounterPause }
                            onComplete= { onCounterComplete }
                            ref= { clockRef }
                        />
                    }
                    {   
                        mappedExercises &&
                        <span className="set">{ mappedExercises[number-1].sets } Sets</span>
                    }
                </Timer>
                <ControlsContainer>
                    <ArrowsContainer>
                        <TbArrowBigLeftLines 
                            size= {75} 
                            className=  {isArrowDisabled("left") ? "arrow disabled" : "arrow"}
                            onClick= { pereviousExercise }
                        />
                    </ArrowsContainer>
                    {   
                        !start &&
                        <MdPlayCircleOutline
                            size= {120} 
                            color= {"rgba(214,214,202,1)"}
                            className= "control"
                            onClick= { startExercise }
                        />
                    }
                    {   
                        start &&
                        <MdPauseCircleOutline
                            size= {120}
                            color= {"rgba(214,214,202,1)"}
                            className= "control"
                            onClick= { pauseExercise }
                        />
                    }
                    <ArrowsContainer>
                        <TbArrowBigRightLines
                            size= {75}
                            className=  {isArrowDisabled("right") ? "arrow disabled" : "arrow"}
                            onClick= { nextExercise }
                        />
                    </ArrowsContainer>
                </ControlsContainer>
            </>
        }
      </Container>
    )
  
}
  
export default Workout;

const Container = styled.div`
    padding-top: 30px;
    height: 100%;
    display: flex;
    width: inherit;
    flex-direction: column;
    align-items: center;
`;

const ControlsContainer = styled.div`
    height: 25%;
    display: flex;
    column-gap: 65px;
    width: inherit;
    align-items: flex-end;
    margin-bottom: 30px;
    @media (max-width: 750px) {
        column-gap: 30px;
     }
    & .arrow:not(.disabled),.control{
        cursor: pointer;
    }
    & .arrow:not(.disabled) {
        color: #00ab07;
    }
    & .arrow.disabled {
        color: #ffffff38;
    }
    & .arrow:not(.disabled):hover{
        color: rgba(214,214,202,1) !important;
    }
    & .control:hover {
        color: #800000 !important;
    }
`;

const ArrowsContainer = styled.div`
    display: flex;
    align-items: center;
    & .slash {
        position: absolute;
    }
    & .slash.reverse {
        transform: scaleX(-1);
    }
`;

const Timer = styled.div`
    color: rgba(214,214,202,1);
    margin-top: 50px;
    font-size: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    background: #800000a6;
    padding: 10px 0px;
    flex-direction: column;
    align-items: center;
    & .set {
        font-size: 20px;
    }
`;