import React, { useState } from "react";
import mockdata from "./spotdata.json";
import TableBody from "./Tablebody";
import TableHead from "./Tablehead";

const Table = () => {
  const [tableData, setTableData] = useState(mockdata);
  const [tableCopy, setTableCopy] = useState(mockdata);
  const [countryInput, setCountryInput] = useState("");
  const [windInput, setWindInput] = useState("");

  var visibleState = "hidden";
  var buttonVisibleState = "visible";

  const visibleFilter = () => {
    if (visibleState === "hidden") {
      visibleState = "visible";
      buttonVisibleState = "hidden";
    } else {
      visibleState = "hidden";
      buttonVisibleState = "visible";
    }
    document.getElementById("filterMenu").style.visibility = visibleState;
    document.getElementById("filterBtn").style.visibility = buttonVisibleState;
  };

  const columns = [
    { label: "Name", accessor: "name", sortable: true },
    { label: "Country", accessor: "country", sortable: true },
    { label: "Latitude", accessor: "lat", sortable: true },
    { label: "Longitude", accessor: "long", sortable: true },
    { label: "Wind prob.", accessor: "probability", sortable: true },
    { label: "When to go", accessor: "month", sortable: false },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  const searchInput = React.createRef();

  const handleOnClick = () => {
    setTableCopy(mockdata);
    const searchTerm = searchInput.current.value;
    const filteredData = tableCopy
      .filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()))
          return val;
        else return null;
      })
      .map((data) => {
        return data;
      });
    setTableData(filteredData);
  };

  const filterMenuGo = () => {
    const filteredData = tableCopy
      .filter((val) => {
        if (!countryInput && !windInput) return val;
        else if (countryInput && !windInput) {
          if (val.country.toLowerCase() === countryInput.toLowerCase())
            return val;
        } else if (!countryInput && windInput) {
          if (val.probability === parseInt(windInput)) return val;
        } else if (countryInput && windInput) {
          if (
            val.country.toLowerCase() === countryInput.toLowerCase() &&
            val.probability === parseInt(windInput)
          )
            return val;
        } else return null;
      })
      .map((data) => {
        return data;
      });
    setTableData(filteredData);
  };

  return (
    <>
      <h1>Locations</h1>
      <input
        ref={searchInput}
        className="searchbar"
        type={"text"}
        placeholder={"Search..."}
        onChange={handleOnClick}
      />
      <table className="table">
        <button id="filterBtn" className="filterBtn" onClick={visibleFilter}>
          FILTERS
        </button>
        <div id="filterMenu" className="filterMenu">
          <button className="x-menu" onClick={visibleFilter}>
            X
          </button>
          <p className="filterP">Country</p>
          <input
            type={"text"}
            className="inputFilter"
            onChange={(event) => setCountryInput(event.target.value)}
          />
          <p className="filterP">Wind Probability</p>
          <input
            type={"number"}
            min="0"
            className="inputFilter"
            onChange={(event) => setWindInput(event.target.value)}
          />
          <button className="applyFilter" onClick={filterMenuGo}>
            APPLY FILTER
          </button>
        </div>
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} />
      </table>
    </>
  );
};

export default Table;
