import React from "react";
import { Stack } from "@chakra-ui/react";
import MyFeedHomepage from "../../Components/HomepageComp/MyFeedHomepage"
import CarouselHomepage from "../../Components/HomepageComp/CaorouselHome";
import ProductsHomepage from "../../Components/HomepageComp/ProductsHomepage";

const Home = () => {
  return (
    <Stack align={"center"} bg={"#EEEEEE"}>
      <MyFeedHomepage />
      <CarouselHomepage/>
      <ProductsHomepage/>
    </Stack>
  );
};

export default Home;
