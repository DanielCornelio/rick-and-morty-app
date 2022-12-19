import React, { useEffect, useState } from 'react';
import Characters from './components/Characters';
import Navbar from "./components/Navbar";
import Pagination from './components/Pagination';


function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({})

  const initialUrl = "https://rickandmortyapi.com/api/character"
  const fetchCharacters = (initialUrl) => {
    fetch(initialUrl)
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results)
        setInfo(data.info)
      })
      .catch(error => console.log(error))
  }

  const onPrevious = ()=>{
    fetchCharacters(info.prev)
    window.scrollTo(0, 0);
  }
  const onNext = ()=>{
    fetchCharacters(info.next)
    window.scrollTo(0, 0);    
  }

  useEffect(() => {
    fetchCharacters(initialUrl)
  }, [])

  return (
    <div className="App">
      <Navbar brand="Rick and Morty APP" />
      <div className='container mt-5'>
        <Pagination 
          prev={info.prev} 
          next={info.next} 
          onPrevious={onPrevious} 
          onNext={onNext}
        />
        <Characters characters={characters} />
        <Pagination 
          prev={info.prev} 
          next={info.next} 
          onPrevious={onPrevious} 
          onNext={onNext}
        />
      </div>
    </div>
  );
}

export default App;
