import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITaskRequest } from '../../interfaces/interfaceTasks';
import { getTokenFromLS } from '../../utils';

const BASE_URL = 'https://young-hamlet-94914.herokuapp.com';
const TOKEN = getTokenFromLS();

interface IGetAllTasksAsync {
  boardId: string;
  columnId: string;
}

export const getAllTasksAsync = createAsyncThunk(
  'tasks/getAllTasks',
  async ({ boardId, columnId }: IGetAllTasksAsync, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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
    try {
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
    try {
      await axios.delete(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      thunkApi.dispatch(getAllTasksAsync({ boardId, columnId }));
    } catch (error) {
      thunkApi.rejectWithValue('Deletion is not possible');
    }
  }
);

export interface IUpdateTaskAsync extends IGetAllTasksAsync {
  title: string;
  order: number;
  description: string;
  userId: string;
  taskId: string;
}

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async (
    { title, order, description, userId, taskId, boardId, columnId }: IUpdateTaskAsync,
    thunkApi
  ) => {
    const dataToUpdateTask = {
      title: title,
      order: order,
      description: description,
      userId: userId,
      boardId: boardId,
      columnId: columnId,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        dataToUpdateTask,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );

      thunkApi.dispatch(getAllTasksAsync({ boardId, columnId }));
      return { task: response.data, taskId: taskId };
    } catch (error) {
      thunkApi.rejectWithValue('Updating is not possible');
    }
  }
);
