"use client"

export const dynamic = 'force-dynamic'


import { useTable, ShowButton, EditButton } from "@refinedev/antd"
import { List } from "@refinedev/antd"
import { Table, Space, Tag } from "antd"

export default function InquiriesListPage() {
  const { tableProps } = useTable({
    resource: "inquiries",
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
  })

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="phone" title="Phone" />
        <Table.Column
          dataIndex="inquiry_type"
          title="Type"
          render={(value) => {
            const typeMap: Record<string, string> = {
              "property-viewing": "Viewing",
              "general-info": "Info",
              "agent-contact": "Agent",
              other: "Other",
            }
            return typeMap[value] || value
          }}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => {
            const colorMap: Record<string, string> = {
              new: "blue",
              contacted: "orange",
              qualified: "purple",
              showing: "cyan",
              offer: "gold",
              closed: "green",
            }
            return <Tag color={colorMap[value] || "default"}>{value?.toUpperCase()}</Tag>
          }}
        />
        <Table.Column
          dataIndex="resolved"
          title="Resolved"
          render={(value) => (value ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>)}
        />
        <Table.Column
          dataIndex="created_at"
          title="Date"
          render={(value) => new Date(value).toLocaleDateString()}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}
