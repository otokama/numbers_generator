import Generators from './components/generators';
function App() {
  return (
    <>
      {<nav className="navbar fixed-top ">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Random Number Generator</span>
        </div>
      </nav>}
      <main>
        <Generators></Generators>
      </main>
    </>
  )
}

export default App;
