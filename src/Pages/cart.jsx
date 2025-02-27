import React from "react";
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
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const totalPrice = cart.reduce((total, item) => {
    console.log("Original Price String:", item.price); 

    let price = item.price;

    if (typeof price === "string") {
        
        price = price?.replace(/[^0-9]/g, ""); 
    }

    price = parseInt(price, 10); 

    console.log("Parsed Price:", price);

    const quantity = isNaN(Number(item.quantity)) ? 0 : Number(item.quantity);
    console.log("Quantity:", quantity);

    return total + price * quantity;
}, 0);

const roundedTotalPrice = Math.round(totalPrice);

  const shippingCharges = 50; 
  const handlingCharges = 30; 
  const amountPayable = roundedTotalPrice + shippingCharges + handlingCharges;

  return (
    <Flex p="20px" direction={{ base: "column", md: "row" }}>
      
      <Box flex="2" p="20px">
        <Text fontSize="24px" fontWeight="bold">
          Shopping Cart
        </Text>

        {cart.length === 0 ? (
          <Text textAlign="center" mt="20px">
            Your cart is empty.
          </Text>
        ) : (
          cart.map((item) => (
            <HStack
              key={item.id}
              spacing="20px"
              p="15px"
              borderBottom="1px solid gray"
              alignItems="center"
            >
              
              <Link to={`/product/${item.id}`}>
                <Image
                  src={item.img}
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
                  ₹{item.price?.replace(/[^0-9.-]+/g, "")}
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

    
      {cart.length > 0 && (
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
                ₹{amountPayable}
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
