import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Fab,
  Tooltip,
  TextField,
  List,
  ListItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useUser } from '../../../../contexts/UserProvider';

const AddPrivateChatModal = () => {
  const { searchUser, searchedUsers, setSearchedUsers, addFriend } = useUser();

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const modalOpen = () => {
    setOpen(true);
    setSearchFieldValue('');
  };

  const modalClose = () => {
    setOpen(false);
    setSearchedUsers();
  };

  const submitHandle = (e) => {
    const selectedFriend =
      searchedUsers &&
      searchedUsers.filter((u, index) => {
        if (selectedIndex === index) {
          return u;
        }
      });
    if (selectedFriend && selectedFriend.length > 0)
      addFriend(e, selectedFriend, setSearchFieldValue, modalClose);
  };

  const searchForUsers = () => {
    if (searchFieldValue.trim() !== '') {
      searchUser(searchFieldValue);
    } else {
      setSearchedUsers();
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(searchForUsers, 1000);

    return () => clearTimeout(timeOutId);
  }, [searchFieldValue]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchedUsers]);

  return (
    <>
      <Tooltip title='add-friend'>
        <Fab className='add-modal-button' onClick={modalOpen}>
          <AddIcon className='add-modal-icon' />
        </Fab>
      </Tooltip>
      <Dialog className='pv-dialog' open={open} onClose={modalClose}>
        <DialogTitle>Add friend</DialogTitle>
        <DialogContent>
          <TextField
            variant='outlined'
            label='Search for a friend'
            autoFocus={true}
            onChange={(e) => setSearchFieldValue(e.target.value)}
            value={searchFieldValue}
            onKeyDown={submitHandle}
          ></TextField>
          <List>
            {searchedUsers &&
              searchedUsers.map((u, index) => {
                return (
                  <ListItem
                    selected={selectedIndex === index}
                    key={u._id}
                    button
                    onClick={() => setSelectedIndex(index)}
                  >
                    {u.name}
                  </ListItem>
                );
              })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button className='pv-dialog__cancel-btn' onClick={modalClose}>
            Cancel
          </Button>
          <Button
            className='pv-dialog__submit-btn'
            onClick={submitHandle}
            color='primary'
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPrivateChatModal;
