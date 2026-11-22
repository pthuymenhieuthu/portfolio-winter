import { freelanceCatalog } from "@/data/freelance-catalog";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import styles from "./chat-freelance-pricing.module.css";

export function ChatFreelancePricing({ vietnamese = false }: { vietnamese?: boolean }) {
  return <div className={styles.pricing}>
    {Object.values(freelanceCatalog).map(service => <table key={service.label} className={styles.table}>
      <caption>{service.label}</caption>
      <thead><tr><th scope="col">{vietnamese ? "Gói" : "Package"}</th><th scope="col">{vietnamese ? "Phạm vi" : "Scope"}</th><th scope="col">{vietnamese ? "Từ (USD)" : "From (USD)"}</th></tr></thead>
      <tbody>{service.packages.map(item => <tr key={item.name}>
        <th scope="row"><a href={`mailto:${DATA.contact.email}?subject=${encodeURIComponent(`Freelance inquiry — ${service.label} / ${item.name}`)}&body=${encodeURIComponent(`Hi Thuy,\n\nI'm interested in ${service.label} / ${item.name}, starting at $${item.price} USD.\nScope: ${item.scope}\n\nProject overview:\nTarget deadline:\n`)}`} data-analytics-contact="email" aria-label={`${vietnamese ? "Liên hệ về gói" : "Discuss"} ${service.label} ${item.name}`}>
          {item.name}<ArrowUpRight size={12} aria-hidden="true" />
        </a></th>
        <td>{item.scope}</td><td className={styles.price}>${item.price}</td>
      </tr>)}</tbody>
    </table>)}
    <p className={styles.note}>{vietnamese ? "Chọn tên gói để trao đổi qua email. Motion và dự án ngoài phạm vi được báo giá riêng." : "Choose a package name to discuss it by email. Motion and work outside these scopes are quoted separately."}</p>
    <a href="/#services" className={styles.details}>{vietnamese ? "Xem chi tiết từng gói" : "See full package details"}<ArrowUpRight size={14} aria-hidden="true" /></a>
  </div>;
}
