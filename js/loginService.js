// Agregamos un evento 'submit' al formulario con id 'loginForm'.
// Esto se ejecuta cuando el usuario intenta enviar el formulario.
document.getElementById('loginForm').addEventListener('submit', function(e){
    // 'e.preventDefault()' evita que el formulario se envíe de forma tradicional
    // (es decir, recargando la página).
    e.preventDefault();
    // Obtenemos los valores ingresados por el usuario en los campos de email y password.
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log('valores leidos del formulario', {email, password})
    login(email, password)
})

// Función login que valida los datos ingresados por el usuario.
function login(email, password){
    let message = ''
    let alertType = ''
    const LOGIN_ENDPOINT = 'https://reqres.in/api/login'

    fetch(LOGIN_ENDPOINT, {
        method: 'POST', 
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({email, password})
    })
    .then((response)=>{
        return response.json.then(
            data =>{
                return{
                    status: response.status,
                    data
                }
            }
        )
    })

    // Verificamos si el email o la contraseña están vacíos.
    if(email === '' || password === ''){
        alertType = 'warning'
        message = 'Complete todos los datos'
    }

    // Si el email y la contraseña coinciden con los valores predeterminados.
    else if(email === 'prueba@gmail.com' && password === '123456'){
        alertType = 'success'
        message = '¡Inicio de sesión exitoso!'
    }

    // Si los datos no coinciden con los valores esperados.
    else{
        alertType = 'danger'
        message = 'Correo o Contraseña incorrectos.'
    }

    // Llamamos a la función 'alertBuilder' para mostrar la alerta con el tipo y el mensaje adecuado.
    alertBuilder(alertType, message)
}


// Función para generar una alerta HTML personalizada y mostrarla en la página.
function alertBuilder (alertType, message){
    // Creamos el código HTML para la alerta, usando los parámetros 'alertType' y 'message' pasados a la función.
    const alert = `
    <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
`
    // Insertamos el HTML generado en el contenedor con id 'alert'.
document.getElementById('alert').innerHTML = alert
}