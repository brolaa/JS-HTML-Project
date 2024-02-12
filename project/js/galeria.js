//Pobiera plik galerii txt z serwera i dadaje do strony

window.addEventListener("load", function() {
        fetch("http://localhost/project/data/galeria.txt")
            .then( response => {
                if (response.status !== 200) {
                    return Promise.reject('Zapytanie się nie powiodło');
                }
                return response.text();})
            .then( dane => { document.getElementById("galeria").innerHTML = dane;
            })
            .catch((error) => {
                    console.log(error);
                    const el = document.createElement("div");
                    const content = '<div class="h2 text-center md-4">Nie udało się pobrać zawartości</div>';
                    el.innerHTML = content;
                    document.getElementById("galeria").appendChild(el);
            });
});
