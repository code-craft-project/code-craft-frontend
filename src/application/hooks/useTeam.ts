import { useContext, useState } from "react"
import { eventsService } from "../services";
import ToastContext from "../contexts/ToastContext";

export default function useTeam() {
    const toastManager = useContext(ToastContext);
    const [editTeam, setEditTeam] = useState<TeamEntity>({ name: '', description: '', is_private: false });
    const [userTeam, setUserTeam] = useState<TeamEntity | null>(null);

    const createTeam = async (event_id: number): Promise<TeamEntity | null> => {
        const response = await eventsService.createTeam(event_id, editTeam);
        if (response.status == 'success') {
            return response.data;
        } else {
            toastManager.alertError(response.message || "Something went wrong");
            return null;
        }
    }

    const updateTeam = async (event_id: number): Promise<boolean> => {
        const response = await eventsService.updateTeam(event_id, editTeam);
        console.log({ response });
        if (response.status == 'success') {
            setUserTeam(state => ({ ...state, ...editTeam }));
            return true;
        } else {
            toastManager.alertError(response.message || "Something went wrong");
            return false;
        }
    }

    const leaveTeam = async (event_id: number) => {
        const response = await eventsService.leaveTeam(event_id);
        if (response.status == 'success') {
            setUserTeam(null);
        } else {
            toastManager.alertError(response.message || "Something went wrong");
        }
    }

    const deleteTeam = async (event_id: number): Promise<boolean> => {
        const response = await eventsService.deleteTeam(event_id);
        if (response.status == 'success') {
            return true;
        } else {
            toastManager.alertError(response.message || "Something went wrong");
            return false;
        }
    }

    const joinTeam = async (event_id: number, joinTeam: JoinTeam) => {
        const response = await eventsService.joinTeam(event_id, joinTeam);
        if (response.status == 'success') {
            setUserTeam(response.data);
        } else {
            toastManager.alertError(response.message || "Something went wrong");
        }
    }

    const getUserTeam = async (eventId: number) => {
        try {
            const response = await eventsService.getUserTeam(eventId)
            if (response.status == "success") {
                setUserTeam(response.data);
            } else {
                console.log(response.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return {
        editTeam, setEditTeam,
        userTeam, setUserTeam,
        createTeam, updateTeam, deleteTeam, leaveTeam, joinTeam, getUserTeam
    };
}