import { useParams } from "react-router-dom";

export function ProductDetail() {
  const { id } = useParams(); 

  return <h1>Chi tiết sản phẩm {id}</h1>;
}