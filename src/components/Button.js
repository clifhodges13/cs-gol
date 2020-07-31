import React from 'react'

export default function Button({ simulating, init }) {
    return (
        <button style={{background: `${simulating ? '#943535' : '#20c573' }`, color: 'azure'}} onClick={() => init()}>
            {simulating ? 'STOP' : 'START'}
        </button>
    )
}
