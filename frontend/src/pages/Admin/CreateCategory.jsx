import { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [auth] = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://e-backend-uqky.onrender.com/api/v1/category/create-category",
        { name },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data?.success) {
        toast.success(`${data.category.name} is created`);
        getAllCategories();
        setName(""); // Clear input field after successful creation
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://e-backend-uqky.onrender.com/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://e-backend-uqky.onrender.com/api/v1/category/update-category/${selected._id}`,
        { name: updateName },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };
  // Handle Delete  category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `https://e-backend-uqky.onrender.com/api/v1/category/delete-catergory/${pid}`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      if (data.success) {
        toast.success(`  delete successfully`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting category");
    }
  };

  return (
    <Layout>
      <section>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
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
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdateName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
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
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={setUpdateName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </section>
    </Layout>
  );
};

export default CreateCategory;
