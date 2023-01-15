import s from "assets/scss/app.module.scss"
import Header from "components/Header"
import Preferences from "components/Preferences"
import Products from "components/Products"

import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Stack from "@mui/material/Stack"
import React from "react"
import { useRecoilState } from "recoil"
import { errorState } from "recoil/atom/errorAtom"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function App() {
  const [errorData, setErrorData] = useRecoilState(errorState)

  const handleClose = () => {
    setErrorData((prev) => ({ ...prev, status: false }))
  }

  return (
    <div className={s.app}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={errorData.status} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorData.text}
          </Alert>
        </Snackbar>
      </Stack>
      <Header></Header>
      <Preferences></Preferences>
      <Products />
    </div>
  )
}

export default App
