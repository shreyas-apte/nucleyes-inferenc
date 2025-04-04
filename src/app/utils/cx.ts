import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

const cx = (...classes: ClassValue[]) => twMerge(clsx(classes));

export default cx;
