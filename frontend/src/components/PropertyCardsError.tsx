import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "./Container";

interface PropertyCardsErrorProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

function PropertyCardsError({
    title = "Something went wrong",
    message = "We couldn't load the properties. Please try again.",
    onRetry,
}: PropertyCardsErrorProps) {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                    <AlertCircle className="h-6 w-6 text-destructive" strokeWidth={1.75} />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-text">{title}</h3>
                <p className="mt-1.5 max-w-sm text-sm text-text-secondary">{message}</p>

                {onRetry && (
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onRetry}
                        className="mt-5 gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Try again
                    </Button>
                )}
            </div>
        </Container>
    );
}

export default PropertyCardsError;
