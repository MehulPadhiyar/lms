import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Certificate() {
  const { courseId } = useParams();
  const [data, setData] = useState();
  const certiRef = useRef();
  const navigate = useNavigate();
  const doc = new jsPDF({ unit: 'mm', format: [240, 200] });

  useEffect(function () {
    async function getCertificateData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses/certificate/${courseId}`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (err) {
        navigate('/dashboard');
      }
    }

    getCertificateData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div ref={certiRef} className="max-w-4xl mx-auto border-8 border-primary bg-white p-12 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-primary mb-2">Certificate of Completion</h1>
        <h2 className="text-center text-lg text-gray-700 mb-10">This is to certify that</h2>
        <div className="text-center text-3xl font-semibold text-gray-900 mb-4">{data?.userName}</div>
        <div className="text-center text-lg text-gray-600 mb-6">has successfully completed the {data?.title}</div>
        <div className="text-center text-sm text-gray-500 mb-10">Issued by Learnify</div>
        <div className="flex justify-between items-center mt-24">
          <div className="text-center w-1/3">
            <p className="italic">{data?.instructor}</p>
            <div className="border-t border-gray-500 mt-2"></div>
            <div className="pt-2 text-gray-800 text-sm">Instructor's Signature</div>
          </div>
          <div className="text-right w-1/3 text-gray-700 text-sm">Date: {new Date().toLocaleDateString()}</div>
        </div>
        <div className="text-center mt-10 text-primary text-lg font-bold flex justify-center items-center gap-1">
          <img src="/Logo.png" alt="logo image" className="w-6" />
          <p>Learnify</p>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={async () => {
            await doc.html(certiRef.current, {
              callback: function (doc) {
                doc.save('certificate.pdf');
              },
              x: 11,
              y: 20,
              width: 180,
              windowWidth: certiRef.current.scrollWidth,
            });
          }}
          className="bg-green-600 text-white px-4 py-2 flex items-center gap-3 rounded-md"
        >
          <span className="font-semibold">Download</span>
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}
