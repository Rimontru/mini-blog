export type User = {
  id?: string;
  name?: string;
  email: string;
  password: string;
};

export type LoginFormData = Pick<User, "email" | "password">;

export type LoginState = {
  error: string;
  field: string;
};
