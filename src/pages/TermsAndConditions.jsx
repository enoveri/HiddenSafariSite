import { useState, useEffect } from 'react';
import { infoService } from '../api/services';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  const [termsData, setTermsData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const data = await infoService.getTermsAndConditions();
        setTermsData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load terms and conditions');
        setLoading(false);
      }
    };

    fetchTermsData();
  }, []);

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
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Return to home page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{termsData.title}</h1>
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: termsData.content }} />
      </div>
      <div className="mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          Return to home page
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;