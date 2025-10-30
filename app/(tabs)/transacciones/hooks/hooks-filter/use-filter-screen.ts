import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FilterType, useFilter } from '../../contexts/context-filter-transaction/FilterContext';
import { getRangeTime } from './use-range-time';

export const useFilterScreen = () => {
    const router = useRouter();
    const { appliedFilters, applyFilters } = useFilter();

    const [activeTypeTab, setActiveTypeTab] = useState<FilterType>(appliedFilters.type);
    const [activeRangeTimeTab, setActiveRangeTimeTab] = useState<string>(appliedFilters.range);
    
    const [rangeDate, setRangeDate] = useState<[Date, Date] | null>(() => getRangeTime(appliedFilters.range));

    useFocusEffect(
        useCallback(() => {
            setActiveTypeTab(appliedFilters.type);
            setActiveRangeTimeTab(appliedFilters.range);
            const newRangeDate = getRangeTime(appliedFilters.range);
            setRangeDate(newRangeDate);
        }, [appliedFilters])
    );

    const handleApplyFilters = () => {
        applyFilters({
            type: activeTypeTab,
            range: activeRangeTimeTab,
            dates: rangeDate,
        });
        router.back();
    };

    const handleClearFilters = () => {
        applyFilters({
            type: 'all',
            range: 'all',
            dates: null,
        });
    };

    return {
        activeTypeTab,
        setActiveTypeTab,
        activeRangeTimeTab,
        setActiveRangeTimeTab,
        rangeDate,
        setRangeDate,
        handleApplyFilters,
        handleClearFilters,
    };
};
