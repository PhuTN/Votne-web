import { validateOrder } from '../modules/validateOrderModule';

describe("Hàm validateOrder", () => {
    it("UTCID01: Dữ liệu hợp lệ", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Ship Cod",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(true);
    });

    it("UTCID02: Thiếu họ tên", () => {
        const order = {
            fullName: "",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Chuyển Khoản",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID03: Họ tên không hợp lệ", () => {
        const order = {
            fullName: "a",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Ship Cod",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID04: Họ tên có ký tự không hợp lệ", () => {
        const order = {
            fullName: "Nguyễn Thế Võ 3 Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Ship Cod",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID05: Thiếu số điện thoại", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Chuyển Khoản",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID06: Số điện thoại không hợp lệ", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "3676767676767",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Ship Cod",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID07: Thiếu email", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Ship Cod",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID08: Email không hợp lệ", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Chuyển Khoản",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID09: Thiếu địa chỉ", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "",
            paymentMethod: "Ship Cod",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID10: Địa chỉ quá ngắn", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "Hà Nội",
            paymentMethod: "Chuyển Khoản",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID11: Loại thanh toán không hợp lệ", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "ádafg",
            number: 5,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID12: Số không phải số nguyên dương", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Ship Cod",
            number: -2,
            description: "Đóng đơn cẩn thận, kèm túi xốp",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });

    it("UTCID13: Mô tả quá ngắn", () => {
        const order = {
            fullName: "Nguyễn Thế Võ Quyền Anh",
            phone: "0367171742",
            email: "quyenanh234@gmail.com",
            address: "173/2 Phan Châu Trinh, Hà Nội",
            paymentMethod: "Ship Cod",
            number: 5,
            description: "a",
        };
        expect(validateOrder(order.fullName, order.phone, order.email, order.address, order.paymentMethod, order.number, order.description)).toBe(false);
    });
});
