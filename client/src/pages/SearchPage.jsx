import React, { useEffect, useState } from "react";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from "react-router-dom";
function SearchPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const location=useLocation()
  // const queryParams = new URLSearchParams(location.search);
   const searchText = location.search.slice(3)
  
  const fetchData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.search_product,
        data: {
          search: searchText,
          page:page,
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
    }
  };
  useEffect(() => {
    fetchData();
  }, [page,searchText]);

  const handleFetchMore=()=>{
    if(totalPage>page){
      setPage(prev=>prev+1)
    }
  }

  return (
    <section>
      <div>
        <p>search Results:{data.length}</p>
        <InfiniteScroll dataLength={data.length}
        hasMore={true} next={handleFetchMore}>
          <div>
            {data.map((p, index) => {
              return <CardProduct key={index} data={p} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
}

export default SearchPage;
