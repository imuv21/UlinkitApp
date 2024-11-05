import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Address {
  addressid: number;
  street: string | null;
  city: string;
  state: string | null;
  postalCode: string | null;
  houseNo: string | null;
  floorNo: string | null;
  landmark: string | null;
  contactNumber: string | null;
}
interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  country: string;
}
interface AuthState {
  user: User | null;
  token: string | null;
  address: Address[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  user: null,
  token: null,
  address: [],
  status: 'idle',
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: { username: string; password: string; role: string }) => {
    const response = await axios.post(`https://api.ulinkit.com/api/Login`, loginData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.address = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.user = {
          firstname: action.payload.firstname,
          lastname: action.payload.lastname,
          email: action.payload.email,
          role: action.payload.role,
          country: action.payload.country,
        };
        state.token = action.payload.token;
        state.address = action.payload.useraddress;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
