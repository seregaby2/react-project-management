import { createSlice } from '@reduxjs/toolkit';
import { ITask } from '../../interfaces/interfaceTasks';

interface ITaskSlice {
  tasks: ITask[];
  isLoading: boolean;
  error: string;
}

const initialState = {
  tasks: [],
  isLoading: false,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {},
});
