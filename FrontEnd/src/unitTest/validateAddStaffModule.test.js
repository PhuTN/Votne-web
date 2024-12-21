import { validateAddStaffModule } from '../modules/validateAddStaffModule';

describe("Hàm validateAddStaffModule", () => {
    it("UTCID01: Dữ liệu hợp lệ (Admin)", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Admin");
        expect(result).toBe(true);
    });

    it("UTCID02: Dữ liệu hợp lệ (WarehouseStaff)", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "WarehouseStaff");
        expect(result).toBe(true);
    });

    it("UTCID03: Dữ liệu hợp lệ (Seller)", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "Seller");
        expect(result).toBe(true);
    });

    it("UTCID04: Họ tên rỗng", () => {
        const result = validateAddStaffModule("", "0367171742", "quyenanh234@gmail.com", "Admin");
        expect(result).toBe(false);
    });

    it("UTCID05: Họ tên quá ngắn", () => {
        const result = validateAddStaffModule("a", "0367171742", "quyenanh234@gmail.com", "Admin");
        expect(result).toBe(false);
    });

    it("UTCID06: Họ tên chứa ký tự số", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ 3 Anh", "0367171742", "quyenanh234@gmail.com", "Admin");
        expect(result).toBe(false);
    });

    it("UTCID07: Số điện thoại rỗng", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "", "quyenanh234@gmail.com", "Admin");
        expect(result).toBe(false);
    });

    it("UTCID08: Số điện thoại không hợp lệ (quá dài)", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "3676767676767", "quyenanh234@gmail.com", "Admin");
        expect(result).toBe(false);
    });

    it("UTCID09: Email rỗng", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "", "Admin");
        expect(result).toBe(false);
    });

    it("UTCID10: Email không hợp lệ", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail", "Admin");
        expect(result).toBe(false);
    });

    it("UTCID11: Loại tài khoản không hợp lệ", () => {
        const result = validateAddStaffModule("Nguyễn Thế Võ Quyền Anh", "0367171742", "quyenanh234@gmail.com", "sdvgfsg");
        expect(result).toBe(false);
    });
});
