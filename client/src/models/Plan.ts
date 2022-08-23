import {types } from 'mobx-state-tree';

export const Plan = types
  .model({
    menusItems: types.frozen(),
    currentMenuKey: types.string,
    currentPlan: types.frozen(),
    plans: types.frozen(),
    createModalVisible: false
  })
  .actions((self) => {
    const init = () => {
      self.menusItems = [
        {
          label: '2022-Q3',
          key: '2022-Q3',
          level: 1,
          type: 0,
          selected: true,
          opened: true,
          items: [
            {
              label: '0716-0723',
              key: '0716-0723',
              level: 2,
              type: 1
            },
            {
              label: '0717-0724',
              key: '0717-0724',
              level: 2,
              type: 1
            },
          ],
        },
      ];
      self.currentMenuKey = '2022-Q3';
    };

    const setCurrentMenuKey = (key: string) => {
      self.currentMenuKey = key;
    };

    const setCreateModalVisible = (val: boolean) => {
      self.createModalVisible = val;
    };

    return {
      init,
      setCurrentMenuKey,
      setCreateModalVisible
    };
  });
