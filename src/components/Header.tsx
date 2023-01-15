import { Container, Typography } from "@mui/material"
import Cart from "./Cart"

const Header = () => {
  return (
    <Container
      component="header"
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingY: 2,
      }}
    >
      <Typography
        component="h1"
        sx={{
          background: "#FEF8A6",
          border: "2px solid #282828",
          borderRadius: 32,
          color: "#282828",
          fontSize: 32,
          fontWeight: 700,
          paddingY: 0.5,
          paddingX: 4,
          marginY: 1,
        }}
      >
        MISC SHOP
      </Typography>
      <Cart></Cart>
    </Container>
  )
}

export default Header
