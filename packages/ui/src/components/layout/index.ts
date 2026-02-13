/**
 * Layout Components
 *
 * A comprehensive layout component system that mimics Material-UI's Grid system
 * but follows shadcn/ui coding patterns and uses Tailwind CSS.
 *
 * @example
 * import { Grid, Container, Stack, Flex, Box } from "@repo/ui/components/layout"
 *
 * // Grid layout
 * <Grid container spacing={4}>
 *   <Grid item xs={12} md={6}>Left column</Grid>
 *   <Grid item xs={12} md={6}>Right column</Grid>
 * </Grid>
 *
 * // Stack layout
 * <Stack spacing={4}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Stack>
 *
 * // Container
 * <Container maxWidth="lg">
 *   <Content />
 * </Container>
 */

export {
  Grid,
  gridContainerVariants,
  gridItemVariants,
  type GridProps,
  type GridContainerProps,
  type GridItemProps,
  type ColumnSpan,
  type Spacing,
} from "./grid.js"

export {
  Container,
  containerVariants,
  type ContainerProps,
} from "./container.js"

export {
  Stack,
  HStack,
  VStack,
  stackVariants,
  type StackProps,
} from "./stack.js"

export {
  Flex,
  FlexItem,
  flexVariants,
  type FlexProps,
  type FlexItemProps,
} from "./flex.js"

export {
  Box,
  boxVariants,
  type BoxProps,
} from "./box.js"
