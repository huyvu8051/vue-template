function rollDice() {

    if (parcheesi.isDiced === true) {
        parcheesi.tempAlert("NOT turn to dice!!!", "black", "red");
        return;
    }

    var diceValue = 1;
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach(die=>{
        toggleClasses(die);
        die.dataset.roll = diceValue = getRandomNumber(1, 6);
    }
    );
    
    parcheesi.tempAlert(parcheesi.oCurrentPlayer.color + " diced a " + diceValue, parcheesi.oCurrentPlayer.color);
    setTimeout(function() {

        parcheesi.iDiced = diceValue;
        d3.select(".diced").text(parcheesi.iDiced);
        parcheesi.isDiced = true;

        if (!parcheesi.isAbleToTakeTurn()) {
            // check this currentplayer can do a turn, if not -> give turn to next player
            parcheesi.tempAlert(parcheesi.oCurrentPlayer.color + " loses turn, the turn is given to next player!!!", parcheesi.oCurrentPlayer.color);
            parcheesi.setNextPlayer();
            parcheesi.dice();
            return;
        }
        ;
    }, 500);

}

function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
