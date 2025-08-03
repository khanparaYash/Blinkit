import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import { Axios } from "../utils/Axios";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "../components/Loading";
function ProductAdmin() {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading,setLoading]=useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [productSearch, setProductSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.get_product,
        data: { page: page, limit: 10, search: productSearch },
      });
      if (response.data.success) {
        setProductData(response.data.data);
        setTotalPageCount(response.data.totalNoPage);
      }
    } catch (error) {
      AxiosTostError(error);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);
    return () => {
      clearInterval(interval);
    };
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
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search Product Hear..."
            onChange={handleOnChange}
            value={productSearch}
            className="h-full w-full  outline-none bg-transparent"
          />
        </div>
      </div>

      {loading ?? <Loading/>}

      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return (
                <ProductCardAdmin
                  key={index}
                  fetchProductData={fetchProductData}
                  data={p}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-between my-4">
          <button className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
            onClick={() => {
              handlePrev();
            }}
          >
            prev
          </button>
          <button className="w-full bg-slate-100">
            {page}/{totalPageCount}
          </button>
          <button onClick={() => handleNext()} className="border border-primary-200 px-4 py-1 hover:bg-primary-200">next</button>
        </div>
      </div>
    </section>
  );
}

export default ProductAdmin;
