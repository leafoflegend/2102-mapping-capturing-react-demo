import { useState } from 'react';
import faker from 'faker';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import Department from './components/department';
import Complaints from "./components/complaints";

const app = document.getElementById('app');

const createNavItems = (size) => {
  const navItems = [];

  for (let i = 0; i < size; ++i) {
    navItems.push(`${faker.commerce.department()}`);
  }

  return navItems;
}

const Root = () => {
  const [navItems] = useState(createNavItems(3));
  const [complaints, setComplaints] = useState([]);

  const addComplaint = (complaint, department) => {
    const date = new Date();

    const newComplaints = complaints.slice();
    newComplaints.push({
      complaint,
      department,
      date,
    });

    setComplaints(newComplaints);
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
