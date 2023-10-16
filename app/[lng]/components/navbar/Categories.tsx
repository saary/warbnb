'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from "../CategoryBox";

import { ICategory } from '../types';
import Image from 'next/image';

// eslint-disable-next-line react/display-name
const mkIconElement = (name: string) => (size: number  = 24) => (
  <Image className="hidden md:block cursor-pointer"
  src={`/icons/${name}.svg`}
  alt={`${name}`}
  height={`${size}`}
  width={`${size}`}
  />
);


 export const allCategories: ICategory[] = [
  {

    renderIcon: mkIconElement('accessibility'),
    label: 'accessible',
    description: 'accessibleProperty',
  },
  {
    renderIcon: mkIconElement('kids'),
    label: 'children',
    description: 'childrenFriendly',
  },
  {
    renderIcon: mkIconElement('kosher'),
    label: 'kosher',
    description: 'kosherKeeping'
  },
  {
    renderIcon: mkIconElement('pets'),
    label: 'pets',
    description: 'petsFriendly'
  },
  {
    renderIcon: mkIconElement('noSmoking'),
    label: 'noSmoking',
    description: 'noSmoking'
  },
  {
    renderIcon: mkIconElement('parking'),
    label: 'parking',
    description: 'parkingAvailable'
  },
  {
    renderIcon: mkIconElement('shelter'),
    label: 'shelter',
    description: 'indoorShelter',
  },
  {
    renderIcon: mkIconElement('shelter-near-by'),
    label: 'nearbyShelter',
    description: 'nearbyShelterDesc',
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
      <div
        className={`"
          grid grid-cols-${allCategories.length}
          items-center 
          justify-center
          gap-1
        "`}
      >
        {allCategories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            renderIcon={item.renderIcon}
            selected={categories?.includes(item.label)}
            lng={lng}
          />
        ))}
      </div>
  );
}
 
export default Categories;