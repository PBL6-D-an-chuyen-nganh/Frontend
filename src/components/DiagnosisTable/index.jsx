import React from "react";
import { useNavigate } from "react-router-dom";
import { LuNotepadText } from "react-icons/lu";

export default function DiagnosistTable({ patients}) {

  const navigate = useNavigate();
  const onViewDetail = (diagnosisId) => {
    navigate(`/diagnoses/${diagnosisId}/detail`);
  }

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full bg-green-900 rounded ">
        <thead className="text-white">
          <tr>
            <th className="px-4 py-2 text-left">Tên bệnh nhân</th>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Giới tính</th>
            <th className="px-4 py-2 text-left">Ngày khám</th>
            <th className="px-4 py-2 text-center">Bệnh án</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            <tr
              key={idx}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-green-50"}`}
            >
              <td className="px-4 py-2 font-medium text-gray-600">{p.patientName}</td>
              <td className="px-4 py-2 text-gray-600">{p.patientId}</td>
              <td className="px-4 py-2 text-gray-600">{p.gender}</td>
              <td className="px-4 py-2 text-gray-600">{p.dateOfDiagnosis}</td>
              <td className="px-4 py-2 text-center">
                <LuNotepadText 
                  size={24} 
                  className="inline text-green-900 hover:text-green-700 cursor-pointer" 
                  onClick = {() => onViewDetail(p.diagnosisID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
