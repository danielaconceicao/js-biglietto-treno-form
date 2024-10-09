const selectEl = document.querySelector('#select');
const formEl = document.querySelector('form');
const ticketEl = document.querySelector('.see-ticket');


formEl.addEventListener('submit', function (e) {
    e.preventDefault()
    const inputNameEl = e.target.inputName.value;
    const inputNumberEl = e.target.inputNumber.value;
    const optionEl = selectEl.options[select.selectedIndex].text;
    console.log(e);

    const info = `<span>${inputNameEl}</span>
            <span>${inputNumberEl}</span>
            <span>${optionEl}</span>`;

    ticketEl.insertAdjacentHTML('beforeend', info);
});