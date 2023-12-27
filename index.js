let products = [];
let controlOper = undefined;
let lastId = products.length + 1;

function LoadProducts() {
    let productsJson = localStorage.getItem("Arr");
    products = JSON.parse(productsJson);
}

function saveProduct() {
    let productsJson = JSON.stringify(products);
    localStorage.setItem("Arr", productsJson);
}

function renderProducts(products) {
    let productsHtml = '';
    let i = 0;
    let totalPrice = 0;
    for (const product of products) {
        let search = document.getElementById("findProduct").value;
        if (product.title.includes(search)) {
            productsHtml +=
                `<article class="product-card" >
                     <img class="product-img" src="${product.imageUrl}" alt="${product.title}">
                     <div class=product-card_c_t_d>
                         <p class="product-card__category">Category:${product.category}</p>
                         <h3 class="product-card__h3">${product.title}</h3>
                         <p class="product-card__description">${product.description}</p>
                     </div>
                     <div class=product-card_p_q>
                         <p class="product-card__price">Price:  ${product.price}</p>
                         <p class="product-card__quantity">Quantity:  ${product.quantity}</p>
                         <p class="product-card__cost">Cost:  ${product.price * product.quantity}</p>
                     </div>
                     <div class=product-button>
                         <button class="product_button button_delete" id="delete${i}" onclick="deleteProduct(${i})">Delete</button>
                         <button class="product_button button_edit" id="edit${i}" onclick="editProduct(${i})">Edit</button>
                     </div>  
                </article>`;
            totalPrice += product.price * product.quantity;
        }

        i++;
    }
    document.querySelector('.products__list').innerHTML = productsHtml;
    document.getElementById("totalPrice").innerHTML=`<p class="total_price">Total Price:${totalPrice}</p>`;
}

function getProductFromForm() {
    let obj = {
        id: lastId,
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        imageUrl: document.getElementById("imageUrl").value,
        quantity: document.getElementById("quantity").value,
    }
    document.getElementById("myform").reset();
    return obj;
}

function addProduct(event) {
    event.preventDefault();
    let obj = getProductFromForm();
    if (controlOper !== undefined) {
        products[controlOper] = obj;
    } else {
        products.push(obj);
    }
    controlOper = undefined;
    renderProducts(products);
    saveProduct();
    document.getElementById('modal_form').classList.add('hidden')
}

function deleteProduct(i) {
    products.splice(i, 1);
    renderProducts(products);
    saveProduct();
}

function editProduct(i) {
    controlOper = i;
    document.getElementById("title").value = products[i].title;
    document.getElementById("category").value = products[i].category;
    document.getElementById("description").value = products[i].description;
    document.getElementById("price").value = products[i].price;
    document.getElementById("imageUrl").value = products[i].imageUrl;
    document.getElementById("quantity").value = products[i].quantity;
}

function sortProducts() {
    console.log(document.getElementById("sort").value);

    if (document.getElementById("sort").value === "sortPrice") {
        products = products.sort(function (a, b) { return a.price - b.price })
    }
    else if (document.getElementById("sort").value === "sortQuantity") {
        products = products.sort(function (a, b) { return b.quantity - a.quantity })
    }
    renderProducts(products);
}

function showForm(){
    document.getElementById('modal_form').classList.remove('hidden')
}
function closeForm(){
     document.getElementById('modal_form').classList.add('hidden')
}

LoadProducts();
renderProducts(products);

document.getElementById("submit").addEventListener("click", addProduct);
























