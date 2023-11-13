import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  editing: null,
};

export const addNewCustomer = createAsyncThunk(
  "customers/addNew",
  async (newUser) => {
    const res = await fetch("/api/customer", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    const id = await res.json();

    return { ...newUser, _id: id };
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id) => {
    await fetch(`/api/customer?id=${id}`, { method: "DELETE" });

    return id;
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/edit",
  async (updatedUser) => {
    await fetch("/api/customer", {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
    });

    return updatedUser;
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomers: (state, action) => {
      state.customers = action.payload;
    },
    activateEditMode: (state, action) => {
      if (state.editing?._id && state.editing._id === action.payload)
        state.editing = null;
      else
        state.editing = state.customers.find((el) => el._id === action.payload);
    },
    deactivateEditMode: (state) => {
      state.editing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        state.customers = [...state.customers, action.payload];
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (el) => el._id !== action.payload
        );
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.map((el) => {
          if (el._id === action.payload._id)
            return { ...el, ...action.payload };
          return el;
        });
      });
  },
});

export const { addCustomers, activateEditMode, deactivateEditMode } =
  customersSlice.actions;
export default customersSlice.reducer;
