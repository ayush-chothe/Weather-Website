console.log('Client side JS is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#success');
const messageTwo = document.querySelector('#error');
const messageData1 = document.querySelector('#data1');
const messageData2 = document.querySelector('#data2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageData1.textContent = '';
    messageData2.textContent = '';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error;
        }
        else {
            temp = data.data.temp;
            description = data.data.description;
            weather = data.data.weather;
            messageOne.textContent = 'Temperature: ' + temp;
            messageData1.textContent = 'Weather: ' + weather;
            messageData2.textContent = 'Description: ' + description;
            messageTwo.textContent = data.address;
        }
        
    })
})

})


