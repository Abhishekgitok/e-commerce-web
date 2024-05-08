import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;


const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxprice, setMaxprice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Get all  categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://e-commerce-api-three-gules.vercel.app/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function and create product Form submission
  const handleCreate = async (e) => {
    e.preventDefault();
    try {

      // Add form validation here if needed
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("maxprice", maxprice);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "https://e-commerce-api-three-gules.vercel.app/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message); 
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3 admin">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <form onSubmit={handleCreate}>
              <div className="row">
                <div className="col-md-6">
                  <Select
                    variant="outlined"
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="mb-3 fw-bold"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="mb-3">
                    <label className="btn btn-outline-success col-md-12">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write a name"
                    className="form-control mb-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Write a description"
                    className="form-control mb-3"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                    type="number"
                    value={price}
                    placeholder="Write a price"
                    className="form-control mb-3"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <input
                    type="number"
                    value={maxprice}
                    placeholder="Write a maxprice"
                    className="form-control mb-3"
                    onChange={(e) => setMaxprice(e.target.value)}
                  />
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Write a quantity"
                    className="form-control mb-3"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Select
                    variant="outlined"
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className="mb-3 fw-bold"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>

                  <div className="row">
                <div className="col-md-12 text-center  ">
                  <button type="submit" className="btn btn-success">
                    CREATE PRODUCT
                  </button>
                </div>
               </div>
                </div>
               
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
