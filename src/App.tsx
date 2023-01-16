import s from "assets/scss/app.module.scss"
import Feedback from "components/Feedback"
import Header from "components/Header"
import Preferences from "components/Preferences"
import Products from "components/Products"

function App() {
  return (
    <div className={s.app}>
      <Feedback />
      <Header />
      <Preferences />
      <Products />
    </div>
  )
}

export default App
