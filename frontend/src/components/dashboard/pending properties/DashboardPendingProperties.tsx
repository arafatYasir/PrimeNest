import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { approveProperty, fetchPendingProperties } from "@/lib/apiCalls";
import { sortOptions } from "@/lib/data";
import { useAuth } from "@clerk/react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Clock, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";
import DashboardError from "../DashboardError";
import DashboardPendingProperty from "./DashboardPendingProperty";
import DashboardPendingPropertySkeleton from "./DashboardPendingPropertySkeleton";
import type { PendingProperty } from "@/types/global";
import { toast } from "sonner";

const DashboardPendingProperties = () => {
    // States
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("None");

    // Get user access token
    const { getToken } = useAuth();

    // Fetching all pending properties
    const { data, isLoading, isError, error, refetch, isPlaceholderData } = useQuery({
        queryFn: async () => {
            const token = await getToken();
            return fetchPendingProperties(token ?? "", page, sortBy);
        },
        queryKey: ["pending-properties", page, sortBy],
        placeholderData: keepPreviousData
    });

    const queryClient = useQueryClient();

    // Property approve api
    const approveMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = await getToken();
            return approveProperty(id, token ?? "");
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["pending-properties", page, sortBy] });
            const previousProperties = queryClient.getQueryData(["pending-properties", page, sortBy]);

            queryClient.setQueryData(["pending-properties", page, sortBy], (old: any) => ({
                ...old,
                data: old?.data?.filter((p: PendingProperty) => p._id !== id)
            }));

            return { previousProperties };
        },
        onError: (error, _id, context) => {
            queryClient.setQueryData(["pending-properties", page, sortBy], context?.previousProperties);

            toast.error(error.message, {
                className: "text-error!"
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["pending-properties"] });
        },
        onSuccess: (data) => {
            toast.success(data.message, {
                className: "text-success!"
            });
        }
    });

    const approvingId = approveMutation.isPending ? approveMutation.variables : null;

    const properties = data?.data;
    const pagination = data?.pagination;

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [page]);

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
        );
    }

    if (!isLoading && properties.length === 0) {
        return (
            <NotFound
                title="No pending approvals"
                icon={Clock}
                description="Great work! There are currently no new property listings awaiting your review. All submitted properties have been processed."
                render={
                    <Button variant="secondary" onClick={() => refetch()}>
                        <RefreshCw className="size-4" />
                        Refresh
                    </Button>
                }
            />
        );
    }

    // Functions
    const handleApprove = (id: string) => {
        approveMutation.mutate(id);
    }

    return (
        <div>
            {/* ---- Sort Dropdown ---- */}
            <div className="flex justify-start mt-6">
                <div className="w-full xs:w-56">
                    <label className="text-xs font-sans font-bold text-text uppercase tracking-wider mb-2 block">
                        Sort By
                    </label>
                    <Select
                        value={sortBy}
                        onValueChange={(value) => {
                            setSortBy(value ?? "None");
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-full h-10! rounded-lg border-border px-3.5 text-sm! text-text font-sans bg-card">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((item) => (
                                <SelectItem
                                    key={item.value}
                                    value={item.value}
                                    className="font-sans"
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* ---- Pending Properties ---- */}
            <div className="flex flex-col gap-4 mt-6">
                {
                    isLoading ? (
                        Array.from({ length: 5 }).map((_, i: number) => (
                            <DashboardPendingPropertySkeleton key={i} />
                        ))
                    ) : (
                        properties.map((property: PendingProperty) => (
                            <DashboardPendingProperty
                                key={property._id}
                                property={property}
                                onApprove={handleApprove}
                                onReject={() => { }}
                                isApproving={approvingId === property._id}
                            />
                        ))
                    )
                }
            </div>

            {/* ---- Pagination ---- */}
            {
                pagination && pagination?.totalPages > 0 && (
                    <div className="mt-10 flex items-center justify-center gap-5">
                        <Button
                            variant="outline"
                            size="lg"
                            disabled={data.pagination.currentPage <= 1 || isPlaceholderData}
                            onClick={() => setPage(prev => prev - 1)}
                        >
                            Previous
                        </Button>

                        <span className="text-sm font-medium text-text">
                            Page {data.pagination.currentPage} of {data.pagination.totalPages}
                        </span>

                        <Button
                            variant="outline"
                            size="lg"
                            disabled={data.pagination.currentPage >= data.pagination.totalPages || isPlaceholderData}
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default DashboardPendingProperties