import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  const user = undefined;
  const isAdmin = false;
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            Tecni Caterpillar Cali SAS
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign out
                </Link>
                {isAdmin ? (
                   <Link
                   href="/api/auth/logout"
                   className={buttonVariants({
                     size: "sm",
                     variant: "ghost",
                   })}
                 >
                   Dashboard 💸
                 </Link>
                ) : null }
                <Link
                  href="/buy/products"
                  className={buttonVariants({
                    size: "sm",
                    className: 'hidden sm:flex items-center gap-1'
                  })}
                >
                  Comprar 🛒
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Registrar
                </Link>
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Iniciar sesión
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href="/buy/products"
                  className={buttonVariants({
                    size: "sm",
                    variant: "outline",
                    className: 'hidden sm:flex items-center gap-1 bg-white text-black'
                  })}
                >
                  Comprar 🛒
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
