import React, { useState } from "react"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from "../components/UI/CommonSection"
import { Container, Col, Row } from "reactstrap"
import "../styles/shop.css"
import ProductsList from "../components/UI/ProductsList"
import products from "../assets/data/products"
export default function Shop() {
  const [productsData, setProductsData] = useState(products)
  const handleFilter = e => {
    const filterValue = e.target.value
    if (filterValue === "sofa") {
      const filterProducts = products.filter(item => item.category === "sofa")
      setProductsData(filterProducts)
    }
    if (filterValue === "mobile") {
      const filterProducts = products.filter(item => item.category === "mobile")
      setProductsData(filterProducts)
    }
    if (filterValue === "watch") {
      const filterProducts = products.filter(item => item.category === "watch")
      setProductsData(filterProducts)
    }
    if (filterValue === "chair") {
      const filterProducts = products.filter(item => item.category === "chair")
      setProductsData(filterProducts)
    }
    if (filterValue === "wireless") {
      const filterProducts = products.filter(item => item.category === "wireless")
      setProductsData(filterProducts)
    }
  }

  const handleSearch = e => {
    const searchTerm = e.target.value
    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductsData(searchedProducts)
  }
  const handleSort = e => {
    const filterValue = e.target.value
    if (filterValue === "ascending") {
      const filterProducts = products.filter(item => item.price > 300)
      setProductsData(filterProducts)
    }
    if (filterValue === "descending") {
      const filterProducts = products.filter(item => item.price <= 300)
      setProductsData(filterProducts)
    }
  }
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row className="row__section">
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select name="" className="select__opt" onChange={handleFilter}>
                  <option>Filter by Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleSort}>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input type="text" placeholder="Search ......" onChange={handleSearch} />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>{productsData.length === 0 ? <h1 className="text-center fs-4">no data products</h1> : <ProductsList data={productsData} />}</Row>
        </Container>
      </section>
    </Helmet>
  )
}
