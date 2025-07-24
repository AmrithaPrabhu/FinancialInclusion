import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      link: "/planner",
      title: t("home.planner.title"),
      description: t("home.planner.description"),
    },
    {
      link: "/govt-schemes",
      title: t("home.schemes.title"),
      description: t("home.schemes.description"),
    },
    {
      link: "/needs-vs-wants",
      title: t("home.needs.title"),
      description: t("home.needs.description"),
    },
    {
      link: "/scam-buster",
      title: t("home.scam.title"),
      description: t("home.scam.description"),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f8ff] p-6 pt-8">
      <h1 className="text-4xl font-bold text-center text-[#0018A8] mb-10">
        {t("home.heading")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, idx) => (
          <Link to={feature.link} key={idx}>
            <div className="bg-white border border-[#cdd6f7] shadow-md hover:shadow-lg transition duration-200 rounded-2xl p-6 hover:-translate-y-1">
              <h2 className="text-xl font-semibold mb-2 text-[#0018A8]">
                {feature.title}
              </h2>
              <p className="text-gray-700 text-sm">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
