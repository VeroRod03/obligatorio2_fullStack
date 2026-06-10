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
import UsoPlan from "./UsoPlan.jsx";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LIMIT_PLUS = 4;

const StatsVendedor = ({ totalPubs }) => {
  const usuario = useSelector((state) => state.user.usuario);
  const [ofertasPorMes, setOfertasPorMes] = useState([]);

  useEffect(() => {
    api
      .get("/oferta/mis-ofertas")
      .then((res) => {
        const ofertas = res.data.ofertas || res.data || [];
        console.log("Ofertas obtenidas para estadísticas:", ofertas);
        const now = new Date();
        // Construir mapa por "año-mes" numérico para evitar problemas de locale
        const slots = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          slots.push({
            key: `${d.getFullYear()}-${d.getMonth()}`,
            label: d.toLocaleString("es", { month: "short" }).replace(".", ""),
            cantidad: 0,
          });
        }
        ofertas.forEach((o) => {
          const d = new Date(o.fechaOferta);
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          const slot = slots.find((s) => s.key === key);
          if (slot) slot.cantidad++;
        });
        setOfertasPorMes(
          slots.map(({ label, cantidad }) => ({ mes: label, cantidad })),
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
    <UsoPlan esPlus={esPlus} totalPubs={totalPubs} LIMIT_PLUS={LIMIT_PLUS} usoPct={usoPct} />

      {/* Tarjeta actividad mensual */}
      <div className="stat-card">
        <div className="stat-label">
          Actividad <em>mensual</em>
        </div>
        <div style={{ marginTop: ".6rem", height: 70 }}>
          <Bar key={ofertasPorMes.map(m => m.cantidad).join("-")}
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
