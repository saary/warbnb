"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IoMdWarning, IoIosMail } from "react-icons/io";

import useBecomeHostModal from "@/app/hooks/useBecomeHostModal";
import { useTranslation } from "@/app/i18n/client";

import Banner from "@/app/[lng]/components/Banner";
import SlimModal from "./SlimModal";
import Input from "../inputs/TextArea";
import Heading from "../Heading";
import TextArea from "../inputs/TextArea";
import Button from "@mui/material/Button";

const BecomeHostModal = ({ lng }: { lng: string }) => {
  const router = useRouter();
  const becomeHostModal = useBecomeHostModal();
  const { t } = useTranslation(lng);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success(t("loginSuccessToast"));
        router.refresh();
        becomeHostModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-x-8 gap-y-4">
      <Heading title={t("hostRegistrationTile")} icon={IoMdWarning} />
      <div className="-my-6"></div>
      <Banner title={undefined} text={t("hostRegistrationNotice")} />
      <label>
        {t('registerContactUs')}
      </label>
      <div className="flex flex-row items-center gap-2 justify-center">
        <IoIosMail /> <a href="mailto:help@safebnb.co">help@safebnb.co</a>
      </div>
      <div className="flex items-center gap-2 justify-center">
        <Button onClick={becomeHostModal.onClose}>{t('ok')}</Button>
      </div>
    </div>
  );

  return (
    <SlimModal
      disabled={isLoading}
      isOpen={becomeHostModal.isOpen}
      title={t("becomeHostTitle")}
      onClose={becomeHostModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    //   actionLabel={t("submit")}
      body={bodyContent}
    />
  );
};

export default BecomeHostModal;
