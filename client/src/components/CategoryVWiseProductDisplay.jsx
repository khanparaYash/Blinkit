import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import CardProduct from "./CardProduct";

function CategoryVWiseProductDisplay({ id, name }) {
  const [data, setData] = useState([]);
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
    <div>
      <div>
        <h3>{name}</h3>
        <Link to={""}>See All</Link>
      </div>
      <div>
        {data.map((p, index) => {
          return <CardProduct key={index} data={p} />;
        })}
      </div>
      <div></div>
    </div>
  );
}

export default CategoryVWiseProductDisplay;
