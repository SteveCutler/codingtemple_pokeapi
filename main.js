const menuButton = document.getElementsById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');

const options = {
    scale: {
        angleLines: {
            display: false,
        },
        ticks: {
            fontColor: 'red', // Change the color of the scale numbers
            fontSize: 14, // Change the font size of the scale numbers
        },
    },
};

const data = {
    labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
    ],
    datasets: [
        {
            label: 'STATS',
            data: [65, 59, 90, 81, 56, 55],
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

const ctx = document.getElementsByClassName('radar-chart')[0].getContext('2d'); // Get the canvas context

const radarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options,
});
const exposeMenu = () => {
    // dropdownMenu.classList.toggle('hidden');
};

window.addEventListener('resize', () => {
    radarChart.resize();
});

menuButton.addEventListener('onClick', exposeMenu);
