import "./styles/App.css";

import CarFacts from "./components/CatFacts";
import UserList from "./components/UserList";
import WhackACookie from "./components/WhackACookie";

function App() {
  return (
    <>
      <WhackACookie />
      <CarFacts />
      <UserList />
    </>
  );
}

export default App;
