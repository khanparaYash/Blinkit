import React from "react";
import banner from "../assets/react.svg";
import { useSelector } from "react-redux";
import { validURLConverter } from "../utils/validURlConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryVWiseProductDisplay from "../components/CategoryVWiseProductDisplay";
function Home() {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.subCategory);
  const navigate = useNavigate();

  const handleRedirectProductListPage = (id, category) => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? true : null;
    });
    const url = `/${validURLConverter(category)}-${id}/${validURLConverter(
      subcategory.name
    )}-${subcategory._id}`;
    navigate(url);
  };
  return (
    <section className="bg-white">
      <div className="container mx-auto  ">
        <div
          className={`w-full h-full min-h-48 rounded-2xl bg-blue-100 ${
            !banner && "animate-pulse"
          }`}
        >
          <img src={banner} alt="" className="w-full h-full hidden lg:block" />
          <img src={banner} alt="" className="w-full h-full  lg:hidden" />
        </div>

        <div className="container mx-auto px-4 my-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loadingCategory
            ? new Array(12).fill(null).map((c, index) => {
                return (
                  <div className="bg-white rounded-2xl p-4 min-h-40 grid gap-2 shadow animate-pulse">
                    <div className="bg-blue-100 min-h-24 rounded-2xl"></div>
                    <div className="bg-blue-100 h-8 rounded-2xl"></div>
                  </div>
                );
              })
            : categoryData.map((c, index) => {
                return (
                  <div
                    onClick={() => {
                      handleRedirectProductListPage(c._id, c.name);
                    }}
                  >
                    <img src={c.image} alt="" />
                    <div>{c.name}</div>
                  </div>
                );
              })}
        </div>

        {/* display category products */}
        <div>
          {categoryData.map((c, index) => {
            return (
              <CategoryVWiseProductDisplay
                key={index}
                id={c?._id}
                name={c?.name}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Home;
