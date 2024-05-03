interface PopupProps {
    children: React.ReactNode; 
    onclose: () => void; 
    onopen: () => void; 
    open?: boolean; 
}

interface PopupContent {
    title: contentTitle;
    method: type;
    id?: number
}

type type = 'create' | 'update'
type contentTitle = 'event' | 'jobPost'