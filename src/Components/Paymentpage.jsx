import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Divider,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItems);

  
  const totalPrice = cart.reduce((total, item) => {
    let price = item.price?.replace(/[^0-9]/g, ""); 
    return total + parseInt(price, 10) * item.quantity;
  }, 0);

  const shippingCharges = 50;
  const handlingCharges = 30;
  const amountPayable = totalPrice + shippingCharges + handlingCharges;

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("COD");

  return (
    <Flex p="20px" direction={{ base: "column", md: "row" }}>
      
      {/* Left Side - Shipping Address & Cart Items */}
      <Box flex="2" p="20px">
        <Text fontSize="22px" fontWeight="bold" mb="10px">
          Please Fill Address For Shipping
        </Text>

        {/* Address Form */}
        <VStack spacing="10px" align="start" mb="20px">
          <HStack>
            <Input placeholder="Pincode *" />
            <Input placeholder="Mobile Number *" />
          </HStack>
          <Input placeholder="Full Name *" />
          <Input placeholder="Locality / Area *" />
          <Input placeholder="Flat / House No. / Building Name *" />
          <Input placeholder="Building / Street / Landmark *" />
          <HStack>
            <Input placeholder="City *" />
            <Input placeholder="State *" />
          </HStack>

          <Text fontSize="16px">Address Type</Text>
          <RadioGroup defaultValue="home">
            <HStack>
              <Radio value="home">Home</Radio>
              <Radio value="office">Office</Radio>
            </HStack>
          </RadioGroup>
        </VStack>

        {/* Cart Items */}
        <Text fontSize="20px" fontWeight="bold">
          Cart Items ({cart.length})
        </Text>
        {cart.map((item) => (
          <HStack key={item.id} p="10px" borderBottom="1px solid gray">
            <Image src={item.img} alt={item.name} width="80px" borderRadius="8px" />
            <VStack align="start" spacing="2px">
              <Text fontSize="16px">{item.name}</Text>
              <Text fontSize="14px">Quantity: {item.quantity}</Text>
              <Text fontSize="14px">Size: {item.size}</Text>
            </VStack>
          </HStack>
        ))}
      </Box>

      {/* Right Side - Payment & Summary */}
      <Box flex="1" p="20px" borderLeft="1px solid gray">
        <Text fontSize="22px" fontWeight="bold">
          Payment Mode
        </Text>

        {/* Payment Modes */}
        <VStack align="start" mt="10px">
          <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
            <Stack direction="column">
              <Radio value="COD">Cash On Delivery</Radio>
              <Radio value="DebitCard">ATM / Debit Card</Radio>
              <Radio value="CreditCard">Credit Card</Radio>
              <Radio value="NetBanking">Net Banking</Radio>
              <Radio value="Wallets">Wallets</Radio>
            </Stack>
          </RadioGroup>
        </VStack>

        <Divider my="10px" />

        {/* Order Summary */}
        <Text fontSize="20px" fontWeight="bold">
          Order Details
        </Text>
        <HStack w="full" justifyContent="space-between">
          <Text>Total Price:</Text>
          <Text fontWeight="bold">₹{totalPrice}</Text>
        </HStack>
        <HStack w="full" justifyContent="space-between">
          <Text>Shipping Charges:</Text>
          <Text fontWeight="bold">₹{shippingCharges}</Text>
        </HStack>
        <HStack w="full" justifyContent="space-between">
          <Text>Handling Charges:</Text>
          <Text fontWeight="bold">₹{handlingCharges}</Text>
        </HStack>

        <Divider my="10px" />

        <HStack w="full" justifyContent="space-between">
          <Text fontWeight="bold" color="red.500">
            Amount Payable:
          </Text>
          <Text fontSize="22px" fontWeight="bold" color="red.500">
            ₹{amountPayable}
          </Text>
        </HStack>

        {/* Confirm Order Button */}
        <Button
          mt="10px"
          colorScheme="green"
          w="full"
          size="lg"
          onClick={() => alert("Order Confirmed!")}
        >
          Confirm Order ₹{amountPayable}
        </Button>
      </Box>
    </Flex>
  );
};

export default PaymentPage;
