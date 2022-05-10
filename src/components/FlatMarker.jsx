import "./FlatMarker.scss";

function FlatMarker({price, selected = false}) {
  return <div className={selected ? "marker selected" : "marker"}>{price} €</div>
};

export default FlatMarker;