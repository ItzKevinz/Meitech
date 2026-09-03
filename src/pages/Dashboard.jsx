import {
  ShoppingCart,
  FilePenLine,
  UsersRound,
  Eye,
} from "lucide-react";

import "../styles/dashboard.css";

const statistics = [
  {
    title: "Total Produk",
    value: "17",
    icon: ShoppingCart,
    iconClass: "yellow",
  },
  {
    title: "Total Layanan",
    value: "4",
    icon: FilePenLine,
    iconClass: "green",
  },
  {
    title: "Total Mitra",
    value: "6",
    icon: UsersRound,
    iconClass: "cream",
  },
  {
    title: "Kunjungan Hari Ini",
    value: "29",
    icon: Eye,
    iconClass: "gray",
  },
];

const pageStatistics = [
  {
    page: "Beranda",
    visits: "3,420",
    unique: "1,820",
    average: "1m 12s",
    bounce: "62%",
  },
  {
    page: "Produk",
    visits: "2,980",
    unique: "1,440",
    average: "2m 45s",
    bounce: "48%",
  },
  {
    page: "Tentang Kami",
    visits: "1,120",
    unique: "820",
    average: "1m 05s",
    bounce: "71%",
  },
  {
    page: "Blog",
    visits: "2,410",
    unique: "1,110",
    average: "3m 20s",
    bounce: "42%",
  },
  {
    page: "Kontak",
    visits: "840",
    unique: "560",
    average: "0m 58s",
    bounce: "78%",
  },
  {
    page: "Artikel",
    visits: "1,177",
    unique: "390",
    average: "4m 10s",
    bounce: "35%",
  },
  {
    page: "FAQ",
    visits: "503",
    unique: "390",
    average: "4m 10s",
    bounce: "35%",
  },
  {
    page: "Projek",
    visits: "983",
    unique: "390",
    average: "5m 20s",
    bounce: "35%",
  },
];

const chartData = [
  { day: "Minggu", value: 3 },
  { day: "Senin", value: 8 },
  { day: "Selasa", value: 7 },
  { day: "Rabu", value: 6.5 },
  { day: "Kamis", value: 10 },
  { day: "Jumat", value: 4.5 },
  { day: "Sabtu", value: 0 },
];

function getChartPoints() {
  const width = 760;
  const height = 210;

  const maxValue = 10;
  const minValue = 0;

  return chartData.map((item, index) => {
    const x =
      (index / (chartData.length - 1)) * width;

    const y =
      height -
      ((item.value - minValue) /
        (maxValue - minValue)) *
        height;

    return {
      ...item,
      x,
      y,
    };
  });
}

export default function Dashboard() {
  const points = getChartPoints();

  const polylinePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <div className="dashboard">
      {/* STATISTICS CARDS */}
      <section className="statistics-cards">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className="statistics-card"
              key={item.title}
            >
<div className={`statistics-icon ${item.iconClass}`}>
  <Icon
    size={24}
    strokeWidth={2}
  />
</div>

              <div className="statistics-info">
                <span>{item.title}</span>
                <strong>{item.value}</strong>
              </div>
            </div>
          );
        })}
      </section>

      {/* WEEKLY CHART */}
      <section className="chart-card">
        <h2>Statistik Kunjungan Per Minggu</h2>

        <div className="chart-wrapper">
<svg
  className="visit-chart"
  viewBox="0 0 800 250"
  preserveAspectRatio="xMidYMid meet"
>
            <line
              x1="40"
              y1="20"
              x2="40"
              y2="230"
              className="chart-axis"
            />

            <line
              x1="40"
              y1="230"
              x2="790"
              y2="230"
              className="chart-axis"
            />

            <polyline
              points={polylinePoints
                .split(" ")
                .map((point) => {
                  const [x, y] =
                    point.split(",");

                  return `${Number(x) + 40},${
                    Number(y) + 20
                  }`;
                })
                .join(" ")}
              className="chart-line"
            />

            {points.map((point) => (
              <circle
                key={point.day}
                cx={point.x + 40}
                cy={point.y + 20}
                r="4"
                className="chart-point"
              />
            ))}

            {points.map((point) => (
              <circle
                key={`${point.day}-axis`}
                cx={point.x + 40}
                cy="230"
                r="4"
                className="chart-axis-point"
              />
            ))}

            {points.map((point) => (
              <text
                key={`${point.day}-label`}
                x={point.x + 40}
                y="245"
                textAnchor="middle"
                className="chart-label"
              >
                {point.day}
              </text>
            ))}
          </svg>
        </div>
      </section>

      {/* PAGE STATISTICS */}
      <section className="page-statistics">
        <div className="page-statistics-header">
          <h2>Statistik Kunjungan Halaman</h2>

          <p>
            Ringkasan kunjungan minggu ini
          </p>
        </div>

        <div className="summary-cards">
          <div>
            <span>Total Kunjungan</span>
            <strong>12,847</strong>
          </div>

          <div>
            <span>Pengunjung Unik</span>
            <strong>4,231</strong>
          </div>

          <div>
            <span>Rata-rata Waktu</span>
            <strong>2m 34s</strong>
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Halaman</th>
                <th>Kunjungan</th>
                <th>Unik</th>
                <th>Rata-rata</th>
                <th>Rasio Bounce</th>
              </tr>
            </thead>

            <tbody>
              {pageStatistics.map((item) => (
                <tr key={item.page}>
                  <td>{item.page}</td>
                  <td>
                    <div className="visit-value">
                      <span>{item.visits}</span>

                      <div className="visit-bar">
                        <div></div>
                      </div>
                    </div>
                  </td>
                  <td>{item.unique}</td>
                  <td>{item.average}</td>
                  <td>{item.bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}