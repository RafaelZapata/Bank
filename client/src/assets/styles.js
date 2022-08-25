import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body, html, #root{
    margin: 0;
    padding:0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }

  body{
    background: ${({theme})=> theme.background}
  }

  *{
    font-family: Helvetica, Arial, sans-serif;
    color: ${({theme})=> theme.text.dark}
  }

  input, button, select, textarea, optgroup, option {
    font-family: Helvetica, Arial, sans-serif;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

`