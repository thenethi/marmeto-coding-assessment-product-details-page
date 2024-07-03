const decreaseButton = document.getElementById('decrease-quantity');
const increaseButton = document.getElementById('increase-quantity');
const quantityElement = document.getElementById('quantity');

// Initial quantity value
let quantity = 1;

// Event listener for decreasing quantity
decreaseButton.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
});

// Event listener for increasing quantity
increaseButton.addEventListener('click', () => {
    quantity++;
    quantityElement.textContent = quantity;
});



document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
        .then(response => response.json())
        .then(data => {
            const product = data.product;
            document.getElementById('main-image').src = "https://yt3.googleusercontent.com/ytc/AIdro_k875HIEdfXRonKY-dTRKUNDChMNXmF0Iq3rxRlqv37ys8=s900-c-k-c0x00ffffff-no-rj";
            document.getElementById('vendor').textContent = product.vendor;
            document.getElementById('title').textContent = product.title;
            document.getElementById('price').textContent = product.price;
            document.getElementById('compare-at-price').textContent = product.compare_at_price;
            document.getElementById('percentage-off').textContent = calculatePercentageOff(product.price, product.compare_at_price) + '% off';
            document.getElementById('description').innerHTML = product.description;
            const newThumbnails = [
                'https://yt3.googleusercontent.com/ytc/AIdro_k875HIEdfXRonKY-dTRKUNDChMNXmF0Iq3rxRlqv37ys8=s900-c-k-c0x00ffffff-no-rj',
                'https://image.jimcdn.com/app/cms/image/transf/dimension=682x2048:format=jpg/path/sa9f4c121262be3b8/image/i6628eab9063d53fc/version/1593419821/image.jpg',
                'https://yt3.googleusercontent.com/ytc/AIdro_k875HIEdfXRonKY-dTRKUNDChMNXmF0Iq3rxRlqv37ys8=s900-c-k-c0x00ffffff-no-rj',
                'https://i.pinimg.com/736x/a0/22/b3/a022b310cf83d2431e6944a0ad25c01f.jpg'
            ];

            populateThumbnails(newThumbnails);
            populateColorSelectors(product.options.find(option => option.name === 'Color').values);
            populateSizeSelectors(product.options.find(option => option.name === 'Size').values);
        });

        document.getElementById('add-to-cart').addEventListener('click', function() {
            // Remove a specific class from an element
            document.getElementById('cart-message').classList.remove('hide-cart-message');
            document.getElementById('cart-message').classList.add('cart-message')
            const color = document.querySelector('input[name="color"]:checked').value;
            const size = document.querySelector('input[name="size"]:checked').value;
            const quantity = parseInt(document.getElementById('quantity').textContent); // Fetch text content instead of value
            const title = document.getElementById('title').textContent;
            const message = `Added ${quantity} of ${title} (${color}, ${size}) to cart.`;
        
            // Display the message only if it is not empty
            if (message.trim().length > 0) {
                document.getElementById('cart-message').textContent = message;
                
            } else {
                document.getElementById('cart-message').textContent = '';
               
            }
        });
        
});


function calculatePercentageOff(price, compareAtPrice) {
    const priceValue = parseFloat(price.replace('$', ''));
    const compareAtPriceValue = parseFloat(compareAtPrice.replace('$', ''));
    return Math.round(((compareAtPriceValue - priceValue) / compareAtPriceValue) * 100);
}

function populateThumbnails(images) {
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.addEventListener('click', () => {
            document.getElementById('main-image').src = image;
        });
        thumbnailsContainer.appendChild(img);
    });
}

function populateColorSelectors(colors) {
    const colorContainer = document.getElementById('color');
    colors.forEach((color, index) => {
        const key = Object.keys(color)[0];
        const colorOption = document.createElement('input');
        colorOption.type = 'radio';
        colorOption.name = 'color';
        colorOption.id = 'color' + index;
        colorOption.value = key;
        if (index === 0) {
            colorOption.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = 'color' + index;

        const span = document.createElement('span');
        span.style.backgroundColor = color[key];
        label.appendChild(span);

        colorContainer.appendChild(colorOption);
        colorContainer.appendChild(label);
    });
}

function populateSizeSelectors(sizes) {
    const sizeContainer = document.getElementById('size');
    const sizeItem =document.createElement('div')
    sizes.forEach((size, index) => {
        const sizeOption = document.createElement('input');
        sizeOption.type = 'radio';
        sizeOption.name = 'size';
        sizeOption.id = 'size' + index;
        sizeOption.value = size;
        if (index === 0) {
            sizeOption.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = 'size' + index;

        const span = document.createElement('span');
        span.textContent = size;
        label.appendChild(span);

        // sizeItem.appendChild(sizeOption);
        // sizeItem.appendChild(label);
        sizeContainer.appendChild(sizeOption);
        sizeContainer.appendChild(label);
    });
}

