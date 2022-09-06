import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MdLoop, MdClose, MdCheck, MdDeleteForever } from 'react-icons/md';

const  SingleExercise= ({ 
                           _exercise,
                           _newExercisesLength, 
                           _usedExercisesLength, 
                           _replacing, _setReplacing,  
                           _setCurrentReplace, 
                           _confirmReplaceExercise,
                           _currentOldExerciseId,
                           _setCurrentOldExerciseId,
                           _confirmRemoveExercise,
                           _readOnly
                        })=> {

   const [exercise, setExercise] = useState(_exercise);
   const [isReplacable, setReplacable] = useState(false);

   useEffect(()=> {
      setExercise(_exercise);
   }, [_exercise]);

   useEffect(()=> {
      if(_currentOldExerciseId !== exercise.id)
      setReplacable(false);
   }, [_currentOldExerciseId]);

   const replaceExercise= ()=> {
      setReplacable(true);
      _setCurrentOldExerciseId(exercise.id);
   };

   const removeExercise= ()=> {
      if(window.confirm("Are you sure you want to delete this exercise?")){
         _confirmRemoveExercise(exercise.id);
      }
   };

   const cancelReplaceExercise= ()=> {
      setReplacable(false);
      _setCurrentOldExerciseId(null);
   };

   const getAllNewOrUsedExercises= (isUsed)=> {
      _setReplacing(true);
      if(isUsed){ 
         _setCurrentReplace('used');
      }else{
         _setCurrentReplace('new');
      }
   };

   return (
      <Card style={ { backgroundImage: `url(${exercise.gifUrl}), url('/assets/img/not-found.png')`, backgroundSize: 'cover' } }>
         <Target>{ exercise.target }</Target>
         <Title>{ exercise.name }</Title>
         {
            (!_replacing && !_readOnly) &&
            <Icon>
               {
                  !isReplacable &&
                  <>
                     <MdLoop 
                     size= {28} 
                     color= {"rgb(214,214,202)"} 
                     className= "icon"
                     onClick= { replaceExercise }
                     />
                     <MdDeleteForever 
                        size= {28} 
                        color= {"rgb(214,214,202)"} 
                        className= "icon"
                        onClick= { removeExercise }
                     />
                  </>
               }
               {
                  isReplacable &&
                  <>
                     <MdClose 
                        size= {28} 
                        color= {"rgb(214,214,202)"} 
                        className= "icon"
                        onClick= { cancelReplaceExercise }
                     />
                     <Button disabled= { _newExercisesLength === 0 } onClick= { ()=> getAllNewOrUsedExercises(false) }>NEW { '( '+_newExercisesLength+' )' }</Button>
                     <Button disabled= { _usedExercisesLength ===0 } onClick= { ()=> getAllNewOrUsedExercises(true) }>USED { '( '+_usedExercisesLength+' )' }</Button>
                  </>
               }
            </Icon>
         }
         {
            _replacing &&
            <Icon>
               <MdCheck 
                  size= {35} 
                  color= {"rgb(214,214,202)"} 
                  className= "icon"
                  onClick= { ()=> { _confirmReplaceExercise(exercise) } }
               />
            </Icon>
         }
      </Card>
   )
}

export default SingleExercise;

const Card = styled.div`
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

const Button = styled.button`
   padding: 10px;
   border-radius: 5px;
   border: none;
   background: rgba(214,214,202,1);
   color: #800000;
   font-weight: 600;
   cursor: pointer;
   &:hover{
      background: #800000;
      color: rgba(214,214,202,1);
   }
`;