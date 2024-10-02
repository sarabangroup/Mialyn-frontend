// Function to open the sidebar
function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
    document.querySelector(".content").style.marginLeft = "250px";
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.querySelector(".content").style.marginLeft = "0";
}



document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
    });
});


  