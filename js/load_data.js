let xml = ''
let responseTextJS = ''

let parseXML = async () => {

    //RESPONSE XML
    let url = 'https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-books.xml'
    let response = await fetch(url)
    let responseText = await response.text()

    //RESPONSE JSON
    let urlJS = "https://raw.githubusercontent.com/DAWMFIEC/DAWM-apps/datos/bookstore-images.json"
    let responseJS = await fetch(urlJS)
    responseTextJS = await responseJS.json()

    //CARGAR XML
    const parser = new DOMParser();
    xml = parser.parseFromString(responseText, "application/xml");
    console.log(xml)

    renderizarLibros(xml, responseTextJS,"Sin filtro")
}

let renderizarLibros = (xml, responseTextJS, filter) => {

    let actividadElement = document.querySelector("#actividad")
    actividadElement.innerHTML = ''

    let bookArr = xml.querySelectorAll("book")

    if (filter == 'Sin filtro') {
        bookArr.forEach(book => {
            let book_author = book.querySelector("Book-Author").textContent
            let year = book.querySelector("Year-Of-Publication").textContent
            let book_title = book.querySelector("Book-Title").textContent
            let imgXML = book.querySelector("ISBN").textContent
            let imgNameJS = ''
            responseTextJS.forEach(bookJS => {
                if (imgXML == bookJS["ISBN"]) {
                    imgNameJS = bookJS["Image-URL-M"];
                }
            })
            let plantilla = `
            <div class="col-lg-2 mb-2 text-center">
                <div class="card border-0 rounded-0">
                    <div class="card-image">
                        <img src= ${imgNameJS} alt="blog-img" class="img-fluid">
                    </div>
                </div>
                <div class="card-body text-capitalize">
                    <div class="card-meta fs-6">
                        <span class="meta-date"> ${book_author} </span>
                        <span class="meta-category">/ <a href="blog.html"> ${year} </a></span>
                    </div>
                    <h4 class="card-title">
                        <a href="buy.html"> ${book_title} </a>
                    </h4>
                </div>
            </div>`

            actividadElement.innerHTML += plantilla;
        }
        )
    } else {
        bookArr.forEach(book => {
            let book_author = book.querySelector("Book-Author").textContent+''
            let year = book.querySelector("Year-Of-Publication").textContent+''
            let book_title = book.querySelector("Book-Title").textContent+''
            let imgXML = book.querySelector("ISBN").textContent
            let imgNameJS = ''
            responseTextJS.forEach(bookJS => {
                if (imgXML == bookJS["ISBN"]) {
                    imgNameJS = bookJS["Image-URL-M"];
                }
            })
            if ((book_author.includes(filter)) || (year.includes(filter)) || (book_title.includes(filter))) {
                let plantilla = `
                    <div class="col-lg-2 mb-2 text-center">
                        <div class="card border-0 rounded-0">
                            <div class="card-image">
                                <img src= ${imgNameJS} alt="blog-img" class="img-fluid">
                            </div>
                        </div>
                        <div class="card-body text-capitalize">
                            <div class="card-meta fs-6">
                                <span class="meta-date"> ${book_author} </span>
                                <span class="meta-category">/ <a href="blog.html"> ${year} </a></span>
                            </div>
                            <h4 class="card-title">
                                <a href="buy.html"> ${book_title} </a>
                            </h4>
                        </div>
                    </div>`

                actividadElement.innerHTML += plantilla;
            }

        }
        )
    }
}

let searchBook = () => {
    let selectedFilter = document.getElementById("newsletter1").value
    renderizarLibros(xml,responseTextJS,selectedFilter)
    console.log(selectedFilter)
}

let loadBooks = () => {
    //Handling event
    let selectElement = document.querySelector("#buscador")
    selectElement.addEventListener("click", searchBook)
}



parseXML()
loadBooks()
