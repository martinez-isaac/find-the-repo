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


const ReposResult = ({repo}) => {
  const {owner, name, html_url, description} = repo;

  return(
    <Link href={html_url}>
    <Card style={{ width: 400, margin: 'auto'}}>
      <Card.Content>
        <Media>
          <Media.Item renderAs='figure' align='left'>
            <Image
              size={64}
              alt={`Avatar del usuario GitHub ${owner.login}`}
              src={owner.avatar_url}
              rounded
            />
          </Media.Item>
          <Media.Item>
            <Heading size={4}>
              {name}
            </Heading>
            {description !== '' && description !== null && (
              <p>{description}</p>
            )}
          </Media.Item>
        </Media>
        <Content>
          <p>{`Creado por ${owner.login}`}</p>
        </Content>
      </Card.Content>
    </Card>
    </Link>
  );
};

export default ReposResult;
