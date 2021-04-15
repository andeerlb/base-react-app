import React, { useEffect, useState } from 'react';
import { getPageablePersonsWithFilter } from '../EmployeeService';
import Datatable from '../../../components/datatable/Datatable';

import { useLoader } from '../../../contexts/LoaderContext';
import HeaderScreen from '../../../components/headerScreen/HeaderScreen';

function Employee ({history, match}) {
  const { showBodyLoader, hideLoader } = useLoader();
  const [ employees, setEmployees ] = useState({});
  const [ filter, setFilter] = useState({
    text: '',
    page: 0,
    size: 10,
    sort: 'firstName,ASC'
  });

  const dataTableColumns = [
    {
      name: 'id',
      attributeObject: 'id',
      orderBy: 'id'
    },
    {
      name: 'Nome',
      attributeObject: 'firstName',
      orderBy: 'firstName'
    },
    {
      name: 'Sobrenome',
      attributeObject: 'lastName',
      orderBy: 'lastName'
    },
    {
      name: 'Genêro',
      attributeObject: 'gender.name',
      orderBy: 'gender.name'
    }
  ];

  const pageablePersonsByName = (text: any, page: any, size: any, sort: any) => {
    setFilter({
      text,
      page,
      sort,
      size
    })
  }

  useEffect(() => {
    showBodyLoader();
    getPageablePersonsWithFilter(filter.text, filter.page, filter.size, filter.sort)
    .then(res => {
      setEmployees(res.data);
    }).finally(() => hideLoader())
  }, [filter])

  const onSelect = (person) => {
    history.push(`${match.path}/register/${person.id}`);
  }

  return (
    <>
      <HeaderScreen title='Lista de colaboradores' onClickRightBtn={() => {history.push(`${match.path}/register`)}} onClickRightBtnText={'NEW_REGISTER'}/>
      <div className='wrapperView'>
      <div className={['container pl-0 pr-0'].join(' ')}>
        <Datatable
          removeBorderRadius={true}
          paddingSearchAndLines={true}
          pageable={employees}
          columns={dataTableColumns}
          onSearch={value => pageablePersonsByName(value, 0, filter.size, filter.sort)}
          btnCreateText={'Novo cadastro'}
          onChangePage={page => pageablePersonsByName(filter.text, page, filter.size, filter.sort)}
          onChangeSort={sort => pageablePersonsByName(filter.text, filter.page, filter.size, sort)}
          filter={filter}
          onSelectPageSize={pageSize => pageablePersonsByName(filter.text, 0, pageSize.name, filter.sort)}
          onSelect={onSelect}
        />
      </div>
      </div>
    </>
  )
}

export default Employee;
