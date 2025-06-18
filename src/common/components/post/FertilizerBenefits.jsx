import { useTranslation } from 'next-i18next';

const FertilizerBenefits = () => {
  const { t } = useTranslation('common');

  const benefits = t('fertilizerSection.benefits', { returnObjects: true });

  return (
    <div className="row g-4">
      {benefits.map((item, idx) => (
        <div key={idx} className="col-md-6 col-lg-4">
          <div className="benefit-card">
            <img
              src={`/images/fertilizer${idx + 1}.png`}
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
  );
};

export default FertilizerBenefits;
