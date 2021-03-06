import React, { useState, useEffect } from "react";
import "../App.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink } from "react-router-dom";
const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };
  const clickedButton = (event) => {
    // event.currentTarget.parentNode.children.classList.remove("clicked");
    event.currentTarget.classList.add("button");
  };
  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4 w-100">
                <div
                  className="card bg-light h-100 text-center p-4 "
                  key={product.id}
                >
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt={product.title}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}. . .
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
        <div className="buttons d-flex justify-content-center my-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={(event) => {
              clickedButton(event);
              setFilter(data);
            }}
          >
            All
          </button>
          <button
            className="btnn btn-outline-dark me-2"
            onClick={(event) => {
              clickedButton(event);
              filterProduct("men's clothing")
            }}
          >
            Men's Clothing
          </button>
          <button
            className="btnn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btnn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btnn btn-outline-dark me-2"
            onClick={() => filterProduct("elecrtonics")}
          >
            Elecrtonics
          </button>
        </div>
            <h1 className="display-6 fw-bolder text-center mb-5">Letest Products</h1>
      <div className="products">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
