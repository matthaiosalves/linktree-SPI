const cache = {};

function fetchLocais() {
  // Verifica se os dados estão no cache
  if (cache.locaisComLinks) {
    return Promise.resolve(cache.locaisComLinks);
  }

  // Caso contrário, faz a requisição para buscar os dados
  return fetch('./locais.json')
    .then(response => response.json())
    .then(data => {
      cache.locaisComLinks = data;
      return data;
    });
}

function createListItem(local, url) {
  const liElement = document.createElement('li');
  const aElement = document.createElement('a');

  aElement.href = url;
  aElement.className = 'link';
  aElement.target = '_blank';

  if (url === '#') {
    aElement.style.filter = 'brightness(0.5)';
  }

  aElement.innerHTML = local;

  liElement.appendChild(aElement);
  return liElement;
}

function populateList() {
  const ulElement = document.getElementById('locaisList');

  fetchLocais().then(locaisComLinks => {
    Object.keys(locaisComLinks).forEach(local => {
      ulElement.appendChild(createListItem(local, locaisComLinks[local]));
    });
  });
}
document.addEventListener('DOMContentLoaded', populateList);
