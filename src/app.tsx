import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ShopRouter } from "./ams-shop-exercise/router/ShopRouter";
import { AcademyRouter } from "./ams-academy/router";

createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider defaultColorScheme={"dark"}>
    {process.env.APP === "academy" ? (
      <AcademyRouter />
    ) : process.env.APP === "shop" ? (
      <ShopRouter />
    ) : (
      <p>No App Selected</p>
    )}
  </MantineProvider>
);
