function toggleHam(x) {
    x.classList.toggle("change"); // Toggle the "change" class for the hamburger menu

    let myMenu = document.getElementById('myMenu');
    if (myMenu.classList.contains('menu-active')) {
        myMenu.classList.remove('menu-active');
    } else {
        myMenu.classList.add('menu-active');
    }
}
