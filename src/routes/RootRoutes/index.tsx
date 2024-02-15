import MainPageLayout from 'layout';
import AddProductPage from 'pages/AddProductPage';
import MainPage from 'pages/MainPage';
import { Route, Routes } from 'react-router-dom';

const RootRoutes = () => {
  return (
    <Routes>
      <Route element={<MainPageLayout />}>
        <Route index path= "/" element={<MainPage />} />
        <Route path="/add" element={<AddProductPage />} />
      </Route>
    </Routes>
  );
};
export default RootRoutes;