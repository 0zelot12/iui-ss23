import CameraInput from "./components/CameraInput";

function App() {
  return (
    <div className="App">
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        <CameraInput facingMode="environment" />
      </div>
    </div>
  );
}

export default App;
