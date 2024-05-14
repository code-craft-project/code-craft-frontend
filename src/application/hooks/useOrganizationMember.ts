import { useContext, useState } from "react"
import { organizationsService } from "../services"
import ToastContext from "../contexts/ToastContext";
const initValue = {
    user_id: 0,
    role: 'events_manager',
    organization_id: 0,
}
export default function useOrganizationMember(): useOrganizationMemberReturn {

    const [member, setMember] = useState<MemberEntity>(initValue)
    const toastManager = useContext(ToastContext);

    const deleteMember = async () => {
        const response =await organizationsService.deleteMemberRole(member?.organization_id as number,member?.id as number)
        if( response.message === 'success' ) {
            toastManager.alertSuccess('Member deleted successfully')
        }else{
            toastManager.alertError(response.message || "");
        }
    }
    return {
        member,
        setMember,
        deleteMember
    }
}
