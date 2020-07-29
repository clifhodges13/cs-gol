import React from 'react';

export default function Cell({ alive, createNewGrid, i, j }) {
    const aliveOrDead = alive ? 'alive' : 'dead';

    return (
        <div
            className={`App-cell ${aliveOrDead}`}
            onClick={() => createNewGrid(i,j)}
        >
        </div>
    );
};
