import React, { useEffect, useState } from 'react';
import styles from './MainFilter.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { IMainFilterProps } from './IMainFilterProps';
import { useTranslation } from 'react-i18next';

type FilterType = 'title';

const MainFilter = ({ inputHandler }: IMainFilterProps) => {
  const { boards } = useAppSelector((state) => state.reducerBoards);
  const [filter, setFilter] = useState<FilterType>('title');
  const { t } = useTranslation(['mainPage']);

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
            placeholder={t('search')}
            type="text"
            onChange={(e) => searchHandler(e.target.value)}
          />
        </FormControl>
        <FormControl className={styles.filterSelect}>
          <InputLabel>{t('filter')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={filter}
            label={t('filter')}
            onChange={(e) => setFilter(e.target.value as FilterType)}
          >
            <MenuItem value={'title'}>{t('title')}</MenuItem>
            <MenuItem value={'description'}>{t('description')}</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default MainFilter;
