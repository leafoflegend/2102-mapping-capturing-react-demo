import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import Department from './components/department';
import Complaints from "./components/complaints";

const app = document.getElementById('app');

const Root = () => {
  const [navItems, setNavItems] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(async () => {
    const { data: { departments } } = await axios.get('/api/departments');
    const { data: { complaints } } = await axios.get('/api/complaints');

    const departmentNames = departments.map(({ name }) => name);

    setComplaints(complaints);
    setNavItems(departmentNames);
  }, [])

  const addComplaint = async (complaint, department) => {
    const date = (new Date()).getUTCMilliseconds();

    const complaintToShip = {
      content: complaint,
      departmentName: department,
      date,
    };

    const { data: complaints } = await axios.post('/api/complaints', complaintToShip);

    setComplaints(complaints);
  };

  return (
    <HashRouter>
      <NavBar navItems={navItems} title={'Complaint Application'} />
      <Switch>
        <Route path={'/'} exact>
          <h1>Home</h1>
        </Route>
        {
          navItems.map((departmentName, idx) => {
            return (
              <Route path={`/${departmentName}`} exact key={idx}>
                <Department addComplaint={addComplaint} />
              </Route>
            );
          })
        }
        <Route path={'/Complaints'} exact>
          <Complaints complaints={complaints} />
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </HashRouter>
  );
};

ReactDOM.render(<Root />, app);
