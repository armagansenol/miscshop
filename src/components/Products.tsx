import { Button, CircularProgress, Container } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { apiClient } from "httpClient"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useRecoilState, useRecoilValue } from "recoil"
import { columnState } from "recoil/atom/columnsAtom"
import { errorState } from "recoil/atom/errorAtom"
import { itemsPerPageState } from "recoil/atom/itemsPerPage"
import { limitState } from "recoil/atom/limitAtom"
import ProductCard from "./ProductCard"

interface IProduct {
  id: string
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

const Products = () => {
  const columns = useRecoilValue(columnState)
  const [errorData, setErrorData] = useRecoilState(errorState)
  const [limit, setLimit] = useRecoilState(limitState)

  const items = useRecoilValue(itemsPerPageState)
  const totalProducts = 20

  const fetchProducts = async () => {
    const response = await apiClient.get<IProduct[]>(`/products?limit=${limit}`)
    return response.data
  }

  const { data, isLoading, isError, error } = useQuery<IProduct[], Error>(["fetchData", limit], fetchProducts)

  useEffect(() => {
    if (isError) {
      setErrorData((prev) => ({ ...prev, status: true, text: `An error has occured! - ${error.message}` }))
    }
  }, [isError])

  useEffect(() => {
    setLimit(items)
  }, [items])

  const handleSeeMore = () => {
    if (limit < totalProducts) {
      setLimit((prev) => Math.min(prev + items, 20))
    }
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5vw",
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: `repeat(${columns},1fr)` },
              columnGap: 3,
              rowGap: 4,
            }}
          >
            {data &&
              data.map((product, i) => {
                return (
                  <Grid item key={product.id}>
                    <ProductCard product={product}></ProductCard>
                  </Grid>
                )
              })}
          </Grid>
        )}
      </Box>
      <Button
        sx={{
          fontSize: "24px",
          marginY: 5,
          background: "#FFF",
          border: "1px solid #282828",
          boxShadow: "none",
          borderRadius: "32px",
          color: "#282828",
          padding: "0.25rem 2rem",
          opacity: limit >= totalProducts ? "0.3" : "1",
          pointerEvents: limit >= totalProducts ? "none" : "auto",
          ":hover": {
            bgcolor: "#EFFFFD",
            boxShadow: "none",
          },
        }}
        variant="contained"
        onClick={handleSeeMore}
      >
        SEE MORE
      </Button>
    </Container>
  )
}

export default Products
