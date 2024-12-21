import { validateUserInfoModule } from '../modules/validateUserInfoModule';

describe("Hàm validateUserInfoModule", () => {
    it("UTCID01: Dữ liệu hợp lệ", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(true);
    });

    it("UTCID02: Giới tính Female hợp lệ", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Female"
        );
        expect(result).toBe(true);
    });

    it("UTCID03: Tên trống", () => {
        const result = validateUserInfoModule(
            "",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID04: Tên quá ngắn", () => {
        const result = validateUserInfoModule(
            "a",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID05: Tên chứa số", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ 3 Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID06: Số điện thoại trống", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID07: Số điện thoại không hợp lệ", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "3676767676767",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID08: Email trống", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID09: Email không hợp lệ", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID10: Địa chỉ trống", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID11: Địa chỉ không đầy đủ", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "Hà Nội",
            "2000-05-20",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID12: Ngày sinh trống", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID13: Ngày sinh không hợp lệ (tương lai)", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2025-01-01",
            "Male"
        );
        expect(result).toBe(false);
    });

    it("UTCID14: Giới tính không hợp lệ", () => {
        const result = validateUserInfoModule(
            "Nguyễn Thế Võ Quyền Anh",
            "0367171742",
            "quyenanh234@gmail.com",
            "173/2 Phan Châu Trinh, Hà Nội",
            "2000-05-20",
            "ègwggsd"
        );
        expect(result).toBe(false);
    });
});
