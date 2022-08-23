import React from 'react';
import cx from 'classnames';
import styles from '../styles/components/planMenu.module.scss';
import { observer } from 'mobx-react-lite';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import PlanMenuRightClick from './PlanMenuRightClick';

export enum MenuType {
  Folder,
  Inventory,
}

export interface MenuProps {
  items: Array<MenuItemProps>;
}

export interface MenuItemProps {
  key: string;
  label: string;
  type: MenuType;
  level: number;
  opened: boolean;
  selected: boolean;
  items?: Array<MenuItemProps>;
}

const MenuItem = (props: MenuItemProps) => {
  const { label, selected, type, opened, items, level } = props;
  return (
    <>
      <div
        className={cx(styles['menu-item-container'], {
          [styles['folder-selected']]: selected && type === MenuType.Folder,
        })}
        style={{ paddingLeft: 20 + (level - 1) * 10 + 'px' }}
      >
        <div className={cx(styles['menu-label'])}>{label}</div>
        {type === MenuType.Folder ? (
          (selected || opened) && items?.length ? (
            <DownOutlined />
          ) : (
            <RightOutlined />
          )
        ) : null}
      </div>
      {items?.map((item) => (
        <MenuItem {...item} key={item.key}></MenuItem>
      ))}
    </>
  );
};

const PlanMenu = observer((props: MenuProps) => {
  const { items } = props;
  return (
    <>
      <div className={cx(styles['plan-menu-container'])}>
        {items &&
          items.map((item) => <MenuItem {...item} key={item.key}></MenuItem>)}
      </div>
      <PlanMenuRightClick />
    </>
  );
});

export default PlanMenu;
