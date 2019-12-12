document.getElementById('closeButton').addEventListener('click', addHide);

function addHide() {
  var element = document.getElementById('displayContainer');
  element.classList.add('hidden');
}
