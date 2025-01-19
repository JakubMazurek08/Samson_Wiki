import {Router} from "./components/Router.tsx"
import {FilterProvider} from "./contexts/FilterProvider.tsx";

function App() {
  return (
      <FilterProvider>
         <Router/>
      </FilterProvider>
  )
}
export default App
