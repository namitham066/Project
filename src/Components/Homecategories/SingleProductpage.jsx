import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Box, Image, Button, Text, VStack, HStack, SimpleGrid, Divider, Flex } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SingleProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        const jsonData = await response.json();

        let selectedProduct = null;
        let similarItems = [];

        jsonData.forEach((category) => {
          category.subcategories.forEach((sub) => {
            const foundProduct = sub.products.find(
              (prod) => String(prod._id) === String(id)
            );
            if (foundProduct) {
              selectedProduct = foundProduct;
              console.log("🚀 ~ category.subcategories.forEach ~ selectedProduct:", selectedProduct)

              // Find Similar Products based on Category and Subcategory
              similarItems = sub.products.filter(
                (item) => item._id !== foundProduct._id && item.category === foundProduct.category
              );
            }
          });
        });

        setProduct(selectedProduct || null);
        setSimilarProducts(similarItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Text textAlign="center">Loading...</Text>;
  if (!product) return <Text textAlign="center">Product not found</Text>;

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "customer") {
        alert("Login as a customer to add products to the cart.");
        return;
    }

    if (!selectedSize) {
        alert("Please select a size before adding to the cart!");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/cart/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            body: JSON.stringify({ productId: product._id, quantity: 1, size: selectedSize, image: product.img, price: product.price, name: product.name }),
        });

        const data = await res.json();
        alert(data.message);
    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add product to cart. Please try again.");
    }
};


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Box p="20px">
      {/* Product Details */}
      <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap="40px">
        {/* Product Image Carousel */}
        <Box width={{ base: "100%", md: "60%" }}>
          <Slider {...settings}>
            {[product.img, product.img, product.img].map((img, index) => (
              <Box key={index} p="10px">
                <Image src={img} alt={`Product ${index}`} borderRadius="10px" />
              </Box>
            ))}
          </Slider>

          {/* Similar Products Section Below the Carousel */}
          <Box mt="40px">
            <Text fontSize="22px" fontWeight="bold" mb="10px">
              Similar Products
            </Text>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing="15px">
              {similarProducts.length > 0 ? (
                similarProducts.map((item) => (
                  <Link to={`/product/${item._id}`} key={item._id}>
                    <Box
                      p="10px"
                      bg="white"
                      border="1px solid #ccc"
                      borderRadius="8px"
                      cursor="pointer"
                      _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        borderRadius="8px"
                        width="100%"
                        height="250px"
                        objectFit="cover"
                      />
                      <Text fontWeight="bold" mt="8px">{item.name}</Text>
                      <Text color="green.600">
                        ₹{item.price}
                      </Text>
                    </Box>
                  </Link>
                ))
              ) : (
                <Text fontSize="18px" color="red.500">
                  No similar products found.
                </Text>
              )}
            </SimpleGrid>
          </Box>
        </Box>

        {/* Product Info Section */}
        <VStack align="start" spacing="10px" width={{ base: "100%", md: "40%" }}>
          <Text fontSize="24px" fontWeight="bold">{product.name}</Text>
          <Text fontSize="20px" color="green.500">₹{product.price}</Text>

          {product.sizes && product.sizes.length > 0 && (
            <HStack>
              <Text fontWeight="bold">Select Size:</Text>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "solid" : "outline"}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </Button>
              ))}
            </HStack>
          )}



            <HStack>
              <Text fontWeight="bold">Available quantity</Text>
              <Text>{product.quantity}</Text>
            </HStack>

          <Button
            bg="lightgreen"
            color="white"
            _hover={{ bg: "green.400" }}
            size="lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

         

          {/* Delivery & Return Section */}
          <Box mt="20px" width="100%">
            <Text fontSize="18px" fontWeight="bold">DELIVERY & RETURN</Text>
            <Text fontSize="14px">Expected delivery in 3 to 6 days</Text>
            <Text fontSize="14px" color="gray.600">
              <b>Metros:</b> 3-5 working days <br />
              <b>Other cities:</b> 5-7 working days <br />
              <b>Remote areas:</b> 15 working days <br />
              <b>7 days, no hassle returns! </b> <Link to="#">details...</Link>
            </Text>
          </Box>

          <Divider my="20px" />

          {/* Care Instructions */}
          <Box width="100%">
            <Text fontSize="18px" fontWeight="bold">Care</Text>
            <Text fontSize="14px" color="gray.600">Dry Clean</Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default SingleProductPage;
