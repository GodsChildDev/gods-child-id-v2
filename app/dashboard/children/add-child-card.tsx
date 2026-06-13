"use client";

import { Card, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function AddChildCard() {
  return (
    <Card>
      <CardHeader className="text-center mt-5">
        <CardTitle className="text-3xl">Add Child</CardTitle>
      </CardHeader>
      <CardFooter className="mt-25 flex items-center justify-center">
        <Link href="/dashboard/children/new">
          <Image
            src="/plus-icon.jpg"
            width={150}
            height={150}
            alt="add child button"
            />
        </Link>
      </CardFooter>
    </Card>
  );
}