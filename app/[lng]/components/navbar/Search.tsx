'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

import useSearchModal from '@/app/hooks/useSearchModal';
import useBureaus from '@/app/hooks/useBureaus';
import { useTranslation } from "@/app/i18n/client";

import { STEPS } from '../types';

const Search = ({ lng }: { lng: string }) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useBureaus();
  const { t } = useTranslation(lng);

  const  locationValue = params?.get('locationValue'); 
  const  startDate = params?.get('startDate');
  const  endDate = params?.get('endDate');
  const  guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return t('searchBarRegion');
  }, [locationValue, getByValue, t]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${t('days')} ${diff}`;
    }

    return t('searchBarDates');
  }, [startDate, endDate, t]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} ${t('guests')}`;
    }

    return t('searchBarGuests');
  }, [guestCount, t]);

  return ( 
    <div
      className="
        border-[1px] 
        lg:w-auto
        rounded
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
        md:block
      "
    >
      <div 
        className="
          lg:flex
          flex-col
          h-14
          sm:h-auto
          sm:flex-row
          sm:shrink-0
          p-1
          md:p-2
          gap-1 
          md:gap-2
          justify-center
        ">
        <div 
          onClick={() => searchModal.onOpen(STEPS.LOCATION)}
          className="
            md:inline-block w-24 sm:w-32 h-4 sm:h-6
            text-sm
            md:text-base
            text-gray-600
            text-center
          "
        >
          {locationLabel}
        </div>
        <div className="hidden md:inline-block text-slate- 100 md:text-slate-400 font-thin">|</div>
        <div className="md:hidden"><hr/></div>
        <div 
          onClick={() => searchModal.onOpen(STEPS.INFO)}
          className="
            md:inline-block w-32 sm:w-40 h-4 sm:h-6
            text-sm
            lg:text-base
            text-gray-600
            text-center
          "
        >
          <div className="hidden sm:block h-4 sm:h-6">{guestLabel}</div>
        </div>
      </div>
    </div>
  );
}
 
export default Search;