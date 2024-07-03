function main() {
   addDateInHTML();
}

function addDateInHTML() {
   var now = new Date();
   var datetime = now.getFullYear();

   document.getElementById("datetime").innerHTML = `Copyright &copy; ${datetime}. All rights reserved.`;
}

main();