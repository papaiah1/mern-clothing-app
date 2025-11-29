import { Link } from "react-router-dom";
export default function ProductCard({ product }) {
  return (
    <div style={{ border:'1px solid #ddd', padding:10, background:'#fff' }}>
      <Link to={'/product/'+product._id}><h3>{product.name}</h3></Link>
      <p>₹{product.price}</p>
      <p style={{fontSize:12, color:'#666'}}>{product.category}</p>
    </div>
  );
}
