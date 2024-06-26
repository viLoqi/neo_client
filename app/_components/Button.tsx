import { ButtonHTMLAttributes, FC } from "react";

import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800',
    {
        variants: {
            variant: {
                default:
                    'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900',
                outline:
                    'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
            },
            size: {
                default: 'h-10 py-2 px-4',
                sm: 'h-9 px-2 rounded-md',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        }
    }
)

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Button: FC<ButtonProps> = ({ className, size, variant, ...props }) => {
    return <button className={cn(buttonVariants({ variant, size, className }))}  {...props} />
}

export { Button, buttonVariants }