// Changes the buttons depending on if the backgroud is blahaha
window.addEventListener("scroll", () => {
    let scroll = window.scrollY;
    if (scroll > window.innerHeight-40) {
        let nav_btns = document.getElementById("top-nav").children;
        for (let node of nav_btns) {
            node.style.border = "2px solid black";
            node.style.color = "black";
            node.classList.remove("hoverC1");
            node.classList.add("hoverC2");
        }
    }
    if (scroll <= window.innerHeight-40) {
        let nav_btns = document.getElementById("top-nav").children;
        for (let node of nav_btns) {
            node.style.border = "2px solid white";
            node.style.color = "white";
            node.classList.remove("hoverC2");
            node.classList.add("hoverC1");
        }
    }
});

// For smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});