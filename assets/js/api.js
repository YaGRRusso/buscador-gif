let search = document.getElementById('search');
let quantity = document.getElementById('quantity');
let gifsEl = document.getElementById('gifs');
let moreBtn = document.getElementById('moreBtn');
let amount = +quantity.value

function loadGifs() {
  fetch(`https://g.tenor.com/v1/search?q=${search.value}&key=LIVDSRZULELA&limit=${amount}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      showGifs(json)
    })
}

function showGifs(jsonItems) {
  let result = jsonItems['results'];
  gifsEl.innerHTML = '';
  for (let i in result) {
    gifsEl.innerHTML += `
      <div class="col-6">
        <figure class="text-center rounded bg-white border shadow-sm">
          <img class="img-fluid" src="${result[i]["media"][0]['gif']['url']}">
          <figcapture><h6>${result[i].content_description}</h6></figcapture>
        </figure>
      </div>
    `;
  }
  moreBtn.style.display = "inline-block"
}

function searchGifs(){
  amount = 8
  quantity.value = amount;
  loadGifs()
}

function quantityGifs(){
  amount = +quantity.value
  loadGifs()
}

function moreGifs(){
  amount = amount + 8
  quantity.value = amount;
  loadGifs()
}

search.addEventListener('change', searchGifs);
quantity.addEventListener('change', quantityGifs);
moreBtn.addEventListener('click', moreGifs);