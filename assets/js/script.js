function generatePlayers() {
    let limit = document.getElementById('playerCount').value;
    let players = document.getElementById('players');
    for (let i = 0 ; i < limit; i++) {
        players.innerHTML += `<label for="player${i+1}">Player ${i+1}</label>
        <input type="text" id="player${i+1}">`
    }
    console.log(players.innerHTML);

}