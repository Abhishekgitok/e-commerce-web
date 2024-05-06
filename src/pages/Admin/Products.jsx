import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./Products.css"; // Import CSS for styling

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-api-hu0x.onrender.com/api/v1/product/get-product");
      setProducts(data.products);
   
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row mt-3 ">
        <div className="col-md-3">
          <div className="admin-menu">
            <AdminMenu />
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="product-list">
            {products.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                <div className="product-card">
                  <img
                    src={`https://e-commerce-api-hu0x.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <div className="d-flex gap-4">
                    <p className="card-text fs-5">₹ {p.price}</p>
                    <p className="card-text text-decoration-line-through">₹ {p.maxprice}</p>
                    </div>
                    
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
