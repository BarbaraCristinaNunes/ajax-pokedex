
function getPokemonFromInput(){
    const input = document.getElementById("input").value;
    let inputLowercase = input.toLowerCase();  
    getPokemon(inputLowercase);

    
}
getPokemon(1);




async function getPokemon(inputLowercase){
    const pokemonName = document.getElementById("pokemon-name");
    const picture = document.getElementById("picture");
    const powers = document.getElementById("pokemon-powers");
    const movement = document.getElementById("movement");
    const evolutions = document.getElementById("evolution");

    if(!inputLowercase){
        return
    }

    let apiPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + inputLowercase);
    let data = await apiPokemon.json();
    console.log(data);
    
    pokemonName.innerHTML = "<h1>" + data.name.charAt(0).toUpperCase() + data.name.slice(1) + "</h1>";
    
    picture.innerHTML= "<img src=" + data.sprites['front_default'] + ">";
    number.innerHTML= data.id;
    
    powers.innerHTML="";
    powers.innerHTML = "<h2 class='title' >" + "Pokemon's power" + "</h2>";
    for(let j = 0; j < data.abilities.length; j++){
        powers.innerHTML+= "<li>" + data.abilities[j].ability.name.charAt(0).toUpperCase() + data.abilities[j].ability.name.slice(1) + "</li>";
        console.log(data.abilities[j]);
    }

    movement.innerHTML= " ";
    movement.innerHTML = "<h2 class='title'>" + "Pokemon's moves" + "</h2>"; 
    for(let i = 0; i < 4; i++){       
        movement.innerHTML+= "<li>" + data.moves[i].move.name.charAt(0).toUpperCase() + data.moves[i].move.name.slice(1) + "</li>";
        console.log(data.moves[i]);
    }

    async function getEvolutionChain (){
        let apiEvolutionChian = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + inputLowercase);      
        let dataEvolutionChain = await apiEvolutionChian.json();
        console.log(dataEvolutionChain);
        let url = dataEvolutionChain.evolution_chain.url;
        console.log(url);
        getEvolution(url);
    }
    getEvolutionChain();

    async function getEvolution (url){
        let apiEvolution = await fetch(url);      
        let dataEvolution = await apiEvolution.json();
        
        let evolution1 = 0;
        let evolution2 = 0;
        let evolution3 = 0;

        let evolutionsArray = [];

        if(dataEvolution.chain){
            evolution1 = dataEvolution.chain.species.name;
            evolutionsArray.push(evolution1);
        }
        if(dataEvolution.chain.evolves_to[0]){
            evolution2 = dataEvolution.chain.evolves_to[0].species.name;
            evolutionsArray.push(evolution2);
        }
        if(dataEvolution.chain.evolves_to[0].evolves_to[0]){
            evolution3 = dataEvolution.chain.evolves_to[0].evolves_to[0].species.name;
            evolutionsArray.push(evolution3);
        }
        
        console.log(evolutionsArray);

        console.log(evolution1);
        console.log(dataEvolution.chain);
        console.log(evolution2);
        console.log(evolution3);    
        

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
