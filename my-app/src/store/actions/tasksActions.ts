import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITaskRequest } from '../../interfaces/interfaceTasks';
import { getTokenFromLS } from '../../utils';

const BASE_URL = 'https://young-hamlet-94914.herokuapp.com';

interface IGetAllTasksAsync {
  boardId: string;
  columnId: string;
}

export const getAllTasksAsync = createAsyncThunk(
  'tasks/getAllTasks',
  async ({ boardId, columnId }: IGetAllTasksAsync, thunkApi) => {
    const token = getTokenFromLS();

    try {
      const response = await axios.get(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: response.data, columnId };
    } catch (error) {
      thunkApi.rejectWithValue('Tasks not found.');
    }
  }
);

export interface ICreateTaskAsync extends IGetAllTasksAsync {
  data: ITaskRequest;
}

export const createTaskAsync = createAsyncThunk(
  'tasks/createTask',
  async ({ boardId, columnId, data }: ICreateTaskAsync, thunkApi) => {
    const token = getTokenFromLS();

    try {
      await axios.post(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      thunkApi.dispatch(getAllTasksAsync({ boardId, columnId }));
    } catch (error) {
      thunkApi.rejectWithValue('Unable to create task.');
    }
  }
);

export interface IDeleteTaskAsync extends IGetAllTasksAsync {
  taskId: string;
}

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTassk',
  async ({ boardId, columnId, taskId }: IDeleteTaskAsync, thunkApi) => {
    const token = getTokenFromLS();

    try {
      await axios.delete(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      thunkApi.dispatch(getAllTasksAsync({ boardId, columnId }));
    } catch (error) {
      thunkApi.rejectWithValue('Deletion is not possible');
    }
  }
);
