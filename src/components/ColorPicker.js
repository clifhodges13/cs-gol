import React from 'react';
import { CompactPicker } from 'react-color';

export default function ColorPicker({ setColor }) {

    return <CompactPicker onChange={(color) => setColor(color.hex)} />
}
