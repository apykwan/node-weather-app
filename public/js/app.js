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
    
    fetch(`/weather?address=${location}}`)
        .then(response => response.json())
        .then(data => {
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.location;
            search.value = "";
        })
        .catch(_ => messageOne.textContent = "Unable to fetch the data. Please try again");
});
