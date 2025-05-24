import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#888", // default
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#aaa", // hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#90caf9", // focused
          },
        },
      },
    },
  },
});

export default theme;
