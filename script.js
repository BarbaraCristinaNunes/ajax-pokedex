
// get the input, trasnform it in lowercase and send it to the function getPokemon

function getPokemonFromInput(){
    const input = document.getElementById("input").value;
    let inputLowercase = input.toLowerCase();  
    getPokemon(inputLowercase);
    
}
getPokemon(1);

// thr function getPokemon write the information of the pokemons in the page

async function getPokemon(inputLowercase){
    const pokemonName = document.getElementById("pokemon-name");
    const picture = document.getElementById("picture");
    const pokemonType = document.getElementById("pokemon-type");
    const powers = document.getElementById("pokemon-powers");
    const movement = document.getElementById("movement");
    const evolutions = document.getElementById("evolution");
  
    let id = 1;
    let x = parseInt(inputLowercase)
    console.log(x);
    document.getElementById("btn-next").addEventListener("click", () => {
        if(id < 898){
            x += id;
        }
        console.log(x);
    })

    if(!inputLowercase){
        return
    }
     
    let apiPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + inputLowercase);
    let data = await apiPokemon.json();
    
    // write the name
    pokemonName.innerHTML = "<h1>" + data.name.charAt(0).toUpperCase() + data.name.slice(1) + "</h1>";
    
    // give the image
    picture.innerHTML= "<img src=" + data.sprites['front_default'] + ">";
    number.innerHTML= data.id;

    // write the typr
    let typesArray = []
    pokemonType.innerHTML="";
    pokemonType.innerHTML= "<h2 class = 'title-types'> Type of Pokémon </h2>";
    for(let i = 0; i < data.types.length; i++){
        let element = data.types[i].type.name;
        typesArray.push(element);
        if(element === "grass"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/grass.png'>";
        }
        if(element === "poison"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/poison.png'>";
        }
        if(element === "normal"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/normal.png'>";
        }
        if(element === "fire"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/fire.png'>";
        }
        if(element === "water"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/water.png'>";
        }
        if(element === "electric"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/eletric.png'>";
        }
        if(element === "ice"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/ice.png'>";
        }
        if(element === "fighting"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/fighting.png'>";
        }
        if(element === "ground"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/ground.png'>";
        }
        if(element === "flying"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/flying.png'>";
        }
        if(element === "psychic"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/psychic.png'>";
        }
        if(element === "bug"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/bug.png'>";
        }
        if(element === "rock"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/rock.png'>";
        }
        if(element === "ghost"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/ghost.png'>";
        }
        if(element === "dark"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/dark.png'>";
        }
        if(element === "dragon"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/dragon.png'>";
        }
        if(element === "steel"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/steel.png'>";
        }
        if(element === "fairy"){
            pokemonType.innerHTML += "<img class = 'types' src= 'img/fairy.png'>";
        }
    }
    
    // write the powers
    powers.innerHTML="";
    powers.innerHTML = "<h2 class='title' >" + "Pokemon's power" + "</h2>";
    for(let j = 0; j < data.abilities.length; j++){
        powers.innerHTML+= "<li>" + data.abilities[j].ability.name.charAt(0).toUpperCase() + data.abilities[j].ability.name.slice(1) + "</li>";
    }
    
    // write the moves
    movement.innerHTML= " ";
    movement.innerHTML = "<h2 class='title'>" + "Pokemon's moves" + "</h2>"; 
    
    if(data.moves.length < 2){
        for(let i = 0; i < data.moves.length; i++){       
            movement.innerHTML+= "<li>" + data.moves[i].move.name.charAt(0).toUpperCase() + data.moves[i].move.name.slice(1) + "</li>";
        }
    }if(data.moves.length > 1){
        for(let i = 0; i < 4; i++){       
            movement.innerHTML+= "<li>" + data.moves[i].move.name.charAt(0).toUpperCase() + data.moves[i].move.name.slice(1) + "</li>";
        }
    }

    
    // get the evolutions
    async function getEvolutionChain (){
        let apiEvolutionChian = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + inputLowercase);      
        let dataEvolutionChain = await apiEvolutionChian.json();
        console.log(dataEvolutionChain);
        let url = dataEvolutionChain.evolution_chain.url;
        console.log(url);
        getEvolution(url);
    }
    getEvolutionChain();

    // wreite the evolutions in the page
    async function getEvolution (url){
        let apiEvolution = await fetch(url);      
        let dataEvolution = await apiEvolution.json();
        console.log(dataEvolution);
        let evolutionsArray = [];

        if(dataEvolution.chain){
            evolutionsArray.push(dataEvolution.chain.species.name);
            console.log(evolutionsArray);
        }
        if(dataEvolution.chain.evolves_to.length > 0){            
            for(let i = 0; i < dataEvolution.chain.evolves_to.length; i++){
                evolutionsArray.push(dataEvolution.chain.evolves_to[i].species.name);
            }

            console.log(evolutionsArray);
        }
        
        for(let i = 0; i < dataEvolution.chain.evolves_to.length; i++){
            if(dataEvolution.chain.evolves_to[i].evolves_to){
                for(let j = 0; j < dataEvolution.chain.evolves_to[i].evolves_to.length; j++){
                    evolutionsArray.push(dataEvolution.chain.evolves_to[i].evolves_to[j].species.name);
                }
                console.log(evolutionsArray);
            }
        }

        evolutions.innerHTML= "";
        evolutions.innerHTML= "<h2 id = 'last-h2'>" + "Evolutions" + "</h2>";        
        for(let i = 0; i < evolutionsArray.length; i++){        
            let a = await fetch("https://pokeapi.co/api/v2/pokemon/" + evolutionsArray[i]);
            let d = await a.json();
            evolutions.innerHTML += "<img src=" + d.sprites['front_default'] + ">";
        }
    }  
}

document.getElementById("btn1").addEventListener("click",getPokemonFromInput);
