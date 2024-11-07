import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface VerifyOtpPayload {
  otp: string;
  username: string;
  role: string;
}
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
  logStatus: 'idle' | 'loading' | 'failed' | 'success';

  signStatus: 'idle' | 'loading' | 'failed' | 'success';
  tempEmail: string | null;

  otpStatus: 'idle' | 'loading' | 'failed' | 'success';
}
const initialState: AuthState = {
  user: null,
  token: null,
  address: [],
  logStatus: 'idle',

  signStatus: 'idle',
  tempEmail: null,

  otpStatus: 'idle',
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: { username: string; password: string; role: string }) => {
    const response = await axios.post(`https://api.ulinkit.com/api/Login`, loginData);
    return response.data;
  }
);
export const signup = createAsyncThunk(
  'auth/signup',
  async (signupData: { firstname: string; lastname: string; email: string; password: string; role: string; countryCode: string; mobile: string; country: string; }) => {
    const response = await axios.post(`https://api.ulinkit.com/api/register`, signupData);
    return response.data;
  }
);
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (formData: VerifyOtpPayload) => {
    const { otp, username, role } = formData;
    const response = await axios.post(`https://api.ulinkit.com/api/verifyOtp?otp=${otp}&username=${username}&role=${role}`);
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
        state.logStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.logStatus = 'success';
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
        state.logStatus = 'failed';
      })

      .addCase(signup.pending, (state) => {
        state.signStatus = 'loading';
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.signStatus = 'success';
        state.tempEmail = action.payload.email;
      })
      .addCase(signup.rejected, (state) => {
        state.signStatus = 'failed';
      })

      .addCase(verifyOtp.pending, (state) => {
        state.otpStatus = 'loading';
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.otpStatus = 'success';
        state.tempEmail = null;
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.otpStatus = 'failed';
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
