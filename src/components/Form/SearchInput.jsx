import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://e-commerce-api-three-gules.vercel.app/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });

      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="search-container">
        <form role="search" onSubmit={handleSubmit}>
          <input
            type="search"
            className="search-input"
            name="q"
            placeholder="Search..."
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      {/* <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success " type="submit">
          Search
        </button>
      </form> */}
    </>
  );
};

export default SearchInput;
