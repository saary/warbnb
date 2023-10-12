import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "../../i18n/settings";
import Button from "./Button";

interface Props {
  lng: string;
}
export const LanaguageSwitcher: React.FC<Props> = ({ lng }) => {
  return (
    <div className="mt-8 w-20">
      {/* <Trans i18nKey="languageSwitcher">
        Switch from <strong>{lng}</strong> to:{" "}
      </Trans> */}
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <div 
              key={l}
              className={`
              hidden
              text-center
              md:block
              text-sm 
              font-semibold 
              py-3 
              px-4 
              rounded-full 
              hover:bg-slate-100 
              transition 
              cursor-pointer`}>
              {index > 0 && " or "}
              <Link href={`/${l}`}>{l}</Link>
            </div>
          );
        })}
    </div>
  );
};
