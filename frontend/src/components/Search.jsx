import Layout from "./Layout/Layout";
import { useSearch } from "../context/Search";
const Search = () => {
  const [value, setValue] = useSearch();
  const API_URL = import.meta.env.VITE_API_URL;
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
            <div className="d-flex flex-wrap justify-content-center gap-3 m-2">
              {value?.result.map((p) => (
                <div key={p._id}>
                  <div
                    key={p._id}
                    className="card h-100"
                    style={{ width: "16.65rem" }}
                  >
                    <img
                      src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top product-img"
                      alt={p.name}
                    />
                    <div className="card-body p-2">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text small text-muted">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">${p.price}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          See more
                        </button>

                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
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
