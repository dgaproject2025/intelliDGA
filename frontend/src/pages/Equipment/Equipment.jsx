import React, { useState } from 'react';
import EquipmentHero from './EquipmentHero.jsx';
import EquipmentList from './EquipmentList.jsx';
import EquipmentCreationModal from './EquipmentCreationModal.jsx';

// Mock Data - Replace with API call in the future
const mockEquipmentData = [
  {
    id: 'GT-10A',
    station: 'MTPS-Mundra',
    type: 'Generator Transformer',
    unit: 'Unit-10',
    designation: 'GT-10A',
    mvaRating: '500',
    primaryVoltage: '400',
    secondaryVoltage: '21',
    manufacturer: 'BHEL',
    commissioningDate: '2011-01-15',
  },
  {
    id: 'UT-20B',
    station: 'MTPS-Mundra',
    type: 'Unit Transformer',
    unit: 'Unit-20',
    designation: 'UT-20B',
    mvaRating: '150',
    primaryVoltage: '400',
    secondaryVoltage: '21',
    manufacturer: 'CGL',
    commissioningDate: '2012-05-20',
  },
  {
    id: 'SAT-01',
    station: 'MTPS-Mundra',
    type: 'Station Auxiliary Transformer',
    unit: 'Station',
    designation: 'SAT-01',
    mvaRating: '50',
    primaryVoltage: '400',
    secondaryVoltage: '11',
    manufacturer: 'Siemens',
    commissioningDate: '2010-11-30',
  },
  {
    id: 'R-40',
    station: 'MTPS-Mundra',
    type: 'Reactor',
    unit: 'Unit-40',
    designation: 'R-40',
    mvaRating: '80',
    primaryVoltage: '400',
    secondaryVoltage: 'N/A',
    manufacturer: 'ABB',
    commissioningDate: '2014-08-01',
  },
];

function Equipment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipmentData, setEquipmentData] = useState(mockEquipmentData);

  const handleCreateEquipment = (newEquipment) => {
    // This is where you would handle the form submission,
    // e.g., send data to your backend API.
    // For now, we'll just add it to our mock data list.
    const newId = `EQ-${Math.floor(Math.random() * 1000)}`;
    setEquipmentData([...equipmentData, { ...newEquipment, id: newId }]);
    console.log('New Equipment Data:', newEquipment);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-full transition-colors duration-500">
      <EquipmentHero onOpenModal={() => setIsModalOpen(true)} />

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-blue-200 dark:bg-blue-600">
        <EquipmentList equipmentData={equipmentData} />
      </main>

      <EquipmentCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEquipment}
      />
    </div>
  );
}

export default Equipment;
