import React, { useEffect } from "react";
import { useRouter } from 'next/router'

import { Form } from "react-bootstrap";
import ProductList from "./ProductList";
import { GetCategoryList, getBrandList, handleChangeCategoryFilter } from "../../../../store/redux/products/actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import Rater from "react-rater";

const MultipleProducts = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const category = useSelector((state) => state.product.category);
  const brands = useSelector((state) => state.product.brands);
  const filterProduct = useSelector((state) => state.product.filterProduct);
  const ratingsArray = [5, 4, 3, 2, 1];

  useEffect(() => {
    dispatch(GetCategoryList())
    dispatch(getBrandList())
  }, []);

  const handleChangeProductFilter = (name, value, e) => {
    dispatch(handleChangeCategoryFilter(name, value));
    console.log('filterProduct', filterProduct);

    let push_data = "?"
    const { category, brand, min_price, max_price } = filterProduct;

    if (name === 'category' && value !== null) {
      push_data += `category=${value.id}`;
    }

    if (name === 'brand' && value !== null) {
      push_data += `brand=${value.id}`;
    }

    if (name === 'min_price') {
      push_data += `min_price=${value}`;
    }

    if (name === 'max_price') {
      push_data += `max_price=${value}`;
    }

    if (name === 'rating') {
      push_data += `rating=${value}`;
    }

    router.push({
      pathname: '/products',
      search: push_data
    })
  }
  return (
    <>
      <div className="HomeProduct bp">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-2">
              <div className="filterSideBar ml-3">
                <div className="sidebar-section">
                  <h6>Category</h6>
                  {
                    category && category.length > 0 && category.map((item, index) => (
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                          checked={(filterProduct.category !== null) ? (filterProduct.category.id === item.id) ? true : false : false}
                          type="checkbox" label={item.name}
                          name={item.name}
                          onChange={(e) => {
                            if (filterProduct.category !== null) {
                              if (filterProduct.category.id === item.id) {
                                handleChangeProductFilter("category", null, e)
                              } else {
                                handleChangeProductFilter("category", item, e)
                              }
                            } else {
                              handleChangeProductFilter("category", item, e)
                            }
                          }}
                        />
                      </Form.Group>

                    ))
                  }
                </div>

                <div className="sidebar-section">
                  <h6>Brand</h6>
                  {
                    brands && brands.length > 0 && brands.map((item, index) => (
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label={item.name}
                          name={item.name}
                          checked={(filterProduct.brand !== null) ? (filterProduct.brand.id === item.id) ? true : false : false}
                          onChange={(e) => {
                            if (filterProduct.brand !== null) {
                              if (filterProduct.brand.id === item.id) {
                                handleChangeProductFilter("brand", null, e)
                              } else {
                                handleChangeProductFilter("brand", item, e)
                              }
                            } else {
                              handleChangeProductFilter("brand", item, e)
                            }
                          }}
                        />
                      </Form.Group>

                    ))
                  }
                </div>

                <div className="sidebar-section">
                  <h6>Price</h6>
                  <div className="row">
                    <div className="col-6 m-0">
                      <input type="text" className="form-control sidebar-section-input" placeholder="Min"
                        onChange={(e) => handleChangeProductFilter('min_price', e.target.value)}
                      />
                    </div>
                    <div className="col-6 m-0">
                      <input type="text" className="form-control sidebar-section-input" placeholder="Max"
                        onChange={(e) => handleChangeProductFilter('max_price', e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <Link href="/">View More</Link> */}

                </div>

                {/* <div className="sidebar-section">
                  <h6>Type</h6>
                  <Form>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Richman" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Lubnan" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Cats eye" />
                    </Form.Group>
                  </Form>
                  <Link href="/">View More</Link>

                </div> */}

                <div className="sidebar-section">
                  <h6>Rating</h6>
                  <div>
                    <span key={-1} onClick={() => handleChangeProductFilter('rating', null)} >
                      All
                    </span>
                  </div>
                  {
                    ratingsArray.map(rating => (
                      <>
                        <span key={rating} onClick={() => handleChangeProductFilter('rating', rating)} >
                          <Rater total={5} rating={rating} interactive={false} />
                        </span>
                        <br />
                      </>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-10">
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultipleProducts;
