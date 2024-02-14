import MainPageLayout from 'layout';
import AddProductPage from 'pages/AddProductPage';
import { Route, Routes } from 'react-router-dom';

const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPageLayout />}>
        <Route index path="/add" element={<AddProductPage />} />
      </Route>
    </Routes>
  );
};
export default RootRoutes;