export type TUser = {
  email: string;
  id: string;
  image: string;
  name: string;
  role: string | null;
};

export type TUsersResponse = {
  users: TUser[];
};
