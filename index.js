
document.addEventListener('DOMContentLoaded', function(){
    const toggleNavBtn = document.getElementById('toggleNavBtn');
    const navMenu = document.getElementById('collapsibleNav');

    toggleNavBtn.addEventListener('click', function(){
        navMenu.classList.toggle('open');
    });
});