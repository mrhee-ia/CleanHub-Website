import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import LandingPage from "./pages/LandingPage"
import AboutPage from "./pages/AboutPage"
import HelpPage from "./pages/HelpPage"
import RegisterLoginPage from "./pages/RegisterLoginPage"


const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LandingPage/>} />
        <Route path='/about-us' element={<AboutPage/>} />
        <Route path='/help' element={<HelpPage/>} />
        <Route path='/join-now' element={<RegisterLoginPage/>} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App