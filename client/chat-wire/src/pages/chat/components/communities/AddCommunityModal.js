import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Fab,
  Tooltip,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useCommunities } from '../../../../contexts/CommunitiesProvider';

const AddCommunityModal = () => {
  const { addCommunity } = useCommunities();

  const [open, setOpen] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const modalOpen = () => {
    setOpen(true);
  };

  const addCommunityHandle = (e) => {
    addCommunity(e, communityName, setCommunityName, modalClose);
  };

  const modalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title='add-community'>
        <Fab className='add-modal-button' onClick={modalOpen}>
          <AddIcon className='add-modal-icon' />
        </Fab>
      </Tooltip>
      <Dialog className='community-dialog' open={open} onClose={modalClose}>
        <DialogTitle>Add community</DialogTitle>
        <DialogContent>
          <TextField
            variant='outlined'
            label='Enter community name'
            onChange={(e) => setCommunityName(e.target.value)}
            onKeyDown={addCommunityHandle}
            autoFocus={true}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            type='button'
            className='community-dialog__cancel-btn'
            onClick={modalClose}
          >
            Cancel
          </Button>
          <Button
            type='button'
            className='community-dialog__submit-btn'
            onClick={addCommunityHandle}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCommunityModal;
