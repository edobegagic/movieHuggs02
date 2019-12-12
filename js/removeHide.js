document.getElementById('searchButton').addEventListener('click', removeHide);

function removeHide() {
  var element = document.getElementById('displayContainer');
  element.classList.remove('hidden');
}
