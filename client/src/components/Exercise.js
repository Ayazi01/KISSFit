import { useState, useEffect } from 'react';
import styled from 'styled-components';

const  Exercise= ({ _exercise, _number, _total })=> {

    const [exercise, setExercise] = useState(_exercise);
    const [number, setNumber] = useState(_number);
    const [total, setTotal] = useState(_total);

    useEffect(()=> {
        setExercise(_exercise);
        setNumber(_number);
    }, [_exercise]);

    return (
        <>
            <Title>
                <h1>EXERCISE № { number }/{ total } <br/> { exercise.name }</h1>
            </Title>
            <Card style={ { backgroundImage: `url(${exercise.gifUrl}), url('/assets/img/not-found.png')`, backgroundSize: '100% 100%' } }>
                <Target>{ exercise.target }</Target>
            </Card>
        </>
    )
  
}
  
export default Exercise;

const Card = styled.div`
   border: 3px solid #800000;
   border-radius: 5px;
   text-align: center;
   width: 35%;
   height: 100%;
   color: #800000;
   font-size: 30px;
   display: flex;
   position: relative;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   margin-top: 50px;
   @media (max-width: 1110px) {
        width: 50%;
        font-size: 26px;
    }
   @media (max-width: 950px) {
        width: 60%;
        font-size: 26px;
    }
   @media (max-width: 750px) {
        width: 90%;
        font-size: 28px;
   }
`;

const Title = styled.div`
    color: rgba(214,214,202,1);
    text-align: center;
    text-transform: uppercase;
    text-shadow: 3px 1px #800000;
    line-height: 45px;
    width: 100%;
    background: #800000a6;
`;

const Target = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    background: #800000;
    padding: 5px;
    color: #d6d6ca;
    font-size: 22px;
`;