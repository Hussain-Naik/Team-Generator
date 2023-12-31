function generatePlayers(check) {
    let limit = document.getElementById('playerCount').value;
    let players = document.getElementById('playerInput');
    players.innerHTML = "";
    for (let i = 0 ; i < limit; i++) {
        players.innerHTML += `<div class="player${i+1} insertScore"><label for="player${i+1}">${i+1}: </label>
        <input type="text" id="player${i+1}" placeholder="Player ${i+1}" class="players toggleDisable"><button class="toggleDisable" onclick="deletePlayer('player${i+1}')"><i class="fa-solid fa-xmark"></i></button></div>`;
    }
    let playersButtons = document.getElementById('playerButtons');
    if (playersButtons.children.length == 0) {
        playersButtons.innerHTML += `<button class="toggleDisable" onclick="savePlayers()"><i class="fa-solid fa-cloud-arrow-up"></i></button>
        
        <button class="toggleDisable" onclick="randomizePlayers()"><i class="fa-solid fa-shuffle"></i></button>
        <button class="toggleDisable" onclick="matchUp()"><i class="fa-solid fa-gamepad"></i></button>`;
    }
    if (check == true) {
        newGameID();
    }
    
}

function clearLocalStorage() {
    localStorage.clear()
    let session1 = {
        id: "2023-08-16",
        players: 5,
        addGames: ["Full Set"],
        winSequence: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        playerNames: ["Hussain", "Ahmed", "Tauseef", "Mujahid", "Anwar"],
        leaderBoard: [13, 10, 14, 5, 2]
    }

    let session2 = {
        id: "2023-08-09",
        players: 5,
        addGames: ["Full Set"],
        winSequence: [0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
        playerNames: ['Ahmed', 'Anwar', 'Mujahid', 'Tauseef', 'Hussain'],
        leaderBoard: [10, 8, 4, 6, 6]
    }

    let session3 = {
        id: "2023-08-02",
        players: 6,
        addGames: [],
        winSequence: [1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
        playerNames: ['Ahmed', 'Mudassir', 'Tauseef', 'Hussain', 'Mujahid', 'Anwar'],
        leaderBoard: [5, 2, 7, 11, 4, 7]
    }
    
    let session4 = {
        id: "2023-07-19",
        players: 4,
        addGames: ['Full Set', 'Full Set', 'Full Set', 'Full Set'],
        winSequence: [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1],
        playerNames: ['Anwar', 'Hussain', 'Mujahid', 'Tauseef'],
        leaderBoard: [5, 12, 4, 7]
    }

    let session5 = {
        id: "2023-07-12",
        players: 6,
        addGames: [],
        winSequence: [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0],
        playerNames: ['Hussain', 'Mujahid', 'Tauseef', 'Anwar', 'Ahmed', 'Mudassir'],
        leaderBoard: [6, 1, 10, 7, 8, 6]
    }

    let session6 = {
        id: "2023-07-05",
        players: 5,
        addGames: ['1,4 vs 2,5', '1,2 vs 3,5'],
        winSequence: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        playerNames: ['Mujahid', 'Tauseef', 'Hussain', 'Ahmed', 'Anwar'],
        leaderBoard: [6, 10, 9, 3, 6]
    }

    let session7 = {
        id: "2023-06-21",
        players: 5,
        addGames: [],
        winSequence: [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
        playerNames: ['Ahmed', 'Anwar', 'Hussain', 'Tauseef', 'Mujahid'],
        leaderBoard: [5, 5, 8, 8, 6]
    }

    localStorage.setItem(session1.id, JSON.stringify(session1));
    localStorage.setItem(session2.id, JSON.stringify(session2));
    localStorage.setItem(session3.id, JSON.stringify(session3));
    localStorage.setItem(session4.id, JSON.stringify(session4));
    localStorage.setItem(session5.id, JSON.stringify(session5));
    localStorage.setItem(session6.id, JSON.stringify(session6));
    localStorage.setItem(session7.id, JSON.stringify(session7));
}
function returnDateID() {
    let now = new Date();
    let month = now.getMonth() +1;
    month = (month < 10) ? `0${month}` : month;
    let date = now.getDate();
    date = (date < 10) ? `0${date}` : date;
    let dateVariable = `${now.getFullYear()}-${month}-${date}`;
    return dateVariable
}

function newGameID(){
    let limit = document.getElementById('playerCount').value;
    let dateVariable = returnDateID()
    const gameSession = {
        id: dateVariable,
        players: limit,
        addGames: new Array(),
        winSequence: new Array()
    };

    localStorage.setItem(dateVariable, JSON.stringify(gameSession));
}

function deletePlayer(element) {
    let item = document.getElementsByClassName(element);
    item[0].remove();
    updateLabels();
}

function updateLabels() {
    let labels = document.getElementById('players').getElementsByTagName('label');
    for (let i = 0; i < labels.length; i++) {
        labels[i].innerHTML = `Player ${i+1}`;
    }
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
    let dateVariable = returnDateID()
    let playersArray = getPlayerArray();
    playersList = (typeof(players) != 'undefined') ? players : playersArray;
    let object = JSON.parse(localStorage.getItem(dateVariable));
    object.playerNames = playersList;
    localStorage.setItem(object.id , JSON.stringify(object));
}

function loadPlayers(check) {
    document.getElementById('playerInput').innerHTML = '';
    document.getElementById('playerButtons').innerHTML = '';
    const html = document.getElementById('displayGames');
    html.innerHTML = '';
    let dateVariable = returnDateID()
    let object = JSON.parse(localStorage.getItem(dateVariable));
    document.getElementById('playerCount').value = object.players
    generatePlayers(false)
    let playersArray = object.playerNames;
    playersArray.forEach(myFunction);
    if (check == true) {
        matchUp()
        object.addGames.forEach(myAddGameFunction)
        object.winSequence.forEach(reloadGameResults)
        updateScore();
        updateRank();
    }
    
}
function reloadGameResults(element, index) {
    let game = document.getElementById('displayGames').children[index]
    if (element == 1){
        game.firstChild.classList.add('lose')
        game.lastChild.classList.add('win')
    }
    else if (element == 0) {
        game.firstChild.classList.add('win')
        game.lastChild.classList.add('lose')
    }
    
}

function myAddGameFunction(element) {
    addGame(element)
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
            jInc = (i % 2 == 0) ? i + j : j + i%2;
            jInc = (jInc % 3 == 0) ? 0 : jInc % 3;
            jInc = (i % 4 == 0) ? j : jInc;
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

function disableInput() {
    let players = document.getElementsByClassName('toggleDisable');
    for (let i = 0; i < players.length; i ++) {
        players[i].disabled = true;
    }
}

function removeButtons() {
    let elements = document.getElementById('players').getElementsByTagName('Button');
    for (let i = elements.length -1; i > -1 ; i--) {
        elements[i].remove();
    }
}

function addScore() {
    let scores = document.getElementsByClassName('insertScore');
    for (let i = 0; i < scores.length ; i++) {
        let element = document.createElement('input');
        element.setAttribute('class', 'rank');
        element.setAttribute('type', 'number');
        element.setAttribute('id', `player${i+1}Score`);
        element.setAttribute('disabled', 'true');
        element.setAttribute('min', '0');
        element.setAttribute('max', '99');
        scores[i].appendChild(element);
    }
}

function getPlayerName(pairing) {
    let array = pairing.split(',');
    let result = '<span>'+document.getElementById(`player${array[0]}`).value + '</span><span>' + document.getElementById(`player${array[1]}`).value + '</span>';
    return result
}

function setDefaultNames() {
    let input = document.getElementsByClassName('players');
    for (let i = 0; i < input.length; i++) {
        if (input[i].value.length == 0){
            input[i].value = input[i].getAttribute('placeholder');
        }
    }
}

function matchUp(){
    setDefaultNames();
    let element = document.getElementById('displayGames');
    let html = document.getElementsByTagName('section')[0];
    let insertFieldSet = document.createElement("fieldset");
    let legend = document.createElement("legend");
    let label = document.createElement("label");
    const select = document.createElement("select");
    legend.innerText = 'Continue Playing:';
    label.innerText = 'Replay Options:';
    select.setAttribute('id','replayMatch')
    select.setAttribute('name','replayMatch')
    label.setAttribute('for','replayMatch')
    insertFieldSet.appendChild(legend);
    insertFieldSet.appendChild(label);
    let baseOption = document.createElement('option');
    baseOption.value = 'Full Set';
    baseOption.innerText = 'Full Set';
    select.appendChild(baseOption);
    
    let playerArray = [];
    for (let i = 0 ; i < getPlayerArray().length; i++) {
        playerArray[i] = i + 1;
    }
    let array = multiArray(playerArray);
    for (let i = 0; i < array.length; i++){
        let option = document.createElement('option');
        option.value = array[i];
        option.innerText = array[i];
        select.appendChild(option);
        let item = document.createElement("li");
        item.setAttribute('class' , i)
        let teams = array[i].split(' vs ');
        let insert = `<div class="outcome" data-type="${teams[0]}">${getPlayerName(teams[0])}</div><div class="vs">V/S</div><div class="outcome" data-type="${teams[1]}">${getPlayerName(teams[1])}</div>`;
        item.innerHTML = insert;
        element.appendChild(item);
    }
    insertFieldSet.appendChild(select);
    let buttonAdd = document.createElement('button');
    buttonAdd.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    buttonAdd.setAttribute('onclick','addGame()');
    insertFieldSet.appendChild(buttonAdd);
    html.appendChild(insertFieldSet);

    addListener();
    disableInput();
    removeButtons();
    addScore();
}

function addGame(option) {
    let dateVariable = returnDateID()
    let object = JSON.parse(localStorage.getItem(dateVariable));
    let playerArray = [];
    let element = document.getElementById('displayGames');
    for (let i = 0 ; i < getPlayerArray().length; i++) {
        playerArray[i] = i + 1;
    }
    check = (typeof(option) != 'undefined') ? true : false;
    option = (typeof(option) != 'undefined') ? option : document.getElementById('replayMatch').value;
    if (check == false) {
        object.addGames.push(option);
    }
    let offset = Number(document.getElementById('displayGames').lastChild.getAttribute('class')) + 1;
    if (option == 'Full Set') {
        let array = multiArray(playerArray);
        for (let i = 0; i < array.length; i++){
            let item = document.createElement("li");
            item.setAttribute('class' , offset + i)
            let teams = array[i].split(' vs ');
            let insert = `<div class="outcome" data-type="${teams[0]}">${getPlayerName(teams[0])}</div><div class="vs">V/S</div><div class="outcome" data-type="${teams[1]}">${getPlayerName(teams[1])}</div>`
            item.innerHTML = insert;
            element.appendChild(item);
        }
    }
    else {
        let item = document.createElement("li");
        item.setAttribute('class' , offset)
        let teams = option.split(' vs ');
        let insert = `<div class="outcome" data-type="${teams[0]}">${getPlayerName(teams[0])}</div><div class="vs">V/S</div><div class="outcome" data-type="${teams[1]}">${getPlayerName(teams[1])}</div>`
        item.innerHTML = insert;
        element.appendChild(item);
    }
    localStorage.setItem(object.id , JSON.stringify(object));
    addListener();
}

function addListener() {
    let buttons = document.getElementsByClassName('outcome');
    for (let button of buttons) {
        button.addEventListener("click", function() {
            let dateVariable = returnDateID()
            let object = JSON.parse(localStorage.getItem(dateVariable));
            let index = Number(this.parentNode.getAttribute('class'))
            this.setAttribute('class' , 'outcome')
            this.classList.add('win')
            if (this.nextElementSibling == null) {
                if (object.winSequence[index] == 'undefined'){
                    object.winSequence.push(1)
                }
                else {
                    object.winSequence[index] = 1
                }
                
                this.parentNode.firstChild.setAttribute('class' , 'outcome')
                this.parentNode.firstChild.classList.add('lose')
            } else {
                if (object.winSequence[index] == 'undefined'){
                    object.winSequence.push(0)
                }
                else {
                    object.winSequence[index] = 0
                }
                this.parentNode.lastChild.setAttribute('class' , 'outcome')
                this.parentNode.lastChild.classList.add('lose')
            }
            
            
            for (let i = 0; i < object.winSequence.length; i++) {
                
                if (object.winSequence[i] == null || object.winSequence[i] == 'undefined') {
                    object.winSequence[i] = 3
                }
                
            }
            localStorage.setItem(object.id , JSON.stringify(object));
            updateScore();
            updateRank();
            
        });
    }

    let resetButton = document.getElementsByClassName('vs');
    for (let button of resetButton) {
        button.addEventListener("click", function() {
            let dateVariable = returnDateID()
            let object = JSON.parse(localStorage.getItem(dateVariable));
            let index = Number(this.parentNode.getAttribute('class'))
            this.parentNode.lastChild.setAttribute('class' , 'outcome')
            this.parentNode.firstChild.setAttribute('class' , 'outcome')
            if (object.winSequence[index] != 'undefined'){
                object.winSequence[index] = 3;
            }
            localStorage.setItem(object.id , JSON.stringify(object));
            updateScore();
            updateRank();
            
        });
    }
}

function updateScore() {
    
    resultsArray = returnWinArray();
    for (let i = 0; i < document.getElementById('playerCount').value ; i++) {
        let playerNumber = i+1;
        document.getElementById(`player${i+1}Score`).value = resultsArray.filter(x => x==playerNumber).length
    }
    leaderBoard()

}

function leaderBoard() {
    let dateVariable = returnDateID()
    let object = JSON.parse(localStorage.getItem(dateVariable));
    let scoreArray = document.getElementsByClassName('rank');
    let tempArray = [];
    for (let i = 0; i < scoreArray.length; i++){
        tempArray.push(Number(scoreArray[i].value));
    }
    object.leaderBoard = tempArray
    localStorage.setItem(object.id , JSON.stringify(object));
}

function updateRank() {
    
    let scoreArray = document.getElementsByClassName('rank');
    let rankArray = returnRankArray(scoreArray)
    for (let i = 0; i < scoreArray.length; i++) {
        if (scoreArray[i].parentNode.children.length > 3) {
            scoreArray[i].parentNode.lastChild.remove();
        }
        
        if (scoreArray[i].value == rankArray[0]) {
            insertRankIcon(scoreArray[i],'trophy')
        }else if (scoreArray[i].value == rankArray[rankArray.length -1]) {
            insertRankIcon(scoreArray[i],'ghost')
        }
        else {
        }
    }
}

function insertRankIcon(sibling, type) {
    if (sibling.parentNode.children.length < 4) {
        let child = document.createElement('i');
        child.setAttribute('class',`fa-solid fa-${type}`);
        sibling.parentNode.appendChild(child);
    }
}

function returnRankArray(array) {
    let result = [];
    for (let i = 0 ; i < array.length; i++) {
        result.push(array[i].value);
    }
    result.sort(function(a, b) {
        return a - b;
      });
    result.reverse();
    return result;

}
function returnWinArray() {
    let result = [];
    let winArray = document.getElementsByClassName('win');
    for (let i = 0; i < winArray.length ; i++) {
        result = result.concat(winArray[i].getAttribute('data-type').split(','))
    }
    return result;
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage).sort(),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
}

function allTimeRanking() {
    document.getElementById('playerInput').innerHTML = '';
    document.getElementById('playerButtons').innerHTML = '';
    const html = document.getElementById('displayGames');
    html.innerHTML = '';
    let lastElem = document.getElementById('Matches').nextElementSibling
    if (lastElem != null) {
        document.getElementById('Matches').nextElementSibling.remove();
    }
    const allData = allStorage();
    let leaderBoardArray = [];
    for (let i = 0; i < allData.length; i++) {
        let playerNames = allData[i].playerNames;
        leaderBoardArray = leaderBoardArray.concat(playerNames);
        let item = document.createElement("li");
        item.setAttribute('class' , 'table')
        let table = document.createElement("table");
        let tableHeadings = ''
        for (let j = 0; j < playerNames.length; j++) {
            tableHeadings += `<tr><td>${allData[i].playerNames[j]}</td>
            <td class="${allData[i].playerNames[j]}">${allData[i].leaderBoard[j]}</td>
            </tr>`;
        }
        table.innerHTML = tableHeadings;
        let insert = `<div>${allData[i].id}</div>`;
        item.innerHTML = insert
        item.appendChild(table);
        html.appendChild(item);
    }
    const allPlayers = [...new Set(leaderBoardArray)];
    for (let i = 0; i < allPlayers.length; i++) {
        let playerStatsArray = document.getElementsByClassName(allPlayers[i])
        let playerScore = 0
        for (let j = 0; j < playerStatsArray.length; j++){
            playerScore += Number(playerStatsArray[j].innerHTML)
        }
        let stats = document.getElementById('playerInput');
        let insert = `
        <div class="allTimeRank">
        <label for="${allPlayers[i]}">${allPlayers[i]} :</label>
        <input class="rank" type="number" id="${allPlayers[i]}" value="${playerScore}" disabled="true">
        </div>`
        stats.innerHTML += insert
    }
}