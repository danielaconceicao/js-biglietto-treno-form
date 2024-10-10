const selectEl = document.querySelector('#select');
const formEl = document.querySelector('form');
const ticketEl = document.querySelector('.see-ticket');
const totalPrice = document.querySelector('total-price');

formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputNameEl = e.target.inputName.value;
    const inputKmEl = e.target.inputNumber.value;
    const optionAgeEl = selectEl.options[select.selectedIndex].text;

    const info = genereteTicketMarkup(inputNameEl, inputKmEl, optionAgeEl, getTicketPrice);

    /* checkingInputValue(inputNameEl, inputNumberEl, optionEl); */
    if (inputNameEl.length < 0 || inputKmEl < 20 || optionAgeEl.value === 0) {
        alert('compilare correttamente tutti i campi');
        clearInput();
        return;
    }

    ticketEl.insertAdjacentHTML('beforeend', info);
    clearInput();

});

formEl.addEventListener('reset', cancelTicketPurchase);

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


    if (option === 'Minor') {
        return `${discountForMinorsFormatted}`;
    } else if (option === 'Senior') {
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

function checkingInputValue(nome, km) {
    if (nome.length < 5 || km < 20) {
        alert('compilare correttamente tutti i campi');
        return;
    }
}
function genereteTicketMarkup(fullName, km, age, getTicketprice) {
    return `<h1 class'pb-5 text-center'>Il tuo biglietto</h1>
            <div class='d-flex justify-content-around'>
                <div>
                    <h2 class='pe-4 h5'>Nome</h2>
                    <span>${fullName}</span>
                </div>
                <div>
                    <h2 class='pe-4 h5'>Km da percorrere</h2>
                    <span>${km}km</span>
                </div>
                <div>
                    <h2 class='pe-4 h5'>Fascia d'età</h2>
                    <span>${age}</span>
                </div>
                <div>
                    <h2 class='pe-4 h5'>Costo Biglietto</h2>
                    <span>${getTicketprice(km, age)}</span>
                </div>
            </div>`
}