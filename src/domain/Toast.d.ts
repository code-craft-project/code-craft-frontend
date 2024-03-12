type ToastMessageType = "error" | "success" | "info";

interface ToastMessage {
    id: number;
    message: string;
    type: MessageType;
};

interface useToastReturn {
    messages: ToastMessage[];
    alertError: (message: string, duration?: number) => void;
    alertSuccess: (message: string, duration?: number) => void;
    alertInfo: (message: string, duration?: number) => void;
}