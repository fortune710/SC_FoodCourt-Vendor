import { Link } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import { ActivityIndicator, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LineChart } from 'react-native-gifted-charts';
import Header from '~/components/header'
import Page from '~/components/page'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import useAnalytics from '~/hooks/useAnalytics';
import useResturant from '~/hooks/useResturant';

export default function AdminDashboard() {
  return (
    <Page>
        <Header headerTitle='Dashboard' />
        <DashboardMetricsContainer/>

        <View className='px-4 flex flex-col gap-7'>
            <StockAlertBanner/>
            <AnalyticsChart/>
            <ChartData/>
        </View>
        
    </Page>
  )
}

interface DashboardMetricCardProps {
    title: string,
    value: number,
    icon: React.ReactNode
}


function DashboardMetricsCard({ title, value, icon }: DashboardMetricCardProps) {
    return (
    <Card className='w-full bg-primary rounded-3xl'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-4xl text-white'>{value}</CardTitle>
          <View className='bg-white rounded-full p-4'>
            {icon}
          </View>
        </CardHeader>
        <CardFooter>
          <Text className='text-white font-semibold text-sm'>{title}</Text>
        </CardFooter>
    </Card>
    )
}


function DashboardMetricsContainer() {
    const { resturant } = useResturant();
    const { metrics: dashboardMetrics } = useAnalytics(resturant?.id!);

    const metrics: DashboardMetricCardProps[] = [
        {
            title: "Orders Received Today",
            value: dashboardMetrics?.ordersReceivedToday || 0,
            icon: <ShoppingCart size="16px" stroke="#F72F2F"/>
        },
        {
            title: "Orders Accepted Today",
            value: dashboardMetrics?.ordersAcceptedToday || 0,
            icon: <ShoppingCart size="16px" stroke="#F72F2F"/>
        },
        {
            title: "Orders Ready",
            value: dashboardMetrics?.ordersReady || 0,
            icon: <ShoppingCart size="16px" stroke="#F72F2F"/>
        },
        {
            title: "Orders Delivered",
            value: dashboardMetrics?.ordersDelivered || 0,
            icon: <ShoppingCart size="16px" stroke="#F72F2F"/>
        },
    ]

    return (
        <View className='flex flex-row w-full flex-wrap'>
            {
                metrics.map((metric, index) => (
                    <View key={index}  className='w-1/2 py-2 px-2'>
                        <DashboardMetricsCard {...metric}/>
                    </View>
                ))
            }
        </View>
    )
}


function StockAlertBanner() {
    return (
        <View className='border border-black rounded-lg p-4'>
            <Text>Low Stock Alert</Text>
            <Text>
                You have 8 low stock items. <Link className='text-primary' href="/admin/stock">See them</Link>
            </Text>
        </View>
    )
}

function AnalyticsChart() {
    //const { resturant } = useResturant();
    //const { orderCounts, isLoading } = useAnalytics(resturant?.id);

    const testData = [
        { label: "19-Sep", value: 72 },
        { label: "16-Sep", value: 89 },
        { label: "13-Sep", value: 61 },
        { label: "10-Sep", value: 95 },
        { label: "07-Sep", value: 79 },
        { label: "04-Sep", value: 67 },
        { label: "01-Sep", value: 84 },
        { label: "29-Aug", value: 56 },
        { label: "26-Aug", value: 93 },
        { label: "23-Aug", value: 64 }
    ];

    

    return (
        <View className='bg-primary-tint p-4 rounded-3xl border border-input'>
            <View className='bg-accent'>
                {
                    //isLoading ? <ActivityIndicator/> :
                    <LineChart data={testData} color="#177AD5" dataPointsColor='#177AD5' />

                }

            </View>
        </View>
    )
}

function ChartData() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Fulfillment Rate</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-row items-center justify-between'>
                <View className='w-3/5'>
                    <Text>Total Orders</Text>
                    <Text>Completed</Text>
                    <Text>Cancelled</Text>
                </View>
                <AnimatedCircularProgress
                    fill={70}
                    width={15}
                    size={100}
                />
            </CardContent>
        </Card>
    )
}
