import CameraInput from "./components/CameraInput";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        <CameraInput facingMode="environment" />
      </div>
      <Navbar></Navbar>
    </div>
  );
}

export default App;