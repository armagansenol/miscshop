import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Badge, { BadgeProps } from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import React, { useState } from "react"
import { useRecoilState } from "recoil"
import { cartState } from "recoil/atom/cartAtom"

import { ListItemButton } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <>
      <IconButton aria-label="cart" onClick={handleClick}>
        <StyledBadge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon fontSize="large" />
        </StyledBadge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {cart.length !== 0 ? (
          <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {
              <>
                {cart.map((product, i) => {
                  return (
                    <React.Fragment key={`${product.id}_${i}`}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={product.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {product.title}
                            </Typography>
                          }
                          secondary={product.price}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  )
                })}
                <ListItem disablePadding>
                  <ListItemButton component="button" sx={{ textAlign: "center" }} onClick={clearCart}>
                    <ListItemText primary="Clear" />
                  </ListItemButton>
                </ListItem>
              </>
            }
          </List>
        ) : (
          <Typography sx={{ p: 2 }}>Your cart is empty.</Typography>
        )}
      </Popover>
    </>
  )
}

export default Cart
