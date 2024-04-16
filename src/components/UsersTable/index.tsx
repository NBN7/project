import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/UsersTable/columns";

import type { TUser } from "@/types/user";

type UsersTableProps = {
  users: TUser[];
};

export const UsersTable = ({ users }: UsersTableProps) => {
  return <DataTable columns={columns} data={users} />;
};
