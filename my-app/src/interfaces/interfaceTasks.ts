export interface ITaskRequest {
  title: string;
  order?: number;
  description: string;
  userId: string;
}

export interface ITaskResponse extends ITaskRequest {
  id: string;
  boardId: string;
  columnId: string;
}
