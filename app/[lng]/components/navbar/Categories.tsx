'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from "../CategoryBox";
import Container from '../Container';

import KidsIcon from '@/public/icons/kids.svg'
import KosherIcon from '@/public/icons/kosher.svg'
import AccesibilityIcon from '@/public/icons/accessibility.svg'
import PetsIcon from '@/public/icons/pets.svg'
import NoSmokingIcon from '@/public/icons/noSmoking.svg'
import ParkingIcon from '@/public/icons/parking.svg'
import ShelterIcon from '@/public/icons/shelter.svg'
import { SvgIcon } from '@mui/material';

ShelterIcon
export interface ICategory {
  icon: any,
  label: string;
  description: string;
}

export const allCategories: ICategory[] = [
  {
    icon: <SvgIcon component={AccesibilityIcon} htmlColor='white' />,
    label: 'accessible',
    description: 'accessibleProperty',
  },
  {
    icon: <SvgIcon component={KidsIcon} htmlColor='white' />,
    label: 'children',
    description: 'childrenFriendly',
  },
  {
    icon: <SvgIcon component={KosherIcon} htmlColor='white' />,
    label: 'kosher',
    description: 'kosherKeeping'
  },
  {
    icon: <SvgIcon component={PetsIcon} htmlColor='white' />,
    label: 'pets',
    description: 'petsFriendly'
  },
  {
    icon: <SvgIcon component={NoSmokingIcon} htmlColor='white' />,
    label: 'noSmoking',
    description: 'noSmoking'
  },
  {
    icon: <SvgIcon component={ParkingIcon} htmlColor='white' />,
    label: 'parking',
    description: 'parkingAvailable'
  },
  {
    icon: <SvgIcon component={ShelterIcon} htmlColor='white' />,
    label: 'shelter',
    description: 'indoorShelter',
  },
]

const Categories = ({ lng }: { lng: string }) => {
  const params = useSearchParams();
  const categories = params?.getAll('categories');
  const pathname = usePathname();
  const isMainPage = pathname === `/${lng}`;

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-center
          overflow-x-auto
        "
      >
        {allCategories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={categories?.includes(item.label)}
            lng={lng}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;