import { Link } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import { ActivityIndicator, View ,ScrollView, StyleSheet} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LineChart } from 'react-native-gifted-charts';
import Header from '~/components/header'
import Page from '~/components/page'
import {scale} from "react-native-size-matters"
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
        <Header headerTitle='Dashboard' noRightIcon = {true} />
        <ScrollView contentContainerStyle = {styles.container}>
        <DashboardMetricsContainer/>

        <View className='px-4 flex flex-col gap-7'>
            <StockAlertBanner/>
            <AnalyticsChart/>
            <ChartData/>
        </View>
        </ScrollView>
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
    <Card className='bg-primary rounded-3xl' style={{paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 24}}>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-4xl text-white'>{value}</CardTitle>
          <View className='bg-white rounded-full p-4'>
            {icon}
          </View>
        </CardHeader>
        <CardFooter style={{marginTop: 24}}>
          <Text className='text-white font-semibold text-xl' >{title}</Text>
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
        <View className='flex flex-row w-full flex-wrap'  style={{marginBottom: 16}}>
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
            <Text style={{fontSize: 16, fontWeight: 600}}>Low Stock Alert</Text>
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
        { label: "23/8", value: 64 },
        { label: "26/8", value: 93 },
        { label: "29/8", value: 56 },
        { label: "01/9", value: 84 },
        { label: "04/9", value: 67 },
        { label: "07/9", value: 79 },
        { label: "10/9", value: 95 },
        { label: "13/9", value: 61 },
        { label: "16/9", value: 89 },
        { label: "19/9", value: 72 },
    ];

    

    return (
        <View className='bg-primary-tint p-4 rounded-3xl border border-input'>
            <View >
                {
                    // isLoading ? <ActivityIndicator/> :
                    <LineChart data={testData} color="#177AD5" dataPointsColor='#177AD5' />
                }

            </View>
        </View>
    )
}

function ChartData() {
    return (
        <Card>
            <CardHeader className='p-6'>
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

const styles = StyleSheet.create({
    container:{
        paddingBottom:scale(200)
    }

})