import { Building2, CheckCircle2, Clock, Handshake } from "lucide-react";
import StatsCard from "./StatsCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyStatuses } from "@/lib/apiCalls";
import { useAuth } from "@clerk/react";
import StatsCardSkeleton from "./StatsCardSkeleton";

export default function StatsCards() {
  // Getting user token from clerk
  const { getToken } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["property-statuses"],
    queryFn: async () => {
      const token = await getToken();
      return fetchPropertyStatuses(token ?? "");
    }
  });

  if (isError) {
    return <div className="mt-6 rounded-xl border border-error/20 bg-error/5 p-4 text-error text-sm font-medium">
      {error.message}
    </div>
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5">
      {
        isLoading ? (
          <>
            {
              Array.from({ length: 4 }).map((_, i: number) => (
                <StatsCardSkeleton key={i} />
              ))
            }
          </>
        ) : (
          <>
            <StatsCard
              icon={Building2}
              label="Total Properties"
              value={data?.total || 0}
              variant="primary"
              trend="Across all regions"
            />
            <StatsCard
              icon={CheckCircle2}
              label="Available"
              value={data?.available || 0}
              variant="success"
              trend="Ready for listing"
            />
            <StatsCard
              icon={Clock}
              label="Pending"
              value={data?.pending || 0}
              variant="warning"
              trend="In approval process"
            />
            <StatsCard
              icon={Handshake}
              label="Sold"
              value={data?.sold || 0}
              variant="muted"
              trend="Successfully closed"
            />
          </>
        )
      }
    </div>
  );
}
