import { Train } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/" className="flex items-center space-x-2">
        <Train className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-blue-600">RAIL-O</h1>
      </Link>
    </>
  );
};

export default Logo;
