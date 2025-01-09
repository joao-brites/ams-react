import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@mantine/core";
import { CartProvider } from "../context/CartContext";
import { Header } from "../components/Header";
import { ProductList } from "../pages/ProductList";
import { Checkout } from "../pages/Checkout";

export const ShopRouter = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppShell header={{ height: 60 }}>
          <AppShell.Header>
            <Header />
          </AppShell.Header>

          <AppShell.Main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </CartProvider>
    </BrowserRouter>
  );
};
