import styled from "styled-components"
import { Button, Input } from 'antd'

const SearchButton = styled.div`
display: flex;

`
export const VoiceIconButton = styled(Button)`
margin-left: 8px;
color: ${(props) => (props.className === 'listening' ? '#ff4d4f' : '#1890ff')};
background-color: ${(props) =>
  props.className === 'listening' ? '#fff1f0' : 'transparent'};
border: none;
box-shadow: none;
&:hover {
  color: #ff4d4f;
  background-color: #fff1f0;
}
`;
const SearchIconButton = styled(Button)`
    border-radius: 0 4px 4px 0; 
    border-left: 0;

    color: ${(props) => (props.className === 'listening' ? '#ff4d4f' : '#1890ff')};
background-color: ${(props) =>
  props.className === 'listening' ? '#fff1f0' : 'transparent'};

&:hover {
  color: #ff4d4f;
  background-color: #fff1f0;
}
`

const SearchInput = styled(Input) `
    border-radius: 4px 0 0 4px;
    border-right: 0;
    

    &:hover {
        border-color: #d9d9d9;
        
    }
    &:focus{
        border-color: #d9d9d9;
        box-shadow:none;
        
    }

    
    min-width: 300px;
    @media (min-width: 480px) and (max-width: 605px) {
    min-width: 80%;
    @media (max-width: 480px) {
    max-width: 200px;
  }
    
    
    
`
export {SearchButton,SearchIconButton,SearchInput};