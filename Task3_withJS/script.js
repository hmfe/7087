function searchCountries() {
    let searchText = document.getElementById('searchText').value;
    let countryList = document.getElementById('countryList');
    let url = `https://restcountries.eu/rest/v2/name/${searchText}`;
    var request = new XMLHttpRequest()

    request.open('GET', url, true)
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            countryList.innerHTML = "";
            countryList.style.display = "none";
            data.forEach(country => {
                var element = createListElement(country.name)

                countryList.appendChild(element);
            })
            countryList.style.display = "block";
        } else {
            console.log('error')
        }
    }

    request.send();
}

function createListElement(name) {
    var br = document.createElement("br");
    var anchor = document.createElement("a");
    var span = document.createElement("span")
    var spanNode = document.createTextNode(name);
    span.appendChild(spanNode);
    anchor.appendChild(span);
    anchor.appendChild(br);
    anchor.addEventListener('click', () => addSearchHistory(name));
    return anchor;
}

function addSearchHistory(name) {
    document.getElementById('searchText').value = name;

    let history = document.getElementById('history');
    history.style.visibility = "show";

    var divrow = document.createElement("div");
    divrow.classList.add("hstry-table-content-row");
    let classname = "hstry-table-content-row" + getclassname(name);
    divrow.classList.add(classname);


    var divcol1 = document.createElement("div");
    divcol1.classList.add("hstry-table-col");
    divcol1.classList.add("ccol1");
    var div1Node = document.createTextNode(name);
    divcol1.appendChild(div1Node);
    divrow.appendChild(divcol1);

    var divcol2 = document.createElement("div");
    divcol2.classList.add("hstry-table-col");
    divcol2.classList.add("ccol2");
    var divcol2Node = document.createTextNode(getDate());
    divcol2.appendChild(divcol2Node);

    var anchor = document.createElement("a");
    anchor.classList.add("removeIcon");
    anchor.innerHTML = '&#x2715;';
    anchor.addEventListener('click', () => removeSearchHistory(classname));

    divcol2.appendChild(anchor);
    divrow.appendChild(divcol2);
    history.appendChild(divrow);

    countryList.style.display = "none";
}

function removeSearchHistory(classname) {
    let history = document.getElementById('history');
    let elements = document.getElementsByClassName(classname);
    for (i = 0; i <= elements.length; i++) {
        history.removeChild(elements[i]);
    }
}

function removeAllSearchHistory() {
    let history = document.getElementById('history');
    let elements = document.getElementsByClassName('hstry-table-content-row');
    for (i = 0; i < elements.length; i++) {
        elements[i].innerHTML = '';
    }
    history.style.display = "hidden";
}

function getDate() {
    var dt = new Date();
    var month = dt.getMonth();
    month = month < 10 ? '0' + month : month;

    var day = dt.getDate();
    day = day < 10 ? '0' + day : day;

    var hour = dt.getHours();
    hour = hour - (hour >= 12 ? 12 : 0);
    var period = hour >= 12 ? 'PM' : 'AM';
    hour = hour < 10 ? '0' + hour : hour;

    var minute = dt.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;

    var second = dt.getSeconds();
    second = second < 10 ? '0' + second : second;
    return dt.getFullYear() + "-" +
        month + "-" +
        day + " " +
        hour + ":" +
        minute + ":" +
        second + " " +
        period;
}

function getclassname(name) {
    name = name.replace(' ', '_');
    name = name.replace('', '_');
    name = name.replace('Å', '');
    name = name.replace(' ', '_');
    return name;

}