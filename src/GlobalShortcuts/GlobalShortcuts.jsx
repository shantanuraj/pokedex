import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Keys = {
  f: 70,
  cmd: (e) => navigator.platform.includes('Mac') ? e.metaKey : e.ctrlKey,
}

export function GlobalShortcuts() {
  const history = useHistory();
  useEffect(() => {
    const handleKeydown = (e) => {
      if (Keys.cmd(e) && e.keyCode === Keys.f) {
        e.preventDefault();
        history.push('/search');
      }
    }
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown');
  }, [history]);
  return null;
}
