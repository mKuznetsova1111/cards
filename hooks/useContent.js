import React, { useState, useEffect } from 'react'
import PublicGoogleSheetsParser from 'public-google-sheets-parser';
import {getList, useApp, setFilter, shuffleList} from "../redux/reducer/app";
import {useDispatch} from "react-redux";

// const REACT_APP_GOOGLE_SHEETS_ID = `1qfpcm_Yul_x_4xgkO1zboopFp8TZPDSBOPiC0XrfR8k`;
const REACT_APP_GOOGLE_SHEETS_ID = `1tKvax44acMA2IAEDMWoYjK791LrZJqpc7aartIwk1vs`;


const getContent = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const parser = new PublicGoogleSheetsParser(REACT_APP_GOOGLE_SHEETS_ID)
    parser.parse().then(data => {
      setItems(data);
    })
  }, [])

  useEffect(() => {
    dispatch(getList(items));
  }, [items])
}

export default getContent