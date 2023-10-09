'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbMoodKid, TbAccessible } from 'react-icons/tb';
import { MdOutlineVilla } from 'react-icons/md';

import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
  {
    label: 'נגיש',
    icon: TbAccessible,
    description: 'מקום נגיש',
  },
  {
    label: 'ילדים',
    icon: TbMoodKid,
    description: 'מקום ידידותי לילדים',
  },
  {
    label: 'כשר',
    icon: MdOutlineVilla,
    description: 'מקום שומר כשרות'
  },
  {
    label: 'בעלי חיים',
    icon: MdOutlineVilla,
    description: 'מותר בעלי חיים'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

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
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
 
export default Categories;