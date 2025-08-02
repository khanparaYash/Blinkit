import React, { useEffect, useState } from "react";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import CardLoading from "../components/CardLoading"
import noDataImage from "../assets/nothing here yet.webp"
function SearchPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const location = useLocation();
  const [loading,setLoading] = useState(true)
  const loadingArrayCard = new Array(10).fill(null)
  // const queryParams = new URLSearchParams(location.search);
  const searchText = location.search.slice(3);

  const fetchData = async () => {
    try {
        setLoading(true)
      const response = await Axios({
        ...SummaryApi.search_product,
        data: {
          search: searchText,
          page: page,
        },
      });
      if (response.data.success) {
        if (response.data.page == 1) {
          setData(response.data.data);
          setTotalPage(response.data.totalPage);
        } else {
          setData((prev) => {
            return [...prev, ...response.data.data];
          });
        }
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length} </p>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4'>
            {data.map((p, index) => {
              return <CardProduct key={index} data={p} />;
            })}
            {
              loading && (
                loadingArrayCard.map((_,index)=>{
                  return(
                    <CardLoading key={"loadingsearchpage"+index}/>
                  )
                })
              )
            }
          </div>
        </InfiniteScroll>
        {
                //no data 
                !data[0] && !loading && (
                  <div className='flex flex-col justify-center items-center w-full mx-auto'>
                    <img
                      src={noDataImage} 
                      className='w-full h-full max-w-xs max-h-xs block'
                    />
                    <p className='font-semibold my-2'>No Data found</p>
                  </div>
                )
              }
      </div>
    </section>
  );
}

export default SearchPage;
