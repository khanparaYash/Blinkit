import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function CategoryVWiseProductDisplay({ id, name }) {
  const [data, setData] = useState([]);
  const containerRef = useRef();

  const fetchCategoryWiseProduct = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_productByCategory,
        data: { id: id },
      });
      if (response.data.success) {
        setData(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };
  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);
  return (
    <div className="border my-2 ">
      <div>
        <h3>{name}</h3>
        <Link to={""}>See All</Link>
      </div>
      <div className="flex gap-2 my-4 overflow-x-scroll  "  ref={containerRef}>
        {data.map((p, index) => {
          return <CardProduct key={index} data={p} />;
        })}
        <div className="w-full z-10 absolute flex justify-between">
          <button>
            <FaAngleLeft />
          </button>
          <button onClick={()=>{containerRef.current.scrollRight+=200}}>
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryVWiseProductDisplay;
