'use strict';

/********** DOG BREED **********/
function handleBreedSubmit() {
    $('#js-breed-form').submit(event => {
        event.preventDefault();
        const breedInput = $('#dog-breed').val();
        console.log(breedInput);
        getBreedImage(breedInput);
        // clears the input
        $('#dog-breed').val('');
    });
}

function getBreedImage(breedInput) {
    fetch(`https://dog.ceo/api/breed/${breedInput}/images/random`)
        .then(response => response.json())
        .then(responseJson => displayDog(responseJson))
        .catch(error => alert('Something went wrong. Please try again later.'));
}

function displayDog(responseJson) {
    console.log(responseJson);
    let breed = responseJSON.message;
    if (responseJson.status !== "success") {
        alert('Unable to find that dog breed. Please try searching for another breed.');
    } else if (responseJson.status === "success") {
        $('.breed-img').replaceWith(
            `<img src="${breed}" class="dog-breed">`
        );
        $('.breed').removeClass('hidden');
    }
}



/********** # OF DOG IMAGES **********/
function handleNumSubmit() {
    $('#js-num-form').submit(event => {
        event.preventDefault();
        const numInput = $('#dog-num').val();
        getDogImages(numInput);
    });
}

function getDogImages(numInput) {
    fetch(`https://dog.ceo/api/breeds/image/random/${numInput}`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Please try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    //replace the existing image(s) with the new one(s)
    let imgArray = responseJson.message;
    let images = getImages(imgArray);
    $('.results-imgs').html(images);
    $('.results').removeClass('hidden');
}

function getImages(imgArray) {
    let value = '';
    for (let i = 0; i < imgArray.length; i++) {
        value += `<img src="${imgArray[i]}" class="results-img">`;
    }
    return value;
}


// when the page loads, call the following function
$(function() {
    console.log('App loaded! Waiting for submit!');
    handleBreedSubmit();
    handleNumSubmit();
});