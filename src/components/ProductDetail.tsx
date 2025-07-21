import { useParams } from "react-router-dom";

export function ProductDetail() {
  const { productId } = useParams(); 

  return <h1>Chi tiết sản phẩm {productId}</h1>;
}