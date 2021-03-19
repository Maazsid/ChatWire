import React, { useEffect, useState } from 'react';
import { InputBase, List, ListItem, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useUser } from '../../../../contexts/UserProvider';
import { useAuth } from '../../../../contexts/AuthProvider';

const PrivateChat = () => {
  const { user } = useAuth();
  const { setSelectedUser } = useUser();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredFriends, setFilteredFriends] = useState();

  useEffect(() => {
    if (user) {
      if (selectedIndex) {
        user.friends.forEach((friend) => {
          if (friend._id === selectedIndex) {
            setSelectedUser(friend);
          }
        });
      } else {
        setSelectedUser(user.friends[0]);
      }
    }
  }, [selectedIndex, user, setSelectedUser]);

  useEffect(() => {
   user && setFilteredFriends(user.friends);
  }, [user]);

  const handleSearch = (e) => {
    setFilteredFriends(
      user.friends.filter((u) => {
        if (u.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
          return u;
        }
      })
    );
  };

  return (
    <div className='pv-panel'>
      <Paper>
        <InputBase placeholder='Search' onChange={handleSearch} />
        <SearchIcon />
      </Paper>

      <List className='pv-panel__list'>
        {filteredFriends &&
          filteredFriends.map((friend, index) => {
            return (
              <ListItem
                key={friend._id}
                button
                selected={
                  selectedIndex ? selectedIndex === friend._id : index === 0
                }
                onClick={() => setSelectedIndex(friend._id)}
              >
                <span>{friend.name}</span>
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};

export default PrivateChat;
