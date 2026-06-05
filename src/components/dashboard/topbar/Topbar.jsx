const Topbar = ({ titulo }) => {
  const palabras = titulo.split(" ");
  const ultimaPalabra = palabras.pop();

  const openSidebar = () => {
    document.body.classList.remove("sidebar-collapsed");
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.remove("closed");
    sidebar.classList.add("open");
    document.getElementById("sidebarOverlay").classList.remove("visible");
  };

  return (
    <div className="topbar-left">
      <button
        className="hamburger-btn"
        id="hamburgerBtn"
        onClick={openSidebar}
        title="Menú"
      >
        <span />
        <span />
        <span />
      </button>
      <div className="topbar-title" id="topbarTitle">
        {palabras.join(" ")} <span>{ultimaPalabra}</span>
      </div>
    </div>
  );
};

export default Topbar;
