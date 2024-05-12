// In Next.js, server-side functions are used to handle HTTP requests like GET, POST, PUT, DELETE, etc. These functions run on the server-side, not in the user's browser.

// The reason we use async with these functions is because they often involve operations that are asynchronous in nature, such as fetching data from a database or an external API. These operations can take some time to complete, and we don't want to block the rest of our code from running while we wait for the operation to finish.

// By marking a function with async, we're telling JavaScript that this function will return a Promise. Inside an async function, we can use the await keyword to pause the execution of the function until a Promise is resolved or rejected. This makes it easier to write and read asynchronous code, as it allows us to write asynchronous code in a more synchronous style.

import { NextResponse } from "next/server";
import { productData } from "@/constants/data";

export const GET = async () => {
  try {
    return NextResponse.json({
      message:"Products fetched successfully",
      success:true,
      productData,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Product is loading error",
      },
      { status: 500 }
    );
  }
};
