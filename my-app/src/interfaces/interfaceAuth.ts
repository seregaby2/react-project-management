export interface IPostRequest {
  dataAuth: ISignInForm;
  isLoading: boolean;
  errorAuth: string;
  errorLogin: string;
  errorUpdateUser: string;
  errorGetUser: string;
  errorDeleteUser: string;
  isTokenActive: boolean;
}

export interface ISignInForm {
  name?: string;
  login: string;
  password: string;
}

export interface Itoken {
  token: string;
}

export interface ISingUp {
  id: string;
  name: string;
  login: string;
}

export interface IResolveToken {
  userId: string;
  login: string;
  iat: string;
}

export interface IMyError {
  response: IResponse;
  message: string;
}

interface IResponse {
  data: IDataError;
}

interface IDataError {
  message: string;
}
