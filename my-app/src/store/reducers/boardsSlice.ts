import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../../interfaces/IBoard';

type initialStateType = {
  boards: IBoard[];
};

const initialState: initialStateType = {
  boards: [
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '1',
      description: '12wqeqwe12e1ewqdwdq',
      status: 'progress',
      taskNumber: 3,
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
  ],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<IBoard>) {
      state.boards.push(action.payload);
    },
  },
});

export const reducerBoards = boardsSlice.reducer;
