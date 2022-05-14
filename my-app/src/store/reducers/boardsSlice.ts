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
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '2',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '3',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '4',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '5',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '6',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '7',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '8',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '9',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '10',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '11',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '12',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '13',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '14',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '15',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '16',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
    {
      title: 'qeqeq',
      id: '17',
      description: '12wqeqwe12e1ewqdwdq',
      workers: 'Adadqd dsaasda, Afdvvdvfv dcscsdvs',
    },
  ],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<IBoard>) {
      state.boards.push(action.payload);
    },
    deleteBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
  },
});

export const reducerBoards = boardsSlice.reducer;
export const boardsActions = boardsSlice.actions;
