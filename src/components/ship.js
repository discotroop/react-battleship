import React from 'react';

function Ship(length) {
    return {
        length: length,
        health: [],
        sunk: "N",
        hit: function(position) {
            this.health[position] = "x";
            this.isSunk();
            if (this.health.length > length) {
                console.log('growing pains');
            }
            return
        },
        isSunk: function() {
            let coordRegex = /\d.\d/g;
            let matches = this.health.some(e => coordRegex.test(e));
            if (matches) {
                this.sunk = "N"
            } else {
                this.sunk = "Y";
            }
        }
    }
}

export default Ship;