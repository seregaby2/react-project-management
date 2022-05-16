import React, { useEffect, useState } from 'react';
import styles from './MainFilter.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { IMainFilterProps } from './IMainFilterProps';
type FilterType = 'title';

const MainFilter = ({ inputHandler }: IMainFilterProps) => {
  const { boards } = useAppSelector((state) => state.reducerBoards);
  const [filter, setFilter] = useState<FilterType>('title');
  useEffect(() => {
    inputHandler(boards);
  }, [boards]);
  const searchHandler = (value: string) => {
    inputHandler(boards.filter((board) => board[filter].includes(value)));
  };
  return (
    <>
      <FormGroup row className={styles.filterGroup}>
        <FormControl fullWidth className={styles.filterInput}>
          <TextField
            placeholder="Search..."
            type="text"
            onChange={(e) => searchHandler(e.target.value)}
          />
        </FormControl>
        <FormControl className={styles.filterSelect}>
          <InputLabel>Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value as FilterType)}
          >
            <MenuItem value={'title'}>Title</MenuItem>
            <MenuItem value={'description'}>Description</MenuItem>
            <MenuItem value={'workers'}>Workers</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default MainFilter;
