import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import { Axios } from "../utils/Axios";
import ProductCardAdmin from "../components/ProductCardAdmin";
function ProductAdmin() {

  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoding] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [productSearch, setProductSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoding(true);
      const response = await Axios({
        ...SummaryApi.get_product,
        data: { page: page, limit: 10, search: productSearch },
      });
      if (response.data.success) {
        setProductData(response.data.data);
        setTotalPageCount(response.data.totalCount);
      }
    } catch (error) {
      AxiosTostError(error);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  useEffect(() => {
    let flag = true;
    const interval=setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);
    return()=>{
      clearInterval(interval)
    }
  }, [productSearch]);

  const handleNext = () => {
    if (page === totalPageCount) return;
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page === 1) return;
    setPage((prev) => prev - 1);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setProductSearch(value);
    setPage(1);
  };

  return (
    <div>
      <div>
        <h2>Product</h2>
        <div>
          <input
            type="text"
            placeholder="Search Product Hear..."
            onChange={handleOnChange}
            value={productSearch}
          />
        </div>
      </div>
      {loading ? (
        <div>Loding.....</div>
      ) : (
        productData.map((p, index) => {
          return <ProductCardAdmin key={index} fetchProductData={fetchProductData} data={p} />;
        })
      )}
      <button
        onClick={() => {
          handlePrev();
        }}
      >
        prev
      </button>
      <button>
        {page}/{totalPageCount}
      </button>
      <button onClick={() => handleNext()}>next</button>
      
    </div>
  );
}

export default ProductAdmin;
