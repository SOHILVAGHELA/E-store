import Layout from "../../components/Layout/Layout";
import UserManu from "../../components/Layout/UserMenu";
const Orders = () => {
  return (
    <>
      <Layout>
        <section>
          <div className="row">
            <div className="col-md-3">
              <UserManu></UserManu>
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h1>All Orders</h1>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Orders;
