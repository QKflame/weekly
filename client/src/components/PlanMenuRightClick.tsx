import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from '../styles/components/planMenuRightClick.module.scss';

interface IStyle {
  position: any;
  left: number;
  top: number;
}

const PlanMenuRightClick = () => {
  const [show, setShow] = useState<boolean>(false);

  const [style, setStyle] = useState<IStyle>({
    position: 'fixed',
    left: 300,
    top: 20,
  });

  const showRef = useRef();

  const rightClickRef = useRef<any>();

  const handleContextMenu = (event: any) => {
    event.preventDefault();

    setShow(true);

    const { clientX, clientY } = event;

    setStyle({
      ...style,
      left: clientX + 10,
      top: clientY + 10,
    });
  };

  const handleClick = (event: any) => {
    if (!showRef.current) {
      return;
    }

    if (event.target.parentNode !== rightClickRef.current) {
      setShow(false);
    }
  };

  const setShowFalse = () => {
    if (!showRef.current) {
      return;
    }
    setShow(false);
  };

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('scroll', setShowFalse, true);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('scroll', setShowFalse, true);
    };
  }, []);

  useEffect(() => {
    // showRef.current = show;
  }, [show]);

  const renderContentMenu = () => (
    <div
      ref={rightClickRef as any}
      className={cx(styles['right-menu-content-container'])}
      style={style}
    >
      <div className={cx(styles['menu-item'])}>菜单1</div>
      <div className={cx(styles['menu-item'])}>菜单1</div>
      <div className={cx(styles['menu-item'])}>菜单1</div>
      <div className={cx(styles['menu-item'])}>菜单1</div>
    </div>
  );

  return show ? renderContentMenu() : null;
};

export default React.memo(PlanMenuRightClick);
