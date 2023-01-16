import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import { Rating } from "@mui/material"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Popover from "@mui/material/Popover"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { IProduct } from "models/Product"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { cartState } from "recoil/atom/cartAtom"
import { truncateString } from "utils/truncate"

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#dcdcff",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
})

type Props = {
  product: IProduct
}

const ProductCard = ({ product }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [cart, setCart] = useRecoilState(cartState)
  const open = Boolean(anchorEl)

  const handleCart = () => {
    setCart((prev) => [...prev, product])
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card
      sx={{
        position: "relative",
        minHeight: { md: 570 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "16px",
        border: "1px solid #282828",
        boxShadow: "none",
        p: 3,
      }}
    >
      <CardMedia
        component="img"
        alt="Product Image"
        sx={{ objectFit: "contain", marginBottom: "1vw", height: 200, width: 150 }}
        image={product.image}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ cursor: "pointer", fontSize: 20, textAlign: "center" }}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {truncateString(product.title, 60)}
        </Typography>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{product.title}</Typography>
        </Popover>
      </CardContent>
      <Typography
        component="h5"
        sx={{
          background: "#bdf98a",
          borderRadius: 16,
          border: "1px solid #282828",
          fontSize: 20,
          marginTop: "auto",
          paddingX: 3,
          paddingY: 1,
        }}
      >
        Price: ${product.price}
      </Typography>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 5,
        }}
      >
        <StyledRating
          name="customized-color"
          defaultValue={0}
          value={Math.round(product.rating.rate)}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          readOnly
        />
        <Button onClick={handleCart}>
          <AddShoppingCartIcon fontSize="large" sx={{ fill: "#282828" }} />
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
