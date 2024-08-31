import React from 'react';
import {
  Container,
  Header,
  Title,
  Subtitle,
  MainContent,
  ConsultButton,
  Footer,
  Content
} from './HomePageComponent.styles';
import { useNavigate } from 'react-router-dom';


const HomePageComponent = () => {
  const navigate = useNavigate();

 const handleButtonClick=()=> {
  navigate('/contratos');
 };


  return (
    <Container>
      <Content>
      <Header>
        <Title>Bem Vindo ao Portal de Consulta de Contratos Públicos!</Title>
        <Subtitle>Clique no botão abaixo e acesse as informações de contratos.</Subtitle>
      </Header>

      <MainContent>
        <ConsultButton onClick={handleButtonClick}>Consultar Contratos</ConsultButton>
      </MainContent>

      <Footer>
        <p>Desenvolvido para o processo seletivo NUTI - 2024</p>
      </Footer>
      </Content>
    </Container>
  );
};

export default HomePageComponent;
