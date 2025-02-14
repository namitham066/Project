import React, { useState } from "react";
import { Stack, Text, Avatar, useBreakpointValue } from "@chakra-ui/react";

const MyFeedHomepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("WOMEN");

  const categories = {
    WOMEN: [
      { name: "KURTAS", img: "https://cdn.shopaccino.com/nakhrali/products/duplicate-272063707752043_m.jpg?v=530" },
      { name: "TOPS", img: "https://jimmyluxury.in/cdn/shop/files/IMG_0995copy.webp?v=1729253572" },
      { name: "SHIRT", img: "https://www.mustardfashion.com/wp-content/uploads/2024/11/A2308-2.jpg" },
      { name: "JEANS", img: "https://image.hm.com/assets/hm/8b/ea/8bea8bac07ed75596e5597f6d2997f07cfd81fac.jpg?imwidth=768" },
      { name: "SAREES", img: "https://www.vastranand.in/cdn/shop/files/1_9f2964cc-6f27-4415-bf91-648c34e0fd36.jpg?v=1705127062" },
      { name: "ETHNIC SETS", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1fjyUskOJeeVUBTcksbjSvoqcRpcQRdOKdg&s" },
      { name: "FOOTWEAR", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/378820bf-d936-411c-950b-b80e1033c454/NIKE+QUEST+6.png" },
      { name: "KIDS", img: "https://img.faballey.com/images/Product/IGS00052Z/d3.jpg" },
      { name: "HOME", img: "https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg" },
      { name: "ACCESSORY", img: "https://media.istockphoto.com/id/1390259144/photo/collection-of-trendy-silk-elastic-band-scrunchies-and-pearl-hair-clips-on-white-background.jpg?s=612x612&w=0&k=20&c=VHBFjE2wKKx5oXurIpUARHqjwEzJNI6O8BAkQGNNWYk=" },
      { name: "HOME", img: "https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg" },
    ],
    MEN: [
      { name: "T-SHIRTS", img: "https://urturms.com/cdn/shop/files/01_0850e9fd-110d-40ff-8fb0-7f67024b5126.jpg?v=1725880464&width=2000" },
      { name: "FORMAL SHIRTS", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4k3exFeBByYNyGqzAoj8zFusotaiSFdm8fw&s" },
      { name: "JEANS", img: "https://static.zara.net/assets/public/790f/a72a/314f4371b8c2/96e7c1f4fee4/05575420427-a1/05575420427-a1.jpg?ts=1737388032427&w=1024" },
      { name: "BLAZERS", img: "https://imagescdn.peterengland.com/img/app/product/6/662943-14534432.jpg?auto=format&w=390" },
      { name: "ETHNIC WEAR", img: "https://manyavar.scene7.com/is/image/manyavar/I03_ML12054-328_04-04-2022-20-33:650x900?&dpr=on,2" },
      { name: "ACCESSORIES", img: "https://bsmedia.business-standard.com/_media/bs/img/article/2021-11/05/full/1636094253-2135.jpg?im=FeatureCrop,size=(826,465)" },
      { name: "FOOTWEAR", img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/378820bf-d936-411c-950b-b80e1033c454/NIKE+QUEST+6.png" },
      { name: "HOME", img: "https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg" },
    ],
    KIDS: [
      { name: "FROCKS", img: "https://www.anantexports.in/cdn/shop/files/IMG-20240526-WA0102_1080x.jpg?v=1716707942" },
      { name: "TWIN SETS", img: "https://www.bownbee.com/cdn/shop/files/website_723_735_shop_the_look_1.jpg?v=1725884297&width=2400" },
      { name: "TWIN SETS", img: "https://m.media-amazon.com/images/I/81eyEHAfyAL.jpg" },
      { name: "T SHIRTS", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMjNsvopP15t7fdGML8ynjHBglcBylM-pOJA&s" },
      { name: "SHIRTS", img: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18705267a.webp" },
      { name: "BOTTOM", img: "https://peekaabookids.com/cdn/shop/files/0Z4A4373.png?v=1737629822&width=533" },
      { name: "TOPS", img: "https://ramrajcotton.in/cdn/shop/files/04_c4f3c79f-a6e0-4509-912f-a02d86722c15.jpg?v=1696241470" },
      { name: "SHOES", img: "https://cdn.fcglcdn.com/brainbees/images/products/583x720/18135010a.webp" },
      { name: "HOME", img: "https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg" },
      { name: "WINTER WEAR", img: "https://www.textileinfomedia.com/img/dpqx/casual-boys-kids-wear-jeans-and-t-shirt-full.jpg" },
     
    ],
  };

  return (
    <>
    
      <Stack
        w={useBreakpointValue({ base: "99%", lg: "60%" })}
        margin="auto"
        fontSize={"14px"}
        direction={"row"}
      >
        <Text
          _hover={{ cursor: "pointer" }}
          textDecoration={selectedCategory === "WOMEN" ? "underline" : "none"}
          textDecorationColor={"green"}
          onClick={() => setSelectedCategory("WOMEN")}
        >
          WOMEN
        </Text>
        <Text
          _hover={{ cursor: "pointer" }}
          opacity={selectedCategory === "MEN" ? "100%" : "50%"}
          pl={"15px"}
          onClick={() => setSelectedCategory("MEN")}
        >
          MEN
        </Text>
        <Text
          _hover={{ cursor: "pointer" }}
          opacity={selectedCategory === "KIDS" ? "100%" : "50%"}
          pl={"15px"}
          onClick={() => setSelectedCategory("KIDS")}
        >
          KIDS
        </Text>
      </Stack>

      {/* MyFeed Section */}
      <Stack
        pl={"20px"}
        direction={"row"}
        w={useBreakpointValue({ base: "99%", lg: "60%" })}
        m={"auto"}
      >
        <Stack align={"center"}>
          <Avatar
            border={"2px solid #c4dd91"}
            p={"2px"}
            size="lg"
            name="MY"
            src="https://cdn.pixabay.com/photo/2021/02/17/17/06/icon-6024873_960_720.png"
          />
          <Text fontWeight={"500"} fontSize={"10px"}>
            MY FEED
          </Text>
        </Stack>

        {/* Separator */}
        <div
          style={{
            backgroundColor: "black",
            width: "1px",
            height: "40px",
            opacity: "20%",
            marginTop: "30px",
            marginRight: "15px",
            marginLeft: "15px",
          }}
        ></div>

       
        <Stack
          overflow={useBreakpointValue({ base: "scroll", lg: "visible" })}
          gap={"19px"}
          align={"flex-end"}
          direction={"row"}
        >
          {categories[selectedCategory].map((item, index) => (
            <Stack key={index} _hover={{ cursor: "pointer" }} align={"center"}>
              <Avatar size="md" name={item.name} src={item.img} />
              <Text fontWeight={"500"} fontSize={"9.5px"}>
                {item.name}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
};

export default MyFeedHomepage;
