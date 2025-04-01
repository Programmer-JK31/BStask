import CardList from "./components/CardList";
import CardServices from "./application/CardServices"

function App() {
  return (
    <div className="container">
      <CardList service={CardServices}/>
    </div>
  );
}

export default App;
