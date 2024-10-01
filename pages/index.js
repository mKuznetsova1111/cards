import React, {useState, useEffect} from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import Cards from "../components/cards/Cards";
import defaultPage from "../constants/page-description";
import getContent from "../hooks/useContent";

export default function Home() {
  getContent();
  
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
