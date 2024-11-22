import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import LandingPage from "./pages/LandingPages/LandingPage"
import AboutPage from "./pages/LandingPages/AboutPage"
import HelpPage from "./pages/LandingPages/HelpPage"
import RegisterLoginPage from "./pages/LandingPages/RegisterLoginPage"


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