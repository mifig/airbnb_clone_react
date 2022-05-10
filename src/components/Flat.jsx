import "./Flat.scss";

function Flat({id, price, name, imageUrl, onSelect, selected = false}) {
  const handleClick = () => {
    onSelect(id);
  };

  return(
    <div className={ selected ? "flat selected" : "flat" } onClick={handleClick}>
      <img alt={name} src={imageUrl} className="flat-picture"></img>
      <p className="flat-title">
        <b>{price}€</b> - {name}
      </p>
    </div>
  );
};

export default Flat;