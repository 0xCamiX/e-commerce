import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface WindTurbineProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const WindTurbine = ({
  imgSrc,
  className,
  dark = false,
  ...props
}: WindTurbineProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}>
      <img
        src={
          dark
            ? '/products/wind-turbine-scaled.png'
            : '/products/wind-turbine-scaled.png'
        }
        width={600}
        height={600}
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />
    </div>
  );
};

export default WindTurbine;
