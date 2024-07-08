import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Users = () => {
  return (
    <>
      <Layout>
        <section>
          <div className="row">
            <div className="col-md-3">
              <AdminMenu></AdminMenu>
            </div>
            <div className="col-md-9">
              <h1>All Users</h1>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Users;
