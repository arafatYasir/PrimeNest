import { useState } from "react";
import { Paperclip, SendHorizontal, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const DashboardInboxChat = () => {
    // Controlled message input state
    const [message, setMessage] = useState("");

    // Submit handler
    const handleSendMessage: React.SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Reset input after sending
        setMessage("");
    };

    return (
        <div className="flex-3 min-h-screen bg-card rounded-r-xl flex flex-col justify-between overflow-hidden">
            {/* ---- Message Display Area (Placeholder for conversation stream) ---- */}
            <div className="flex-1 flex flex-col justify-end p-4 md:p-6 overflow-y-auto" />

            {/* ---- Bottom Chat Action Bar ---- */}
            <div className="border-t border-border bg-card p-3 sm:p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    {/* ---- Attachment Modal in Place ---- */}
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-lg"
                                    className="size-10 shrink-0 rounded-xl text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                                    aria-label="Add attachment"
                                >
                                    <Paperclip className="size-5" />
                                </Button>
                            }
                        />

                        <DropdownMenuContent
                            side="top"
                            align="start"
                            sideOffset={8}
                            className="w-56 p-1.5 shadow-lg border border-border bg-card rounded-xl"
                        >
                            <DropdownMenuItem
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-text hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <FileText className="size-4" />
                                </div>
                                <span>Document</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-text hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors"
                            >
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                                    <Image className="size-4" />
                                </div>
                                <span>Photos & Videos</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* ---- Controlled Message Input ---- */}
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 h-10 px-4 text-xs sm:text-sm rounded-xl focus:border-primary"
                        aria-label="Chat message input"
                    />

                    {/* ---- Send Button ---- */}
                    <Button
                        type="submit"
                        disabled={!message.trim()}
                        variant="default"
                        size="icon-lg"
                        className="size-10 shrink-0 rounded-xl transition-all duration-150 disabled:opacity-40"
                        aria-label="Send message"
                    >
                        <SendHorizontal className="size-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default DashboardInboxChat;