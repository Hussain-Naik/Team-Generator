function generatePlayers() {
    let limit = document.getElementById('playerCount').value;
    let players = document.getElementById('players');
    for (let i = 0 ; i < limit; i++) {
        players.innerHTML += `<label for="player${i+1}">Player ${i+1}</label>
        <input type="text" id="player${i+1}" class="players">`;
    }
    players.innerHTML += `<input type="button" value="Save" onclick="savePlayers()">
    <input type="button" value="Load" onclick="loadPlayers()">
    <input type="button" value="Randomize" onclick="randomizePlayers()">`;
}

function randomizePlayers() {
    let playersArray = getPlayerArray();

    for (let i = playersArray.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = playersArray[i];
    playersArray[i] = playersArray[j];
    playersArray[j] = k;
    }
    savePlayers(playersArray);
    loadPlayers();
}

function savePlayers(players) {
    let playersArray = getPlayerArray();
    players = (typeof(players) != 'undefined') ? players : playersArray;
    localStorage.setItem('players' , players);
}

function loadPlayers() {
    let playersArray = localStorage.getItem('players').split(',');
    playersArray.forEach(myFunction);
}

function myFunction(element, index) {
    document.getElementsByClassName('players')[index].value = element;
}

function getPlayerArray() {
    let playersArray = [];
    for (let i = 0; i < document.getElementsByClassName('players').length ; i++) {
        playersArray[i] = document.getElementsByClassName('players')[i].value;
    }
    return playersArray;
}
function remainingPlayers(used, arrayArg) {
    let array = [];
    for (i = 0 ; i < arrayArg.length; i++) {
        array[i] = arrayArg[i];
    }

    for (let i = 0; i < used.length; i++) {
        let index = array.indexOf(used[i]);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
    return array;
}

function uniqueTeams(remaining) {
    let array = [];
    let limit = remaining.length;
    for (let i = 0; i < limit - 1; i++) {
        for (let j = i + 1 ; j < limit ; j++) {
            let item = [remaining[i], remaining[j]];
            array.push(item);
        }
    }
    return array;
}

function allGames(arrayArg) {
    let array = [];
    
    let uniqueTeamsArray = uniqueTeams(arrayArg);
    for (let i = 0; i < uniqueTeamsArray.length; i++) {
        let remaining = uniqueTeams(remainingPlayers(uniqueTeamsArray[i], arrayArg));
        for (let j = 0; j < remaining.length; j++) {
            let item = `${uniqueTeamsArray[i]} vs ${remaining[j]}`;
            array.push(item);
        }
    }
    return array;
}

function uniqueGames(arrayArg) {
    let array = allGames(arrayArg);
    for (let i = 0; i < array.length; i++) {
        let item = array[i].split(' vs ');
        let reverse = `${item[1]} vs ${item[0]}`
        let index = array.indexOf(reverse);
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
    

    return array;
}

function multiArray(arrayArg) {
    let object = [];

    if (arrayArg.length == 6) {
        return sort6(arrayArg);
    } else if (arrayArg.length % 4 != 0) {
        for (let i = 0 ; i < arrayArg.length ; i++) {
            let exclude = [];
            exclude[0] = arrayArg.length - i;
            let array = uniqueGames(remainingPlayers(exclude, arrayArg));
            object[i] = array;
        }
        return sortArray(object);
    } else {
        object = uniqueGames(arrayArg);
    }
    return object;
}

function sortArray(object) {
    let sort = [];
    for (let i = 0; i < object[i].length ; i ++) {
        for (let j = 0; j < object.length ; j++) {
            let item = object[j][i];
            sort.push(item);
        }
    }
    return sort;
}

function excludeSort6(arrayArg) {
    let baseArray = uniqueTeams(arrayArg);
    returnArray = [];
    for (let i = 0 ; i < arrayArg.length -1 ; i++) {
        for (let j = 0; j < 3 ; j++) {
            let jInc = (i % 3 + j > 3) ? 0 : i%3 +j;
            let exclude = baseArray[i];
            returnArray.push(baseArray[i]);
            nextExclude = uniqueTeams(remainingPlayers(exclude, arrayArg))[jInc];
            returnArray.push(nextExclude);
            nextArray = remainingPlayers(exclude, arrayArg);
            returnArray.push(uniqueTeams(remainingPlayers(nextExclude, nextArray))[0]);
        }
    }


    return returnArray;
}

function sort6(arrayArg) {
    let array = excludeSort6(arrayArg);
    let returnArray = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 5; j++) {
            let x = (i*3) + (j*9);
            returnArray.push(`${array[x]} vs ${array[x+1]}`)
            returnArray.push(`${array[x]} vs ${array[x+2]}`)
            returnArray.push(`${array[x+1]} vs ${array[x+2]}`)
        }
        
    }
    return returnArray;
}