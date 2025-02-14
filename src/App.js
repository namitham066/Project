import "./App.css";
import Navbarmain from "./Components/Navbar/Navbarmain"
import { useEffect } from "react";
import Allroutes from "./Routes/Allroutes";

function App() {
  useEffect(() => {
    document.title = "LIME ROAD";
  }, []);

  return (
    <div className="App">
      <Navbarmain />
      <Allroutes />
    </div>
  );
}

export default App;
