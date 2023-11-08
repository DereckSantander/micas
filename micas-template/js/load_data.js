let parseXML = (reponseText) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(responseText, "application/xml");

    let actividadElement = document.querySelector("#actividad")
    actividadElement.innerHTML = ''

    let bookArr = xml.querySelectorAll("book")

    bookArr.forEach(book => {

        let book_author = book.querySelector("Book-Author")
        let year = book.querySelector("Year-Of-Publication")
        let book_title = book.querySelector("Book-Title")

        let plantilla = `
    <div class="col-lg-2 mb-2 text-center">
        <div class="card border-0 rounded-0">
            <div class="card-image">
                <img src="key:Image-URL-M" alt="blog-img" class="img-fluid">
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
    })

}


