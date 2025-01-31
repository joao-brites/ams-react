import { memo } from "react";
import { Group, Button, Text, Badge } from "@mantine/core";
import { CartItem as CartItemType } from "../types";
import { useCart } from "../hooks/useCart";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = memo<CartItemProps>(({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const isLowStock = item.stock < 5;

  return (
    <tr>
      <td>
        <Group gap="sm">
          <Text fw={500}>{item.title}</Text>
          {isLowStock && <Badge color="red">Low Stock</Badge>}
        </Group>
      </td>
      <td>
        <Group gap="xs">
          <Button
            size="xs"
            variant="subtle"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          <Text>{item.quantity}</Text>
          <Button
            size="xs"
            variant="subtle"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.stock}
          >
            +
          </Button>
        </Group>
      </td>
      <td>${item.price.toFixed(2)}</td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <Button
          variant="subtle"
          color="red"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
});

CartItem.displayName = "CartItem";
