import DefaultPage from "components/DefaultPage";
import Advertise from "pages/Advertise";
import Cart from "pages/Cart";
import Category from "pages/Category";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Home />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="cart" element={<Cart />} />
          <Route path="advertise/:categoryName" element={<Advertise />} />
          <Route path="advertise" element={<Advertise />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
