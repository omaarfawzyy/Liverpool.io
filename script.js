let players = [];

async function fetchPlayers() {
    const apiUrl = "https://api.statorium.com/api/v1/teams/3/?season_id=1";
    const apiToken = "12454f663fa8765723d09d3821b5ed6d"; 
    
    try {
        const response = await fetch(`${apiUrl}&apikey=${apiToken}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Player Data:", data);
        
        players = data.team.players;
        displayPlayers(players);
    } catch (error) {
        console.error("Error fetching player data:", error);
    }
}

function displayPlayers(players) {
    const tableBody = document.getElementById("player-card");
    tableBody.innerHTML = "";
    players.forEach(player => {
        const card = document.createElement("div");
        card.className = 'playerfixture';
        card.innerHTML = `
            <h3>${player.lastName}</h3>
            <p>${player.country.name}</p>
        <img src="${player.photo}" alt="${player.shortName}">
        `;
        tableBody.appendChild(card);
    });
}

function getPlayerByName(lastName) {
    return players.find(player => player.lastName  == lastName);
}

function searchPlayer() {
    const lastNameInput = document.getElementById("lastNameInput").value;
    const player = getPlayerByName(lastNameInput);
    const playerInfoDiv = document.getElementById("player-card");

    if (player) {
        playerInfoDiv.innerHTML = `
        <div class="playerfixture">
        <h3>${player.fullName}</h3>
        <p>${player.country.name}</p>
        <img src="${player.photo}" alt="${player.shortName}">
        </div>
        `;
    } else {
        playerInfoDiv.innerHTML = "<p>Player not found.</p>";
    }
}

document.addEventListener("DOMContentLoaded", fetchPlayers);


// https://api.statorium.com/api/v1/teams/3/?season_id=1&apikey=f818f7cba3a3f5abc6ec83f597c1b172
