const TableBody = ({ tableData, columns }) => {
    return (
     <tbody>
      {tableData.map((data) => {
       return (
        <tr key={data.id}>
         {columns.map(({ accessor }) => {
          const tData = data[accessor];
          if(accessor==="probability")
          return <td key={accessor}>{tData}%</td>;
          else return <td key={accessor}>{tData}</td>;
         })}
        </tr>
       );
      })}
     </tbody>
    );
   };
   
   export default TableBody;