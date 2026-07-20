import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
    title: string;
    description?: string;
    onConfirm: () => void;
    onClose: () => void;
    isOpen: boolean;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
}

const ConfirmationModal = ({
    title,
    description,
    onConfirm,
    onClose,
    isOpen,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading = false,
}: ConfirmationModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Close when clicking the backdrop
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            {/* ---- Backdrop ---- */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" />

            {/* ---- Modal ---- */}
            <div
                ref={modalRef}
                className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200"
            >
                {/* ---- Close button ---- */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-md p-1 text-text-secondary transition-colors hover:bg-muted hover:text-text cursor-pointer"
                >
                    <X className="size-4" />
                </button>

                {/* ---- Content ---- */}
                <div className="flex flex-col gap-2 pr-6">
                    <h2 className="font-heading text-lg font-semibold text-text">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* ---- Actions ---- */}
                <div className="mt-6 flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="default"
                        size="lg"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;