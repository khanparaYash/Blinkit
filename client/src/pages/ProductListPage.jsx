import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { validURLConverter } from "../utils/validURlConvert";
import { useGlobalContext } from "../provider/GlobalProvider";

function ProductListPage() {
  const params = useParams();
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  
    const {setLoading}=useGlobalContext()
  // const [totalPage, setTotalPage] = useState(1);

  const subCategoryName1 = params.subCategory.split("-");
  const subCategoryName = subCategoryName1
    .slice(0, subCategoryName1.length - 1)
    .join(" ");
  const subCategory = useSelector((state) => state.product.subCategory);
  const [subCategoryData, setSubCategoryData] = useState([]);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_productByCategory_SubCategory,
        data: {
          categoryId,
          subCategoryId,
          page: 1,
          limit: 10,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // console.log(response.data);

        if (response.data.page == 1) setData(response.data.data);
        else {
          setData([...data, ...response.data.data]);
        }
        // setTotalPage(response.data.TotalCount);
      }
    } catch (error) {
      AxiosTostError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = subCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });
      return filterData ? filterData : null;
    });
    setSubCategoryData(sub);
  }, [params, subCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/* <h1>{subCategoryName}</h1> */}

        {/* sub category */}
        <div className=" min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {subCategoryData.map((s, index) => {
            const link = `/${validURLConverter(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${validURLConverter(s?.name)}-${s?._id}`;
            return (
              <Link
                key={index}
                to={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Product */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 ">
              {
                data.map((p, index) => {
                  return <CardProduct data={p} key={index} />;
                })
              }
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}

export default ProductListPage;
