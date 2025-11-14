"use client"

export const dynamic = 'force-dynamic'


import { Create, useForm } from "@refinedev/antd"
import { Form, Input, InputNumber, Select } from "antd"
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload"

const { TextArea } = Input

export default function PropertyCreatePage() {
  const { formProps, saveButtonProps, form } = useForm()

  // Transform form data before submission
  const handleFinish = (values: any) => {
    const transformedValues = { ...values }

    // Set main_image_url from first image in array
    if (transformedValues.images && transformedValues.images.length > 0) {
      transformedValues.main_image_url = transformedValues.images[0]
    }

    return formProps.onFinish?.(transformedValues)
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Modern Loft in SOMA" />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Please enter slug" }]}
        >
          <Input placeholder="modern-loft-soma" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} placeholder="Property description..." />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input placeholder="San Francisco, CA" />
        </Form.Item>

        <Form.Item label="Street Address" name="address_street">
          <Input placeholder="123 Main St" />
        </Form.Item>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <Form.Item label="City" name="address_city">
            <Input placeholder="San Francisco" />
          </Form.Item>

          <Form.Item label="State" name="address_state">
            <Input placeholder="CA" />
          </Form.Item>

          <Form.Item label="Zip Code" name="address_zip">
            <Input placeholder="94105" />
          </Form.Item>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <Form.Item label="Bedrooms" name="bedrooms">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Bathrooms" name="bathrooms">
            <InputNumber min={0} step={0.5} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Square Feet" name="sqft">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item label="Property Type" name="property_type" initialValue="residential">
          <Select>
            <Select.Option value="residential">Residential</Select.Option>
            <Select.Option value="commercial">Commercial</Select.Option>
            <Select.Option value="land">Land</Select.Option>
            <Select.Option value="multi-family">Multi-Family</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Listing Type" name="listing_type" initialValue="sale">
          <Select>
            <Select.Option value="sale">For Sale</Select.Option>
            <Select.Option value="rent">For Rent</Select.Option>
            <Select.Option value="lease">For Lease</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Property Images"
          name="images"
          help="First image will be set as the main property image"
        >
          <CloudinaryUpload maxFiles={10} folder="properties" />
        </Form.Item>

        <Form.Item label="Status" name="status" initialValue="draft">
          <Select>
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="published">Published</Select.Option>
            <Select.Option value="archived">Archived</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Create>
  )
}
