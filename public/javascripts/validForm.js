const D = document

const $form = D.querySelector('.contact-form'),
        $inputs = D.querySelectorAll('.contact-form [required]');

$inputs.forEach(input => {
    const $span = D.createElement('span')
    $span.id = input.name
    $span.textContent = input.title
    $span.classList.add('contact-form-error', 'none')
    input.insertAdjacentElement('afterend', $span)
})


D.addEventListener('keyup', e => {
    if (e.target.matches('.contact-form [required]')) {
        let $input = e.target 
        let pattern = $input.pattern || $input.dataset.pattern
        
        if (pattern && $input.value !== "") {
            let regex = new RegExp(pattern)
            return !regex.exec($input.value)
            ? D.getElementById($input.name).classList.add('is-active')
            : D.getElementById($input.name).classList.remove('is-active')
        }

        if (!pattern) {
            return $input.value === ""
            ? D.getElementById($input.name).classList.add('is-active')
            : D.getElementById($input.name).classList.remove('is-active')
        }
    }
})


D.addEventListener('submit', e => {
    //e.preventDefault()
    const $loader = D.querySelector('.contact-form-loader')
    const $response = D.querySelector('.contact-form-response')

    $loader.classList.remove('none')

    setTimeout(() => {
        $loader.classList.add('none')
        $response.classList.remove('none')
        $form.reset()

        setTimeout(() => {$response.classList.add('none')}, 3000);
    }, 3000);
})
