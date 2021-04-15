import React from 'react';
import { Route, Switch } from 'react-router';
import EmployeeList from './list/EmployeeList';
import EmployeeRegister from './register/EmployeeRegister';

const EmployeeRouter = ({match}) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={EmployeeList} />
      <Route path={`${match.path}/register/:id`} component={EmployeeRegister} />
      <Route path={`${match.path}/register`} component={EmployeeRegister} />
    </Switch>
  )
}

export default EmployeeRouter;
