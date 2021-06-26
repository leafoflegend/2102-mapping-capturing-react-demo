import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const NavButton = ({ name }) => {
  const history = useHistory();

  return (
    <Button
      color={'info'}
      outline
      style={{
        margin: '0 3px',
      }}
      onClick={() => {
        history.push(`/${name}`);
      }}
    >
      {name}
    </Button>
  );
}

export default NavButton;
