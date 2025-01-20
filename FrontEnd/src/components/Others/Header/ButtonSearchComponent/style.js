import styled from "styled-components"
import { Button, Input } from 'antd'

const SearchButton = styled.div`
display: flex;
`
 
const SearchIconButton = styled(Button)`
    border-radius: 0 4px 4px 0; 
    border-left: 0;

    &:hover{
        color: #d9d9d9 ;
        border-color: #d9d9d9 !important;
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