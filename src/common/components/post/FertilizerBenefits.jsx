import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

const FertilizerBenefits = () => {
  const { t } = useTranslation("common");

  const benefits = t("fertilizerSection.benefits", { returnObjects: true });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="row g-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {benefits.map((item, idx) => (
        <div key={idx} className="col-md-6 col-lg-4">
          <motion.div
            className="benefit-card"
            variants={cardVariants}
            whileHover={{
              y: -5,
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <img
              src={`/images/fertilizer${idx + 1}.png`}
              className="mx-auto mb-3"
              alt={item.title}
              role="presentation"
            />
            <h5 className="text-success fw-bold mb-2">{item.title}</h5>
            <p className="text-muted small">{item.text}</p>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default FertilizerBenefits;
