/*!
* Start Bootstrap - Blog Home v5.0.8 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/

//Pobranie json z postami
function loadData() {

    fetch("http://localhost/project/data/posty.json")
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject('Zapytanie się nie powiodło');
            }
            return response.json();
        })
        .then((json) => {
            console.log(json);
            loadPosts(json);
        })
        .catch((error) => {
            console.log(error);
            const el = document.getElementById("posts_list");
            const content = '<div class="h2 text-center md-4">Nie udało się pobrać zawartości</div>';
            el.innerHTML = content;
            
        });
}

//Generacja postów
function loadPosts(data) {
    var posty = document.getElementById("posts_list");
    var content="";

    var prev = Math.floor(Math.random() * 14) + 1;
    for (let i = 0; i < 5; i++) {
        var random = Math.floor(Math.random() * 14) + 1;
        while (random == prev) {
            random = Math.floor(Math.random() * 14) + 1;
        }
        prev = random;

        content += '<div class="card mb-4">' +
            '<img class="card-img-top" src="assets/pictures/' + data[random].picture + '" alt="'+ data[random].picture +'"/>' +
            '<div class="card-body">' +
            '<div class="small text-muted">'+ data[random].date +'</div>' +
            '<h2 class="card-title">' + data[random].title + '</h2>' +
            '<p class="card-text">' + data[random].description + '</p>' +
            '</div>' +
            '</div>';
    }
    posty.innerHTML += content;
}

//Powrót na górę strony
function naGore() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

