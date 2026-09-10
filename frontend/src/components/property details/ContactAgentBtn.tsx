import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { SignInButton, useAuth } from "@clerk/react";
import { Skeleton } from "../ui/skeleton";
import { Loader2, MessageSquare } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { findOrCreateConversation } from "@/lib/apiCalls";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface Props {
    sellerId: string;
    propertyId: string;
}

const ContactAgentBtn = ({ sellerId, propertyId }: Props) => {
    // Store states
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);

    // Get the user's token
    const { getToken } = useAuth();

    const navigate = useNavigate();

    // Conversation find/create api
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const token = await getToken();

            return findOrCreateConversation(token ?? "", sellerId, propertyId);
        },
        onSuccess: (conversationId) => {
            // Navigate to "/dashboard/inbox" by attatching the conversation id in query params
            navigate(`/dashboard/inbox?conversationId=${conversationId}`);
        },
        onError: (err) => {
            toast.error(err.message, {
                className: "text-error!"
            });
        }
    });

    return (
        <>
            {/* ---- If user data is loading ---- */}
            {
                isLoading && (
                    <Skeleton className="w-full h-9 xs:h-10 rounded-md pt-2" />
                )
            }

            {/* ---- If user is not signed in ---- */}
            {
                (!isLoading && !user) && (
                    <SignInButton mode="modal">
                        <Button
                            size="lg"
                            className="w-full h-9 xs:h-10 mt-2"
                        >
                            <MessageSquare className="size-4 mr-1" />
                            Sign In to Contact Agent
                        </Button>
                    </SignInButton>
                )
            }

            {/* ---- If user is signed in and he is not the property owner ---- */}
            {
                (!isLoading && user && (user._id !== sellerId)) && (
                    <Button
                        size="lg"
                        className="w-full h-9 xs:h-10 mt-2"
                        disabled={isPending}
                        onClick={() => mutate()}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="size-4 mr-1 animate-spin" />
                                Contacting...
                            </>
                        ) : (
                            <>
                                <MessageSquare className="size-4 mr-1" />
                                Contact Agent
                            </>
                        )}
                    </Button>
                )
            }
        </>
    )
}

export default ContactAgentBtn