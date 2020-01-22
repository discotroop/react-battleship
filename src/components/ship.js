import React from 'react';

function Ship(length) {
    return {
        length: length,
        health: [],
        sunk: "N",
        hit: function(position) {
            this.health[position] = "x";
            this.isSunk();
            return
        },
        isSunk: function() {
            if (this.health.includes(undefined)) {
                // console.log("floating")
            } else {
                this.sunk = "Y";
            }
        }
    }
}

export default Ship;