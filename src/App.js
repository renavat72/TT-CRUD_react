import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';

import {  GET_USERS, CREATE_USER, GET_USER } from './API';
import UserCard from './Components/UserCard';
import useForm from './Components/useForm';
import TableUsers from './Components/TableUsers';


function App() {
  const {data, fetchMore} = useQuery(GET_USERS,{
    variables: {
      skip: 1,
      limit: 10
  }});
  useEffect(()=>setList(data && data.users), [data])
  const [list, setList] = useState([]);
  const [checkUser, setCheckUser] = useState(false)
  const [userId, setUserId] = useState()
  const [getUser, {data:Info}] = useLazyQuery(GET_USER, {variables:{id:userId}})
  const handleCreateUser = () => {
    setList([...list, values])
    createUser();
  };
  const selectUser = (user) => {
    getUser()
    setUserId(user.id)
    setCheckUser(!checkUser)
  }
 
  const { onChange, onSubmit, values } = useForm(handleCreateUser, {
    name: '',
    email: '',
  });
  const [createUser] = useMutation(CREATE_USER,{ 
    variables: values 
  });

  const showMore = () => {
    fetchMore({
      variables: { limit: list.length + 5 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          ...prevResult,
          ...fetchMoreResult,
        };
      },
    })};
  if (list === undefined) return null
  return (
    <div className="App">
      <div className="Wrapper">
        <form noValidate onSubmit={onSubmit}>
          <div className="CreateUserBlock">
            <div>
              <TextField required placeholder="Email"value={values.email} name="email" onChange={onChange} variant="outlined"/>
            </div>
            <div>
              <TextField required placeholder="Name"value={values.name} name="name" onChange={onChange} variant="outlined"/>
            </div>
              <Button type="submit" variant="contained" color="primary" size="small" disabled={!values.name || !values.email}>
                Add
              </Button>
          </div>
        </form>
        <div style={{textAlign: "center"}}>
          {list.length === 0 ? "Empty list" : 
            <TableUsers list={list} setList={setList} selectUser={selectUser}/>
          }
          {list.length === 10 ?  <Button onClick={()=> showMore()} style={{marginTop:24}} variant="contained">More</Button> : null }
        </div>
      </div>
      {checkUser? <UserCard userId={userId}  Info={Info} checkUser={checkUser} setCheckUser={setCheckUser}/> : null }
    </div>
  );
}

export default App;