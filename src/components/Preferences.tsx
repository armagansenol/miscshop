import { Box, Container, Typography } from "@mui/material"
import { useWindowSize } from "hooks"
import { useRecoilState, useRecoilValue } from "recoil"
import { columnState } from "recoil/atom/columnsAtom"
import { itemsPerPageState } from "recoil/atom/itemsPerPage"
import { limitState } from "recoil/atom/limitAtom"
import { breakpoints } from "types"
import Dropdown from "./Dropdown"

const Preferences = () => {
  const [cols, setCols] = useRecoilState(columnState)
  const [items, setItems] = useRecoilState(itemsPerPageState)
  const limit = useRecoilValue(limitState)
  const { width } = useWindowSize()

  const gridSizeOptions = [
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ]

  const itemsPerPageOptions = [
    { label: "6", value: 6 },
    { label: "12", value: 12 },
    { label: "ALL", value: null },
  ]

  const handleItems = (itemsPerPage: number) => {
    setItems(itemsPerPage)
  }

  return (
    <Container
      maxWidth="xl"
      component="section"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        borderBottom: "1px solid #f2f2f2",
        borderTop: "1px solid #f2f2f2",
        marginBottom: 5,
      }}
    >
      <Typography component="h2" sx={{ marginY: 4, fontSize: 20, fontWeight: 700 }}>
        PRODUCTS
        <Typography component="span" sx={{ fontSize: 16, fontWeight: 400 }}>
          {` (${limit} of 20)`}
        </Typography>
      </Typography>
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {width > breakpoints.tablet && (
          <Dropdown primary="Items By Row" options={gridSizeOptions} value={cols} onChange={setCols}></Dropdown>
        )}
        <Dropdown
          primary="Items Per Page"
          options={itemsPerPageOptions}
          value={items}
          onChange={handleItems}
        ></Dropdown>
      </Box>
    </Container>
  )
}

export default Preferences
