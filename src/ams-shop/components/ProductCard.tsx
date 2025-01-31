import { memo, useMemo, useCallback, useState, useRef, useEffect } from "react";
import { Card, Image, Text, Group, Button, Stack, Badge } from "@mantine/core";
import { Product } from "../types";
import { useCart } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo<ProductCardProps>(({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { addToCart, items } = useCart();

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const isOverflowing =
          textRef.current.scrollHeight > textRef.current.clientHeight;
        setIsTextTruncated(isOverflowing);
      }
    };

    checkTruncation();
    // Add resize listener to recheck on window resize
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [product.description]);

  const { isLowStock, cartItem, isMaxQuantityInCart, buttonText } =
    useMemo(() => {
      const isLowStock = product.stock < 5;
      const cartItem = items.find((item) => item.id === product.id);
      const isMaxQuantityInCart = cartItem?.quantity === product.stock;

      const buttonText =
        product.stock === 0
          ? "Out of Stock"
          : isMaxQuantityInCart
            ? "Max Quantity in Cart"
            : "Add to Cart";

      return { isLowStock, cartItem, isMaxQuantityInCart, buttonText };
    }, [product.stock, product.id, items]);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  return (
    <Card shadow="sm">
      <Card.Section>
        <Image
          src={product.thumbnail}
          height={200}
          alt={product.title}
          loading="lazy"
        />
      </Card.Section>

      <Stack gap="xs" mt="md">
        <Group justify="space-between" wrap="nowrap">
          <Text fw={500} lineClamp={1} style={{ flex: 1 }}>
            {product.title}
          </Text>
          <Text fw={500} c="blue">
            ${product.price.toFixed(2)}
          </Text>
        </Group>

        <Stack gap="xs">
          <Text
            ref={textRef}
            size="sm"
            c="dimmed"
            style={{
              maxHeight: isExpanded ? "none" : "3em",
              overflow: "hidden",
              transition: "max-height 0.3s ease-out"
            }}
          >
            {product.description}
          </Text>
          {isTextTruncated && (
            <Button
              variant="subtle"
              size="xs"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ width: "fit-content" }}
            >
              {isExpanded ? "Show less ▲" : "Show more ▼"}
            </Button>
          )}
        </Stack>

        <Group gap="xs">
          <Badge color={isLowStock ? "red" : "green"}>
            Stock: {product.stock}
          </Badge>
          <Badge>{product.category}</Badge>
          {cartItem && <Badge color="blue">In Cart: {cartItem.quantity}</Badge>}
        </Group>

        <Button
          fullWidth
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isMaxQuantityInCart}
          color={isLowStock ? "orange" : "blue"}
        >
          {buttonText}
        </Button>
      </Stack>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";
