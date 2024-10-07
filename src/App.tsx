import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import PopularBlogs from "./components/PopularBlogs";
import TopSellers from "./components/TopSellers";

export default function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainContent />,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
    },
  ]);

  return (
    <div className="flex h-screen">
      <Sidebar></Sidebar>
      <RouterProvider router={appRouter} />
      <div className="flex flex-col h-screen justify-center">
        <PopularBlogs />
        <TopSellers />
      </div>
    </div>
  );
}
