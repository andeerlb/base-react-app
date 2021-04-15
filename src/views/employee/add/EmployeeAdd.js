import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLoader } from '@/contexts/LoaderContext';
import { getAllList as genderList } from '@/views/gender/GenderService';
import { findById, save, deleteById } from '@/api/EmployeeAPI';

import Button from '@/components/button/Button';
import HeaderScreen from '@/components/headerScreen/HeaderScreen';
import Input from '@/components/input/Input';
import { toast } from 'react-toastify';
import Select from '@/components/select/Select';
import styles from './EmployeeAdd.module.css';

function EmployeeAdd({ match, history }){
  const { t, i18n  } = useTranslation();

  const [person, setPerson] = useState(null);
  const [genders, setGenders] = useState([]);
  const {showBodyLoader, hideLoader} = useLoader();

  useEffect(() => {
    onLoaderForEdit();
    onLoaderCreateNew();
  }, []);

  const onLoaderForEdit =() => {
    if(!match.params.id) {
      return;
    }

    showBodyLoader();
    findById(match.params.id)
      .then(res => {
        setPerson(res.data);
      })
      .then(() => getAllGenders())
      .finally(() => hideLoader());
  }

  const onLoaderCreateNew = () => {
    if(match.params.id) {
      return;
    }

    showBodyLoader();
    getAllGenders()
      .finally(() => {
        hideLoader();
      })
  }

  const getAllGenders = () => {
    return genderList()
      .then(res => {
        setGenders(res.data);
        return Promise.resolve(res);
      }).catch(err => Promise.reject(err));
  }

  const onSubmit = () => {
    showBodyLoader();
    save(person)
      .then(res => {
        setPerson(res.data);
        toast.success(t(person?.id ? 'UPDATE_SUCCES' : 'SAVE_SUCCESS'));
        backRouter();
      }).catch(err => {
        toast.error(t(err.message));
      })
      .finally(() => {
        hideLoader();
      })
  }

  const onDelete = () => {
    showBodyLoader();
    deleteById(person.id)
      .then(() => {
        hideLoader();
        backRouter();
      });
  }

  const onChangeFirstName = (value) => {
    setPerson({
      ...person,
      firstName: value
    })
  }

  const onChangeLastName = (value) => {
    setPerson({
      ...person,
      lastName: value
    })
  }

  const onSelectGender = (gender) => {
    setPerson({
      ...person,
      gender: gender
    })
  }

  const backRouter = () => {
    history.goBack();
  }

  return (
    <>
      <HeaderScreen title={'REGISTER_PERSONS'} onClickBack={backRouter} />
      <div className='wrapperView'>
        <div className={['container'].join(' ')}>
          <form>
            <div className={['form-row'].join(' ')}>
              <div className={['form-group col-md-6'].join(' ')}>
                <Input label='Nome' onChange={onChangeFirstName} defaultValue={person?.firstName}/>
              </div>
              <div className={['form-group col-md-6'].join(' ')}>
                <Input label='Sobrenome' defaultValue={person?.lastName} onChange={onChangeLastName}/>
              </div>
            </div>

            <div className={['form-row'].join(' ')}>
              <div className={['form-group col-md-6'].join(' ')}>
                <Select list={genders} label={'Genêro'} onSelect={onSelectGender} defaultValue={person?.gender}/>
              </div>
            </div>

          </form>
          <div className={['d-grid gap-2 d-md-flex justify-content-md-end mt-5'].join(' ')}>
            {person?.id && <div className={'mr-2 mb-1'}><Button text={'Deletar'} onClick={onDelete} /></div>}
            <div className={'mb-1'}><Button text={person?.id ? 'Atualizar' : 'Salvar'} onClick={onSubmit}/></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeAdd;
