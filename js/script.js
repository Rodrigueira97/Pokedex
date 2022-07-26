const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonName = document.querySelector('.pokemon_name')
const pokemonImage = document.querySelector('.pokemon_image')
const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input_search')
const Prev = document.querySelector('.btn-prev')
const Next = document.querySelector('.btn-next')

let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {
    
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(ApiResponse.status == 200){
        
        const data = await ApiResponse.json();
    
        return data;
    }


}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon)
    
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
        inputSearch.value =''
        searchPokemon = data.id

    }else{
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = '0'
        pokemonImage.src =''
        pokemonImage.alt =''

        inputSearch.value =''

    }

}

form.addEventListener('submit', (event)=>{

    event.preventDefault();

    renderPokemon(inputSearch.value.toLowerCase())    
})

Prev.addEventListener('click', ()=>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }


})

Next.addEventListener('click', ()=>{
   
   searchPokemon += 1;
    renderPokemon(searchPokemon)
})


renderPokemon(searchPokemon)

