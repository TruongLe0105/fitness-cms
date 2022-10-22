export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontWeight?:
    | "font-thin"
    | "font-extralight"
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold";
  textClass?: string;
  textColor?:
    | "text-primary-custom"
    | "text-gray-custom"
    | "text-black"
    | "text-white"
    | "text-black-02-custom"
    | "text-red-custom"
    | "text-black-04-custom";
}
