const BrandIconName = () => {
  return (
    <div className="brand">
      <div className="brand-icon">
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <polygon points="9,2 16,7 13,15 5,15 2,7" />
          <circle cx={9} cy={9} r={2} />
        </svg>
      </div>
      <div className="brand-name">
        Galería <span>Áurea</span>
      </div>
    </div>
  );
};

export default BrandIconName;
