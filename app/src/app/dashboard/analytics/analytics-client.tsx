"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BarChart as BarChartIcon, TrendingUp, Activity, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// 模拟响应时间数据（最近30天）
const responseTimeData = [
  { date: "Jan 1", time: 245 },
  { date: "Jan 3", time: 238 },
  { date: "Jan 5", time: 256 },
  { date: "Jan 7", time: 242 },
  { date: "Jan 9", time: 251 },
  { date: "Jan 11", time: 248 },
  { date: "Jan 13", time: 239 },
  { date: "Jan 15", time: 263 },
  { date: "Jan 17", time: 252 },
  { date: "Jan 19", time: 247 },
  { date: "Jan 21", time: 241 },
  { date: "Jan 23", time: 258 },
  { date: "Jan 25", time: 244 },
  { date: "Jan 27", time: 249 },
  { date: "Jan 29", time: 246 },
  { date: "Jan 31", time: 253 },
  { date: "Feb 2", time: 240 },
  { date: "Feb 4", time: 245 },
]

// 模拟API健康数据
const apiHealthData = [
  { name: "Stripe Payment API", successRate: 99.8, checks: 1234 },
  { name: "GitHub API", successRate: 99.9, checks: 987 },
  { name: "SendGrid Email", successRate: 99.5, checks: 756 },
  { name: "Twilio SMS", successRate: 99.7, checks: 543 },
  { name: "AWS S3", successRate: 100, checks: 432 },
]

// 自定义Tooltip组件
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-primary">
          {payload[0].value}ms
        </p>
      </div>
    )
  }
  return null
}

const HealthTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium mb-1">{payload[0].payload.name}</p>
        <p className="text-sm text-primary">
          Success Rate: {payload[0].value}%
        </p>
        <p className="text-xs text-muted-foreground">
          Total Checks: {payload[0].payload.checks}
        </p>
      </div>
    )
  }
  return null
}

export default function AnalyticsPageClient() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed insights into your API monitoring performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,952</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">
              -12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              +0.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schema Changes</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Detected this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Response Time Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
            <CardDescription>
              Average API response times over the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  label={{ value: 'Response Time (ms)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Average response time decreased by 12% this month</span>
            </div>
          </CardContent>
        </Card>

        {/* API Health Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle>API Health Overview</CardTitle>
            <CardDescription>
              Success rate by API endpoint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={apiHealthData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  type="number"
                  domain={[98, 100]}
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                  label={{ value: 'Success Rate (%)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip content={<HealthTooltip />} />
                <Bar
                  dataKey="successRate"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4 text-green-600" />
              <span>All APIs maintaining 99.5%+ success rate</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest API checks and schema changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <p className="text-sm font-medium">Stripe Payment API</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Check #3952 - 200 OK - 234ms - No changes detected
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  2 minutes ago
                </p>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <p className="text-sm font-medium">GitHub REST API</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Check #3951 - 200 OK - 189ms - No changes detected
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  15 minutes ago
                </p>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
                    <p className="text-sm font-medium">SendGrid Email API</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Check #3950 - 200 OK - 312ms - Schema change detected (LOW)
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  1 hour ago
                </p>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <p className="text-sm font-medium">Twilio SMS API</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Check #3949 - 200 OK - 276ms - No changes detected
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  2 hours ago
                </p>
              </div>

              <div className="flex items-center justify-between pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <p className="text-sm font-medium">AWS S3 API</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Check #3948 - 200 OK - 198ms - No changes detected
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  3 hours ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
