'use client';

import Select from 'react-select'

import useBureaus from '@/app/hooks/useBureaus';
import { useTranslation } from '@/app/i18n/client';

export type BureauSelectValue = {
  label: string;
  latlng: number[],
  region: string;
  value: string
}

interface BureauSelectProps {
  value?: BureauSelectValue;
  onChange: (value: BureauSelectValue) => void;
  lng: string;
}

const BureauSelect: React.FC<BureauSelectProps> = ({
  value,
  onChange,
  lng,
}) => {
  const { t } = useTranslation(lng);
  const { getAll } = useBureaus();

  return ( 
    <div>
      <Select
        placeholder={`${t("select")}...`}
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as BureauSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="
          flex flex-row items-center gap-3">
            <div>
              {option.label}, 
              <span className="text-neutral-500 mr-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
   );
}
 
export default BureauSelect;