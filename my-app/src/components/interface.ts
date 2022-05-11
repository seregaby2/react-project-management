export interface IPostRequest {
  dataAuth: ISignInForm;
  isLoading: boolean;
  errorAuth: string;
  errorLogin: string;
  isAuth: boolean;
}

export interface ISignInForm {
  name?: string;
  login: string;
  password: string;
}

export interface Itoken {
  token: string;
}
