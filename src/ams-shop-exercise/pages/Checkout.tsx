import React from "react";
import { Container, Table, Text, Stack } from "@mantine/core";
import { useCart } from "../context/CartContext";

export const Checkout = () => {
  const { items } = useCart();

  return (
    <Container size="sm" py="xl">
      <Stack>
        <Text size="xl" fw={700}>
          Checkout
        </Text>
        <Table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Product</th>
              <th style={{ textAlign: "right" }}>Quantity</th>
              <th style={{ textAlign: "right" }}>Price</th>
              <th style={{ textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "left" }}>{item.title}</td>
                <td style={{ textAlign: "right" }}>{item.quantity}</td>
                <td style={{ textAlign: "right" }}>${item.price}</td>
                <td style={{ textAlign: "right" }}>
                  ${item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Text size="xl" fw={700} ta="right">
          Total: $
          {items
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </Text>
      </Stack>
    </Container>
  );
};
