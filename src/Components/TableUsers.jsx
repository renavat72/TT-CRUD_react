import React  from 'react'
import { Button,Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../API';


const TableUsers = ({list, setList, selectUser}) => {
    const handleRemove  = async(user, i)=>{
      await removeUser({variables: {id: user.id}});
      const newList = list.filter((_, index)=>index !== i)
      setList(newList)
    }
    const [removeUser] = useMutation(DELETE_USER);
  
    return(
      <Table size="small">
        <TableHead>
            <TableRow>
              <TableCell>Name&nbsp;</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell/>
            </TableRow>
        </TableHead>
        <TableBody>
          {list&&list.map((user, index)=>
            <TableRow key={index} >
                <TableCell >{user.name}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="right">
                    <Button size="small" onClick={()=> selectUser(user)}>Edit</Button>
                    <Button size="small" color="secondary" onClick={()=>handleRemove(user,index)}>Remove</Button>
                </TableCell>
            </TableRow>
        )}
        </TableBody>
      </Table>
    )
  }

export default TableUsers