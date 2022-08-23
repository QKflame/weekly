import React, { useEffect, useState } from 'react';
import { Input, MenuProps } from 'antd';
import { Menu as AntdMenu, Collapse, Empty, Checkbox, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import styles from '../styles/pages/plan.module.scss';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { observer } from 'mobx-react-lite';
import { useMst } from '../models/Root';
import PlanMenu from '../components/PlanMenu';

const { Panel } = Collapse;

const MenuHeader = observer(() => {
  const {plan: store} = useMst();

  const onClickAddIcon = () => {
    store.setCreateModalVisible(true);
  };
  return (
    <div className={cx(styles['menu-header-container'])}>
      <div className={cx(styles['menu-header'])}>清单</div>
      <PlusOutlined className={cx(styles['menu-add-icon'])} onClick={onClickAddIcon} />
    </div>
  );
});

const Menu = observer(() => {
  const { plan: store } = useMst();
  console.log('store: ', store);
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    store.setCurrentMenuKey(e.key);
  };

  const onCreateModalOk = (e: any) => {
    console.log('e', e);
  };

  const onCreateModalCancel = () => {
    store.setCreateModalVisible(false);
  };

  return (
    <div className={cx(styles['menu-container'])}>
      <MenuHeader></MenuHeader>
      {/* <AntdMenu
        className={cx(styles['plan-menus'])}
        onClick={onClick}
        style={{ width: 220 }}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        items={store.menusItems}
      /> */}
      <PlanMenu items={store.menusItems}></PlanMenu>
      <Modal
        title="Basic Modal"
        visible={store.createModalVisible}
        onOk={onCreateModalOk}
        onCancel={onCreateModalCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
});

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function PlanItem() {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const value = '是京东卡老实交代了开始就的克拉斯';
  return (
    <div className={cx(styles['plan-item-container'])}>
      <Checkbox
        className={cx(styles['plan-checkbox'])}
        onChange={onChange}
      ></Checkbox>

      <div className={cx(styles['plan-item-content'])}>
        <Input
          defaultValue="无标题"
          value={value}
          bordered={false}
          className={cx(styles['plan-item-input'])}
        />
        <div className={cx(styles['plan-thumbnail'])}>
          圣诞节快乐是点击蓝思科技的克拉斯就大厦考虑到吉安市肯德基拉手孔
        </div>
      </div>
    </div>
  );
}

function PlanList() {
  return (
    <div className={cx(styles['plan-list-container'])}>
      <h3>的数据库担惊受恐大家梳理</h3>

      <Input
        className="plan-input"
        placeholder="+ 点击回车添加任务"
        allowClear
      />

      <Collapse defaultActiveKey={['1']} ghost className="plan-collapse">
        <Panel header="高优先级" key="1">
          <PlanItem />
        </Panel>
        <Panel header="中优先级" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="低优先级" key="3">
          <p>{text}</p>
        </Panel>
        <Panel header="无优先级" key="4">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  );
}

function OperationBar() {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className={cx(styles['operation-bar-container'])}>
      <div className={cx(styles['left-container'])}>
        <Checkbox
          className={cx(styles['plan-checkbox'])}
          onChange={onChange}
        ></Checkbox>
      </div>
      <div className={cx(styles['right-container'])}></div>
    </div>
  );
}

function PlanEditor() {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('<p>hello</p>');
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>');
    }, 1500);
  }, []);

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      'group-image',
      'group-video',
      'headerSelect',
      'fullScreen',
      '|',
      'fontSize',
      'fontFamily',
      'lineHeight',
      'divider',
    ],
  };

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div className={cx(styles['plan-editor-container'])}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #f2f2f2' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: 'calc(100vh - 300px)', overflowY: 'hidden' }}
        />
      </div>
    </>
  );
}

function PlanContent() {
  const value = '是点击开始的可接受的健康山东健康山东';
  return (
    <div className={cx(styles['plan-content-container'])}>
      <Input
        placeholder="无标题"
        value={value}
        bordered={false}
        className={cx(styles['plan-detail-title-input'])}
      />
      <Input
        placeholder="请输入卡片地址"
        bordered={false}
        className={cx(styles['plan-detail-cardLink-input'])}
      />
      <PlanEditor />
    </div>
  );
}

function PlanDetail() {
  const isEmpty = false;
  return (
    <div className={cx(styles['plan-detail-container'])}>
      {isEmpty ? (
        <Empty
          className={cx(styles['empty-detail'])}
          description="点击任务标题查看详情"
        />
      ) : (
        <div>
          <OperationBar />
          <PlanContent />
        </div>
      )}
    </div>
  );
}

export default function Plan() {
  return (
    <div className={cx('plans-page-container', styles['plans-page-container'])}>
      <Menu />
      <div className={cx(styles['plans-content-container'])}>
        <PlanList />
        <PlanDetail />
      </div>
    </div>
  );
}
