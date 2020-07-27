// Need 2 arrays. One to hold the data for the current view, and one to hold the data for the next view.

// Double buffering: computing next view while showing current view (which has already been computed), then when next view is calculated, swap the views.

export const gridWidth = 25;
export const gridHeight = 25;

export default function buildGrid() {
    
    const rows = [];

    for (let i = 0; i < gridWidth; i++) {
        rows.push(Array.from(Array(gridHeight), ()=> 0))
    };

    return rows;
};

