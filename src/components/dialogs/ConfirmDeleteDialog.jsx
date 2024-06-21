import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open,handleClose,deleteHandler}) => {
  return <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete?</DialogTitle>
      <DialogContent>
        
        <DialogContentText> Are you Sure Want To Delete THie Group?</DialogContentText>
        
       </DialogContent>

       <DialogActions>
             <Button onClick={handleClose} >No</Button>
             <Button onClick={deleteHandler} color='error'>Yes</Button>
       </DialogActions>
  </Dialog>
}

export default ConfirmDeleteDialog