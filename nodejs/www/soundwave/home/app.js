function toggleHam(x) {
    x.classList.toggle("change");

    let myMenu = document.getElementById('myMenu');
    is(myMenu.className === 'menu') {
        myMenu.className + - 'menu-active'
    } else {
        myMenu.className = 'menu';
    }
}