import Search from './components/search/search';
import './App.css';

function App() {

    const handleOnSearchChange = (searchdata) =>{
      console.log(searchdata)
    }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
    </div>
  );
}

export default App;
