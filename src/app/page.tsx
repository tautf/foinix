import Link from "next/link";

import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/products">
        <Button>Products</Button>
      </Link>
      <Button>Product Types</Button>
    </div>
  );
}
