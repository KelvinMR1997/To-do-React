import React, { Fragment, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Caja_principal from "./components/Caja_principal";

function App() {
  // Codigo de backend
  //   const { tarea, setTarea } = props;

  return (
    <Fragment>
      <Header className="center" titulo="To Do List KMR" />
      <Caja_principal />
    </Fragment>
  );
}

export default App;
