import GradientColor from "../components/GradiantColor";

interface Props {
    title: string;
    text: string;
}

function InformationCard({ title, text }: Props) {
    const { styles } = GradientColor();
    return (
        <div className='w-[15rem] text-center h-40 py-5 px-5 bg-opacity-60 bg-primary-blue flex flex-col items-center justify-around relative rounded-md hover:shadow-sm hover:scale-105 transition-all duration-500 hover:shadow-primary-blue'>
            <div className={`w-10 h-10 rounded-full ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc} absolute bottom-36 left-24`}></div>
            <h1>{title}</h1>
            <h2 className='text-sm'>{text}</h2>
        </div>
    )
}

export default InformationCard;
