import React, { useEffect, useState } from "react";
import { Grid, Container } from "@mantine/core";
import { ProductCard } from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import { Product } from "../types";
import { useCart } from "../context/CartContext";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <Container size="lg" py="xl">
      <Grid>
        {products.map((product) => (
          <Grid.Col
            key={product.id}
            span={{
              xs: 12,
              sm: 12,
              md: 6,
              lg: 6
            }}
          >
            <ProductCard product={product} onAddToCart={addToCart} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
