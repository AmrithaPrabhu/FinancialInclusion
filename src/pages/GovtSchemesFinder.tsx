import { useState } from "react";
import { useTranslation } from "react-i18next";

interface GovtScheme {
  title: string;
  description: string;
}

export default function GovtSchemesFinder() {
  const { t } = useTranslation();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<GovtScheme[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/schemes", {
        method: "POST",
        body: JSON.stringify({ gender, age, state, query }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setSchemes(data);
    } catch (err) {
      console.error("Error fetching schemes:", err);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setGender("");
    setAge("");
    setState("");
    setQuery("");
    setSchemes([]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-center mb-4">
        {t("govtSchemes.title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">{t("govtSchemes.gender")}</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">{t("govtSchemes.selectGender")}</option>
            <option value="male">{t("govtSchemes.male")}</option>
            <option value="female">{t("govtSchemes.female")}</option>
            <option value="other">{t("govtSchemes.other")}</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">{t("govtSchemes.age")}</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded px-3 py-2"
            min={0}
            max={120}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">{t("govtSchemes.state")}</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">{t("govtSchemes.selectState")}</option>
            <option value="maharashtra">{t("states.maharashtra")}</option>
            <option value="delhi">{t("states.delhi")}</option>
            <option value="uttarPradesh">{t("states.uttarPradesh")}</option>
            <option value="karnataka">{t("states.karnataka")}</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">{t("govtSchemes.query")}</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder={t("govtSchemes.queryPlaceholder")}
          />
          <p className="text-sm text-gray-500 mt-1">
            {t("govtSchemes.typeInYourLanguage", "You can type in your preferred language (Hindi, Marathi etc).")}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
          >
            {t("govtSchemes.reset")}
          </button>
          <button
            type="submit"
            className="bg-[#0018A8] hover:bg-[#001070] text-white px-4 py-2 rounded"
          >
            {loading ? t("govtSchemes.loading") : t("govtSchemes.find")}
          </button>
        </div>
      </form>

      {schemes.length > 0 && (
        <div className="mt-6 space-y-4">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded shadow-sm"
            >
              <h3 className="font-bold text-lg">{scheme.title}</h3>
              <p className="text-gray-700">{scheme.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
