"use client"

import { Refine, AuthProvider } from "@refinedev/core"
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar"
import routerProvider from "@refinedev/nextjs-router"
import { dataProvider, liveProvider } from "@refinedev/supabase"
import { ThemedLayout } from "@refinedev/antd"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { App as AntdApp, ConfigProvider } from "antd"
import {
  DashboardOutlined,
  HomeOutlined,
  MessageOutlined,
  LineChartOutlined,
  SettingOutlined,
  StarOutlined,
  FileTextOutlined
} from "@ant-design/icons"
import { createClient } from "@/lib/supabase/client"

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true, redirectTo: "/admin" }
  },

  logout: async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    return { success: true, redirectTo: "/auth/login" }
  },

  check: async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()

    if (data?.user) {
      return { authenticated: true }
    }

    return {
      authenticated: false,
      redirectTo: "/auth/login",
      logout: true,
    }
  },

  getIdentity: async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()

    return {
      id: data.user?.id,
      name: data.user?.email,
      avatar: data.user?.user_metadata?.avatar_url,
    }
  },

  onError: async (error) => {
    console.error(error)
    return { error }
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseClient = createClient()

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2563eb", // Blue primary color
            borderRadius: 6,
          },
        }}
      >
        <AntdApp>
          <RefineKbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              resources={[
                {
                  name: "dashboard",
                  list: "/admin",
                  meta: {
                    label: "Dashboard",
                    icon: <DashboardOutlined />,
                  },
                },
                {
                  name: "properties",
                  list: "/admin/properties",
                  create: "/admin/properties/create",
                  edit: "/admin/properties/edit/:id",
                  show: "/admin/properties/show/:id",
                  meta: {
                    label: "Properties",
                    icon: <HomeOutlined />,
                  },
                },
                {
                  name: "inquiries",
                  list: "/admin/inquiries",
                  edit: "/admin/inquiries/edit/:id",
                  show: "/admin/inquiries/show/:id",
                  meta: {
                    label: "Inquiries",
                    icon: <MessageOutlined />,
                  },
                },
                {
                  name: "analytics",
                  list: "/admin/analytics",
                  meta: {
                    label: "Analytics",
                    icon: <LineChartOutlined />,
                  },
                },
                {
                  name: "settings",
                  list: "/admin/settings",
                  meta: {
                    label: "Settings",
                    icon: <SettingOutlined />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "real-estate-platform",
              }}
            >
              <ThemedLayout>
                {children}
              </ThemedLayout>
              <RefineKbar />
            </Refine>
          </RefineKbarProvider>
        </AntdApp>
      </ConfigProvider>
    </AntdRegistry>
  )
}
