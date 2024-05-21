let APIurl = 'https://pokeapi.co/api/v2/';
const abilities = document.querySelector('#abilities');
const types = document.querySelector('#types');
const randomNum = getRandomNumber();
document.querySelector('#randomLink').href = 'details.html?id=' + randomNum;

async function fetchData(id) {
    let result, data;

    result = await fetch(APIurl + 'pokemon/' + id.toString());

    data = await result.json();
    //console.log(data);

    return data;
}

function titleCase(word) {
    const titleCase =
        word.split('').shift().toUpperCase() + word.split('').slice(1).join('');
    return titleCase;
}

function populateCharPanel(data) {
    const div = document.createElement('div');
    const name = titleCase(data.name);

    div.innerHTML = `
<!-- Image -->
                        <div
                            class="p-1 m-3 border-2 border-slate-400 bg-slate-500 rounded-3xl"
                        >
                            <img
                                class="w-4/5 mx-auto my-4 border-4 border-slate-700 p-2 bg-slate-100 rounded-3xl"
                                src=${data.sprites.front_default}
                                alt="ditto"
                            />

                            <!-- INFO -->
                            <div
                                class="m-2 my-4 flex-col text-lg w-4/5 mx-auto text-center items-center justify-center text-slate-200"
                            >
                                <div
                                    class="flex gap-2 justify-center items-center"
                                >
                                <h1
                                class="title text-center text-slate-100 pb-6 text-3xl font-extrabold"
                            >
                                ${name.toUpperCase()}
                            </h1>

                                    <div
                                        class="flex gap-1 text-slate-400 items-center justify-center text-sm"
                                    >
                                        <span class="font-extrabold">No.</span>
                                        <span class="font-extrabold number"
                                            >${data.order}</span
                                        >
                                    </div>
                                </div>

                                <p
                                    class="inline-grid flex  border-t-4 border-slate-400  pt-6 grid-rows-1 grid-cols-2 gap-3"
                                >
                                    <span
                                        class="col-1 bg-slate-200 text-slate-700 mx-auto flex rounded-3xl px-3 py-2 shadow-lg"
                                        >Height: ${data.height}</span
                                    >
                                    <span
                                        class="col-1 bg-slate-200 text-slate-700 mx-auto flex rounded-3xl px-3 py-2 shadow-lg"
                                        >Weight: ${data.weight}</span
                                    >
                                    
                                </p>
                            </div>
                        </div>`;

    document.querySelector('.charPanel').appendChild(div);
}

function populateStatPanel(info) {
    console.log(info);
    let stats = [];

    info.stats.forEach(item => stats.push(item.base_stat));
    console.log(stats);

    const data = {
        labels: ['hp', 'attack', 'defense', 'sp-attack', 'sp-defense', 'speed'],
        datasets: [
            {
                label: 'stats',
                data: stats,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
        ],
    };

    const ctx = document
        .getElementsByClassName('radar-chart')[0]
        .getContext('2d'); // Get the canvas context

    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options,
    });
}

function getRandomNumber() {
    const min = 1;
    const max = 1025;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function populateAbilitiesTypes(info) {
    const divAb = document.createElement('div');
    const divType = document.createElement('div');

    divType.innerHTML = `
    ${info.types
        .map(
            item => `<p
    class="type-${item.type.name}  shadow-lg text-center text-xl m-2 border-2 rounded-3xl px-4 py-1"
    >${item.type.name}</p>`
        )
        .join('')}`;

    divAb.innerHTML = `
${info.moves
    .map(
        item => `<p
class="bg-slate-100 shadow-lg text-slate-700 text-center m-1  w-fit mx-auto border-2 border-white rounded-3xl  p-2 py-1"
>${item.move.name}</p>`
    )
    .join('')}`;

    abilities.appendChild(divAb);
    console.log(divAb.innerHTML);
    types.appendChild(divType);
}

async function loadDetails() {
    const data = await fetchData(id);

    populateCharPanel(data);
    populateStatPanel(data);
    populateAbilitiesTypes(data);
    //populateRightPanel()
    //  console.log(data);
}

// RADAR CHART

const options = {
    scale: {
        angleLines: {
            //   display: false,
        },
        ticks: {
            //  display: true,
        },
    },
};

function assignId() {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    return id;
}

function init() {
    const id = assignId();
    console.log(id);
    loadDetails(id);
}

init();
