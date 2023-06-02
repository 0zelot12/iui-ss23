import CameraInput from "./components/CameraInput";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="App">
      <div className="container p-2 space-y-2 mx-auto flex flex-col items-center">
        <h1 className="text-2xl">Sign Language Translator v0</h1>
        <CameraInput facingMode="environment" />
      </div>
      <Navbar></Navbar>
    </div>
  );
}
