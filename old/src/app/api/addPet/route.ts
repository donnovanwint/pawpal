// /pages/api/addPet.js
import dbConnect from '../../../utils/mongodb';
import Pet from '../../../utils/petModel';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';


export async function POST(request : Request, res : Response) {
  const data = await request.json();
  const session = await getSession({  });
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' });
  }

  try {
    await dbConnect();
    const pet = await Pet.create({
      ...request.body,
      ownerEmail: session.user.email,
    });
    NextResponse.json({
      pet
    }, {
      status: 400,
    })
  } catch (error) {
    NextResponse.json({
      message: "Please try again"
    }, {
      status: 500,
    })
  }


  // return NextResponse.json({
  //     data,
  //  });
}
