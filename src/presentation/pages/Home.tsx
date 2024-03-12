import { useContext } from "react";
import ToastContext from "../../application/contexts/ToastContext";

export default function Home() {
    const toastManager = useContext(ToastContext);

    const alertSuccessHandler = () => { toastManager.alertSuccess("Success Message"); }
    const alertErroreHandler = () => { toastManager.alertError("Error Message"); }
    const alertInfoHandler = () => { toastManager.alertInfo("Info Message"); }

    return (
        <div className={styles.container}>
            <button className={`${styles.btn} ${styles.btn_success}`} onClick={alertSuccessHandler}>Alert Success</button>
            <button className={`${styles.btn} ${styles.btn_error}`} onClick={alertErroreHandler}>Alert Error</button>
            <button className={`${styles.btn} ${styles.btn_info}`} onClick={alertInfoHandler}>Alert Info</button>
        </div>
    )
}

const styles = {
    container: "w-full h-screen overflow-auto bg-black flex justify-around items-center",
    btn: "px-16 py-2 rounded-lg text-white",
    btn_info: "bg-yellow-600",
    btn_success: "bg-green-600",
    btn_error: "bg-red-600",
};