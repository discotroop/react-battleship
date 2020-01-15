import React from 'react';

function Ship(length) {
    return {
        length: length,
        hits: [0, 0, 0, 0, 0],
        sunk: "N"
    }
}

export default Ship;