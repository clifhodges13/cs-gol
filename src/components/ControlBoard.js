import React from 'react';
import Ticker from './Ticker';
import Button from './Button';
import SetSpeed from './SetSpeed';
import Reset from './Reset';
import ColorPicker from './ColorPicker';
import * as helpers from '../helpers';

export default function ControlBoard({
        simulating,
        setSimulating,
        isSimulating,
        count,
        setCount,
        setGrid,
        resetGrid,
        init,
        runningSpeed,
        setSpeed,
        setColor
    }) {
    return (
        <div className="App-right-column">
            <div>
                <h1>Welcome to John Conway's Game of Life</h1>
                <p>The rules are simple. At any given point, a cell can be alive or dead.</p>
                <p>What determines if it lives or dies? Well, every healthy living cell needs a community to survive. 2 or 3 neighbors and the cell will live on. Any less than that and the cell dies. Cells cannot live by bread alone.</p>
                <p>However we live in a world of finite resources, so if a live cell has too many neighbors (more than 3), overpopulation occurs and the cell dies.</p>
                <p>Finally, if exactly 3 neighbors move in around a dead cell, that cell becomes alive!</p>
            </div>
            <div className="App-control-board">
                <Ticker count={count} />
                <Button
                    simulating={simulating}
                    setSimulating={setSimulating}
                    init={init}
                />
                <button 
                    style={{background: 'teal', color: 'azure'}}
                    onClick={() => {
                        setCount(0)
                        setGrid(() => helpers.randomizeGrid())
                    }}>
                        Randomize</button>
                <div style={{minWidth: '400px', minHeight: '150px'}}>
                    {!isSimulating.current ? (
                        <>
                        <div>
                            <button onClick={() => setGrid(helpers.glider)}>Start with Glider</button>
                            <button onClick={() => setGrid(helpers.pulsar)}>Start with Pulsar</button>
                        </div>
                        <SetSpeed
                            speed={runningSpeed.current}
                            setSpeed={setSpeed}
                        />
                        <Reset resetGrid={resetGrid} />
                        </>
                    ) : null}
                </div>
                <ColorPicker setColor={setColor} />
            </div>
        </div>
    )
}
