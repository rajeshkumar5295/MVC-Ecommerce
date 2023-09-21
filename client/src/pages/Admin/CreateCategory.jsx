import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { toast } from "react-toastify";

import { Button, Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  // all for Categoryform.jsx
  const [name, setName] = useState("");

  // for antd model   
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);

      console.log(res.data);
      
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  console.log(categories);

  // function for adding new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/category-route`,
        { name }
      );

      console.log(data);
      console.log(data.category);

      if (data?.success) {
        toast.success(`${data.category.name} is created  `);
        setName("");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //update category  for(modal)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      // console.log(data);
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // function for deleting item
  const handleDelete = async (pid) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
      );
      console.log(res);
      if (res.data.success) {
        toast.success(`Item is deleted successfully`);
        getAllCategories();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Layout title={"Dashboard-All Category"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>

            <div className="col-md-9">
              <h1> Manage Category </h1>

              <div className="p-3 w-72">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>

              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr key={c._id}>
                          <td> {c.name} </td>

                          <td>
                            <button
                              className="btn btn-primary ms-2 "
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger  ms-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
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
      </Layout>
    </div>
  );
};

export default CreateCategory;

{
  /* <th scope="row">1</th>
<td>Mark</td> */
}
