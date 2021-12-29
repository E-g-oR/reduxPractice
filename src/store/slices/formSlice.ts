import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type FormState = {
  isOpen: boolean;
  editingItemId: number | null;
};

const initialState: FormState = {
  isOpen: false,
  editingItemId: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    openForm: (state) => {
      state.isOpen = true;
    },
    closeForm: (state) => {
      state.isOpen = false;
    },
    setEditMode: (state, action: PayloadAction<number>) => {
      state.editingItemId = action.payload;
      state.isOpen = true;
      
    },
    closeEditMode: (state) => {
      state.editingItemId = null;
      state.isOpen = false;
    },
  },
});

export const { openForm, closeEditMode, closeForm, setEditMode } =
  formSlice.actions;

export const selectIsOpen = (state: FormState) => state.isOpen;

export const editingItemId = (state: RootState) => state.form.editingItemId;

export default formSlice.reducer;
