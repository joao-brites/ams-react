import React from "react";
import { Card, Image, Text, Button, Group } from "@mantine/core";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  return (
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image src={product.thumbnail} height={160} alt={product.title} />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <Text fw={500}>{product.title}</Text>
        <Text>${product.price}</Text>
      </Group>

      <Text size="sm" c="dimmed" mt="sm" style={{ minHeight: 50 }}>
        {product.description}
      </Text>

      <Button fullWidth mt="md" onClick={() => onAddToCart(product)}>
        Add to Cart
      </Button>
    </Card>
  );
};
