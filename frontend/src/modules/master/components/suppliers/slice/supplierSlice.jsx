import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSupplier,
  fetchSupplier,
  fetchSuppliersByPage,
  fetchSuppliersBySearch,
  fetchSuppliers,
  modifySupplier,
  removeSupplier,
  fetchSupplierContactPer,
} from "./supplierActions";
const initialState = {
  status: "idle",
  search: "",
};

export const createSupplier = createAsyncThunk(
  "CREATE_SUPPLIER",
  async (requestObject) => {
    const { data, status } = await addSupplier(requestObject);
    return { data, status };
  }
);
export const getSupplier = createAsyncThunk(
  "GET_SUPPLIER",
  async (requestObject) => {
    const { data, status } = await fetchSupplier(requestObject);
    return { data, status };
  }
);
export const updateSupplier = createAsyncThunk(
  "UPDATE_SUPPLIER",
  async (requestObject) => {
    const { data, status } = await modifySupplier(requestObject);
    return { data, status };
  }
);

export const getSuppliersBySearch = createAsyncThunk(
  "GET_SUPPLIERS_BY_SEARCH",
  async (requestObject) => {
    const { data, status } = await fetchSuppliersBySearch(requestObject);
    return { data, status };
  }
);

export const getSuppliersByPage = createAsyncThunk(
  "GET_SUPPLIERS_BY_PAGE",
  async (requestObject) => {
    const { data, status } = await fetchSuppliersByPage(requestObject);
    return { data, status };
  }
);


export const getSuppliers = createAsyncThunk(
  "GET_SUPPLIERS",
  async (requestObject) => {
    const { data, status } = await fetchSuppliers(requestObject);
    return { data, status };
  }
);

export const deleteSupplier = createAsyncThunk(
  "DELETE_SUPPLIER",
  async (requestObject) => {
    const { data, status } = await removeSupplier(requestObject);
    return { data, status };
  }
);

export const getSupplierContactPer = createAsyncThunk( // new create
  "GET_SUPPLIER_CONTACT",
  async (requestObject) => {
    const { data, status } = await fetchSupplierContactPer(requestObject);
    return { data, status };
  }
);

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSupplier.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createSupplier.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSupplier.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getSupplier.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(updateSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSupplier.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateSupplier.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getSuppliersByPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSuppliersByPage.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getSuppliersByPage.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getSuppliersBySearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSuppliersBySearch.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getSuppliersBySearch.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getSuppliers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSuppliers.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getSuppliers.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(deleteSupplier.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSupplier.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteSupplier.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getSupplierContactPer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSupplierContactPer.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getSupplierContactPer.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const { setSearch } = supplierSlice.actions;
export default supplierSlice.reducer;
export const selectIsLoading = (state) => state.supplier.status === "loading";
