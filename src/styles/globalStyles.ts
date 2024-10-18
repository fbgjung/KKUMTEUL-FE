import { createGlobalStyle } from 'styled-components';
import styled from "styled-components";


const GlobalStyles = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    display: flex;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  
  div,
  input {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  
  button {
    border: none;
    cursor: pointer;
  }

`

export default GlobalStyles;

export const Container = styled.div<{color: string}>`
  width: 100vw;
  max-width: 600px;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0;
  position: relative;
`

export const Button = styled.button<{color: string, backcolor: string}>`
  border-radius: 20px;
  background-color: ${({ backcolor }) => backcolor};
  color: ${({ color }) => color};
  width: 600px;
  font-size: 20px;
  height: 64px;
  &:focus {
    outline: none;
  }
`

export const Input  = styled.input<{color: string, inputcolor:string}>`
  border-radius: 16px;
  width: 100%;
  height: 48px;
  margin: 0 auto;
  border: none;
  &:focus {
    outline: 2px solid ${({ color }) => color};
  }
  font-size: 16px;
  background-color: ${({ inputcolor }) => inputcolor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
`

// 관리자 페이지
export const AdminContainer = styled.div`
  width: 100vw;
  background-color: #f3f3f3;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0;
  position: relative;
`

// Select 스타일 컴포넌트 추가
export const Select = styled.select<{color: string, bordercolor: string}>`
  width: 100%;
  height: 48px;
  border-radius: 16px;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ bordercolor }) => bordercolor};
  font-size: 16px;
  padding: 8px;
  &:focus {
    outline: none;
    border-color: ${({ bordercolor }) => bordercolor};
  }
`;

export const TextArea = styled.textarea<{ color: string; inputcolor: string }>`
    border: 1px solid ${({ color }) => color};
    background-color: ${({ inputcolor }) => inputcolor};
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    resize: vertical;
`;