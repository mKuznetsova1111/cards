import React, {useState, useEffect} from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import Cards from "../components/cards/Cards";
import defaultPage from "../constants/page-description";
import {initApp, useApp, setFilter} from "../redux/reducer/app";
import {useDispatch} from "react-redux";
import { fetchSheetData } from '../redux/reducer/appThunks'; 

export default function Home() {
  const dispatch = useDispatch();
  initApp();
  const {isFilter, list, isLoaded} = useApp();

  useEffect(() => {
    dispatch(fetchSheetData());
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (isFilter){
      dispatch(setFilter({isFilter: true, type: "isHSK5"}))
    }
  }, [isLoaded])

  useEffect(() => {
    console.log(list)
  }, [list])
  
  return (
    <div className="container">
      <PageDescription {...defaultPage}/>
      <Cards/>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
