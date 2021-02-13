// Script.js

let storage = window.localStorage
let savedItems = []
let components = []

window.addEventListener('DOMContentLoaded', () => {
  if (storage.getItem('res') === null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        storage.setItem('res', JSON.stringify(data))
        renderData(data)
      })
  } else {
    renderData(JSON.parse(storage.getItem('res')))
  }

  if (storage.getItem('cart') === null) {
    storage.setItem('cart', "0")
  } else {
    document.getElementById('cart-count').textContent = storage.getItem('cart')
  }

  if (storage.getItem('savedItems') === null) {
    storage.setItem('savedItems', JSON.stringify(savedItems))
  } else {
    savedItems = JSON.parse(storage.getItem('savedItems'))

    for (let item in savedItems) {
      components[parseInt(savedItems[item])-1].shadowRoot.getElementById(savedItems[item]).textContent = "Remove from Cart"
    }
  }
});

function renderData(data) {
  const flexContainer = document.getElementById("product-list")
  for (let storeItem in data) {
    const item = document.createElement("product-item")
    item.render(data[storeItem].image, data[storeItem].title, "$"+data[storeItem].price, data[storeItem].id)
    flexContainer.appendChild(item)
    components.push(item)
  }
}

function cartClicked(event) {
  let buttonId = event.target.getAttribute('id')

  if (event.target.textContent == "Add to Cart") {
    event.target.textContent = "Remove from Cart"

    let newCount = parseInt(storage.getItem('cart'))+1+""
    storage.setItem('cart', newCount)

    savedItems.push(buttonId)
    storage.setItem('savedItems', JSON.stringify(savedItems))
  } else {
    event.target.textContent = "Add to Cart"

    let newCount = parseInt(storage.getItem('cart'))-1+""
    storage.setItem('cart', newCount)

    savedItems.splice(savedItems.indexOf(buttonId), 1)
    storage.setItem('savedItems', JSON.stringify(savedItems))
  }

  document.getElementById('cart-count').textContent = storage.getItem('cart')
}
