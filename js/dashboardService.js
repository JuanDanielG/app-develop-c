// Validación del token al cargar la página
tokenValidate();

function tokenValidate() {
    const TOKEN = localStorage.getItem('token');
    if (TOKEN !== 'QpwL5tke4Pnpja7X4') {
        location.href = '../index.html';
    }
    console.log('Autenticado ', TOKEN);
}

function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de usuarios</h4>';
    document.getElementById('info').innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

    fetch("https://reqres.in/api/users?page=1", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })
        .then((response) => {
            if (response.status === 200) {
                let listUsers = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Avatar</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
                response.body.data.forEach(user => {
                    listUsers = listUsers.concat(`
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="Avatar del usuario"></td>
                    </tr>                    
                    `);
                });
                listUsers = listUsers.concat(`
                </tbody>
            </table>    
            `);
                document.getElementById('info').innerHTML = listUsers;
            }
            else {
                document.getElementById('info')
                    .innerHTML = '<h3>No se encontraron usuarios</h3>';
            }
        })
        .catch((error) => {
            document.getElementById('info').innerHTML = '<div class="alert alert-danger" role="alert">Error al cargar los usuarios</div>';
            console.error("Error al obtener usuarios:", error);
        });
}

function getProducts() {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>';
    document.getElementById('info').innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Cargando...</span></div></div>';

    // Usando ReqRes API para simular una lista de productos
    fetch("https://reqres.in/api/unknown", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
        .then((result) => {
            return result.json().then(
                data => {
                    return {
                        status: result.status,
                        body: data
                    }
                }
            );
        })
        .then((response) => {
            if (response.status === 200) {
                let listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Año</th>
                        <th scope="col">Color</th>
                        <th scope="col">Muestra</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
                response.body.data.forEach(product => {
                    listProducts = listProducts.concat(`
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.year}</td>
                        <td>${product.color}</td>
                        <td><div style="width: 50px; height: 25px; background-color: ${product.color}"></div></td>
                    </tr>                    
                    `);
                });
                listProducts = listProducts.concat(`
                </tbody>
            </table>    
            `);
                document.getElementById('info').innerHTML = listProducts;
            }
            else {
                document.getElementById('info')
                    .innerHTML = '<h3>No se encontraron productos</h3>';
            }
        })
        .catch((error) => {
            document.getElementById('info').innerHTML = '<div class="alert alert-danger" role="alert">Error al cargar los productos</div>';
            console.error("Error al obtener productos:", error);
        });
}

function logout() {
    localStorage.removeItem('token');
    location.href = '../index.html';
}