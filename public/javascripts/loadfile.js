const D = document, 
$fileInput = D.getElementById('file'),
$dropzone = D.getElementById('drop_zone'),
$fileSelec = D.getElementById('fileSelec'),
$img = D.getElementById('imgPreview'),
$fileName = D.getElementById('fileName');

//Convierte el icono de File en un boton que abre el seleccionador de archivos.
$fileSelec.addEventListener('click', () => {
    $fileInput.click()
})

//Cambia los estilos y anima el area del "Drop", en funcion si se esta arrastrando o no.
$dropzone.addEventListener('dragover', (e)=> {
    e.preventDefault()
    $dropzone.classList.add('drop_zone--active')
})
$dropzone.addEventListener('dragleave', (e)=> {
    e.preventDefault()
    $dropzone.classList.remove('drop_zone--active')
})

// Lee el archivo Dropeado, y lo selecciona.
$dropzone.addEventListener('drop', (e)=> {
    e.preventDefault()

    $fileInput.files = e.dataTransfer.files  
    //console.log($fileInput.files[0].name)

    $fileName.textContent = $fileInput.files[0].name    // Imprime el nombre de la img subida.
})

// Imrpime un preview de la img seleccionada (Por medio del icono)
$fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load', (e) => {
        $img.setAttribute('src', e.target.result)   
        $fileName.textContent = $fileInput.files[0].name      
    })
})
