import { createSlice } from "@reduxjs/toolkit";

// Helper: Load and save state from localStorage
const loadStateFromLocalStorage = () => {
  const savedState = localStorage.getItem("checkboxState");
  return savedState ? JSON.parse(savedState) : {};
};

const saveStateToLocalStorage = (state) => {
  localStorage.setItem("checkboxState", JSON.stringify(state));
};

// Redux slice
const checkboxSlice = createSlice({
    name: "checkbox",
    initialState: loadStateFromLocalStorage(),
    reducers: {
      toggleCheckbox: (state, action) => {
        const { type, id } = action.payload;
  
        // Nếu chưa có type trong state, tạo mảng rỗng cho nó
        if (!state[type]) {
          state[type] = [];
        }
  
        // Kiểm tra nếu ID đã có trong mảng, thì loại bỏ, nếu chưa có thì thêm vào
        if (state[type].includes(id)) {
          state[type] = state[type].filter(item => item !== id);
        } else {
          state[type].push(id);
        }
  
        saveStateToLocalStorage(state); // Lưu lại state vào localStorage
      },
    },
  });
  
  export const { toggleCheckbox } = checkboxSlice.actions;
  export default checkboxSlice.reducer;
  