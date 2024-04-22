export type TUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string | null;
  theme: string | null;
  balance: number | null;
};

export type TUsersResponse = {
  users: TUser[];
};
