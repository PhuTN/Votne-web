import { validateProductInfoModule } from '../modules/validateProductInfoModule';

// src/unitTest/validateProductInfoModule.test.js
describe("Hàm validateProductInfoModule", () => {

    it("UTCID01: Dữ liệu hợp lệ", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "Vợt",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(true);
    });

    it("UTCID02: Tên sản phẩm trống", () => {
        const product = {
            name: "",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "Giày",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID03: Tên sản phẩm quá ngắn", () => {
        const product = {
            name: "aa",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "Áo",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID04: Tên sản phẩm chứa ký tự đặc biệt", () => {
        const product = {
            name: "Vợt Cầu Lông Kumpoo Small @",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "Quần",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID05: Mô tả sản phẩm trống", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "",
            type: "Túi vợt",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID06: Dữ liệu hợp lệ (Tên, Mô tả, Loại, Thương hiệu hợp lệ)", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "Dòng vợt",
            type: "Balo",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID07: Loại sản phẩm trống", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID08: Loại sản phẩm không hợp lệ", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "vsdvs",
            brand: "Vợt cầu lông Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID09: Thương hiệu trống", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "Vợt",
            brand: "",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID10: Thương hiệu phải có độ dài từ 10 đến 150 ký tự", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "Vợt",
            brand: "Kumpoo",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

    it("UTCID11: Thương hiệu chỉ chứa chữ cái và dấu cách", () => {
        const product = {
            name: "Vợt Kumpoo Small Tiger Wings",
            description: "được thiết kế có điểm cân bằng hơi nặng đầu, đũa cứng ở mức trung bình, trọng lượng 4U",
            type: "Vợt",
            brand: "Vợt cầu lông Kumpoo@",
        };
        expect(validateProductInfoModule(product.name, product.description, product.type, product.brand)).toBe(false);
    });

});
