const selectEl = document.querySelector('#select');
const formEl = document.querySelector('form');
const ticketEl = document.querySelector('.see-ticket');


formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputNameEl = e.target.inputName.value;
    const inputNumberEl = e.target.inputNumber.value;
    const optionEl = selectEl.options[select.selectedIndex].text;

    const info = `<h1 class'pb-5'>Il tuo biglietto</h1>
            <div class='d-flex justify-content-around'>
                <div>
                    <h2 class='pe-4'>Nome</h2>
                    <span>${inputNameEl}</span>
                </div>
                <div>
                    <h2 class='pe-4'>Km da percorrere</h2>
                    <span>${inputNumberEl}km</span>
                </div>
                <div>
                    <h2 class='pe-4'>Fascia d'età</h2>
                    <span>${optionEl}</span>
                </div>
                <div>
                    <h2 class='pe-4'>Costo Biglietto</h2>
                    <span>${getTicketPrice(inputNumberEl, optionEl)}</span>
                </div>
            </div>`;

    /* checkingInputValue(inputNameEl, inputNumberEl, optionEl); */
    if (inputNameEl.length < 0 || inputNumberEl < 20 || optionEl.value === 0) {
        alert('compilare correttamente tutti i campi');
        clearInput();
        return;
    }

    ticketEl.insertAdjacentHTML('beforeend', info);
    clearInput();
});

formEl.addEventListener('reset', function () {
    cancelTicketPurchase();
});

function getTicketPrice(km, option) {

    //il prezzo del biglietto è definito in base ai km (0.21 € al km)
    let pricePerKilometre = 0.21;

    //prezzo normale senza sconti
    let ticketPrice = km * pricePerKilometre;
    let formattedTicketPrice = ticketPrice.toLocaleString('it-IT', { style: "currency", currency: 'EUR' });

    //va applicato uno sconto del 20% per i minorenni
    let discountForMinors = (20 / 100) * ticketPrice;
    discountForMinors = ticketPrice - discountForMinors;
    let discountForMinorsFormatted = discountForMinors.toLocaleString('it-IT', { style: "currency", currency: 'EUR' });

    //va applicato uno sconto del 40% per gli over 65.
    let discountForSeniors = (40 / 100) * ticketPrice;
    discountForSeniors = ticketPrice - discountForSeniors;
    let discountForSeniorsFormatted = discountForSeniors.toLocaleString('it-IT', { style: "currency", currency: 'EUR' });


    if (option === 'Minorenne') {
        return `${discountForMinorsFormatted}`;
    } else if (option === 'Over 65') {
        return `${discountForSeniorsFormatted}`;
    } else {
        return `${formattedTicketPrice}`;
    }
}

function clearInput() {
    document.getElementById('inputName').value = '';
    document.getElementById('inputNumber').value = '';
}

function cancelTicketPurchase() {
    document.querySelector('.see-ticket').innerHTML = '';
}

function checkingInputValue(nome, number) {
    if (nome.length < 5 || number < 20) {
        alert('compilare correttamente tutti i campi');
        return;
    }
}