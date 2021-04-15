import React from 'react';
import { Route, Switch } from 'react-router';
import EmployeeList from './list/EmployeeList';
import EmployeeAdd from './add/EmployeeAdd';

const EmployeeRouter = ({match}) => {
  return (
    <Switch>
      <Route exact path={`${match.path}`} component={EmployeeList} />
      <Route path={`${match.path}/register/:id`} component={EmployeeAdd} />
      <Route path={`${match.path}/register`} component={EmployeeAdd} />
    </Switch>
  )
}

export default EmployeeRouter;
