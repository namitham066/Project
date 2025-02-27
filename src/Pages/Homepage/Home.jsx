import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import MyFeedHomepage from "../../Components/HomepageComp/MyFeedHomepage";

import ProductsHomepage from "../../Components/HomepageComp/ProductsHomepage";

const Home = () => {
  const [category, setcategory] = useState("Women");
  const [name, setname] = useState("MyFeed");

  return (
    <Stack align="center" bg="#EEEEEE" spacing={4} w="100%" p={4}>
      
      <MyFeedHomepage 
        setcategory={setcategory} 
        setname={setname} 
      />
      
      <ProductsHomepage 
        category={category} 
        name={name} 
      />
    </Stack>
  );
};

export default Home;
