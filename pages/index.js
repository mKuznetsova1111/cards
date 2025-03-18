import React, {useState, useEffect} from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import Cards from "../components/cards/Cards";
import defaultPage from "../constants/page-description";
import getContent from "../hooks/useContent";
import {initApp, useApp, setFilter} from "../redux/reducer/app";
import {useDispatch} from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  getContent();
  initApp();
  const {isFilter, list, isLoaded} = useApp();

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
