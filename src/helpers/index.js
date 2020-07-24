// Need 2 arrays. One to hold the data for the current view, and one to hold the data for the next view.

// Double buffering: computing next view while showing current view (which has already been computed), then when next view is calculated, swap the views.

export const grid = [
    [1, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

