import React from 'react'
import { Button, Dialog } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../API';
import TextField from '@material-ui/core/TextField';
import useForm from './useForm';


const UserCard =  ({Info, setCheckUser, checkUser, userId})=>{
    const handleUpdate = (e) => { 
      e.preventDefault()
      updateUser()
    }
    const { onChange, onSubmit, values } = useForm(handleUpdate, {
      id: userId,
      name: '',
      email: '',
    });
    const [updateUser] = useMutation(UPDATE_USER, {
      variables:values})
      
    if(!Info) return null;

    return(
      <Dialog onClose={()=>setCheckUser(!checkUser)}  open={checkUser}>
        <div className="UserCard">
          <div className="UserCardTitle">
             User information
          </div>
          <form  onSubmit={()=>onSubmit()}>
            <div className="UserCardText">
                <div >
                    Name: <TextField placeholder={Info.user.name} value={values.name} name="name"onChange={onChange} />
                </div>
                <div>
                    Email: <TextField placeholder={Info.user.email} value={values.email} name="email" onChange={onChange }/>
                </div>
            </div>
            <div className="CardBtn">
                 <Button size="small"type="submit" disabled={!values.name || !values.email}>Edit</Button>
            </div>
           </form>
          </div>
      </Dialog>
     )
  }

export default UserCard