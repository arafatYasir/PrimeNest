import { Building2, CheckCircle2, Clock, Handshake, RefreshCw } from "lucide-react";
import StatsCard from "./StatsCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyStatuses } from "@/lib/apiCalls";
import { useAuth } from "@clerk/react";
import DashboardError from "../DashboardError";
import { Button } from "@/components/ui/button";

export default function StatsCards() {
  // Getting user token from clerk
  const { getToken } = useAuth();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["property-statuses"],
    queryFn: async () => {
      const token = await getToken();
      return fetchPropertyStatuses(token ?? "");
    }
  });

  if (isError) {
    return (
      <DashboardError
        title={error.message}
        render={
          <Button variant="outline" size="lg" onClick={() => refetch()}>
            <RefreshCw className="size-4 mr-1" />
            Retry
          </Button>
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5">
      <StatsCard
        icon={Building2}
        label="Total Properties"
        value={data?.total || 0}
        variant="primary"
        trend="Across all regions"
        isLoading={isLoading}
      />
      <StatsCard
        icon={CheckCircle2}
        label="Available"
        value={data?.available || 0}
        variant="success"
        trend="Ready for listing"
        isLoading={isLoading}
      />
      <StatsCard
        icon={Clock}
        label="Pending"
        value={data?.pending || 0}
        variant="warning"
        trend="In approval process"
        isLoading={isLoading}
      />
      <StatsCard
        icon={Handshake}
        label="Sold"
        value={data?.sold || 0}
        variant="muted"
        trend="Successfully closed"
        isLoading={isLoading}
      />
    </div>
  );
}