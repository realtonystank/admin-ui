import {
  Form,
  message,
  Popover,
  Space,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const ProductImage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const uploaderConfig: UploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        console.error("You can only upload JPG/PNG file");
        messageApi.error("You can only upload JPG/PNG file");
      }

      setImageUrl(URL.createObjectURL(file));

      return false;
    },
  };

  return (
    <Form.Item
      label=""
      name="image"
      rules={[
        {
          required: true,
          message: "Please upload a product image",
        },
      ]}
    >
      <Upload listType="picture-card" {...uploaderConfig}>
        {contextHolder}
        {imageUrl ? (
          <Popover
            placement="bottom"
            content={<Typography.Text>Click to replace</Typography.Text>}
            style={{ width: "auto" }}
          >
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          </Popover>
        ) : (
          <Space direction="vertical">
            <PlusOutlined />
            <Typography.Text>Upload</Typography.Text>
          </Space>
        )}
      </Upload>
    </Form.Item>
  );
};

export default ProductImage;
