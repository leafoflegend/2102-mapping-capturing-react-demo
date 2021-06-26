import { Card, CardTitle, CardText, CardBody } from 'reactstrap';

const Complaint = ({ complaint, department, date }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag={'h5'}>{`${department} at ${date}`}</CardTitle>
        <CardText>{complaint}</CardText>
      </CardBody>
    </Card>
  );
}

const Complaints = ({ complaints }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em',
      }}
    >
      <h1>Complaints</h1>
      {
        complaints.map(({ complaint, department, date }) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '1em',
              }}
              key={date.toString()}
            >
              <Complaint
                department={department}
                complaint={complaint}
                date={date}
              />
            </div>
          );
        })
      }
    </div>
  );
}

export default Complaints;
