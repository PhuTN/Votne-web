export function calculateTotalProductPriceModule(products) {
    return products.reduce((total, product) => {
        // Kiểm tra nếu total và product.price * product.quantity là số nguyên dương lớn hơn 0
        if ( product.price <= 0 || product.quantity <= 0) {
            console.log("Price, and quantity must be positive integers greater than 0" )
            throw new Error("Price, and quantity must be positive integers greater than 0");
        }
        return total + (product.price * product.quantity);
    }, 0);
}
