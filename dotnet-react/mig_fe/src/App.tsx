import { useState } from "react";
import "./App.css";
import Employee from "./components/Employee/Employee";
import Header from "./components/Header/Header";

function App() {
  const [count, setCount] = useState(0);

  return <Header />;
}

export default App;
