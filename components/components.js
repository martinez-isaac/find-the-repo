import styled from 'styled-components';

const MyContainer = styled.section`
  min-width: 100%;
  padding: 1em;
  background: ${props => props.purpleBack ? '#5b5f8b' : 'none'};
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Container = ({purpleBack, children}) => (
  <MyContainer purpleBack={purpleBack}>
    {children}
  </MyContainer>
);

export {Container};
