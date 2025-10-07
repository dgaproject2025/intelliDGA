import { useState, useMemo } from 'react';

const useEquipmentFilter = (initialData) => {
  const initialFilterState = {
    searchTerm: '',
    station: 'All',
    type: 'All',
    unit: 'All',
    manufacturer: 'All',
    status: 'All',
  };

  const [filters, setFilters] = useState(initialFilterState);

  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const { searchTerm, station, type, unit, manufacturer } = filters;

      const searchTermMatch =
        searchTerm.toLowerCase() === ''
          ? true
          : item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.sapId &&
              item.sapId.toLowerCase().includes(searchTerm.toLowerCase()));

      const stationMatch = station === 'All' || item.station === station;
      const typeMatch = type === 'All' || item.type === type;
      const unitMatch = unit === 'All' || item.unit === unit;
      const manufacturerMatch =
        manufacturer === 'All' || item.manufacturer === manufacturer;

      return (
        searchTermMatch &&
        stationMatch &&
        typeMatch &&
        unitMatch &&
        manufacturerMatch
      );
    });
  }, [initialData, filters]);

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  return {
    filters,
    setFilters,
    filteredData,
    resetFilters,
  };
};

export default useEquipmentFilter;
