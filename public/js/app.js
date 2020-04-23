console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = "Loading";
    messageTwo.textContent = "";

    if (location.length === 0){
        return messageOne.textContent = "Please Enter a location!!"
    };
    
    fetch(`http://localhost:3000/weather?address=${location}}`)
        .then(response => response.json())
        .then(data => {
            messageOne.textContent = data[0].forecast;
            messageTwo.textContent = data[0].location;
            search.value = "";
        })
        .catch(_ => messageOne.textContent = "Unable to fetch the data. Please try again");
});
