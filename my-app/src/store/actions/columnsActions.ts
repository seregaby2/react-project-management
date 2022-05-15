import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IColumnRequest } from '../../interfaces/interfaceColumns';
import { getTokenFromLS } from '../../utils';

const BASE_URL = 'https://young-hamlet-94914.herokuapp.com';

export const getColumnAsync = createAsyncThunk(
  'columns/geColumns',
  async (boardId: string, thunkApi) => {
    const token = getTokenFromLS();

    try {
      const response = await axios.get(`${BASE_URL}/boards/${boardId}/columns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue('No columns found');
    }
  }
);

interface IAddColumn {
  boardId: string;
  data: { title: string; order: number };
}

export const addColumnAsync = createAsyncThunk(
  'columns/addColumn',
  async ({ boardId, data }: IAddColumn, { dispatch }) => {
    const token = getTokenFromLS();

    try {
      await axios.post(`${BASE_URL}/boards/${boardId}/columns`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getColumnAsync(boardId));
    } catch (error) {}
  }
);

interface IDeleteColumn {
  boardId: string;
  columnId: string;
}

export const deleteColumnAsync = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardId, columnId }: IDeleteColumn, { dispatch }) => {
    const token = getTokenFromLS();
    try {
      await axios.delete(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getColumnAsync(boardId));
    } catch (error) {}
  }
);

export interface IUpdateColumnTitle {
  boardId: string;
  data: IColumnRequest;
}

export const updateColumTitleAsync = createAsyncThunk(
  'columns/updateColumnTitle',
  async ({ boardId, data }: IUpdateColumnTitle, { dispatch }) => {
    const token = getTokenFromLS();

    const dataToRequest = {
      title: data.title,
      order: data.order,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/boards/${boardId}/columns/${data.id}`,
        dataToRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getColumnAsync(boardId));
      return response.data;
    } catch (error) {}
  }
);
