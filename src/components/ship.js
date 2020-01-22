import React from 'react';

function Ship(length) {
    return {
        length: length,
        hits: new Array(length),
        sunk: "N",
        hit: function(position) {
            this.hits[position] = "x";
            this.isSunk();
            return
        },
        isSunk: function() {
            if (this.hits.includes(undefined)) {
                // console.log("floating")
            } else {
                this.sunk = "Y";
            }
        }
    }
}

export default Ship;