import React from 'react';

export default function Cell({ alive, createNewGrid, i, j, color }) {
    
    const styles = {
        backgroundColor: `${color}`
    }

    const aliveOrDead = alive ? 'alive' : 'dead';

    return (
        <div
            style={alive ? styles : null}
            className={`App-cell ${aliveOrDead}`}
            onClick={() => createNewGrid(i,j)}
        >
        </div>
    );
};
