import styled from 'styled-components';
import { MdCheck, MdRemoveRedEye } from 'react-icons/md';
import { useState } from 'react';

const  SignleWorkout= ({ _number, _viewWorkout, _selectWorkout })=> {


    const [number] = useState(_number);

    return (
        <Card>
            <Target>Mystery</Target>
            <Title>Workout № {number+1}</Title>
            <Icon>
                <MdCheck 
                    size= {28} 
                    color= {"rgb(214,214,202)"} 
                    className= "icon"
                    onClick= { ()=> _selectWorkout(number) }
                />
                <MdRemoveRedEye 
                    size= {28} 
                    color= {"rgb(214,214,202)"} 
                    className= "icon"
                    onClick= { ()=> _viewWorkout(number) }
                />
            </Icon>
        </Card>
    )
}

export default SignleWorkout;

const Card = styled.div`
    background: rgb(214,214,202);
    background: -moz-linear-gradient(45deg, rgba(214,214,202,0.9416141456582633) 0%, rgba(0,0,0,0.6138830532212884) 100%);
    background: -webkit-linear-gradient(45deg, rgba(214,214,202,0.9416141456582633) 0%, rgba(0,0,0,0.6138830532212884) 100%);
    background: linear-gradient(45deg, rgba(214,214,202,0.9416141456582633) 0%, rgba(0,0,0,0.6138830532212884) 100%);
    border: 3px solid #800000;
    border-radius: 5px;
    text-align: center;
    width: 30%;
    height: 47%;
    color: #800000;
    font-size: 30px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (max-width: 950px) {
        width: 47%;
        font-size: 26px;
        }
    @media (max-width: 750px) {
        width: 90%;
        font-size: 28px;
    }
`;

const Title = styled.div`
    background: rgb(214 214 202 / 79%);
    padding: 5px 0px;
    width: 100%;
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

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 8px;
    position: absolute;
    bottom: 0px;
    & .icon {
        background: #800000;
        border-radius: 5px 5px 0px 0px;
        padding: 10px;
        cursor: pointer;
    } 
    & .icon:hover {
        background: rgba(128, 0, 0, 0.45);
    }
`;