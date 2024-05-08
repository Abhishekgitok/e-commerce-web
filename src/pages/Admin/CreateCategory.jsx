import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false); // Changed from 'visible' to 'open'
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  // for create category 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://e-commerce-api-three-gules.vercel.app/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input field");
    }
  };

  // for get category 

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://e-commerce-api-three-gules.vercel.app/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // for update category 

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://e-commerce-api-three-gules.vercel.app/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false); // Changed from 'setVisible(false)' to 'setOpen(false)'
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for delete category 

     const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `https://e-commerce-api-three-gules.vercel.app/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };


  return (
    <Layout>
      <div className="container-fluid mt-3 admin">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="mb-4 fs-3">Create Category</h1>
            <div className="d-flex ">
              <div className="w-75">
                <div className="p-3 rounded w-50">
                  <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>
                <table className="table table-bordered mt-4">
                  <thead className="thead-dark text-center">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td className="d-flex gap-5 align-items-center justify-content-center">
                          <button
                            type="button"
                            className="btn btn-info px-4"
                            onClick={() => {
                              setOpen(true); // Changed from 'setVisible(true)' to 'setOpen(true)'
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger px-4"
                             onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setOpen(false)} // Changed from 'setVisible(false)' to 'setOpen(false)'
                footer={null}
                open={open} // Changed from 'visible' to 'open'
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
