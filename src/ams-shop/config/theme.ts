import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "md",

  // Add a subtle background color to the whole app
  colors: {
    // Custom blue shade
    blue: [
      "#E6F3FF",
      "#CCE7FF",
      "#99CEFF",
      "#66B5FF",
      "#339CFF",
      "#0083FF",
      "#0066CC",
      "#004C99",
      "#003366",
      "#001933"
    ],
    // Custom gray shade for backgrounds
    gray: [
      "#F8F9FA",
      "#F1F3F5",
      "#E9ECEF",
      "#DEE2E6",
      "#CED4DA",
      "#ADB5BD",
      "#868E96",
      "#495057",
      "#343A40",
      "#212529"
    ]
  },

  components: {
    Button: {
      defaultProps: { size: "md" },
      styles: (theme) => ({
        root: {
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows.sm
          }
        }
      })
    },
    Card: {
      defaultProps: {
        padding: "lg",
        radius: "md",
        shadow: "sm"
      },
      styles: (theme) => ({
        root: {
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows.md
          }
        }
      })
    },
    Container: {
      defaultProps: {
        size: "lg"
      }
    },
    AppShell: {
      styles: (theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0]
        }
      })
    }
  },

  // Global styles
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colors.gray[0],
      color: theme.colors.gray[9]
    }
  })
});
