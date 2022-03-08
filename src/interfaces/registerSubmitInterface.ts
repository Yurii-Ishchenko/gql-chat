import { ISignInSubmit } from "./signInSubmitInterface";

export interface IRegisterSubmit extends ISignInSubmit {
  login: string;
  repeatPassword: StringConstructor;
}
