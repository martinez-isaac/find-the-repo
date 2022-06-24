import { Form, Icon, Section, Button } from 'react-bulma-components';
import { MdSearch } from 'react-icons/md';

const Search = ({
  page, 
  handleInputChange, 
  busqueda, 
  handleInputSubmit
}) => {
  return (
  <Section>
    <Form.Control>
      <Form.Input
        name="busqueda"
        type="text"
        value={busqueda || ''}
        placeholder={page === 'user' ? 'nombre de usuario/a' : 'nombre de repositorio'}
        onChange={e => handleInputChange(e.target.value)}
      />
      <Icon align="left">
        <MdSearch/>
      </Icon>
    </Form.Control>
    <Button 
      fullwidth 
      disabled={busqueda === ''}
      color='link' 
      onClick={() => handleInputSubmit()}
    > 
      Buscar
    </Button>
  </Section>
  );
};

export default Search;
