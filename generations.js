const menuButton = document.getElementById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');

const searchBtn = document.getElementById('searchBtn');
const searchDisplay = document.querySelector('#searchDisplay');
const searchContainer = document.querySelector('#searchContainer');
const characterContainer = document.querySelector('#characterContainer');
const randomNum = getRandomNumber();
const genContainer = document.querySelector('#genContainer');
const genDivs = genContainer.querySelectorAll('div');

let currentAbortController = null;
let selectedGen = '';

let APIurl = 'https://pokeapi.co/api/v2/';
const gridItem =
    'bg-gradient-to-br shadow-inner from-slate-200 to-fuchsia-300 hover:cursor-pointer hover:scale-[1.01] active:scale-[0.98] flex flex-col items-center text-slate-800 justify-center shadow-lg border-2 border-slate-300 rounded-3xl py-5 px-3 col-1';

document.querySelector('#randomLink').href = 'details.html?id=' + randomNum;
let searchTerm = '';
let searchType = '';
let pokemon = {
    id: 0,
};

const types = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

async function fetchData() {
    let result, data;
    // searchTerm = inputForm.value;
    // searchType = searchOptions.value;

    try {
        result = await fetch(APIurl + 'generation/' + selectedGen);

        data = await result.json();

        return { data: data, type: 1 };
    } catch (error) {
        return null;
    }
}
async function retrievePokemonInfo(pokemon, color = 'no') {
    let result, data;

    if (color === 'yes') {
        result = await fetch(APIurl + 'pokemon/' + pokemon.name);

        data = await result.json();
    } else {
        result = await fetch(APIurl + 'pokemon/' + pokemon.pokemon.name);

        data = await result.json();
    }
    return data;
}

async function populateGrid() {
    // event.preventDefault();
    if (searchContainer.classList.contains('hidden')) {
        expose(searchContainer);
    }

    //console.log(searchContainer.classList.contains('hidden'));

    clearDisplay();
    const fetchResult = await fetchData();
    console.log(fetchResult);

    if (!fetchResult) {
        console.log('No data found or fetch error');
        // Handle the case where no data is returned, e.g., show a message to the user
        addToGrid(searchTerm, 0);
        return;
    }

    const { data } = fetchResult;
    console.log(data.pokemon_species);

    if (data.pokemon_species.length > 1) {
        const pokemonList = data.pokemon_species;
        for (const pokemon of pokemonList) {
            console.log(pokemon);
            const item = await retrievePokemonInfo(pokemon, 'yes');
            //console.log(item);
            addToGrid(item);
        }
    } else {
        addToGrid(data.pokemon);
    }

    // console.log(data);
    // console.log(type);
    //addToGrid();

    //console.log(value.abilities[0].ability.name);
}

function clearDisplay() {
    while (searchDisplay.firstChild) {
        searchDisplay.removeChild(searchDisplay.firstChild);
    }
}
const clearCharDisplay = () => {
    while (characterContainer.firstChild) {
        characterContainer.removeChild(characterContainer.firstChild);
    }
};

function titleCase(word) {
    const titleCase =
        word.split('').shift().toUpperCase() + word.split('').slice(1).join('');
    return titleCase;
}

function loadDetails(info) {
    pokemon.id = info.id;
    console.log(pokemon.id);
    expose(characterContainer);
    clearCharDisplay();
    const div = document.createElement('div');
    console.log(info);
    const name = titleCase(info.name);

    // div.classList.add(gridItem);
    div.innerHTML = `
    <div
                            class="p-1 m-3 border-2 border-slate-400 bg-gradient-to-b h-full from-slate-400 to-slate-500 rounded-3xl"
                        >
                            <img
                                class="w-4/5 mx-auto my-4 border-4 border-slate-700 p-2 bg-slate-100 rounded-3xl"
                                src=${info.sprites.front_default}
                                alt="ditto"
                            />

                            <div
                                class="m-2 my-4 flex-col text-lg w-full mx-auto justify-center items-center text-center text-slate-200"
                            >
                                <h1
                                    class="title text-center text-slate-100 text-3xl font-extrabold"
                                >
                                    ${name.toUpperCase()}
                                </h1>
                                <!-- ABILITIES -->
                                <div
                                    class="flex-col w-full justify-center items-center border-b-4 w-fit pb-5 border-slate-400 h-full p-3 flex my-1 mx-auto"
                                >
                                <h1
                                class="text-2xl select-none flex justify-center items-center border-t-4 border-slate-400 w-1/2 font-bold mx-auto pt-3 p-1 text-center"
                            >
                                        ABILITIES
                                    </h1>
                                    <ol
                                        class="text-slate-100 select-none justify-center w-full p-1 flex gap-2"
                                    >
                                    ${info.abilities
                                        .map(
                                            item => `<li
                                    class="bg-slate-600 select-none flex justify-center items-center  shadow-md  border-2 rounded-full font-bold text-lg text-center px-3 p-2"
                                >${item.ability.name}</li>`
                                        )
                                        .join('')}
                                    </ol>

                                    <!-- TYPES -->
                                    <h1
                                        class="text-2xl select-none flex font-bold mt-4 mx-auto border-t-4 border-slate-400 w-1/2 text-center justify-center p-1 py-4 text-center"
                                    >
                                        TYPES
                                    </h1>
                                    <ol
                                        class="text-slate-100 justify-center  flex gap-1"
                                    >
                                    ${info.types
                                        .map(
                                            type => `<li
                                    class="type-${type.type.name} select-none  shadow-md  border-2 rounded-full font-bold text-lg text-center px-3 p-2"
                                >${type.type.name}</li>`
                                        )
                                        .join('')}
                                            
                                    </ol>
                                </div>
                                <a
                                        href="details.html?id=${pokemon.id}">
                                <p
                                    
                                
                                    
                                        class=" my-2 p-5 w-4/5 mx-auto w-fit text-center bg-blue-600 select-none text-white mx-auto hover:bg-blue-400 hover:border-blue-500 hover:scale-[0.95] active:scale-[0.92] active:bg-blue-300 active:border-blue-400 font-bold border-2 border-blue-700 shadow-lg text-center mx-2  px-4 mt-6  rounded-full"
                                        >Detailed Stats
                                    
                                    </a>
                                </p>
                            </div>
                        </div>
                        `;

    characterContainer.appendChild(div);
}

function addToGrid(info, x = 1) {
    const div = document.createElement('div');
    if (x === 0) {
        div.innerHTML = `
        <div class="alert bg-red-300 mx-auto p-2 border-2 text-center border-red-400 w-full cols-3 rounded-3xl flex justify-center items-center">
        <p clas ="w-full flex mx-auto text-center">
        No response found for '${searchOptions.value}' of '${searchTerm}'.
        </p>
            </div>

        `;
    } else {
        // div.classList.add(gridItem);

        const name =
            info.name.split('').shift().toUpperCase() +
            info.name.split('').slice(1).join('');
        div.innerHTML = `
    <div
                                class="showDetails type-${info.types[0].type.name} shadow-inner  hover:cursor-pointer hover:scale-[1.01] active:scale-[0.98] flex flex-col h-full my-auto items-center text-slate-200 justify-center shadow-lg border-2  rounded-3xl py-5 px-3 col-1"
                            >

                                <img
                                    class="h-1/2"
                                    src=${
                                        info.sprites.versions['generation-v'][
                                            'black-white'
                                        ].animated.front_default
                                            ? info.sprites.versions[
                                                  'generation-v'
                                              ]['black-white'].animated
                                                  .front_default
                                            : info.sprites.front_default
                                    }
                                    alt="ditto sprite"
                                />
                                
                                <div
                                    class="flex-col-reverse flex items-center text-center justify-center"
                                >
                                    <h1
                                        class="text-2xl select-none font-bold py-1 font-mono text-slate-200"
                                    >
                                        ${name}
                                    </h1>
                                    <p
                                        class="mx-2 select-none text-md font-extrabold text-slate-400"
                                    >
                                        No. ${info.id}
                                    </p>
                                </div>

                                <!-- <span class="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, placeat? Unde, ut! Perspiciatis, quia esse?</span> -->
                                
                                <div class="flex gap-1 justify-center text-slate-100 items-center">
                                
                                    ${info.types
                                        .map(
                                            type => `<div
                                    class="type-${type.type.name} select-none  shadow-md  border-2 rounded-full font-bold text-md text-center px-3"
                                >${type.type.name}</div>`
                                        )
                                        .join('')}
                                    </div>
                                    
                                </div>
                                </div
                            
`;
    }

    searchDisplay.appendChild(div);
    div.querySelector('.showDetails').addEventListener('click', event => {
        loadDetails(info);
    });
}

// SELECT TYPE
function selectGen(id) {
    console.log(id);
    selectedGen = id;
    genDivs.forEach(div => {
        if (div.id === selectedGen && div.classList.contains('notSelected')) {
            div.classList.remove('notSelected');
        } else if (div.classList.contains('notSelected')) {
            //do nothing
        } else {
            div.classList.add('notSelected');
        }
    });
}

genDivs.forEach(div =>
    div.addEventListener('click', event => {
        selectGen(div.id);
    })
);
//Expose Div

const expose = element => {
    if (element.classList.contains('hidden')) {
        element.classList.toggle('hidden');
    }
    // console.log('element');
};

const dropdownExpose = element => {
    dropdownMenu.classList.toggle('hidden');

    // console.log('element');
};

//console.log(menuButton);

//EVENT LISTENERS
menuButton.addEventListener('click', event => {
    dropdownExpose();
});

searchBtn.addEventListener('click', populateGrid);
//inputForm.addEventListener('input', createVal);

// Prevent form submission on Enter key press

// Prevent default form submission
const form = document.querySelector('form'); // Make sure to target the correct form
searchBtn.addEventListener('submit', function (event) {
    event.preventDefault();
    populateGrid();
});

function getRandomNumber() {
    const min = 1;
    const max = 1025;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init() {
    clearDisplay();
}

init();
