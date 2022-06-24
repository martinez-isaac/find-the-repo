import Image from 'next/image';
import styled from 'styled-components';
import cat from './001FTRpet.png';
import { Container } from '../index';

//agregar PropTypes y props para checkar si necesita boton volver atras

const H1 = styled.h1`
  font-size: 1.5em;
  text-align: rigth;
  color: #dbe2e3;
  margin: .2em;
`;

const MyHead = ({children}) => (
  <Container purpleBack={true}>
      <Image height={23} width={24} src={cat} alt="Pet FIND THE REPO" />
      <H1>{children}</H1>
  </Container>
);

export default MyHead;
