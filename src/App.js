import React from "react";
import "./App.css";
import Harta from "./components/map";
import Table from "./components/Table/Table";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <main>
      <Harta />
      <Table />
      <Navbar />
    </main>
  );
}
