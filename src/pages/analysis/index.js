import React, { useEffect, useState } from 'react';
import { Button, Table, message, Divider } from 'antd';
import { useDispatch } from 'dva';
import CreateModal from './components/createModal';
import ss from './index.less';

const IndexPage = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const [modalType, setModalType] = useState('add');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => onEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => onDelete(record)}>删除</a>
          </div>
        )
      }
    },
  ];

  useEffect(() => {
    onFetchList();
  }, []);

  const onFetchList = () => {
    dispatch({
      type: 'analysis/getList',
      payload: {}
    }).then((resp) => {
      if (resp) {
        setDataSource(resp);
      }
    });
  };

  const onAdd = () => {
    setVisible(true);
  };

  const onEdit = (record) => {
    setModalType('edit');
    setRecord(record);
    setVisible(true);
  };

  const onDelete = (item) => {
    const { id } = item;
    dispatch({
      type: 'analysis/deluser',
      payload: { id }
    }).then((resp) => {
      if (resp) {
        onFetchList();
        message.success('删除成功');
      }
    });
  }

  return (
    <div className={ss.root}>
      <Button type="primary" onClick={onAdd}>新增</Button>

      <CreateModal
        visible={visible}
        record={record}
        modalType={modalType}
        setModalType={setModalType}
        setVisible={setVisible}
        onFetchList={onFetchList}
      />

      <Table rowKey="id" dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default IndexPage;
