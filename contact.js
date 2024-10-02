// Function to open the sidebar
function openSidebar() {
    document.getElementById("mySidebar").style.width = "250px";
    document.querySelector(".content").style.marginLeft = "250px";
}

function closeSidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.querySelector(".content").style.marginLeft = "0";
}
  