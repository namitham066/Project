import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../redux/cartSlice";
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  // const cart = useSelector((state) => state.cart.cartItems);
  // let totalPrice, roundedTotalPrice, shippingCharges, handlingCharges, amountPayable, quantity;
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [roundedTotalPrice, setRoundedTotalPrice] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [handlingCharges, setHandlingCharges] = useState(0);
  const [amountPayable, setAmountPayable] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    fetchCart();

  }, []);

  let fetchCart = async () => {
    try {

      const response = await fetch("http://localhost:5000/api/cart/get-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({}),
      });

      const jsonData = await response.json();
      setCart(jsonData.cart.products);

      console.log("Cart Data:::::", cart);

      let total_price = cart.reduce((total, item) => {
        console.log("Original Price String:", item.price);

        let price = item.price;

        if (typeof price === "string") {
          price = price?.replace(/[^0-9]/g, "");
        }

        price = parseInt(price, 10);

        console.log("Parsed Price:", price);

        let quantity_ = isNaN(Number(item.quantity)) ? 0 : Number(item.quantity);
        console.log("Quantity:", quantity_);

        return total + price * quantity_;
      }, 0);
      console.log("🚀 ~ totalPrice=cart.reduce ~ totalPrice:", total_price)

      let roundedTotal_Price = Math.round(total_price);

      let shipping_Charges = 50;
      let handling_Charges = 30;
      let amount_Payable = roundedTotal_Price + shipping_Charges + handling_Charges;
      console.log("🚀 ~ fetchCart ~ amountPayable:", amount_Payable)

      setAmountPayable(amount_Payable);
      setTotalPrice(total_price);
      setRoundedTotalPrice(roundedTotal_Price);
      setShippingCharges(shipping_Charges);
      setHandlingCharges(handling_Charges);

    }
    catch (error) {
      console.error("Error fetching cart:", error);
    }

  };


  return (
    <Flex p="20px" direction={{ base: "column", md: "row" }}>

      <Box flex="2" p="20px">
        <Text fontSize="24px" fontWeight="bold">
          Shopping Cart
        </Text>

        {cart?.length === 0 ? (
          <Text textAlign="center" mt="20px">
            Your cart is empty.
          </Text>
        ) : (
          cart?.map((item) => (
            <HStack
              key={item._id}
              spacing="20px"
              p="15px"
              borderBottom="1px solid gray"
              alignItems="center"
            >

              <Link to={`/product/${item._id}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width="100px"
                  borderRadius="8px"
                  cursor="pointer"
                />
              </Link>

              {/* Product Details */}
              <VStack align="start" spacing="5px" flex="1">
                <Text fontSize="18px">{item.name}</Text>
                <Text fontSize="16px" color="green.500">
                  ₹{item.price}
                </Text>
                <Text>Size: {item.size}</Text>

                {/* Quantity Control */}
                <HStack>
                  <Button
                    size="xs"
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(updateQuantity({ id: item.id, actionType: "decrease" }));
                      } else {
                        dispatch(removeItem(item.id)); // Remove item if quantity is 1
                      }
                    }}
                  >
                    -
                  </Button>

                  <Text>{item.quantity}</Text>
                  <Button
                    size="xs"
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, actionType: "increase" }))
                    }
                  >
                    +
                  </Button>
                </HStack>

                {/* Buttons - Remove & Buy Now */}
                <HStack>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </Button>
                  <Button size="sm" colorScheme="blue" onClick={() => navigate("/payment")}>
                    Buy Now
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          ))
        )}
      </Box>


      {cart?.length > 0 && (
        <Box flex="1" p="20px" borderLeft="1px solid gray">
          <Text fontSize="22px" fontWeight="bold">
            SUMMARY
          </Text>

          <VStack align="start" mt="10px">
            <HStack w="full" justifyContent="space-between">
              <Text>Total Price:</Text>
              <Text fontWeight="bold">₹{roundedTotalPrice}</Text>
            </HStack>


            <HStack w="full" justifyContent="space-between">
              <Text>Shipping Charges:</Text>
              <Text fontWeight="bold">₹{shippingCharges}</Text>
            </HStack>


            <HStack w="full" justifyContent="space-between">
              <Text>Handling Charges:</Text>
              <Text fontWeight="bold">₹{handlingCharges}</Text>
            </HStack>

            <Divider />

            {/* Amount Payable */}
            <HStack w="full" justifyContent="space-between">
              <Text fontWeight="bold">Amount Payable:</Text>
              <Text fontSize="20px" fontWeight="bold">
                ₹{amountPayable?.toString()}
              </Text>
            </HStack>

            <Button mt="10px" colorScheme="pink" w="full" size="lg" onClick={() => navigate("/payment")}>
              BUY NOW
            </Button>
          </VStack>
        </Box>
      )}
    </Flex>
  );
};

export default CartPage;
