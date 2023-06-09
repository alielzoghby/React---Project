import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWishlist, deleteWishlistProduct } from "./wishlistSlice";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

import {
  MDBBadge,
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

import styles from "./stylee.module.css";
import Button from "../layout/btn/btn";

export default function App() {
  const dispatch = useDispatch();
  const { products, fetchStatus, error, totalProductsCount } = useSelector(
    (state) => state.wishlist
  );

  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  const deletItem = (id) => {
    dispatch(deleteWishlistProduct(id));
  };

  useEffect(() => {
    dispatch(fetchWishlist({ pageSize, page }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    // calculate the total number of pages
    const totalPages = Math.ceil(totalProductsCount / pageSize);

    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (fetchStatus === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.body}>
      <div
        className={`${styles.whichlistTitle} d-flex mb-5 flex-column align-items-center`}
      >
        <i className="fa-regular fa-xl fa-heart my-4"></i>
        <h1>My wishlist</h1>
      </div>

      <MDBContainer
        fluid
        className="text-black w-100 m-auto "
        style={{ borderRadius: "25px" }}
      >
        <MDBRow className="justify-content-center mb-0">
          <MDBCol md="12" xl="10">
            {fetchStatus === "loading" ? (
              <div style={{ height: "350px", display: "flex" }}>
                <Spinner style={{ margin: "auto" }} />
              </div>
            ) : fetchStatus === "succeeded" && products.length ? (
              <div className={`${styles.whishListTable}`}>
                {products.map((el, i) => (
                  <MDBCard
                    key={el.id}
                    className="shadow-0 border rounded-3 mb-3"
                  >
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol
                          md="12"
                          lg="3"
                          className="mb-4 mb-lg-0 d-flex align-items-center"
                        >
                          <MDBRipple
                            rippleColor="light"
                            rippleTag="div"
                            className="bg-image rounded hover-zoom hover-overlay"
                          >
                            <MDBCardImage
                              src={`https://res.cloudinary.com/ddk98mjzn/${
                                el.images.length && el.images[0].image
                              }`}
                              fluid
                              className=""
                              style={{ width: "300px", height: "160px" }}
                            />
                            <Link to={`/product/${el.id}`}>
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.15)",
                                }}
                              ></div>
                            </Link>
                          </MDBRipple>
                        </MDBCol>
                        <MDBCol
                          md="6"
                          className="d-flex justify-content-between flex-column"
                        >
                          <Link to={`/product/${el.id}`}>
                            <h5>{el.name}</h5>
                          </Link>
                          <span>Quantity {el.quantity}</span>

                          <div className="mt-1 mb-0 text-muted small">
                            <MDBBadge
                              pill
                              color={
                                el.quantity === 0
                                  ? "danger"
                                  : el.quantity < 11
                                  ? "warning"
                                  : "success"
                              }
                            >
                              {el.quantity === 0
                                ? "Out of Stock"
                                : el.quantity < 11
                                ? "limited"
                                : "InStock"}
                            </MDBBadge>
                          </div>
                          <p className=" mb-4 mb-md-0">{el.description}</p>
                        </MDBCol>
                        <MDBCol
                          md="6"
                          lg="3"
                          className="border-sm-start-none border-start"
                        >
                          <div className="d-flex flex-row align-items-center justify-content-between mb-1">
                            <h4 className="mb-1 me-1">${el.price}</h4>
                            {/* <span className="text-danger">
                              <s>$20.99</s>
                            </span> */}
                            <button>
                              <i
                                className="fa-solid fa-trash text-secondary"
                                onClick={() => deletItem(el.id)}
                              ></i>
                            </button>
                          </div>
                          <h6 className="text-success">Free shipping</h6>
                          <div className="d-flex flex-column mt-4 gap-2 w-100">
                            <Link to={`/product/${el.id}`} className="w-100">
                              <MDBBtn
                                outline
                                color="primary"
                                size="sm"
                                className="w-100"
                              >
                                Details
                              </MDBBtn>{" "}
                            </Link>
                            <Button el={el} />
                          </div>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                ))}
                <nav aria-label="..." className={`${styles.pagination}`}>
                  <MDBPagination center size="lg" className="mb-0">
                    {Array.from({ length: pagesQuantity }, (_, index) => (
                      <MDBPaginationItem
                        key={index}
                        active={index + 1 === page}
                      >
                        <MDBPaginationLink
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                          {index + 1 === page && (
                            <span className="visually-hidden">(current)</span>
                          )}
                        </MDBPaginationLink>
                      </MDBPaginationItem>
                    ))}
                  </MDBPagination>
                </nav>
              </div>
            ) : (
              <MDBCard>
                <div
                  className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
                >
                  <img
                    src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"}
                    alt="empty-state-cart"
                  />
                  <h3>Your Wishlist looks empty</h3>
                  <span className="text-muted">What are you waiting for?</span>
                  <Link
                    to="/home"
                    className={`{styles.color} btn btn-primary my-3`}
                  >
                    START CHOPING
                  </Link>
                </div>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
