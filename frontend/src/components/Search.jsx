import Layout from "./Layout/Layout";
import { useSearch } from "../context/Search";
const Search = () => {
  const [value, setValue] = useSearch();
  return (
    <>
      <Layout>
        <div className="container">
          <div className="text-center">
            <h1>Search Result</h1>
            <h6>
              {value?.result.length < 1
                ? "No Products Found"
                : `Found ${value?.result?.length}`}
            </h6>
            <div className="d-flex flex-wrap mt-4">
              {value?.result.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "16.65rem" }}
                >
                  <img
                    src={`http://localhost:4000/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-primary">See more</button>
                    <button className="btn btn-secondary ms-2">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Search;
