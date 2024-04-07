const stocks = document.querySelectorAll('.stock');
const stockBlock = document.getElementById('stock-block');
const newBlockContainer = document.getElementById('newBlockContainer');
const lowerBound = 140.00; // Example lower bound of the price range
const upperBound = 160.00; // Example upper bound of the price range
const blockWidth = 40;
var blockNum = 0;

stockBlock.style.transform = 'translateY(' + window.innerHeight/2 + 'px)';

// Function to update the stock data
function updateStockData() {
    stocks.forEach(stockElement => {
        const symbol = stockElement.getAttribute('data-symbol');
        let price = parseFloat(stockElement.getAttribute('data-price'));

        // Fetch stock data from an API
        // For demonstration purposes, let's assume we have the following data
        price += (Math.random() - 0.5) * 10; // Random price change for demonstration

        // Update the stock price
        stockElement.setAttribute('data-price', price.toFixed(2));
        stockElement.innerText = `${symbol}: $${price.toFixed(2)}`;
    });

    // Update the stock position after updating the data
    updateStockPositionY(lowerBound, upperBound);
}

// Function to update the stock block position based on price
function updateStockPositionY(lower, upper) {
    stocks.forEach(stockElement => {
        const price = parseFloat(stockElement.getAttribute('data-price'));

        // Calculate the percentage of the price within the range
        const percentage = (price - lower) / (upper - lower);
        // Calculate the translateY value based on the percentage
        const translateY = window.innerHeight*(1-percentage);
        // Apply the translateY value to the stock block
        newBlockContainer.style.transform = 'translateY(' + translateY + 'px)';
    });
}

// Initial update of stock position
updateStockPositionY(lowerBound, upperBound);

// Update the stock data every 3 seconds
// setInterval(updateStockData, 3000);

setInterval(function() {
    updateStockData()
    const currentTranslateX = parseFloat(getComputedStyle(stockBlock).transform.split(',')[4]);
    stockBlock.style.transform = `translateX(${currentTranslateX - blockWidth}px)`;

    blockNum += 1;
    // Create a new block element and add it to the new block container
    const newBlock = document.createElement('div');
    newBlock.className = `block-${blockNum}`;
    newBlockContainer.appendChild(newBlock);
    updateStockPositionY(lowerBound, upperBound);
}, 2000);