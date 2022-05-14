export interface IPostRequest {
  dataAuth: ISignInForm;
  isLoading: boolean;
  errorAuth: string;
  errorLogin: string;
  errorUpdateUser: string;
  errorGetUser: string;
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
