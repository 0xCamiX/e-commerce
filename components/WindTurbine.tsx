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
          imgSrc
        }
        width={1280}
        height={1280}
        className='pointer-events-none z-50 select-none'
        alt='extractor eólico imagen'
      />
    </div>
  );
};

export default WindTurbine;
