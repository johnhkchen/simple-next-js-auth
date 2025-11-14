"use client"

export const dynamic = 'force-dynamic'


import { useList } from "@refinedev/core"
import { List, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd"
import { Table, Space, Tag } from "antd"

export default function PropertiesListPage() {
  const { tableProps } = useTable({
    resource: "properties",
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
        <Table.Column
          dataIndex="images"
          title="Image"
          render={(images, record: any) => {
            const imageUrl = images?.[0] || record.main_image_url
            return imageUrl ? (
              <img
                src={imageUrl}
                alt="Property"
                style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 4 }}
              />
            ) : (
              <div style={{ width: 80, height: 60, background: "#f0f0f0", borderRadius: 4 }} />
            )
          }}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="location" title="Location" />
        <Table.Column
          dataIndex="price"
          title="Price"
          render={(value) => `$${value?.toLocaleString()}`}
        />
        <Table.Column
          dataIndex={["bedrooms"]}
          title="Beds"
          render={(value) => value || "-"}
        />
        <Table.Column
          dataIndex={["bathrooms"]}
          title="Baths"
          render={(value) => value || "-"}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => {
            const color =
              value === "published"
                ? "green"
                : value === "draft"
                ? "orange"
                : "red"
            return <Tag color={color}>{value?.toUpperCase()}</Tag>
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}
