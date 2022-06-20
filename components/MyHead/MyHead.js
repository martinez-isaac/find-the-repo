import Image from 'next/image';
import styled from 'styled-components';
import cat from './001FTRpet.png';

//agregar PropTypes y props para checkar si necesita boton volver atras

const H1 = styled.h1`
  font-size: 1.5em;
  text-align: rigth;
  color: #dbe2e3;
  margin: .2em;
`;

const Container = styled.section`
  min-width: 100%;
  padding: 1em;
  background: #5b5f8b;
  display: flex;
  justify-content: center;
`;

const MyHead = ({children}) => (
  <Container>
      <Image height={23} width={24} src={cat} alt="Pet FIND THE REPO" placeholder="blur"/>
      <H1>{children}</H1>
  </Container>
);

export default MyHead;
