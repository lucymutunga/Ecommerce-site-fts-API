const products_container = document.getElementById("products");
const cart = document.getElementById("cart");
const cart_items = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
    quantity: 1,
  },
];
//update cart counter
function updateCartCounter() {
  return (cart.innerText = cart_items.length);
}
//counts items on initial page load
updateCartCounter();
//updates cart items
const updateCart = (product) => {
  console.log(product);
  let index_of_item = cart_items.findIndex(
    (cart_item) => cart_item.id === product.id
  );

  //item exists in cart///so just increase quantity //product doesnt exist in the cart
  if (index_of_item >= 0) {
    cart_items[index_of_item].quantity += 1;
  } else {
    //product doesn't exist in the cart
    let new_product = { ...product };
    product.quantity = 1;
    cart_items.push(new_product);
  }

  updateCartCounter();
};
function toggleCart() {
  const cartLucy = document.querySelector(".cart-card");
  cartLucy.classList.toggle("open");

  handleAddToCart();
}


function createProductCard(product) {
  const img = document.createElement("img");
  img.setAttribute("src", product.image);

  const title_product = document.createElement("h4");
  title_product.innerText = product.title;

  const category = document.createElement("span");
  category.innerText = product.category;

  const price = document.createElement("p");
  price.innerHTML = `Price: <span>$${product.price}</span>`;

  const addButton = document.createElement("button");
  addButton.innerText = "add to cart";
  addButton.addEventListener("click", () => handleAddToCart(product));

  const viewButton = document.createElement("button");
  viewButton.innerText = "view product";
  viewButton.addEventListener("click", () => displayProduct(product));

  const product_card = document.createElement("div");
  product_card.classList.add("product");

  product_card.append(img, title_product, category, price, viewButton, addButton);

  return product_card;
}

const base_url = "https://fakestoreapi.com/products";

async function getAllProducts() {
  try {
    let result = await fetch(base_url);
    let products = await result.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function mountProducts() {
  console.log("here");
  let products = await getAllProducts();
  if (products && products.length > 0) {
    let product_cards = products.map((product) => createProductCard(product));
    products_container.append(...product_cards);
  } else {
    const errorElement = document.createElement("h4");
    errorElement.innerText = "Something went wrong with the products";
    errorElement.style.color = "red";
    products_container.appendChild(errorElement);
  }
}

mountProducts();

function handleAddToCart(product) {
  updateCart(product);
  console.log(cart_items);
}
function displayProduct(product) {
  // Create the elements to display the product details
  const products_Container = document.createElement("div");
  products_Container.classList.add("product-page");

  const productImage = document.createElement("img");
  productImage.setAttribute("src", product.image);

  const productTitle = document.createElement("h2");
  productTitle.innerText = product.title;

  const productCategory = document.createElement("p");
  productCategory.innerText = product.category;

  const productPrice = document.createElement("p");
  productPrice.innerHTML = `Price: <span>$${product.price}</span>`;

  const backButton = document.createElement("button");
  backButton.innerText = "Go back";
  backButton.addEventListener("click", () => {
    mountProducts();
    products_Container.innerHTML = "";
  });
  const addToCartButton = document.createElement("button");
  addToCartButton.innerText = "Add to cart";
  addToCartButton.addEventListener("click", () => handleAddToCart(product));
  




  // Append the elements to the product container
  products_Container.append(
    productImage,
    productTitle,
    productCategory,
    productPrice,
    backButton,
    addToCartButton,
  );

  // Replace the products container with the product page
  products_container.innerHTML = "";
  products_container.appendChild(products_Container);
}
//card animation
window.addEventListener("scroll", animateCards);

function animateCards() {
    const section = document.querySelector(".section-2");
    const features = document.querySelectorAll(".featured");

    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight) {
        section.classList.add("in-view");
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transitionDelay = `${index * 0.2}s`;
            }, 200);
        });
    }
}
