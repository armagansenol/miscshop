import { Box } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import React from "react"

type Props = {
  primary: string
  options: { label: string; value: any }[]
  value: any
  onChange: any
}

const Dropdown = ({ primary, options, value, onChange }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const open = Boolean(anchorEl)

  console.log("Dropdown")

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index)
    setAnchorEl(null)
    onChange(options[index].value)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      component="div"
      sx={{
        cursor: "pointer",
      }}
    >
      <List component="nav" aria-label="Device settings">
        <ListItem
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary={primary} secondary={options[selectedIndex].label} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.length !== 0 &&
          options.map((option, index) => (
            <MenuItem
              key={option.label}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option.label}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  )
}

export default Dropdown
