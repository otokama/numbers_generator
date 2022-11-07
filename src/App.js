import Generators from './components/generators';

function Navbar() {
  return (
  <nav className="navbar fixed-top ">
    <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">Random Number Generator</span>
    </div>
  </nav>
  );
}

function App() {
  return (
    <>
      <Navbar/>
      <main>
        <Generators></Generators>
      </main>
    </>
  )
}
export default App;
