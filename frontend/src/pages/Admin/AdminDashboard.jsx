import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Layout>
        <section>
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu></AdminMenu>
              </div>
              <div className="col-md-9"></div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default AdminDashboard;
