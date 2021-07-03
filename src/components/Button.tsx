import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../hooks/useTheme';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props}: ButtonProps) {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <button 
        className={`button ${isOutlined ? 'outlined' : ''}`} 
        {...props} 
      />
    </div>
  )
}
