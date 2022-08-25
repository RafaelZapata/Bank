import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const Card = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  max-width: 350px;
  height: 25rem;
  padding: 1rem;
  background: ${({theme})=> theme.pages.login.card.background};
  box-shadow: ${({theme})=> theme.pages.login.card.shadow.opacity(0.15)} 0px 48px 100px 0px;
`;

export const Input = styled.input`
  font-size: 1rem;
  font-family: Helvetica, Arial, sans-serif;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({theme})=> theme.pages.login.input.border};
`;

export const Title = styled.h1`
  align-self: center;
  color: ${({theme})=> theme.primary};
`

export const Button = styled.button`
  background: ${({theme})=> theme.primary};
  color: ${({theme})=> theme.light};
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  transition-duration: 0.4s;
  
  &:hover{
    background: ${({theme})=> theme.primary.opacity(0.75)};
  }
`