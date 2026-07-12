import { Building2, CheckCircle2, Clock, Handshake } from "lucide-react";
import StatsCard from "./StatsCard";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5">
      <StatsCard
        icon={Building2}
        label="Total Properties"
        value={0}
        variant="primary"
        trend=""
      />
      <StatsCard
        icon={CheckCircle2}
        label="Available"
        value={0}
        variant="success"
        trend=""
      />
      <StatsCard
        icon={Clock}
        label="Pending"
        value={0}
        variant="warning"
        trend=""
      />
      <StatsCard
        icon={Handshake}
        label="Sold"
        value={0}
        variant="muted"
        trend=""
      />
    </div>
  );
}
