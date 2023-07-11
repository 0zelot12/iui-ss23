import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Translate } from "./pages/Translate";
import { Training } from "./pages/Training";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Settings } from "./pages/Settings";
import { Challenge } from "./pages/training_pages/Challenge";
import { Gallery } from "./pages/training_pages/Gallery";
import { Learning } from "./pages/training_pages/Learning";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Home />} />
      <Route path="translate" element={<Translate />} />
      <Route path="training" element={<Training />} />
      <Route path="settings" element={<Settings />} />
      <Route path="challenge" element={<Challenge />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="learning" element={<Learning />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
