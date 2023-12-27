 let productsArr = [
    {
        id: 1,
        title: 'Santa Claus Stocking ',
        category: 'Stockings', 
        description: 'Traditional Christmas sock with funny applications. The sock is made of felt with a knitted top.',
        price: 15.00,
        imageUrl: 'img_project/Santa_Claus_Stocking.png',
        quantity:4,
    },
    {
        id: 2,
        title: 'Christmas Red Stocking',
        category: 'Stockings', 
        description: 'Classic Christmas stocking in red and white, nothing extra. The stocking is made of textile, decorated with pompons, and is ready to be filled with sweets.',
        price: 22.00,
        imageUrl: 'img_project/Christmas_Red_Stocking.png',
        quantity:4,
    },
    {
        id: 3,
        title: 'Stocking With Pompons',
        category: 'Stockings', 
        description: 'Knitted Christmas stocking in traditional colors. The top of the stocking is decorated with red and green pompons.',
        price: 22.00,
        imageUrl: 'img_project/Stocking_With_Pompons.png',
        quantity:6,
    },
    {
        id: 4,
        title: 'Stocking With Balls ',
        category: 'Stockings', 
        description: 'Red and green stocking with colorful Christmas balls. Fill it with candles or small presents!',
        price: 18.00,
        imageUrl: 'img_project/Stocking_With_Balls.png',
        quantity:11,
    },
    {
        id: 5,
        title: 'Red Christmas Balls ',
        category: 'Christmas Balls', 
        description: 'A great set of 40 baubles of different colors and diameters. Actually, you get everything you need to decorate your X-mas tree in one box. By the way, the box is excellent for further storage of the balls after Christmas.',
        price: 22.00,
        imageUrl: 'img_project/Red_Christmas_Balls.png',
        quantity:8,
    },
    {
        id: 6,
        title: 'Gold Christmas Balls ',
        category: 'Christmas Balls', 
        description: 'Set of 30 gold baubles made of glass and plastic. There are shiny and matt balls in this set with a diameter of 6-10 cm. The set comes in a nice storage box that you can use even after Christmas.',
        price: 10.00,
        imageUrl: 'img_project/Gold_Christmas_Balls.png',
        quantity:10,
    },
    {
        id: 7,
        title: 'Citrus Wreath ',
        category: 'Wreath', 
        description: 'Add some spice to your Christmas! This wreath features pine branches mixed in with brown pinecones, cotton flowers, red beads, and bright dried orange slices!',
        price: 89.00,
        imageUrl: 'img_project/Citrus_Wreath.png',
        quantity:2,
    },
];

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
    document.getElementById('modal_form').classList.remove('hidden')
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

if (!products){
    products=productsArr;
};
 
renderProducts(products);

document.getElementById("submit").addEventListener("click", addProduct);
























