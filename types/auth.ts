export type LoginPayload = {
  email: string;
  password: string;
};
export type PasswordChange = {
  password?: string;
  password_confirmation?: string;
};
export type UserType = {
  family_name: string;
  first_name: string;
  family_name_kana: string;
  email: string;
};
export type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};
