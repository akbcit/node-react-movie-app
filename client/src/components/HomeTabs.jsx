import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MovieContext } from "../context/MovieContext";
import { useContext, useState } from "react";
import MovieGrid from "./MovieGrid";
import "react-tabs/style/react-tabs.css";

function HomeTabs() {
  const { category, setCategory,setPageNum} = useContext(MovieContext);
  const changeCategory = (index) => {
    switch (index) {
      case 0:
        setCategory("trending");
        setPageNum(1);
        break;
      case 1:
        setCategory("popular");
        setPageNum(1);
        break;
      case 2:
        setCategory("playing");
        setPageNum(1);
        break;
      case 3:
        setCategory("toprated");
        setPageNum(1);
        break;
      default:
        setCategory("trending");
        setPageNum(1);
    }
  };

  return (
    <Tabs onSelect={changeCategory} defaultIndex={0}>
      <TabList>
        <Tab>Trending</Tab>
        <Tab>Popular</Tab>
        <Tab>Now Playing</Tab>
        <Tab>Top Rated</Tab>
      </TabList>
      <TabPanel>
        <MovieGrid />
      </TabPanel>
      <TabPanel>
        <MovieGrid />
      </TabPanel>
      <TabPanel>
        <MovieGrid />
      </TabPanel>
      <TabPanel>
        <MovieGrid />
      </TabPanel>
    </Tabs>
  );
}

export default HomeTabs;
