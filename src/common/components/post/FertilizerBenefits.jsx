export default function FertilizerBenefits() {
    const benefits = [
        {
            title: 'توفير العناصر الغذائية',
            text: 'التربة قد تكون فقيرة في بعض العناصر الغذائية المهمة مثل النيتروجين أو الفوسفور أو المغنيسيوم. الأسمدة توفر هذه العناصر التي تفتقر إليها التربة بشكل طبيعي',
            image: '/images/fertilizer1.png',
        },
        {
            title: 'تحسين نمو النباتات',
            text: 'تساهم الأسمدة في تعزيز النمو الصحي للنباتات من خلال توفير العناصر اللازمة لتطوير الجذور، السيقان، الأوراق، والأزهار. كما تسرع عملية التمثيل الغذائي للنبات',
            image: '/images/fertilizer2.png',
        },
        {
            title: 'زيادة الإنتاجية الزراعية',
            text: 'الأسمدة تساعد في تحسين خصوبة التربة وتزويد النباتات بالعناصر الغذائية الأساسية مثل النيتروجين والفوسفور والبوتاسيوم، مما يساهم في زيادة المحصول وجودته',
            image: '/images/fertilizer3.png',
        },
        {
            title: 'التكيف مع الظروف البيئية الصعبة',
            text: 'الأسمدة تعمل على تحسين قدرة النباتات على التكيف مع ظروف بيئية مختلفة مثل التربة الفقيرة أو ظروف الجفاف أو عوامل الطقس',
            image: '/images/fertilizer4.png',
        },
        {
            title: 'تحفيز النمو الجيد للمحاصيل',
            text: 'الأسمدة تساعد في تعزيز النمو المتوازن للنباتات، مما يؤدي إلى تحسين الإنتاجية الزراعية وزيادة العوائد الاقتصادية للمزارعين',
            image: '/images/fertilizer5.png',
        },
        {
            title: 'تحسين خصوبة التربة',
            text: 'الأسمدة العضوية مثل السماد العضوي أو الكمبوست يمكن أن تحسن هيكل التربة، مما يسهل تهويتها ويزيد قدرتها على الاحتفاظ بالرطوبة',
            image: '/images/fertilizer6.png',
        },
    ];

    return (
        <div className="container py-5" dir="rtl">
            <div className="row g-4">
                {benefits.map((item, idx) => (
                    <div key={idx} className="col-md-6 col-lg-4">
                        <div className="benefit-card">
                            <img
                                src={item.image}
                                className="mx-auto mb-3"
                                alt={item.title}
                                role="presentation"
                            />

                            <h5 className="text-success fw-bold mb-2">{item.title}</h5>
                            <p className="text-muted small">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
