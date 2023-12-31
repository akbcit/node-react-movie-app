import { useState,useEffect,useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import HomeTabs from '../components/HomeTabs';

function Home() {
  const { setCategory,setPageNum} = useContext(MovieContext);
  // when page loads set default cat to "trending" and page to 1
  useEffect(() => {
    setCategory("trending");
    setPageNum(1);
  }, []);

  return (
    <HomeTabs/>
  )
}

export default Home;