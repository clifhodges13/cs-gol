import React, { useEffect, useState } from 'react';
import Cell from './components/Cell';
import { grid } from './helpers';
import './App.css';

function App() {

  const [ gridd, setGrid ] = useState([]);

  const buildGrid = () => {
    grid.forEach(row => {
      row.forEach(item => {
        return <Cell />
      })
    })
  }

  useEffect(()=>{
    setGrid(buildGrid())
  },[])

  return (
    <div className="App">
      <div className="App-row">
        {grid[0].map(item => {
          console.log(item)
          // console.log(row.length)
          // <div className="App-row">
          //   {row.map((item, index) => <Cell key={index} />)}
          // </div>
            return <Cell state={item} />
          })
        }
      </div>
      <div className="App-row">
        {grid[1].map(item => {
          // console.log(row.length)
          // <div className="App-row">
          //   {row.map((item, index) => <Cell key={index} />)}
          // </div>
            return <Cell state={item} />
          })
        }
      </div><div className="App-row">
        {grid[2].map(item => {
          // console.log(row.length)
          // <div className="App-row">
          //   {row.map((item, index) => <Cell key={index} />)}
          // </div>
            return <Cell state={item} />
          })
        }
      </div><div className="App-row">
        {grid[3].map(item => {
          // console.log(row.length)
          // <div className="App-row">
          //   {row.map((item, index) => <Cell key={index} />)}
          // </div>
            return <Cell state={item} />
          })
        }
      </div><div className="App-row">
        {grid[4].map(item => {
          // console.log(row.length)
          // <div className="App-row">
          //   {row.map((item, index) => <Cell key={index} />)}
          // </div>
            return <Cell state={item} />
          })
        }
      </div>
    </div>
  );
}

export default App;
