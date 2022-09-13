import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import { routes } from "./routes"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((v, k) => {
          const { component: Component } = v
          return (
            <Route index={v.index} key={k} path={v.path} element={<Component />} />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default Router