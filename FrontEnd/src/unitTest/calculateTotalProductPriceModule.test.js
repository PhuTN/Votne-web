import { calculateTotalProductPriceModule } from '../modules/calculateTotalProductPriceModule';

describe("Hàm calculateTotalProductPriceModule", () => {
    it("UTCID01: Dữ liệu hợp lệ", () => {
        const products = [
            { price: 40, quantity: 4 },
            { price: 34, quantity: 2 },
            { price: 30, quantity: 6 },
        ];
        const result = calculateTotalProductPriceModule(products);
        expect(result).toBe(408);
    });

    it("UTCID02: Giá trị không hợp lệ (price âm)", () => {
        const products = [
            { price: 40, quantity: 4 },
            { price: 34, quantity: 2 },
            { price: -30, quantity: 6 },
        ];
        expect(() => calculateTotalProductPriceModule(products)).toThrow(
            "Price, and quantity must be positive integers greater than 0"
        );
    });

    it("UTCID03: Giá trị không hợp lệ (quantity âm)", () => {
        const products = [
            { price: 40, quantity: 4 },
            { price: 34, quantity: 2 },
            { price: 30, quantity: -6 },
        ];
        expect(() => calculateTotalProductPriceModule(products)).toThrow(
            "Price, and quantity must be positive integers greater than 0"
        );
    });
});
