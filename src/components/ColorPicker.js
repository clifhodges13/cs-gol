import React from 'react';
import { CirclePicker } from 'react-color';

export default function ColorPicker({ setColor }) {

    return <CirclePicker onChange={(color) => setColor(color.hex)} />
}
