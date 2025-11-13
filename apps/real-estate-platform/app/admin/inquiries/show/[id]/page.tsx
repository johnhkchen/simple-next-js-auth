"use client"

export const dynamic = 'force-dynamic'


import { Show, TextField } from "@refinedev/antd"
import { useShow } from "@refinedev/core"
import { Typography, Descriptions, Tag } from "antd"
import { useParams } from "next/navigation"

const { Title } = Typography

export default function InquiryShowPage() {
  const params = useParams()
  const { query } = useShow({
    id: params.id as string
  })
  const { data, isLoading } = query
  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Inquiry Details</Title>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">
          <TextField value={record?.name} />
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <TextField value={record?.email} />
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          <TextField value={record?.phone || "-"} />
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          <TextField value={record?.inquiry_type} />
        </Descriptions.Item>
        <Descriptions.Item label="Subject">
          <TextField value={record?.subject || "-"} />
        </Descriptions.Item>
        <Descriptions.Item label="Message">
          <TextField value={record?.message} />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag>{record?.status?.toUpperCase()}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Resolved">
          {record?.resolved ? (
            <Tag color="green">Yes</Tag>
          ) : (
            <Tag>No</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Date Submitted">
          <TextField
            value={record?.created_at ? new Date(record.created_at).toLocaleString() : "-"}
          />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  )
}
