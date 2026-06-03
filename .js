// ===============================
// CLASE LIBRO
// ===============================

class Libro {

    constructor(
        id,
        titulo,
        autor,
        anio,
        categoria,
        imagen
    ) {

        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.categoria = categoria;
        this.imagen = imagen;

    }

}

// ===============================
// CLASE BIBLIOTECA
// ===============================

class Biblioteca {

    constructor() {

        this.libros =
            JSON.parse(localStorage.getItem("libros")) ||
            this.librosIniciales();

    }

    librosIniciales() {

        return [

            new Libro(1,"Don Quijote","Miguel de Cervantes",1605,"Novela","https://picsum.photos/400/600?random=1"),

            new Libro(2,"Hamlet","William Shakespeare",1603,"Drama","https://picsum.photos/400/600?random=2"),

            new Libro(3,"Romeo y Julieta","William Shakespeare",1597,"Drama","https://picsum.photos/400/600?random=3"),

            new Libro(4,"Cien Años de Soledad","Gabriel García Márquez",1967,"Realismo Mágico","https://picsum.photos/400/600?random=4"),

            new Libro(5,"El Amor en los Tiempos del Cólera","Gabriel García Márquez",1985,"Novela","https://picsum.photos/400/600?random=5"),

            new Libro(6,"1984","George Orwell",1949,"Distopía","https://picsum.photos/400/600?random=6"),

            new Libro(7,"Rebelión en la Granja","George Orwell",1945,"Satírico","https://picsum.photos/400/600?random=7"),

            new Libro(8,"Orgullo y Prejuicio","Jane Austen",1813,"Romance","https://picsum.photos/400/600?random=8"),

            new Libro(9,"La Odisea","Homero",-700,"Clásico","https://picsum.photos/400/600?random=9"),

            new Libro(10,"La Ilíada","Homero",-750,"Clásico","https://picsum.photos/400/600?random=10"),

            new Libro(11,"El Principito","Antoine de Saint-Exupéry",1943,"Fábula","https://picsum.photos/400/600?random=11"),

            new Libro(12,"Moby Dick","Herman Melville",1851,"Aventura","https://picsum.photos/400/600?random=12"),

            new Libro(13,"Crimen y Castigo","Fiódor Dostoyevski",1866,"Novela","https://picsum.photos/400/600?random=13"),

            new Libro(14,"Los Miserables","Victor Hugo",1862,"Drama","https://picsum.photos/400/600?random=14"),

            new Libro(15,"El Gran Gatsby","F. Scott Fitzgerald",1925,"Novela","https://picsum.photos/400/600?random=15"),

            new Libro(16,"Drácula","Bram Stoker",1897,"Terror","https://picsum.photos/400/600?random=16"),

            new Libro(17,"Frankenstein","Mary Shelley",1818,"Ciencia Ficción","https://picsum.photos/400/600?random=17"),

            new Libro(18,"La Metamorfosis","Franz Kafka",1915,"Novela","https://picsum.photos/400/600?random=18"),

            new Libro(19,"El Señor de los Anillos","J. R. R. Tolkien",1954,"Fantasía","https://picsum.photos/400/600?random=19"),

            new Libro(20,"Harry Potter y la Piedra Filosofal","J. K. Rowling",1997,"Fantasía","https://picsum.photos/400/600?random=20")

        ];

    }

    guardar() {

        localStorage.setItem(
            "libros",
            JSON.stringify(this.libros)
        );

    }

    agregar(libro) {

        this.libros.push(libro);

        this.guardar();

    }

    eliminar(id) {

        this.libros =
            this.libros.filter(
                libro => libro.id !== id
            );

        this.guardar();

    }

}

// ===============================
// INSTANCIA
// ===============================

const biblioteca = new Biblioteca();

// ===============================
// RENDERIZAR LIBROS
// ===============================

function renderizarLibros(lista = biblioteca.libros) {

    const contenedor =
        document.getElementById("contenedorLibros");

    contenedor.innerHTML = "";

    lista.forEach(libro => {

        contenedor.innerHTML += `

        <div class="col-lg-4 col-md-6">

            <div class="card book-card">

                <img
                    src="${libro.imagen}"
                    class="card-img-top">

                <div class="card-body">

                    <h5>
                        ${libro.titulo}
                    </h5>

                    <p>
                        <strong>Autor:</strong>
                        ${libro.autor}
                    </p>

                    <p>
                        <strong>Año:</strong>
                        ${libro.anio}
                    </p>

                    <span
                        class="badge badge-category mb-3">

                        ${libro.categoria}

                    </span>

                    <div class="d-flex gap-2">

                        <button
                            class="btn btn-delete w-100"
                            onclick="eliminarLibro(${libro.id})">

                            Eliminar

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    actualizarEstadisticas();

}

// ===============================
// AGREGAR LIBRO
// ===============================

function agregarLibro() {

    const titulo =
        document.getElementById("titulo").value;

    const autor =
        document.getElementById("autor").value;

    const anio =
        document.getElementById("anio").value;

    const categoria =
        document.getElementById("categoria").value;

    const imagen =
        document.getElementById("imagen").value ||
        "https://picsum.photos/400/600";

    if (
        !titulo ||
        !autor ||
        !anio ||
        !categoria
    ) {

        alert("Complete todos los campos");

        return;

    }

    const nuevoLibro = new Libro(

        Date.now(),

        titulo,

        autor,

        anio,

        categoria,

        imagen

    );

    biblioteca.agregar(nuevoLibro);

    renderizarLibros();

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("imagen").value = "";

    const modal =
        bootstrap.Modal.getInstance(
            document.getElementById("modalLibro")
        );

    modal.hide();

}

// ===============================
// ELIMINAR LIBRO
// ===============================

function eliminarLibro(id) {

    if (
        confirm(
            "¿Desea eliminar este libro?"
        )
    ) {

        biblioteca.eliminar(id);

        renderizarLibros();

    }

}

// ===============================
// BUSCADOR
// ===============================

document
.getElementById("buscar")
.addEventListener("keyup", function() {

    const texto =
        this.value.toLowerCase();

    const resultado =
        biblioteca.libros.filter(libro =>

            libro.titulo
            .toLowerCase()
            .includes(texto)

            ||

            libro.autor
            .toLowerCase()
            .includes(texto)

        );

    renderizarLibros(resultado);

});

// ===============================
// ESTADISTICAS
// ===============================

function actualizarEstadisticas() {

    document.getElementById(
        "totalLibros"
    ).textContent =
        biblioteca.libros.length;

    document.getElementById(
        "totalAutores"
    ).textContent =
        new Set(
            biblioteca.libros.map(
                libro => libro.autor
            )
        ).size;

    document.getElementById(
        "totalCategorias"
    ).textContent =
        new Set(
            biblioteca.libros.map(
                libro => libro.categoria
            )
        ).size;

}

// ===============================
// INICIO
// ===============================

renderizarLibros();