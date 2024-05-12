// The item?. syntax is using optional chaining, a feature in JavaScript that allows you to access nested object properties without having to explicitly check if each property in the chain exists.

// In your code, item is an object passed as a prop to the ProductsData component. The ?. operator is used when accessing properties of item like item?.image, item?.isNew, and item?.title.

// If item is null or undefined, instead of throwing an error, item?.image, item?.isNew, and item?.title will simply return undefined. This can be useful in preventing runtime errors when dealing with objects that may not always have a certain property.

// In the context of your React component, this means that even if item is null or undefined, the component will still render without errors, although the Image and span elements may not display as expected.

"use client";

import Image from "next/image";
import { ItemProps } from "../../type";
import { calculatePercentage } from "@/helpers";
import FormattedPrice from "./FormattedPrice";
import { IoIosStar } from "react-icons/io";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductsData = ({ item }: ItemProps) => {
  const dispatch = useDispatch();
  // creating a new array with length equal to item?.rating. The Array.from() method creates a new array instance from an iterable object. In this case, it's creating an array from an object with a length property. This is a common trick to create an array of a specific length in JavaScript.

  // (_, index) => {...}: This is the map function that Array.from() is using to fill the new array. It's a function that takes two arguments: the current value and the current index. In this case, the current value is not being used (hence the _ placeholder), and only the index is being used.

  // <span key={index} className="text-yellow-400"><IoIosStar /></span>: This is the value that's being returned for each element in the new array. It's a JSX element representing a star icon. The key prop is being set to the current index, which is a requirement when rendering lists of elements in React.

  // Syntax: Array.from(arrayLike[, mapFn[, thisArg]])

  // arrayLike: An array-like or iterable object to convert to an array.
  // mapFn: Map function to call on every element of the array. This argument is optional.
  // thisArg: Value to use as this when executing mapFn. This argument is also optional.
  const starArray = Array.from({ length: item?.rating }, (_, index) => (
    <span key={index} className="text-yellow-400">
      <IoIosStar />
    </span>
  ));

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div>
        <Link href={{ pathname: "/product", query: { _id: item?._id } }}>
          <div className="w-full h-96 group overflow-hidden relative">
            <Image
              src={item?.image}
              alt="product image"
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-110 duration-200 rounded-t-lg"
            />
            {item?.isNew && (
              <span className="absolute top-2 right-2 font-medium text-xs py-1 px-3 rounded-full bg-white group-hover:bg-orange-600 group-hover:text-white duration-200">
                New Arrival
              </span>
            )}
          </div>
        </Link>
        <div className="border-[1px] border-slate-300 border-t-0 px-2 py-4 flex flex-col gap-y-2 bg-white rounded-b-lg">
          <p>{item?.title}</p>
          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div className="border-[1px] border-orance-600 py-1 px-4 rounded-full text-xs">
              <p>{calculatePercentage(item?.price, item?.oldPrice)}% off</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p className="text-slate-500 line-through text-sm">
                <FormattedPrice amount={item?.oldPrice} />
              </p>
              <p className="font-semibold">
                <FormattedPrice amount={item?.price} />
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* Add to cart button */}
            <button
              onClick={() =>
                dispatch(addToCart(item)) &&
                toast.success(
                  `${item?.title.substring(0, 15)} added successfully`
                )
              }
              className="bg-orange-600 px-4 py-2 text-sm tracking-wide rounded-full text-slate-100 hover:bg-orange-800 hover:text-white duration-200"
            >
              Add to cart
            </button>
            {/* star icon */}
            <div className="flex items-center gap-x-1">{starArray}</div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductsData;
