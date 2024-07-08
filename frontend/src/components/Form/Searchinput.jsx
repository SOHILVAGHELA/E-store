import axios from "axios";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
const Searchinput = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/search/${value.keyword}`
      );
      setValue({ ...value, result: data });
      navigate("/search"); // corrected navigation path
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value.keyword}
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};
export default Searchinput;
