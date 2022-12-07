import React, { useState } from 'react';
import { Form, Input, Button, Space, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Index',
    key: 'index',
    dataIndex: 'index',
    width: '10%',
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    width: '35%',
    render: (record) => {
      console.log(record);
      return (
        <>
          <Form>
            <Form.Item
              label="Name"
              key={record.key}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Enter your name!',
                },
              ]}
            >
              <Input id={record.key} />
            </Form.Item>
          </Form>
        </>
      );
    },
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    width: '40%',
    key: 'companyName',
    render: (record) => {
      return (
        <Form name="dynamic_form_nest_item">
          <Form.List name="company" key={record.key}>
            {(fields, { add, remove }) => (
              <>
                {console.log({ fields })}
                {fields.map((field, index) => (
                  <Space
                    key={index}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          required: true,
                          message: 'Company name is missing',
                        },
                      ]}
                    >
                      <Input placeholder="company Name" id={record.key} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add company Name
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      );
    },
  },
];
const DataTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [count, setCount] = useState(1);
  const handleAdd = () => {
    const newData = {
      key: count,
      name: '',
      index: count,
      companyName: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  return (
    <>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>

      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.key}
        />
      </Form>
    </>
  );
};
export default DataTable;
