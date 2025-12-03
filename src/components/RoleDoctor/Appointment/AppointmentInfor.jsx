import React from 'react'
function AppointmentInfor({ icon: Icon, label, degree, name, position, value }) {
  const showDoctorBlock = degree || name || position

  return (
    <div className="flex items-start gap-4 py-3">
      {Icon && <Icon className="w-5 h-5 text-green-900 flex-shrink-0 mt-1" />}
      <div className="flex-1">
        {label && (
          <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">{label}</p>
        )}
        {showDoctorBlock && (
          <div className="mt-2">
            <p className="text-gray-900 font-medium text-lg">
              {degree ? `${degree} ` : ''}{name}
            </p>
            {position && (
              <p className="font-medium text-sm text-gray-700 mt-1">{position}</p>
            )}
          </div>
        )}
        {value && <p className="text-gray-900 font-medium text-lg mt-2">{value}</p>}
      </div>
    </div>
  )
}

export default AppointmentInfor
