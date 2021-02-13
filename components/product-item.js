// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super()
  }

  render(img_param, title, price, id) {
    this.attachShadow({mode: 'open'})
    const li = document.createElement('li')
    li.setAttribute("class", "product")

    const img = li.appendChild(document.createElement('img'))
    img.src = img_param
    
    const p1 = li.appendChild(document.createElement('p'))
    const p2 = li.appendChild(document.createElement('p'))
    p1.setAttribute("class", "title")
    p2.setAttribute("class", "price")
    p1.textContent = title
    p2.textContent = price
    
    const button = li.appendChild(document.createElement('button'))
    button.textContent = "Add to Cart"
    button.id = id
    button.onclick = cartClicked

    const style = document.createElement('style')
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`

    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(li)
  }
}

customElements.define('product-item', ProductItem);
