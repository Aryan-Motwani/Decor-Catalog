/*
|--------------------------------------------------------------------------
| PRODUCT DATA
|--------------------------------------------------------------------------
|
| Add / remove products here.
|
| price2 and price3 are OPTIONAL.
|
*/

const products = [

    {
        id: 1,
        name: "Premium Face Cream",
        category: "Skincare",
        price1: 499,
        price2: 799,
        price3: 999,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },

    {
        id: 2,
        name: "Hydrating Face Serum",
        category: "Skincare",
        price1: 699,
        price2: 999,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be"
    },

    {
        id: 3,
        name: "Matte Lipstick",
        category: "Makeup",
        price1: 299,
        price2: 499,
        price3: 699,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa"
    },

    {
        id: 4,
        name: "Luxury Perfume",
        category: "Fragrance",
        price1: 1299,
        price2: 1899,
        price3: 2499,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601"
    },

    {
        id: 5,
        name: "Daily Sunscreen",
        category: "Skincare",
        price1: 399,
        price2: 599,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8"
    },

    {
        id: 6,
        name: "Velvet Foundation",
        category: "Makeup",
        price1: 599,
        price2: 899,
        price3: 1199,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
    },

    {
        id: 7,
        name: "Hair Repair Mask",
        category: "Haircare",
        price1: 449,
        price2: 699,
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da"
    },

    {
        id: 8,
        name: "Aromatic Body Mist",
        category: "Fragrance",
        price1: 349,
        price2: 599,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f"
    },

    {
        id: 9,
        name: "Gentle Face Wash",
        category: "Skincare",
        price1: 249,
        price2: 399,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03"
    },

    {
        id: 10,
        name: "Blush Palette",
        category: "Makeup",
        price1: 499,
        price2: 799,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348"
    }

];


/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

let selectedCategory = "All";
let searchQuery = "";


/*
|--------------------------------------------------------------------------
| DOM
|--------------------------------------------------------------------------
*/

const productsGrid = document.getElementById("productsGrid");
const categoriesContainer = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const productCount = document.getElementById("productCount");
const emptyState = document.getElementById("emptyState");


/*
|--------------------------------------------------------------------------
| GET CATEGORIES
|--------------------------------------------------------------------------
|
| Categories are NOT stored separately.
|
| They are automatically extracted from the products array.
|
*/

function getCategories() {

    const categories = products.map(product => product.category);

    return ["All", ...new Set(categories)];

}


/*
|--------------------------------------------------------------------------
| RENDER CATEGORIES
|--------------------------------------------------------------------------
*/

function renderCategories() {

    const categories = getCategories();

    categoriesContainer.innerHTML = "";

    categories.forEach(category => {

        const button = document.createElement("button");

        button.className = "category-button";

        if (category === selectedCategory) {
            button.classList.add("active");
        }

        button.textContent = category;

        button.addEventListener("click", () => {

            selectedCategory = category;

            renderCategories();
            renderProducts();

        });

        categoriesContainer.appendChild(button);

    });

}


/*
|--------------------------------------------------------------------------
| FILTER PRODUCTS
|--------------------------------------------------------------------------
*/

function getFilteredProducts() {

    return products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;

    });

}


/*
|--------------------------------------------------------------------------
| FORMAT PRICE
|--------------------------------------------------------------------------
*/

function formatPrice(price) {

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(price);

}


/*
|--------------------------------------------------------------------------
| CREATE PRICE ROW
|--------------------------------------------------------------------------
*/

function createPriceRow(label, price) {

    if (price === undefined || price === null) {
        return "";
    }

    return `
        <div class="price-row">

            <span class="price-label">
                ${label}
            </span>

            <span class="price">
                ${formatPrice(price)}
            </span>

        </div>
    `;

}


/*
|--------------------------------------------------------------------------
| RENDER PRODUCTS
|--------------------------------------------------------------------------
*/

function renderProducts() {

    const filteredProducts = getFilteredProducts();

    productsGrid.innerHTML = "";

    productCount.textContent = filteredProducts.length;

    if (filteredProducts.length === 0) {

        emptyState.classList.add("show");

        return;

    }

    emptyState.classList.remove("show");


    filteredProducts.forEach((product, index) => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.style.animationDelay = `${index * 40}ms`;


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="category-tag">
                    ${product.category}
                </span>

            </div>


            <div class="product-info">

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <p class="product-category">
                    ${product.category}
                </p>


                <div class="prices">

                    ${createPriceRow("Price 1", product.price1)}

                    ${createPriceRow("Price 2", product.price2)}

                    ${createPriceRow("Price 3", product.price3)}

                </div>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

searchInput.addEventListener("input", event => {

    searchQuery = event.target.value;

    renderProducts();

});


/*
|--------------------------------------------------------------------------
| INITIALIZE
|--------------------------------------------------------------------------
*/

renderCategories();
renderProducts();