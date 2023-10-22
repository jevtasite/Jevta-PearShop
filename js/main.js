function smoothScroll(target) {
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 800);
  }

  const products = [
    { name: "Jabuka", price: 199 },
    { name: "Banana", price: 159 },
    { name: "Šargarepa", price: 99 },
    { name: "Pomorandža", price: 149 },
    { name: "Paradajz", price: 125 },
    { name: "Jagoda", price: 259 },
  ];

  // Initialize the noUiSlider
  const priceRange = document.getElementById("price-range");
  const rangeValue = document.getElementById("range-value");
  noUiSlider.create(priceRange, {
    start: [99, 259], // Initial "Od" and "Do" values
    connect: true,     // Connect handles
    range: {
      'min': 99,
      'max': 259
    },
  });

  // Function to update the displayed products based on the price range
  function updateProducts(values) {
    const [fromValue, toValue] = values;
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear the existing products

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

  // Listen for changes to the range slider
  priceRange.noUiSlider.on("update", updateProducts);