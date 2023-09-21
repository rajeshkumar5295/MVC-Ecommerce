import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/HomePage.css";
// import '../styles/AuthStyles.css';

import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

import { useCart } from "../context/cart";

import { AiOutlineReload } from "react-icons/ai";
import Banner from "../components/Layout/Banner";


const HomePage = () => {

  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //function for getting categories
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      console.log(res.data);
      console.log(res.data.category);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // function for getting all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  console.log(products);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  console.log(products);

  //  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //filter by id (cat)
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/product-filters`,
        { checked, radio }
      );
      console.log(data);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  console.log(products);

  console.log(cart);
  return (
    <div>
      <Layout title={"All Products-Best Offers"}>
        {/* <img
          src="/imagess/banner.png"
          className="banner-img"
          alt="bannerimage"
          width={"100%"}
        /> */}
          <Banner/>

        {/* banner image */}

        <div className="">
          <div className="container-fluid row mt-3  home-page  ">
            <div className="col-md-3 filters ">
              <h6 className="text-center mt-5 fs-3 text-primary-emphasis">
                {" "}
                Filter By Category{" "}
              </h6>
                             
              <div className="d-flex flex-column ant-checkbox-wrapper  ">
                {categories.map((c) => (
                  <>
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </>
                ))}
              </div>

              {/* filter by price       */}
              <h4 className="text-center mt-3 fs-3 text-primary-emphasis">
                {" "}
                Filter By Price{" "}
              </h4>

              <div className="d-flex flex-column  ant-radio-wrapper  ">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}> {p.name} </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              
              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger mt-4"
                  onClick={() => window.location.reload()}
                >
                  {" "}
                  RESET FILTERS{" "}
                </button>
              </div>
            </div>

          {/* filters end here */}

            <div className="col-md-9">
              {/* {JSON.stringify(radio,null,4)} */}

              <h1 className="text-center">All Products</h1>
              <div className="mb-2 d-flex flex-row flex-wrap ">
                {products?.map((p) => (
                  <>
                    <>
                      <div
                        key={p._id}
                        className="card m-2 "
                        style={{ width: "18rem" }}
                      >
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                          className="card-img-top img-fluid  img-thumbnail"
                          style={{ width: "auto", height: "230px" }}
                          alt={p.name}
                        />
                        <div className="card-body">
                        <div className="card-name-price">
                       <h5 className="card-title">{p.name}</h5>
                        <h5 className="card-title card-price"><span>Rs </span>
                         {p.price}
                          </h5>
                      </div>


                          
                          <p className="card-text">
                          
                            {p.description.substring(0, 30)}
                          </p>
                          
                          {/* <p className="card-text">  {p.category} </p> */}

                       <div className="d-flex " >
                       <button
                            className="btn btn-info"
                            onClick={() => navigate(`/product/${p.slug}`)}
                          >
                            {" "}
                            More Details{" "}
                          </button>

                          <button
                            className="btn btn-secondary  ms-2"
                            onClick={() => {
                              setCart([...cart, p]);

                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );

                              toast.success("Item added successfully");
                            }}
                          >
                            {" "}
                            ADD TO CART{" "}
                          </button>
                       </div>
                        </div>
                      </div>
                    </>
                  </>
                ))}
              </div>

              <div className="m-2 p-3">
                {/* {total} */}
                {products && products.length < total && (
                  <button
                    className=" btn btn-info loadmore "
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? ("Loading..." ): (<> Loadmore  <AiOutlineReload /> </>) }
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default HomePage;
