type CustomTableType = {
  data: any;
  tableTitles: string[];
};

const CustomTable = ({ data, tableTitles }: CustomTableType) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableTitles &&
              tableTitles.map((title: string, i: number) => (
                <th key={"ct" + i}>{title}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.dob}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
