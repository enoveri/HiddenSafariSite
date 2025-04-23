import { useState, useEffect } from "react";
import { infoService } from "../api/services";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  const [termsData, setTermsData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const data = await infoService.getTermsAndConditions();
        setTermsData(data);

        // Parse content into sections
        const parsedSections = parseTermsContent(data.content);
        setSections(parsedSections);

        setLoading(false);
      } catch (err) {
        setError("Failed to load terms and conditions");
        setLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  // Parse the content string into sections
  const parseTermsContent = (content) => {
    if (!content) return [];

    // Split by numbered sections
    const sectionRegex = /(\d+\.\s[^]*?)(?=\d+\.\s|$)/g;
    const matches = [...content.matchAll(sectionRegex)];

    return matches.map((match) => {
      const sectionText = match[1].trim();
      const titleMatch = sectionText.match(/^(\d+\.\s[^\n]+)/);
      const title = titleMatch ? titleMatch[1].trim() : "";

      // Get content excluding the title
      let sectionContent = sectionText.replace(title, "").trim();

      // Handle subsections with numbering like 5.3.1, 5.3.2
      const subSections = [];
      const subSectionRegex = /(\d+\.\d+\.\d+\s[^]*?)(?=\d+\.\d+\.\d+|$)/g;
      const subMatches = [...sectionContent.matchAll(subSectionRegex)];

      if (subMatches.length > 0) {
        subMatches.forEach((subMatch) => {
          const subSectionText = subMatch[1].trim();
          const subTitleMatch = subSectionText.match(
            /^(\d+\.\d+\.\d+\s[^\n]+)/
          );
          const subTitle = subTitleMatch ? subTitleMatch[1].trim() : "";
          const subContent = subSectionText.replace(subTitle, "").trim();

          subSections.push({
            title: subTitle,
            content: subContent,
          });
        });
      }

      return {
        title,
        content: sectionContent,
        subSections: subSections.length > 0 ? subSections : null,
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2">{error}</p>
          <Link
            to="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Return to home page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 pb-12">
      {" "}
      {/* Added padding top to prevent overlap with header */}
      <h1 className="text-3xl font-bold mb-8 text-center text-[#E25B32]">
        {termsData.title}
      </h1>{" "}
      {/* Changed text color to orange */}
      <div className="prose max-w-none">
        <div className="bg-white rounded-lg shadow-md p-6">
          {sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {section.title}
              </h2>
              <div className="mb-4 text-gray-700 whitespace-pre-line">
                {section.subSections ? (
                  section.subSections.map((subSection, subIndex) => (
                    <div key={subIndex} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {subSection.title}
                      </h3>
                      <p className="whitespace-pre-line">
                        {subSection.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="whitespace-pre-line">
                    {section.content.replace(section.title, "")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="text-[#E25B32] hover:underline font-medium">
          {" "}
          {/* Changed link color to match */}
          Return to home page
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
