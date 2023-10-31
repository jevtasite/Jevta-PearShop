function smoothScroll(target) {
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800);
  }

  //RANGE SLIDER
  const products = [
    { name: "Jabuka", price: 199 },
    { name: "Banana", price: 159 },
    { name: "Šargarepa", price: 99 },
    { name: "Pomorandža", price: 149 },
    { name: "Paradajz", price: 125 },
    { name: "Jagoda", price: 259 },
  ];

  const priceRange = document.getElementById("price-range");
  const rangeValue = document.getElementById("range-value");
  noUiSlider.create(priceRange, {
    start: [99, 259], 
    connect: true,    
    range: {
      'min': 99,
      'max': 259
    },
  });

  function updateProducts(values) {
    const [fromValue, toValue] = values;
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; 

    products.forEach((product) => {
      if (product.price >= fromValue && product.price <= toValue) {
        const productCard = document.createElement("div");
        productCard.className = "col-md-4 d-flex justify-content-center align-items-center";
        productCard.innerHTML = `
          <div class="product-card text-center mb-3">
            <img src="images/${product.name.toLowerCase()}.jpg" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price} RSD</p>
            <button class="btn btn-success add-to-cart">Dodaj u korpu</button>
          </div>
        `;
        productContainer.appendChild(productCard);
      }
    });

    rangeValue.textContent = `${fromValue} - ${toValue} RSD`;
  }

  priceRange.noUiSlider.on("update", updateProducts);
  
  //COUNTER 
  function startCounting(targetId, endValue, speed) {
    let current = 0;
    const target = document.getElementById(targetId);
    const interval = setInterval(() => {
        if (current >= endValue) {
            clearInterval(interval);
        } else {
            current++;
            target.textContent = current;
        }
    }, speed);
}

startCounting("experience", 10, 250);       
startCounting("customers", 1000);     
startCounting("shops", 15, 250);     

//GREB GREB 
var bridge = document.getElementById("bridge"),
    bridgeCanvas = bridge.getContext('2d'),
    brushRadius = (bridge.width / 100) * 5,
    img = new Image();

if (brushRadius < 50) {
    brushRadius = 50;
}

img.onload = function () {
    bridgeCanvas.drawImage(img, 0, 0, bridge.width, bridge.height);
};
img.loc = './images/';
img.filename = 'vegetable3.jpg';
if (window.devicePixelRatio >= 2) {
    var nameParts = img.filename.split('.');
    img.src = img.loc + nameParts[0] + "." + nameParts[1];
} else {
    img.src = img.loc + img.filename;
}

function getBrushPos(xRef, yRef) {
    var bridgeRect = bridge.getBoundingClientRect();
    return {
        x: Math.floor((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left) * bridge.width),
        y: Math.floor((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top) * bridge.height)
    };
}

function drawDot(mouseX, mouseY) {
    bridgeCanvas.beginPath();
    bridgeCanvas.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
    bridgeCanvas.fillStyle = '#000';
    bridgeCanvas.globalCompositeOperation = "destination-out";
    bridgeCanvas.fill();
}

function handleDrawEvent(x, y) {
    var brushPos = getBrushPos(x, y);
    drawDot(brushPos.x, brushPos.y);
}

bridge.addEventListener("mousemove", function (e) {
    if (e.buttons === 1) {
        handleDrawEvent(e.clientX, e.clientY);
    }
}, false);

bridge.addEventListener("touchmove", function (e) {
    e.preventDefault();
    var touch = e.touches[0];
    if (touch) {
        handleDrawEvent(touch.clientX, touch.clientY);
    }
}, false);

//KORPA
let cart = {};

function updateCartCount() {
    const cartCounter = document.getElementById("cart-counter");
    let totalQuantity = 0;
    for (const item in cart) {
        totalQuantity += cart[item];
    }
    cartCounter.textContent = `Kolica (${totalQuantity})`;
}

function addToCart(product) {
    const productName = product.querySelector(".product-name").textContent;
    if (cart[productName]) {
        cart[productName] += 1;
    } else {
        cart[productName] = 1;
    }
    updateCartCount();
    updateCartContent();
}

function updateCartContent() {
    const cartContent = document.getElementById("cart-content");
    cartContent.innerHTML = ""; 
    for (const item in cart) {
        const cartItem = document.createElement("div");
        cartItem.textContent = item + " x" + cart[item];
        cartContent.appendChild(cartItem);
    }
}

const productContainer = document.getElementById("products");
productContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
        const product = event.target.closest(".product-card");
        if (product) {
            addToCart(product);
        }
    }
});

const cartLink = document.getElementById("cart-link");
const cartPopup = document.getElementById("cart-popup");

cartLink.addEventListener("click", function () {
    cartPopup.style.display = cartPopup.style.display === "none" ? "block" : "none";
});

function clearCart() {
  cart = {}; 
  updateCartCount(); 
  updateCartContent(); 
}

const clearCartButton = document.getElementById("clear-cart-button");
clearCartButton.addEventListener("click", clearCart);
