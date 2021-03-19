import React, { useEffect, useRef, useState } from 'react';
import { InputBase, List, ListItem, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useCommunities } from '../../../../contexts/CommunitiesProvider';
import Pagination from '@material-ui/lab/Pagination';

const Communities = () => {
  const [selectedIndex, setSelectedIndex] = useState();
  const { communities, setSelectedCommunity } = useCommunities();

  const [count, setCount] = useState();
  const [paginationCount, setPaginationCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [{ startIndex, endIndex }, setIndex] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState();

  const parentList = useRef();

  // calculate pagination count and number of lists at first mount

  useEffect(() => {
    const clientHeight = parentList.current.clientHeight;
    let numOfList = 0;
    let listHeight = 42;
    while (listHeight < clientHeight) {
      numOfList += 1;
      listHeight += 42;
    }
    setCount(numOfList);
  }, []);

  // select new community

  useEffect(() => {
    if (communities) {
      if (selectedIndex) {
        communities.forEach((comm) => {
          if (comm._id === selectedIndex) {
            setSelectedCommunity(comm);
          }
        });
      } else {
        setSelectedCommunity(communities[0]);
      }
    }
  }, [selectedIndex, communities, setSelectedCommunity]);

  // set filterd communities, once communities is fetched or changed

  useEffect(() => {
    let pagination;
    if (communities && communities.length > 0) {
      pagination = Math.ceil(communities.length / count);
      setFilteredCommunities(communities);
    }
    setPaginationCount(pagination);
  }, [count, communities]);

  // calculate the starting and ending index for list based on pagination number

  useEffect(() => {
    setIndex({
      startIndex: (currentPage - 1) * count,
      endIndex: currentPage * count - 1,
    });
  }, [count, currentPage, setIndex]);

  // function for searching through list

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setFilteredCommunities(
      communities.filter((c) => {
        if (c.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
          return c;
        }
      })
    );
  };

  return (
    <div className='comm-panel'>
      <Paper>
        <InputBase
          placeholder='Search'
          value={searchText}
          onChange={handleSearch}
        />
        <SearchIcon />
      </Paper>
      <Pagination
        count={paginationCount}
        onChange={(e, page) => setCurrentPage(page)}
      />
      <List ref={parentList} className='comm-panel__list'>
        {filteredCommunities &&
          filteredCommunities.map((comm, index) => {
            if (index >= startIndex && index <= endIndex) {
              return (
                <ListItem
                  button
                  selected={
                    selectedIndex ? selectedIndex === comm._id : index === 0
                  }
                  onClick={() => setSelectedIndex(comm._id)}
                  key={index}
                >
                  {comm.name}
                </ListItem>
              );
            }
          })}
      </List>
    </div>
  );
};

export default Communities;
