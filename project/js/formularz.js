//Dodawanie podróży
function dodajPodroz() {
    var trip = {};

    trip.kraj = document.getElementById("kraj").value;
    trip.miasto = document.getElementById("miasto").value;
    trip.dataw = document.getElementById("dataw").value;
    trip.datap = document.getElementById("datap").value;
    trip.zkim = document.querySelector('input[name="zkim"]:checked').value;
    trip.typ = zbierz_typ();
    trip.opis = document.getElementById("opis").value;

    var trips = JSON.parse(localStorage.getItem('trips'));
    if (trips===null) trips=[]; 

    trips.push(trip);
    localStorage.setItem('trips', JSON.stringify(trips));
    pokazPodroze();
}

//Zebranie wartości z chechboxów
function zbierz_typ() {
    var wynik=[];
    var obiekt=document.getElementById('odpoczynek');
    if (obiekt.checked) wynik.push(obiekt.value);
    obiekt=document.getElementById('zwiedzanie');
    if (obiekt.checked) wynik.push(obiekt.value);
    obiekt=document.getElementById('jezyki');
    if (obiekt.checked) wynik.push(obiekt.value);
    obiekt=document.getElementById('biznes');
    if (obiekt.checked) wynik.push(obiekt.value);
    return wynik;
}

//Pokazanie podróży
function pokazPodroze() {
    var lista = JSON.parse(localStorage.getItem('trips'));
    var el=document.getElementById('podroze');
    var wynik='';
    if (lista===null) el.innerHTML=wynik+'<div class="card mb-4"><h5 class="card-body">Brak podróży.</h5></div>';
    else {
        for(i=0;i<lista.length;i++) 
        {
            wynik+='<div class="card mb-4">' +
            '<h5 class="card-header d-flex justify-content-between align-items-center">' + lista[i].miasto + ', ' + lista[i].kraj  + 
            "<div><button type='button' class='btn btn-dark mx-1' onclick='pobierzPodroz(" + i + ")'>Edytuj</button>" +
            "<button type='button' class='btn btn-danger' onclick='usunPodroz(" + i + ");')'>X</button></div></h5>" +
            '<div class="card-body"> <div class="small text-muted"> Data podróży: '+ lista[i].datap + ' - ' + lista[i].dataw  +'</div>' +
            '<div class="fw-bold"">Typ podróży: '+ lista[i].typ + '</div>' +
            '<div class="fw-lighter"> Podróż ' + lista[i].zkim + '</div>' + 
            '<p class="mt-2">' + lista[i].opis + '</p></div>' +
            '</div>';
        }
        el.innerHTML=wynik;
    }
}

//Usunięcie wszystkich podróży
function usunPodroze() {
    zmienForm(false);
    let text = "Czy na pewno chcesz usunąć wszystkie podróże?";
    if (confirm(text) == true) {
        localStorage.removeItem('trips');
        pokazPodroze();
    } else return;
    
}

//Usunięcie pojedynczej podróży
function usunPodroz(i) {
    zmienForm(false);
    var lista = JSON.parse(localStorage.getItem('trips'));
    if (confirm("Usunąć podróż?")) lista.splice(i,1);
    localStorage.setItem('trips', JSON.stringify(lista)); 
    pokazPodroze(); 
}

//Sprawdza poprawność pola tekstowego
function sprawdzPole(pole_id,obiektRegex) {
    var obiektPole = document.getElementById(pole_id);
    if(!obiektRegex.test(obiektPole.value)) return (false);
    else return (true);
}

//Sprawdza czy radio buttons nie są puste
function sprawdz_radio(nazwa_radio){
    var obiekt=document.getElementsByName(nazwa_radio);
    for (i=0;i<obiekt.length;i++)
    {   wybrany=obiekt[i].checked;
        if (wybrany) return true; }
        return false;
}

//Sprawdza czy checkbox nie jest pusty
function sprawdz_box(box_id)
{
    var obiekt=document.getElementById(box_id);
    if (obiekt.checked) return true;
    else return false;
}

//Sprawdza czy wybrano opcję w select'cie
function sprawdz_select(select_id, pustePole) {

    var obiektSelect = document.getElementById(select_id);

    if (obiektSelect.value === pustePole) {
        return false;
    } else return true;
}

//Sprawdza czy data przyjazdu jest przed datą wyjazdu
function sprawdz_date(dataw, datap) {
    var w = new Date(document.getElementById(dataw).value);
    var p = new Date(document.getElementById(datap).value);
    
    if (p>w) {
        return true;
       
    } else  {
        return false;
    }

}

//Funkcja waliduje formularz i wykonuje dodanie podróży lub edycję, jeżeli przejdzie walidację
function sprawdz(edycja, id)
{  
    var ok=true;
    
    obiektMiasto =/^[A-ZĄĘŚĆÓŻŹ][a-ząęłśćżźó\s-]/;
   
    document.getElementById("kraj_error").innerHTML="";
    document.getElementById("miasto_error").innerHTML="";
    document.getElementById("dataw_error").innerHTML="";
    document.getElementById("datap_error").innerHTML="";
    document.getElementById("zkim_error").innerHTML="";
    document.getElementById("typ_error").innerHTML="";
    document.getElementById("opis_error").innerHTML="";

    if (!sprawdz_select("kraj", "Wybierz kraj")) {
        ok=false;
        document.getElementById("kraj_error").innerHTML= "Wybierz kraj z listy.";
    }

    if (!sprawdzPole("miasto",obiektMiasto)) {
        ok=false;
        document.getElementById("miasto_error").innerHTML= "Wpisz miejsce z dużej litery.";
    }

    var dataw = document.getElementById("dataw");
    if (!dataw.value) {
        ok=false;
        document.getElementById("dataw_error").innerHTML=
        "Uzupełnij datę";
    }

    var datap = document.getElementById("datap");
    if (!datap.value) {
        ok=false;
        document.getElementById("datap_error").innerHTML=
        "Uzupełnij datę";
    }

    if (!sprawdz_date("dataw", "datap") && (datap.value) && (dataw.value)) {
        ok=false;
        document.getElementById("datap_error").innerHTML=
        "Data powrotu musi być po dacie wyjazdu.";
    }
    
    if (!sprawdz_radio("zkim"))
    {
        ok=false;
        document.getElementById("zkim_error").innerHTML=
        "Musisz wybrać jedną z opcji.";
    }
    if (!sprawdz_box("odpoczynek") && !sprawdz_box("zwiedzanie") && !sprawdz_box("biznes") && !sprawdz_box("jezyki")) {
        ok=false;
        document.getElementById("typ_error").innerHTML=
        "Musisz wybrać przynajmniej jedną z opcji.";
    }
    
    var opis = document.getElementById("opis");

    if (!opis.value) {
        ok=false;
        document.getElementById("opis_error").innerHTML=
        "Uzupełnij pole";
    }
    
    if ((ok) && (!edycja)) {
        dodajPodroz();
        $("#formularz").trigger('reset');
    }

    if ((ok) && (edycja)) { 
        edytujPodroz(id);
        $("#formularz").trigger('reset');
    }
    
}

//Pobranie danych podróży do edycji
function pobierzPodroz(id) {
    window.scrollTo({
        top: 400,
        left: 0,
        behavior: 'smooth'
      });

    var lista = JSON.parse(localStorage.getItem('trips'));

    kraj = document.getElementById("kraj");
    miasto = document.getElementById("miasto");
    dataw = document.getElementById("dataw");
    datap = document.getElementById("datap");
    
    opis = document.getElementById("opis");

    kraj.value=lista[id].kraj;
    miasto.value=lista[id].miasto;
    dataw.value=lista[id].dataw;
    datap.value=lista[id].datap;

    var radios = {
        "samotna": "sam",
        "z przyjaciółmi": "przyjaciele",
        "z rodziną": "rodzina"
    };

    var checkboxes = {
        "Odpoczynek": "odpoczynek",
        "Zwiedzanie": "zwiedzanie",
        "Nauka języków": "jezyki",
        "Biznesowa": "biznes"
    };

    for (var i in checkboxes) {
        document.getElementById(checkboxes[i]).checked = false;
    }

    var zkim="";

    for (i in radios) {
        if (i === lista[id].zkim) zkim = radios[i];
    }

    for (i in lista[id].typ) {
        var typ="";
        for (var j in checkboxes) {
            if (lista[id].typ[i] === j) typ = checkboxes[j];
        }
        
        document.getElementById(typ).checked = true;
    }

    opis.value=lista[id].opis;
    document.getElementById(zkim).checked = true;

    zmienForm(true, id);
}

//Edycja podróży
function edytujPodroz(id) {
    var lista = JSON.parse(localStorage.getItem('trips'));

    lista[id].kraj = document.getElementById("kraj").value;
    lista[id].miasto = document.getElementById("miasto").value;
    lista[id].dataw = document.getElementById("dataw").value;
    lista[id].datap = document.getElementById("datap").value;
    lista[id].zkim = document.querySelector('input[name="zkim"]:checked').value;
    lista[id].typ = zbierz_typ();
    lista[id].opis = document.getElementById("opis").value;

    localStorage.setItem('trips', JSON.stringify(lista));
    pokazPodroze();
    zmienForm(false);
}

//Zmienia opcję formularza z dodawania na edytowanie lub na odwrót
function zmienForm(typ, id) {
    var frm = document.getElementById('formularz');
    
    if(!typ) {
        $("#formularz").trigger('reset');
        frm.action = 'javascript:sprawdz(false);'; 
        tytulf="Dodawanie podróży";
        przyciskif="<button class='btn btn-primary btn-block' type='submit'>Dodaj podróż</button>" + 
                   "<button class='btn btn-dark btn-block' type='reset'>Wyczyść</button>";

        document.getElementById('tytul').innerHTML = tytulf;
        document.getElementById('przyciski').innerHTML = przyciskif;
    } else {
        var zm = 'javascript:sprawdz(true,' + id +');';
        frm.action = zm;
        tytulf="Edycja podróży";
        przyciskif="<button class='btn btn-primary btn-block' type='submit'>Edytuj podróż</button>" + 
                   "<button class='btn btn-danger btn-block' onclick='zmienForm(false);'>Anuluj</button>" +
                   "<button class='btn btn-dark btn-block' type='reset'>Wyczyść</button>";

        document.getElementById('tytul').innerHTML = tytulf;
        document.getElementById('przyciski').innerHTML = przyciskif;
    }
}