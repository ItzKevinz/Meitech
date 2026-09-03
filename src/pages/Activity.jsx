import { Pencil, Plus, Trash2, UserRound } from "lucide-react";

import "../styles/activity.css";

const activities = [
  {
    id: 1,
    date: "3 Agustus 2026",
    time: "09:00",
    action: "edit",
    description: "Mengedit foto produk",
  },
  {
    id: 2,
    date: "3 Agustus 2026",
    time: "08:40",
    action: "add",
    description: 'Menambahkan produk "Meitech Sensor"',
  },
  {
    id: 3,
    date: "3 Agustus 2026",
    time: "08:00",
    action: "edit",
    description: 'Mengedit data layanan "Maintenance"',
  },
  {
    id: 4,
    date: "3 Agustus 2026",
    time: "07:30",
    action: "delete",
    description: 'Menghapus produk "Meitech Controller"',
  },
];

function getActivityIcon(action) {
  switch (action) {
    case "add":
      return Plus;

    case "delete":
      return Trash2;

    case "edit":
    default:
      return Pencil;
  }
}

export default function Activity() {
  return (
    <div className="activity-page">
      {/* TITLE */}
      <div className="activity-title">
        <span>Aktivitas</span>
      </div>

      {/* ACTIVITY CARD */}
      <section className="activity-card">
        {activities.map((item, index) => {
          const Icon = getActivityIcon(item.action);

          return (
            <div className="activity-group" key={item.id}>
              {/* DATE */}
              {(index === 0 || activities[index - 1].date !== item.date) && (
                <h2 className="activity-date">{item.date}</h2>
              )}

              {/* ACTIVITY ITEM */}
              <div className="activity-item">
                {/* TIMELINE */}
                <div className="activity-timeline">
                  <div className={`activity-icon activity-${item.action}`}>
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  {index !== activities.length - 1 && (
                    <div className="activity-line" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="activity-content">
                  <div className="activity-info">
                    <span className="activity-time">{item.time}</span>

                    <span className="activity-description">
                      {item.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
