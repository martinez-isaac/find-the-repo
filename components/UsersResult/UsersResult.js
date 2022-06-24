import {useState, useEffect} from 'react';
import {
  Card, 
  Image, 
  Media, 
  Heading, 
  Content, 
  Columns, 
  Section, 
  Button,
} from 'react-bulma-components';
import Link from 'next/link';

const UsersResult = ({user}) => {
  const [infoUser, setInfoUser] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const {login, avatar_url, html_url, url} = user;
  
  const masInfo = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setShowInfo(true);
    setInfoUser(data);
  };

  const renderInfo = () => {
    if(Object.keys(infoUser).length > 0 && showInfo) {
      return(
      <>
       <Columns alignContent='center' breakpoint="mobile">
          <Columns.Column size={4}>
            <Heading subtitle>{infoUser.public_repos}</Heading>
            <p>public repos</p>
          </Columns.Column>
          <Columns.Column size={4}>
            <Heading subtitle>{infoUser.followers}</Heading>
            <p >followers</p>
          </Columns.Column>
          <Columns.Column size={4}>
            <Heading subtitle>{infoUser.following}</Heading>
            <p>following</p>
          </Columns.Column>
        </Columns>
        {infoUser.name !== null && infoUser.name !== undefined && <p>Name:{` ${infoUser.name}`}</p>}
        {infoUser.email !== null && infoUser.email !== undefined && <p>Mail:{` ${infoUser.email}`}</p>}
        {infoUser.blog !== null && infoUser.blog !== undefined && infoUser.blog !== '' && <p>Blog:{` ${infoUser.blog}`}</p>}
      </>
      );
    }
  };

  const renderButtons = () => {
    if(!showInfo) return <Button fullwidth onClick={masInfo}>Más información</Button>;
    return <Button fullwidth  onClick={()=> setShowInfo(false)}>Menos información</Button>;
  }

  return(
  <Card style={{ width: 400, margin: 'auto'}}>
    <Card.Content>
      <Media>
        <Media.Item renderAs='figure' align='left'>
          <Image
            size={64}
            alt={`fotografia del usuario github ${login}`}
            src={avatar_url}
            rounded
          />
        </Media.Item>
        <Media.Item>
            <Heading renderAs={Link} href={html_url} size={4}>{`@${login}`}</Heading>
        </Media.Item>
      </Media>
      <Content>
        {renderInfo()}
      </Content>
    </Card.Content>
    <Card.Footer>
      {renderButtons()}  
    </Card.Footer>
  </Card>
  );
};

export default UsersResult;
