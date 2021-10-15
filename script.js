
// get the input, trasnform it in lowercase and send it to the function getPokemon

function getPokemonFromInput(){
    const input = document.getElementById("input").value;
    let inputLowercase = input.toLowerCase();
    
    // document.getElementById("btn-next").addEventListener("click", () => {
    //     inputLowercase += 1
    //     getPokemon(inputLowercase);
    // })
    
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

    // write the type of pokemon
    let typesArray = []
    pokemonType.innerHTML="";
    pokemonType.innerHTML= "<h2 class = 'title-types'> Type of Pokémon </h2>";
    for(let i = 0; i < data.types.length; i++){
        let element = data.types[i].type.name;
        typesArray.push(element);
        pokemonType.innerHTML += "<img class = 'types' id = '" + element + "' src= 'img/" + element + ".png'>";
    }
    let grass = document.getElementById("grass");
    console.log(grass);

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

