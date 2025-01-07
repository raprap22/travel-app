import React, { useState, useEffect } from 'react';
import { Form as AntForm, Input, Select, Radio, Checkbox, Button, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormProps } from '../types/components';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const { Option } = Select;

const Form: React.FC<FormProps & { isEdit?: boolean; initialData?: Record<string, any> }> = ({
  fields,
  onSubmit,
  title = '',
  submitLabel = 'Submit',
  isAuthComp = false,
  style,
  isLoading,
  noBg = false,
  insideModal = false,
  isEdit = false,
  initialData,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [form] = AntForm.useForm();

  const navigate = useNavigate();

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (values: Record<string, any>) => {
    if (isEdit) {
      onSubmit({ ...values, id: initialData?.id });
    } else {
      onSubmit(values);
    }
  };

  const handleRegister = () => {
    navigate('/auth/register');
  };

  return (
    <div className={clsx(style ?? style, insideModal ? '' : 'max-w-md', 'flex flex-col w-full')}>
      <Typography.Title level={4} className="text-center text-gray-700 font-bold mb-4">
        {title}
      </Typography.Title>
      <div className={noBg ? '' : 'bg-gray-50 rounded-lg shadow-lg p-6'}>
        <AntForm
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="flex flex-col"
          initialValues={initialData || {}}
        >
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              {(field.type === 'text' || field.type === 'number' || field.type === 'date') && (
                <AntForm.Item
                  label={field.label}
                  name={field.name}
                  rules={[{ required: true, message: `${field.label} is required` }]}
                >
                  <Input
                    type={field.type}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="rounded-md bg-white shadow-sm w-full"
                  />
                </AntForm.Item>
              )}

              {field.type === 'password' && (
                <AntForm.Item
                  label={field.label}
                  name={field.name}
                  rules={[{ required: true, message: `${field.label} is required` }]}
                >
                  <Input.Password
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="rounded-md bg-white shadow-sm w-full"
                  />
                </AntForm.Item>
              )}

              {field.type === 'textarea' && (
                <AntForm.Item
                  label={field.label}
                  name={field.name}
                  rules={[{ required: true, message: `${field.label} is required` }]}
                >
                  <Input.TextArea
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    rows={4}
                    className="rounded-md bg-white shadow-sm w-full"
                  />
                </AntForm.Item>
              )}

              {field.type === 'select' && field.options && (
                <AntForm.Item
                  label={field.label}
                  name={field.name}
                  rules={[{ required: true, message: `Please select ${field.label}` }]}
                >
                  <Select
                    onChange={(value) => handleChange(field.name, value)}
                    className="rounded-md bg-white shadow-sm w-full"
                  >
                    {field.options.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </AntForm.Item>
              )}

              {field.type === 'radio' && field.options && (
                <AntForm.Item label={field.label} name={field.name}>
                  <Radio.Group
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="space-y-2 w-full"
                  >
                    {field.options.map((option) => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </AntForm.Item>
              )}

              {field.type === 'checkbox' && field.options && (
                <AntForm.Item label={field.label} name={field.name}>
                  <Checkbox.Group
                    options={field.options.map((option) => ({
                      label: option.label,
                      value: option.value,
                    }))}
                    onChange={(checkedValues) => handleChange(field.name, checkedValues)}
                    className="space-y-2 w-full"
                  />
                </AntForm.Item>
              )}

              {field.type === 'file' && (
                <AntForm.Item
                  label={field.label}
                  name={field.name}
                  rules={[{ required: true, message: `${field.label} is required` }]}
                >
                  <Upload
                    beforeUpload={() => false}
                    onChange={(info) => handleChange(field.name, info.fileList)}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </AntForm.Item>
              )}
            </div>
          ))}

          <AntForm.Item>
            <Button
              type="primary"
              variant="filled"
              htmlType="submit"
              className="mt-4 text-white py-2 rounded-md shadow-md w-full"
              disabled={isLoading}
              loading={isLoading}
            >
              {isEdit ? 'Simpan Perubahan' : submitLabel}
            </Button>
          </AntForm.Item>
          {isAuthComp && (
            <Typography
              className="text-xs cursor-pointer w-full text-center"
              onClick={() => handleRegister()}
            >
              Register Here
            </Typography>
          )}
        </AntForm>
      </div>
    </div>
  );
};

export default Form;
