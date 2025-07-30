import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { AxiosTostError } from "../utils/AxiosToastError";

function ProductDisplayPage() {
  const params = useParams();
  let productId = params.product.split("-").slice(-1)[0];
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(0);
// console.log(product);

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_product_details,
        data: { productId },
      });
      if (response.data.success) {
        setProduct(response.data.data[0]);
        // setImage(response.data.data[0].image[0])
      }
    } catch (error) {
      AxiosTostError(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  return (
    <section>
      <div>
        <div>
          {
            product?.image&&(
              <img src={product?.image[image]} alt="" />
            )
          }
        </div>
      </div>
      <div>Price:{product.price}</div>
      <button>add</button>
    </section>
  );
}

export default ProductDisplayPage;
