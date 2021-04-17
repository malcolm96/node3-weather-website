// console.log('Client side JS');
//
// fetch('http://puzzle.mead.io/puzzle').then(response =>{
//     response.json().then((data) =>{
//         console.log(data);
//     });
// })

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';
    const location = search.value;
    fetch('/weather?address=' + location)
        .then(response => {
            response.json()
                .then(data => {
                    if (data.error) {
                        messageOne.textContent = data.error;
                    } else {
                       messageOne.textContent = data.location;
                       messageTwo.textContent = data.forecast;
                    }
                })
        })
})
