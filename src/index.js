import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Home } from './pages/Home';
import { Translate } from './pages/Translate';
import { Training } from './pages/Training';
import { DefaultLayout } from './layouts/DefaultLayout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<DefaultLayout />}>
    <Route index element={<Home />} />
    <Route path="translate" element={<Translate />} />
    <Route path="training" element={<Training />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
