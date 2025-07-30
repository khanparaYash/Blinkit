import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { validURLConverter } from "../utils/validURlConvert";

function ProductListPage() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoding] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const subCategoryName1 = params.subCategory.split("-");
  const subCategoryName = subCategoryName1
    .slice(0, subCategoryName1.length - 1)
    .join(" ");
  const subCategory = useSelector((state) => state.product.subCategory);
  const [subCategoryData,setSubCategoryData]=useState([])

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];
  
  const fetchProductData = async () => {
    try {
      setLoding(true);
      const response = await Axios({
        ...SummaryApi.get_productByCategory_SubCategory,
        data: {
          categoryId,
          subCategoryId,
          page: page,
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
        setTotalPage(response.data.TotalCount);
      }
    } catch (error) {
      AxiosTostError(error);
    } finally {
      setLoding(false);
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
    setSubCategoryData(sub)
  }, [params, subCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr">
        <h1>{subCategoryName}</h1>

        {/* sub category */}
        <div className="min-h-[78vh]">
        {
          subCategoryData.map((s,index)=>{
            const link=`/${validURLConverter(s.category[0].name)}-${s.category[0]._id}/${validURLConverter(s.name)}-${s._id}`
            return (
              <Link to={link} key={index}>
                <img src={s.image} alt="" />
              </Link>
            )
          })
        }
        </div>


        {/* Product */}
        <div className="min-h-[78vh]">
          <div>
            {loading ? (
              <h1>Loding</h1>
            ) : (
              data.map((p, index) => {
                return <CardProduct data={p} key={index} />;
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductListPage;
