import Image from "next/image";
import Link from "next/link";

export default function BookCard({
  bookId,
  title,
  author,
  description,
  price,
  imgUrl,
  addToCart,
}) {
  return (
    <Link href={`/book/${bookId}`}>
      <section className="my-4 w-80 border !border-red-500 rounded-lg cursor-pointer flex flex-col flex-nowrap">
        <Image
          src={imgUrl}
          width={200}
          height={350}
          alt="Book"
          style={{
            width: "100%",
            height: "350px",
            marginTop: "10px",
            objectFit: "contain",
          }}
        />
        <h5 className="text-center mt-2 text-lg font-bold">{title}</h5>
        <h6 className="text-center text-lg">Author: {author}</h6>
        <h6 className="text-center text-lg">Rs {price}</h6>
        <button
          className="w-32 mx-auto mb-2 bg-red-600 text-white rounded-lg"
          onClick={(e) => addToCart(e)}
        >
          Add To Cart
        </button>
      </section>
    </Link>
  );
}
