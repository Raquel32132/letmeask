import { useTheme } from '../hooks/useTheme';

import '../styles/toggle-button.scss';

export function ToggleButton() {

  const { toggleTheme, checkButtonTheme } = useTheme(); 

  return(
    <div id="toggle-button-wrapper">
      <input onClick={toggleTheme} type="checkbox" checked={checkButtonTheme}/>
      <span></span>
    </div>
  );
}