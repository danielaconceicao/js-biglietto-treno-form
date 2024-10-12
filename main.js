const selectEl = document.querySelector('#select');
const formEl = document.querySelector('form');
const ticketEl = document.querySelector('.space-ticket');

formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputNameEl = e.target.inputName.value;
    const inputKmEl = Number(e.target.inputNumber.value);
    const optionAgeEl = selectEl.options[select.selectedIndex].text;

    const markup = genereteTicketMarkup(inputNameEl, inputKmEl, optionAgeEl, calculatesTicketPrice);

    /* checkingInputValue(inputNameEl, inputNumberEl, optionEl); */
    if (inputNameEl.length < 0 || inputKmEl < 20 || optionAgeEl.value === 0) {
        alert('compilare correttamente tutti i campi');
        clearInput();
        return;
    }

    //joga na pagina um de cada vez
    ticketEl.innerHTML = markup;
    //joga na pagina mais de um
    //ticketEl.innerHTML += markup;
    //ticketEl.insertAdjacentHTML('afterbegin', markup);
    clearInput();

});

formEl.addEventListener('reset', cancelTicketPurchase);

/**
 * 
 * @param {number} km
 * @param {string} option 
 * 
 *  */ 
function calculatesTicketPrice(km, option) {
    //il prezzo del biglietto è definito in base ai km (0.21 € al km)
    let pricePerKilometre = 0.21;
    let discount;
    
    //prezzo normale senza sconti
    let ticketPrice = km * pricePerKilometre;
    let formattedTicketPrice = ticketPrice.toLocaleString('it-IT', { style: "currency", currency: 'EUR' });

    if (option === 'Minor') {
        //va applicato uno sconto del 20% per i minorenni
        discount = 0.2;
        ticketPrice -= ticketPrice * discount
        formattedTicketPrice = ticketPrice.toLocaleString('it-IT', { style: "currency", currency: 'EUR' });
        return formattedTicketPrice;
    
    } else if (option === 'Senior') {
        //va applicato uno sconto del 40% per gli over 65.
        discount = 0.4;
        ticketPrice -= ticketPrice * discount
        formattedTicketPrice = ticketPrice.toLocaleString('it-IT', { style: "currency", currency: 'EUR' });
        return formattedTicketPrice;
    
    }else{
        return ticketPrice, formattedTicketPrice
    }
}


function clearInput() {
    document.getElementById('inputName').value = '';
    document.getElementById('inputNumber').value = '';
}

function cancelTicketPurchase() {
    document.querySelector('.see-ticket').innerHTML = '';
}

/**
 * 
 * @param {string} nome 
 * @param {number} km 
 *  */  
function checkingInputValue(nome, km) {
    if (nome.length < 5 || km < 20) {
        alert('compilare correttamente tutti i campi');
        return;
    }
}

/**
 * 
 * @param {number} age 
 * @param {string} fullName 
 * @param {function} calculatesTicketPrice
 * @param {number} km 
 * 
 *  */  
function genereteTicketMarkup(fullName, km, age, calculatesTicketPrice) {
    return `<h1 class'pb-5 text-center'>Il tuo biglietto</h1>
            <div class='d-flex justify-content-around'>
                <div>
                    <h2 class='pe-4 h5'>Nome Cognome</h2>
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
                    <span>${calculatesTicketPrice(km, age)}</span>
                </div>
            </div>`
}