import React from 'react'
import { Button, Form, Input, Select, Space, Tooltip } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { CloseOutlined } from '@ant-design/icons'
import { columnType } from 'constants/table'
import { constants } from './constants'
import classes from './TableConfig.module.css'

const { Option } = Select
const { List, Item, ErrorList } = Form

export const TableConfig = ({ columns, setColumns }) => {
  const [instance] = Form.useForm()
  return (
    <Form
      form={instance}
      initialValues={{ columns }}
      onFinish={setColumns}
    >
      <List name='columns' rules={[{
        validator: (nullArg, columns) => {
          if (!columns || columns.length === 0) {
            return Promise.reject(new Error('At least one column should be provided'))
          } else {
            return Promise.resolve()
          }
        }
      }]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} direction='vertical' className={classes['field-wrapper']}>
                <Item
                  {...field}
                  label={constants.title}
                  name={[field.name, 'title']}
                  fieldKey={[field.fieldKey, 'title']}
                  required={true}
                  rules={[
                    { required: true, message: constants.requiredField },
                    {
                      validator: (nullArg, value) => {
                        if (instance.getFieldsValue().columns.filter(
                          ({ title }) => title && title === value
                        ).length > 1) {
                          return Promise.reject(new Error('Title must be unique'))
                        } else {
                          return Promise.resolve()
                        }
                      }
                    }
                  ]}
                >
                  <Input placeholder={constants.title} />
                </Item>
                <Item
                  {...field}
                  label={constants.type}
                  name={[field.name, 'type']}
                  fieldKey={[field.fieldKey, 'type']}
                >
                  <Select>
                    <Option value={columnType.string}>{columnType.string}</Option>
                    <Option value={columnType.number}>{columnType.number}</Option>
                    <Option value={columnType.date}>{columnType.date}</Option>
                    <Option value={columnType.boolean}>{columnType.boolean}</Option>
                  </Select>
                </Item>
                <div className={classes.remove}>
                  <Tooltip title='Remove' placement='bottom'>
                    <CloseOutlined onClick={() => remove(field.name)} />
                  </Tooltip>
                </div>
              </Space>
            ))}
            <Item>
              <Button type='dashed' onClick={() => {
                add({ id: uuidv4(), type: columnType.string })
              }} block>
                {constants.addColumn}
              </Button>
              <div className={classes.error}>
                <ErrorList errors={errors} />
              </div>
            </Item>
          </>
        )}
      </List>
      <Item>
        <Button type='primary' htmlType='submit'>
          {constants.submit}
        </Button>
      </Item>
    </Form>
  )
}
