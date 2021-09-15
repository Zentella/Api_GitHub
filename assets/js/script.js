$('form').on('submit', (event)=>{
    event.preventDefault() 
})

const getData = async (nombre,p,rP) => {

    // bloque 1
    const baseUrl = 'https://api.github.com'

    // bloque 2
    const request = async (url) => {

        const results = await fetch(url)
        const response = await results.json()
        return response
    }
        
    // bloque 3
    const getPosts = async (userLogin,p,rP) => {
        
        const url = `${baseUrl}/users/${nombre}/repos?page=${p}&per_page=${rP}`
        return request(url)
    }

    // bloque 4
    const getUser = async (userLogin) => {

        const url = `${baseUrl}/users/${userLogin}`
        return request(url);
    }

    // bloque 5
    const userLogin = nombre
    Promise.all([getUser(userLogin), getPosts(userLogin,p,rP)])
        .then(resp => {
            const posts = resp[1]
            const user = resp[0]

            const name = user.name            


            $('#resultados').html(`
                <h3 class='mb-3'>Datos de Usuario</h3>
                <img class='mb-3' src="${user.avatar_url}" alt="avatar">
                <h5 class='mb-3'>Nombre de usuario: ${user.name}</h5>
                <h5 class='mb-3'>Nombre de login: ${user.login}</h5>
                <h5 class='mb-3'>Cantidad de Repositorios: ${user.public_repos}</h5>
                <h5 class='mb-3'>Localidad: ${user.location}</h5>
                <h5 class='mb-3'>tipo de usuario: ${user.type}</h5>
            `)
            var repos = 
            `<h3 class='mb-3' style='text-align:right;margin-top:-780px;'>Nombre de repositorios</h3>`

                posts.forEach(element => {

                    repos += `<h5 class='mb-3' style='text-align:right;'>${element.name}</h5>`
                    })

            $('#resultados').append(repos)
    })
    .catch(err => console.log('err', err))
}


document.querySelector(".btn").addEventListener("click", async () => {

    const validaName = () => {
        let nombre = ($('#nombre').val())
        let pagina = ($('#pagina').val())
        let repoPagina = ($('#repoPagina').val())

        $('#nombre').val("")
        $('#pagina').val("")
        $('#repoPagina').val("")
        
       
        nombre !="" ? getData(nombre,pagina,repoPagina) : alert("ingresar nombre")
        
    }
    validaName()
})