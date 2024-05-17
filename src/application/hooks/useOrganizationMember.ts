import { useContext, useState } from "react"
import { organizationsService } from "../services"
import ToastContext from "../contexts/ToastContext";
const initValue: MemberEntity = {
    user_id: 0,
    role: 'events_manager',
    organization_id: 0,
}
export default function useOrganizationMember(): useOrganizationMemberReturn {

    const [member, setMember] = useState<MemberEntity>(initValue)
    const toastManager = useContext(ToastContext);

    const updateMember = async () => {
        try{
            const response = await organizationsService.updateMemberRole(member.organization_id,member.id as number, member);
            console.table(member)
            if( response.status === 'success' ) {
                toastManager.alertSuccess('Member updated successfully')
            }else{
                toastManager.alertError(response.message || "");
            }
        }catch(err){
            console.log(err)
            toastManager.alertError('Something failed')
        }
    }

    const deleteMember = async () => {
        const response =await organizationsService.deleteMemberRole(member?.organization_id as number,member?.id as number)
        if( response.status  === 'success' ) {
            toastManager.alertSuccess('Member deleted successfully')
        }else{
            toastManager.alertError(response.message || "");
        }
    }
    return {
        member,
        setMember,
        deleteMember,
        updateMember
    }
}
