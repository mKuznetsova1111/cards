import { createAsyncThunk } from '@reduxjs/toolkit';
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import { getList, setLoaded } from './app';

const SHEET_ID = '1tKvax44acMA2IAEDMWoYjK791LrZJqpc7aartIwk1vs';

export const fetchSheetData = createAsyncThunk(
  'app/fetchSheetData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const parser = new PublicGoogleSheetsParser(SHEET_ID);
      const data = await parser.parse();

      if (data && data.length > 0) {
        dispatch(getList(data));
        dispatch(setLoaded(true));
      } else {
        console.warn('Данные из Google Sheets пустые!');
        dispatch(setLoaded(false));
      }

      return data;
    } catch (err) {
      console.error('Ошибка при загрузке данных из Google Sheets:', err);
      return rejectWithValue(err.message || 'Unknown error');
    }
  }
);