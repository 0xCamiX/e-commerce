import Link from 'next/link';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingCart } from 'lucide-react';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex items-center z-40 font-semibold'>
            <Image
              src={'/logo/logo.png'}
              width={40}
              height={25}
              alt='Eólicos Gallego'
              className='mr-2'
            />
            <span className='flex items-center'>Eólicos Gallego</span>
          </Link>
          <div className='h-full flex items-center space-x-4'>
            {!user || !isAdmin ? (
              <>
                <Link
                  href='#projects'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Proyectos
                </Link>
                <Link
                  href='#tutorial'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Tutorial
                </Link>
                <Link
                  href='#testimonials'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Testimonios
                </Link>
                <Link
                  href='#contact'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Contacto
                </Link>
              </>
            ) : null}
            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}
                  >
                    Dashboard 💸
                  </Link>
                ) : null}
              </>
            ) : (
              <Link
                href='/api/auth/login'
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
