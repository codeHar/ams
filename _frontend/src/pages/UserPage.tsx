import UserTable from "../components/CustomTable";

const UserPage = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City, Country",
      dob: "1990-01-01",
      created_at: "2024-04-17",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, Town, Country",
      dob: "1985-05-10",
      created_at: "2024-04-16",
    },
    {
      id: 3,
      name: "amit Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, Town, Country",
      dob: "1985-05-10",
      created_at: "2024-04-16",
    },
  ];

  const tableTitles = [
    "Name",
    "Email",
    "Phone",
    "Address",
    "DOB",
    "Created at",
    "Action",
  ];

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Users</h2>
      </div>
      <UserTable data={users} tableTitles={tableTitles} />
    </div>
  );
};

export default UserPage;
