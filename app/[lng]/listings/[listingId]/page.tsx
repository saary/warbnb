import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/[lng]/components/ClientOnly";
import EmptyState from "@/app/[lng]/components/EmptyState";

import ListingClient from "./ListingClient";
import { useTranslation } from "@/app/i18n";

interface IParams {
  listingId?: string;
  lng: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState lng={params.lng} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
        lng={params.lng}
      />
    </ClientOnly>
  );
};

export default ListingPage;
