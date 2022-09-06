import { createGlobalStyle } from 'styled-components';
 
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Chakra Petch', sans-serif;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(214,214,202,1);
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #800000;
  }
  @-webkit-keyframes rotating {
    from{
        -webkit-transform: rotate(0deg);
    }
    to{
        -webkit-transform: rotate(360deg);
    }
  }
  .loading {
      -webkit-animation: rotating 2s linear infinite;
  }
`;
 
export default GlobalStyles;