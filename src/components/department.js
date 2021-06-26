import { useState } from 'react';
import { Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const Department = ({ addComplaint }) => {
  const location = useLocation();
  const [complaint, setComplaint] = useState('');

  const { pathname } = location;

  const dept = pathname.slice(1);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1em',
      }}
    >
      <h1>{dept}</h1>
      <br />
      <h3>Enter your complaint below</h3>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={(event)=> {
          event.preventDefault();
        }}
      >
        <textarea
          style={{
            marginBottom: '5px',
          }}
          onChange={(event) => {
            setComplaint(event.target.value);
          }}
          value={complaint}
        />
        <Button
          onClick={() => {
            if (!complaint) return;

            addComplaint(complaint, dept);
            setComplaint('');
          }}
        >
          Submit Complaint
        </Button>
      </form>
    </div>
  );
}

export default Department;
