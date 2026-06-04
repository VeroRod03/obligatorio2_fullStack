const Topbar = ({titulo}) => {
    
  const palabras = titulo.split(" "); 
  const ultimaPalabra = palabras.pop();

  return (
    <div className="topbar-left">
  <button
    className="hamburger-btn"
    id="hamburgerBtn"
    onclick="openSidebar()"
    title="Menú"
  >
    <span />
    <span />
    <span />
  </button>
  <div className="topbar-title" id="topbarTitle">
    {palabras.join(" ")}{" "}<span>{ultimaPalabra}</span>
  </div>
</div>

  )
}

export default Topbar