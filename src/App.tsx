import {Router} from "./components/Router.tsx"
import {FilterProvider} from "./contexts/FilterProvider.tsx";
import {LoginProvider} from "./contexts/LoginProvider.tsx";

function App() {
  return (
      <LoginProvider>
          <FilterProvider>
              <Router/>
          </FilterProvider>
      </LoginProvider>
  )
}
export default App
