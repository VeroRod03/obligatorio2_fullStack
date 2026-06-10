import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../../../../api/api.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LIMIT_PLUS = 4;

const StatsVendedor = ({ totalPubs }) => {
  const usuario = useSelector((state) => state.user.usuario);
  const [ofertasPorMes, setOfertasPorMes] = useState([]);

  useEffect(() => {
    api
      .get("/oferta/mis-ofertas-recibidas")
      .then((res) => {
        const ofertas = res.data.ofertas || res.data || [];
        const meses = {};
        //toma la fecha actual y crea las claves de los últimos 6 meses con valor 0
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          //crea un objeto Date para el primer día del mes correspondiente y obtiene su nombre en español
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          meses[d.toLocaleString("es", { month: "short" })] = 0;
        }
        //recorre las ofertas y suma 1 a la clave del mes correspondiente según la fecha de creación de cada oferta
        ofertas.forEach((o) => {
          const key = new Date(o.fecha || o.createdAt).toLocaleString("es", {
            month: "short",
          });
          if (key in meses) meses[key]++;
        });
        //convierte el objeto meses en un array de objetos con las propiedades mes y cantidad para usarlo en el gráfico
        setOfertasPorMes(
          Object.entries(meses).map(([mes, cantidad]) => ({ mes, cantidad })),
        );
      })
      .catch(() => {
        //en caso de error, crea un array con los últimos 6 meses y cantidad 0 para mostrar un gráfico vacío en lugar de romper la vista
        const meses = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          meses.push({
            mes: d.toLocaleString("es", { month: "short" }),
            cantidad: 0,
          });
        }
        setOfertasPorMes(meses);
      });
  }, []);

  const esPlus = (usuario?.subscripcion || "plus") === "plus";
  const usoPct = esPlus
    ? Math.min(Math.round((totalPubs / LIMIT_PLUS) * 100), 100)
    : null;

  return (
    <div className="stats-row stats-row-2">
      {/* Tarjeta plan */}
      {esPlus ? (
        <div className="stat-card">
          <div className="stat-label">Uso del plan</div>
          <div className="stat-value">
            {totalPubs}
            <span className="unit">/ {LIMIT_PLUS}</span>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: "var(--border-subtle)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${usoPct}%`,
                  background: usoPct >= 100 ? "#e05252" : "var(--gold)",
                  borderRadius: 2,
                  transition: "width .4s",
                }}
              />
            </div>
            <div
              style={{
                fontSize: ".65rem",
                color: "var(--text-muted)",
                marginTop: ".3rem",
              }}
            >
              {usoPct}% utilizado · plan Plus
            </div>
          </div>
          <div className="stat-icon">
            <svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="stat-card">
          <div className="stat-label">Publicaciones realizadas</div>
          <div className="stat-value">{totalPubs}</div>
          <div className="stat-change">Plan Premium · ilimitadas</div>
          <div className="stat-icon">
            <svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            </svg>
          </div>
        </div>
      )}

      {/* Tarjeta actividad mensual */}
      <div className="stat-card">
        <div className="stat-label">
          Actividad <em>mensual</em>
        </div>
        <div style={{ marginTop: ".6rem", height: 70 }}>
          <Bar
            data={{
              labels: ofertasPorMes.map((m) => m.mes),
              datasets: [
                {
                  data: ofertasPorMes.map((m) => m.cantidad),
                  backgroundColor: ofertasPorMes.map((_, i) =>
                    i === ofertasPorMes.length - 1
                      ? "rgba(212,175,55,.9)"
                      : "rgba(212,175,55,.3)",
                  ),
                  borderRadius: 3,
                  borderSkipped: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: { label: (ctx) => ` ${ctx.raw} ofertas` },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#666", font: { size: 9 } },
                  grid: { display: false },
                  border: { display: false },
                },
                y: { display: false, grid: { display: false } },
              },
            }}
          />
        </div>
        <div
          style={{
            fontSize: ".65rem",
            color: "var(--text-muted)",
            marginTop: ".2rem",
          }}
        >
          Ofertas por mes
        </div>
      </div>
    </div>
  );
};

export default StatsVendedor;
