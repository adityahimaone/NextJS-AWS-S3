import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IInitalStateS3, IFiles } from '@/utils/Types';

const intialState: IInitalStateS3 = {
  loading: false,
  dataUnsignedUrl: [],
  data: [],
  error: undefined,
};

export const uploadPostFile = createAsyncThunk('s3/uploadPostFile', async (files: IFiles[]) => {
  const response = await axios.post('/api/s3/upload', { files });
  return response.data.result;
});

export const showPostFile = createAsyncThunk('s3/showPostFile', async (key: string[]) => {
  const response = await axios.post('/api/s3/show', { key });
  return response.data.result;
});

export const s3Slice = createSlice({
  name: 's3',
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPostFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPostFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataUnsignedUrl = action.payload;
      })
      .addCase(uploadPostFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(showPostFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(showPostFile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(showPostFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default s3Slice.reducer;
