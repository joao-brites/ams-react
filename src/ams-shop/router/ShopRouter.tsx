import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@mantine/core";
import { Header } from "../components/Header";
import { ProductList } from "../pages/ProductList";
import { Checkout } from "../pages/Checkout";

// ErrorBoundary for catching errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again.</div>;
    }
    return this.props.children;
  }
}

// Memoized Layout component
const Layout = React.memo(({ children }: { children: React.ReactNode }) => (
  <AppShell header={{ height: 60 }} padding="md">
    <AppShell.Header>
      <Header />
    </AppShell.Header>
    <AppShell.Main>{children}</AppShell.Main>
  </AppShell>
));

Layout.displayName = "Layout";

export const ShopRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
