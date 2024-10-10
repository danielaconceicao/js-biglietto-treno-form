const selectEl = document.querySelector('#select');
const formEl = document.querySelector('form');
const ticketEl = document.querySelector('.see-ticket');


formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputNameEl = e.target.inputName.value;
    const inputNumberEl = e.target.inputNumber.value;
    const optionEl = selectEl.options[select.selectedIndex].text;

    const info = `<span>${inputNameEl}</span>
            <span>${inputNumberEl}</span>
            <span>${optionEl}</span>
            <span>${getTicketPrice(inputNumberEl, optionEl)}</span>`;

    ticketEl.insertAdjacentHTML('beforeend', info);
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
    let discountForSeniorsFormatted = discountForSeniors.toLocaleString('it-IT', { style: "currency", currency: 'EUR' })

    let message;

    if (option === 'Minorenne') {
        return `${discountForMinorsFormatted}`;
    } else if (option === 'Over 65') {
        return `${discountForSeniorsFormatted}`;
    } else {
        return `${formattedTicketPrice}`;
    }

}