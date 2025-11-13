"use client"

export const dynamic = 'force-dynamic'


import { Show, TextField, NumberField } from "@refinedev/antd"
import { useShow } from "@refinedev/core"
import { Typography, Descriptions, Tag, Space } from "antd"
import { useParams } from "next/navigation"

const { Title } = Typography

export default function PropertyShowPage() {
  const params = useParams()
  const { query } = useShow({
    id: params.id as string
  })
  const { data, isLoading } = query
  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      {record?.main_image_url && (
        <img
          src={record.main_image_url}
          alt={record.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "24px",
          }}
        />
      )}

      <Title level={5}>Property Details</Title>
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Title">
          <TextField value={record?.title} />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag
            color={
              record?.status === "published"
                ? "green"
                : record?.status === "draft"
                ? "orange"
                : "red"
            }
          >
            {record?.status?.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          <NumberField
            value={record?.price}
            options={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Location">
          <TextField value={record?.location} />
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          <TextField
            value={
              record?.address_street
                ? `${record.address_street}, ${record.address_city}, ${record.address_state} ${record.address_zip}`
                : "-"
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="Property Type">
          <TextField value={record?.property_type} />
        </Descriptions.Item>
        <Descriptions.Item label="Listing Type">
          <TextField value={record?.listing_type} />
        </Descriptions.Item>
        <Descriptions.Item label="Bedrooms">
          <NumberField value={record?.bedrooms || 0} />
        </Descriptions.Item>
        <Descriptions.Item label="Bathrooms">
          <NumberField value={record?.bathrooms || 0} />
        </Descriptions.Item>
        <Descriptions.Item label="Square Feet">
          <NumberField value={record?.sqft} />
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          <TextField value={record?.description} />
        </Descriptions.Item>
      </Descriptions>
    </Show>
  )
}
