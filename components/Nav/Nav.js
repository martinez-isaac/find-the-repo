import Link from 'next/link';
import styled from 'styled-components';
import {Container} from '../index.js';

const Text = styled.a`
  color: #5b5f8b;
  font-size: .7em;
  text-align: center;
`;

const Tabs = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
`;

const Tab = styled.li`
  text-decoration: none;
  width: 48%;
  justify-content: center;
  border-bottom: ${props => props.isSelected ? '1px solid #5c5f8b' : 'none'};
`;

const TextTabs = styled.h2`
  color: #5b5f8b;
  font-size: 1em;
  text-align: center;
`;

const Nav = ({page}) => (
  <>
  <Container purpleback={false}>
    <Text>Buscar por</Text>
  </Container>
    <Tabs>
      <Tab isSelected={page === 'user'}>
        <Link href='/'>
          <TextTabs>Usuario</TextTabs>
        </Link>
      </Tab>
      <Tab isSelected={page === 'repos'}>
        <Link href='/repos'>
          <TextTabs>Repositorio</TextTabs>
        </Link>
      </Tab>
    </Tabs>
  </>
);

export default Nav;
