import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// user create reservation
export async function POST(request: Request) {
  // add check to ensure user session
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate } = body;

  if (!listingId || !startDate || !endDate) {
    return NextResponse.error();
  }

  const query: any = {};
  query.id = listingId;
  query.NOT = {
    reservations: {
      some: {
        OR: [
          {
            endDate: { gte: startDate },
            startDate: { lte: startDate },
          },
          {
            startDate: { lte: endDate },
            endDate: { gte: endDate },
          },
        ],
      },
    },
  };

  const listingAndReservation = await prisma.listing.update({
    where: query,
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
