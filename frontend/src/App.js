import CardList from "./components/CardList";
import CardServices from "./application/CardServices"

function App() {
  const service = new CardServices();
  return (
    <div className="container">
      <CardList service={service}/>
    </div>
  );
}

export default App;
