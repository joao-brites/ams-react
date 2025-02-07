import { Container, Table, Text, Stack, Group, Button } from "@mantine/core";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../components/CartItem";

export const Checkout = () => {
  const { items, getTotal } = useCart();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="md">
          <Text size="xl">Your cart is empty</Text>
          <Button component="a" href="/">
            Continue Shopping
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Stack gap="lg">
        <Text size="xl" fw={700}>
          Checkout
        </Text>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Table.Tbody>
        </Table>

        <Group justify="space-between">
          <Text size="xl" fw={700}>
            Total: ${total.toFixed(2)}
          </Text>
          <Button size="lg">Proceed to Payment</Button>
        </Group>
      </Stack>
    </Container>
  );
};
