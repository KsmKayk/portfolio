import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  as: 'a';
}

export function Button({ variant = 'ghost', className = '', children, ...props }: ButtonProps) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;
  return <button className={cls} {...props}>{children}</button>;
}

export function LinkButton({ variant = 'ghost', className = '', children, as: _as, ...props }: LinkButtonProps) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;
  return <a className={cls} {...props}>{children}</a>;
}
