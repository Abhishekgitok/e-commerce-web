import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import {  useNavigate } from "react-router-dom";





const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`https://e-commerce-api-three-gules.vercel.app/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="d-flex gap-4">
                   <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-IN", {
                       style: "currency",
                       currency: "INR"  
                       })}

                    </h5>
                    <h5 className="card-title card-price text-decoration-line-through fs-5">
                    {p.maxprice.toLocaleString("en-IN", {
                       style: "currency",
                       currency: "INR"  
                       })}

                    </h5>
                   </div>
                  
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;