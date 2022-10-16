import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  useEffect(() => {
    // Get Database Data
    axios.get('/api/values')
    .then(response => {
      console.log('response', response)
      setLists(response.data)
    })
  }, [])

  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")

  // 변경된 값을 Set
  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post('/api/value', {value: value})
    .then(response => {
      if(response.data.success) {
        console.log('response', response)
        // List 추가
        setLists([...lists, response.data])

        // 초기화
        setValue("");
      } else {
        alert('Data를 Database 에 넣지 못했습니다')
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}
          <br />

          <form className="example" onSubmit={submitHandler}>
            <input type="text" placeholder="Input Text." onChange={changeHandler} value={value} />
            <button type="submit">Confirm</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
