import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../constants/api';
import { ITaskRequest } from '../../interfaces/interfaceTasks';
import { getTokenFromLS } from '../../utils';
import { SingupSlice } from '../reducers/authSlice';

interface IGetAllTasksAsync {
  boardId: string;
  columnId: string;
}

export const getAllTasksAsync = createAsyncThunk(
  'tasks/getAllTasks',
  async ({ boardId, columnId }: IGetAllTasksAsync, thunkApi) => {
    try {
      const TOKEN = getTokenFromLS();
      const response = await axios.get(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return { data: response.data, columnId };
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        thunkApi.dispatch(SingupSlice.actions.setTokenStatus(false));
      }
      return thunkApi.rejectWithValue(`${err.message}. ${err.response?.statusText}.`);
    }
  }
);

export interface ICreateTaskAsync extends IGetAllTasksAsync {
  data: ITaskRequest;
}

export const createTaskAsync = createAsyncThunk(
  'tasks/createTask',
  async ({ boardId, columnId, data }: ICreateTaskAsync, thunkApi) => {
    try {
      const TOKEN = getTokenFromLS();
      const response = await axios.post(
        `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`,
        data,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        thunkApi.dispatch(SingupSlice.actions.setTokenStatus(false));
      }
      return thunkApi.rejectWithValue(`${err.message}. ${err.response?.statusText}.`);
    }
  }
);

export interface IDeleteTaskAsync extends IGetAllTasksAsync {
  taskId: string;
}

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTassk',
  async ({ boardId, columnId, taskId }: IDeleteTaskAsync, thunkApi) => {
    try {
      const TOKEN = getTokenFromLS();
      await axios.delete(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        thunkApi.dispatch(SingupSlice.actions.setTokenStatus(false));
      }
      return thunkApi.rejectWithValue(`${err.message}. ${err.response?.statusText}.`);
    }
  }
);

export interface IUpdateTaskAsync extends IGetAllTasksAsync {
  title: string;
  order?: number;
  description: string;
  userId: string;
  id: string;
  droppableColumnId?: string;
}

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async (
    {
      title,
      order,
      description,
      userId,
      id: taskId,
      boardId,
      columnId,
      droppableColumnId,
    }: IUpdateTaskAsync,
    thunkApi
  ) => {
    const dataToUpdateTask = {
      title: title,
      order: order,
      description: description,
      userId: userId,
      boardId: boardId,
      columnId: droppableColumnId ? droppableColumnId : columnId,
    };

    try {
      const TOKEN = getTokenFromLS();
      const response = await axios.put(
        `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        dataToUpdateTask,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      return { task: response.data, columnId: columnId };
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        thunkApi.dispatch(SingupSlice.actions.setTokenStatus(false));
      }
      return thunkApi.rejectWithValue(`${err.message}. ${err.response?.statusText}.`);
    }
  }
);
