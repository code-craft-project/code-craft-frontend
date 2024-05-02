interface PopupProps {
    children: React.ReactNode; 
    onclose: () => void; 
    onopen: () => void; 
    open?: boolean; 
}

interface PopipContent {
    title: contentTitle;
    method: type;
}

type type = 'create' | 'update'
type contentTitle = 'event' | 'jobPost'