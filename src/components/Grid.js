import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import Cell from './Cell';
import * as helpers from '../helpers';
import ControlBoard from './ControlBoard';

export default function Grid() {
    const gridStyle = {
        gridTemplateColumns: `repeat(${helpers.gridWidth}, 20px)`
    }

    const [ grid, setGrid ] = useState([]);

    const [ simulating, setSimulating ] = useState(false);
    const isSimulating = useRef(simulating);
    isSimulating.current = simulating;
    
    const [ count, setCount ] = useState(0);
    const runningCount = useRef(count);
    runningCount.current = count;

    const [ speed, setSpeed ] = useState(50);
    const runningSpeed = useRef(speed);
    runningSpeed.current = speed;

    const [ color, setColor ] = useState('#2342a1')

    useEffect(() => {
        setGrid(() => helpers.buildGrid());
    }, []);

    const init = () => {
        setSimulating(!simulating);
        if(!simulating) {
            isSimulating.current = true;
            runSim();
        }
    };

    const createNewGrid = (i,j) => {
        const newGrid = produce(grid, gridCopy => {
            gridCopy[i][j] = grid[i][j] ? 0 : 1;
        })
        setGrid(newGrid)
    };

    const resetGrid = () => {
        setCount(0)
        setGrid(() => helpers.buildGrid());
    };

    const runSim = useCallback(() => {
        if (!isSimulating.current) return;
        
        const ops = [[0,1],[0,-1],[1,-1],[-1,1],[1,1],[-1,-1],[1,0],[-1,0]];
        
        setGrid(g => {
            return helpers.createNewGrid(g, ops)
        });

        setTimeout(() => {
            setCount(runningCount.current + 1);
            runSim();
        }, (speed*10)); 
    }, [speed]);

    return (
        <div className="App-grid-wrapper">
            <div className="App-grid" style={gridStyle}>
                {grid && grid.map((row, i) =>
                    row.map((col, j) => (
                        <Cell
                            key={`${i}_${j}`}
                            alive={grid[i][j]}
                            createNewGrid={createNewGrid}
                            i={i}
                            j={j}
                            color={color}
                        />
                    )
                ))}  
            </div>
            <ControlBoard
                simulating={simulating}
                setSimulating={setSimulating}
                isSimulating={isSimulating}
                count={count}
                setCount={setCount}
                setGrid={setGrid}
                resetGrid={resetGrid}
                init={init}
                runningSpeed={runningSpeed}
                setSpeed={setSpeed}
                setColor={setColor}
            />
        </div>
    )
}
