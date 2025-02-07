import React from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "./ams-shop/config/theme";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  const renderApp = async () => {
    let Component;

    if (process.env.APP === "shop") {
      const { ShopRouter } = await import("./ams-shop/router/ShopRouter");
      Component = ShopRouter;
    } else {
      Component = () => <p>No App Selected</p>;
    }

    root.render(
      <React.StrictMode>
        <MantineProvider theme={theme}>
          <Component />
        </MantineProvider>
      </React.StrictMode>
    );
  };

  renderApp();
}

export default {};
