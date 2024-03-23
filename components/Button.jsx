import ButtonSvg from "./ButtonSvg";

import { Quantico } from 'next/font/google';
const quantico = Quantico({
  subsets: ["latin"],
  display: 'swap',
  weight: '400',
});

import { Source_Code_Pro } from "next/font/google";
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: '200'
})

const ButtonGradient = () => {
  return (
    <svg className="block" width={0} height={0}>
      <defs>
        <linearGradient id="btn-left" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#89F9E8" />
          <stop offset="100%" stopColor="#FACB7B" />
        </linearGradient>
        <linearGradient id="btn-top" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#D87CEE" />
          <stop offset="100%" stopColor="#FACB7B" />
        </linearGradient>
        <linearGradient id="btn-bottom" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#9099FC" />
          <stop offset="100%" stopColor="#89F9E8" />
        </linearGradient>
        <linearGradient
          id="btn-right"
          x1="14.635%"
          x2="14.635%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#9099FC" />
          <stop offset="100%" stopColor="#D87CEE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Button = ({ className, href, onClick, children, px, white }) => {
  const classes = `${sourceCodePro.className} button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${px || "px-7"
    } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <div>
      <button className={classes} onClick={onClick}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
      </button>
      <ButtonGradient />
    </div>

  );

  const renderLink = () => (
    <div>
      <a href={href} className={classes}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
      </a>
      <ButtonGradient />
    </div>
  );

  return href ? renderLink() : renderButton();
};

export default Button;