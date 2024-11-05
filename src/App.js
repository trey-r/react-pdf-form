import AppRoutes from "./routes";
import { UserContextProvider } from "./contexts/userContext";

import "./App.css";
import { AreaContextProvider } from "./contexts/areaContext";

function App() {
  return (
    <UserContextProvider>
      <AreaContextProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AreaContextProvider>
    </UserContextProvider>
  );
}

export default App;
