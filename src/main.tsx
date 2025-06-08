import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/dataLoader';

ReactDOM.createRoot(document.getElementById('react-app')!).render(
  <RouterProvider router={router}></RouterProvider>,
);
