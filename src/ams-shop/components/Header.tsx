import { Container, Group, Text, Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export const Header = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Container h="100%" px="md">
      <Group h="100%" justify="space-between">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text size="xl" fw={700} c="blue">
            AMS SHOP
          </Text>
        </Link>

        <Group gap="md">
          <Button
            variant="light"
            color="gray"
            onClick={clearCart}
            disabled={totalItems === 0}
          >
            Clear Cart
          </Button>

          <Button
            leftSection={<IconShoppingCart size={20} />}
            onClick={() => navigate("/checkout")}
          >
            Cart ({totalItems})
          </Button>
        </Group>
      </Group>
    </Container>
  );
};
