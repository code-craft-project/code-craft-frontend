import GradientColor from "../../application/data/GradientColor.ts";

interface InformationCardProps {
    feature: FeatureCard;
}

export default function InformationCard({ feature }: InformationCardProps) {
    const { styles } = GradientColor();
    return (
        <div className='w-full text-center flex flex-col items-center relative py-10'>
            <div className={`w-20 h-20 z-10 rounded-full flex flex-col items-center justify-center text-3xl absolute top-0 ${styles.active} ${styles.from} ${styles.from_prc} ${styles.to} ${styles.to_prc}`}>
                {feature.icon}
            </div>
            <div className="w-full flex-col items-center bg-opacity-60 bg-primary-blue rounded-md hover:shadow-sm hover:scale-105 transition-all duration-500 hover:shadow-primary-blue pt-16 pb-8 px-8">
                <div className="text-gray-50 text-lg font-medium">{feature.title}</div>
                <div className='text-gray-300 text-sm mt-2'>{feature.description}</div>
                {/* <div className="mt-8 px-16 py-2 rounded-xl underline text-sm text-yellow-600 font-semibold">{feature.call_to_action}</div> */}
            </div>
        </div>
    )
}