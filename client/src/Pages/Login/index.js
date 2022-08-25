import { Container, Card, Input, Title, Button} from "./styles"
export default function Login(){
  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    alert('foi');
  }

  //add redux
  
  return (
    <Container>
      <Card onSubmit={onSubmit}>
        <Title>Login</Title>
        <Input placeholder="Email" type="email"/>
        <Input placeholder="Senha" type="password"/>
        <Button type="submit">Entrar</Button>
      </Card>
    </Container>  
  )
}