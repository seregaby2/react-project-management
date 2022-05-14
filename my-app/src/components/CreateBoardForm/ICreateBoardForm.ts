export interface ICreateBoardForm {
  title: string;
  description: string;
  workers: string;
}

export interface ICreateBoardFormProps {
  hideCreateBoardForm: () => void;
}
