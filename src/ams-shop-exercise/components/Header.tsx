import React from "react";
import { Group, Text, Button, Container } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Header = () => {
  const { getTotalItems, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <Container size="lg" h="100%" px="md">
      <Group h="100%" justify="space-between">
        <Text
          size="xl"
          fw={700}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          AMS SHOP
        </Text>
        <Group ml="auto">
          <Button variant="subtle" onClick={() => clearCart()}>
            Clear Cart
          </Button>
          <Button
            leftSection={<IconShoppingCart />}
            onClick={() => navigate("/checkout")}
          >
            Cart ({getTotalItems()})
          </Button>
        </Group>
      </Group>
    </Container>
  );
};
