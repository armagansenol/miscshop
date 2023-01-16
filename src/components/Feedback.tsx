import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import Stack from "@mui/material/Stack"
import React from "react"
import { useRecoilState } from "recoil"
import { errorState } from "recoil/atom/errorAtom"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Feedback = () => {
  const [errorData, setErrorData] = useRecoilState(errorState)

  const handleClose = () => {
    setErrorData((prev) => ({ ...prev, status: false }))
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={errorData.status} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorData.text}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Feedback
