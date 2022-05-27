import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, TOKEN } from '../../constants/api';
import { IColumnRequest } from '../../interfaces/interfaceColumns';

export const getColumnAsync = createAsyncThunk(
  'columns/geColumns',
  async (boardId: string, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/boards/${boardId}/columns`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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
  data: {
    title: string;
  };
}

export const addColumnAsync = createAsyncThunk(
  'columns/addColumn',
  async ({ boardId, data }: IAddColumn, thunkApi) => {
    try {
      const response = await axios.post(`${BASE_URL}/boards/${boardId}/columns`, data, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue('Unable to create column.');
    }
  }
);

interface IDeleteColumn {
  boardId: string;
  columnId: string;
}

export const deleteColumnAsync = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardId, columnId }: IDeleteColumn, thunkApi) => {
    try {
      await axios.delete(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return columnId;
    } catch (error) {
      thunkApi.rejectWithValue('Unable to delete column.');
    }
  }
);

export interface IUpdateColumnTitle {
  boardId: string;
  data: IColumnRequest;
}

export const updateColumAsync = createAsyncThunk(
  'columns/updateColumn',
  async ({ boardId, data }: IUpdateColumnTitle, thunkApi) => {
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
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue('Unable to update column.');
    }
  }
);
