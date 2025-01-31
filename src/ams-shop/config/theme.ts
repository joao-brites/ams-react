import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "md",
  components: {
    Button: {
      defaultProps: { size: "md" }
    },
    Card: {
      defaultProps: {
        padding: "lg",
        radius: "md",
        shadow: "sm"
      }
    },
    Container: {
      defaultProps: {
        size: "lg"
      }
    }
  }
});
