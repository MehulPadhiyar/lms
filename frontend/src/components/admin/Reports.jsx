import { useEffect, useRef, useState } from 'react';
import UsersReport from './UsersReport';
import CoursesReport from './CoursesReport';
import { Toaster } from 'react-hot-toast';
import InstructorsReport from './InstructorsReport';
import TransactionsReport from './TransactionsReport';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

export default function Reports() {
  const [active, setActive] = useState('courses');
  const divRef = useRef();
  const tableRef = useRef();
  const selectRef = useRef();
  const doc = new jsPDF();

  useEffect(() => {
    divRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
  }, []);

  return (
    <>
      <div ref={divRef} className="py-4 px-10">
        <div className="flex justify-between">
          <div className="px-4 py-1 rounded-2xl mb-4 bg-slate-100 border-2 border-gray-400 w-fit">
            <select
              ref={selectRef}
              onChange={(e) => setActive(e.target.value)}
              className="focus:outline-none px-2 bg-slate-100"
            >
              <option value="courses">Courses</option>
              <option value="instructors">Instructors</option>
              <option value="transactions">Transactions</option>
              <option value="users">Users</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => {
                autoTable(doc, { html: tableRef.current });
                doc.save(`${selectRef.current.value}.pdf`);
              }}
              className="bg-green-600 text-white px-4 py-2 flex items-center gap-3 rounded-md"
            >
              <span className="font-semibold">Export</span>
              <Download size={20} />
            </button>
          </div>
        </div>
        {active === 'courses' && <CoursesReport tableRef={tableRef} />}
        {active === 'instructors' && <InstructorsReport tableRef={tableRef} />}
        {active === 'transactions' && <TransactionsReport tableRef={tableRef} />}
        {active === 'users' && <UsersReport tableRef={tableRef} />}
      </div>
      <Toaster />
    </>
  );
}
