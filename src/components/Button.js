import React from 'react'

export default function Button({ simulating, init }) {
    return (
        <button onClick={() => init()}>
            {simulating ? 'STOP' : 'START'}
        </button>
    )
}
