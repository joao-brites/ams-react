import {
  Container,
  Grid,
  LoadingOverlay,
  Alert,
  Group,
  Pagination
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const ITEMS_PER_PAGE = 12;

export const ProductList = () => {
  const { products, isLoading, error, totalPages, currentPage, setPage } =
    useProducts(ITEMS_PER_PAGE);

  if (error) {
    return (
      <Container size="sm" py="xl">
        <Alert icon={<IconAlertCircle />} title="Error" color="red">
          {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl" pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Grid>
        {products.map((product) => (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, lg: 4 }}>
            <ProductCard product={product} />
          </Grid.Col>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setPage}
            withEdges
          />
        </Group>
      )}
    </Container>
  );
};
