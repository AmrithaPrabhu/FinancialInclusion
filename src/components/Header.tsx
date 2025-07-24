import { Link } from "react-router-dom";

export const Header = ({ onLanguageChange }: { onLanguageChange: (lang: string) => void }) => {
    return (
        <header className="fixed top-0 left-0 w-full bg-[#0018A8] text-white shadow-md z-50">
            <div className="flex justify-between items-center px-4 py-2">
                <Link to='/' className="bg-[#0018A8] hover:underline">
                    <h1 className="text-lg font-semibold">Digi-Laxmi</h1>
                </Link>
                <select
                    className="bg-white text-[#0018A8] px-2 py-1 rounded"
                    onChange={(e) => onLanguageChange(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="mr">मराठी</option>
                </select>
            </div>
        </header >
    );
};