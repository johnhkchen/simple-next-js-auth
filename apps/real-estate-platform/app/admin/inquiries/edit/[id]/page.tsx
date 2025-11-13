"use client"

export const dynamic = 'force-dynamic'


import { Edit, useForm } from "@refinedev/antd"
import { Form, Input, Select, Switch } from "antd"
import { useParams } from "next/navigation"

const { TextArea } = Input

export default function InquiryEditPage() {
  const params = useParams()
  const { formProps, saveButtonProps, form } = useForm({
    id: params.id as string
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Status" name="status">
          <Select>
            <Select.Option value="new">New</Select.Option>
            <Select.Option value="contacted">Contacted</Select.Option>
            <Select.Option value="qualified">Qualified</Select.Option>
            <Select.Option value="showing">Showing</Select.Option>
            <Select.Option value="offer">Offer</Select.Option>
            <Select.Option value="closed">Closed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Resolved" name="resolved" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Response" name="response">
          <TextArea rows={4} placeholder="Your response to this inquiry..." />
        </Form.Item>

        <Form.Item label="Internal Notes" name="notes">
          <TextArea rows={3} placeholder="Internal notes (not visible to client)..." />
        </Form.Item>
      </Form>
    </Edit>
  )
}
