import { Link } from 'expo-router';
import { ArrowsUpFromLine, ShoppingBag, ShoppingCart, Truck } from 'lucide-react-native';
import { ActivityIndicator, Image, View ,ScrollView, StyleSheet} from 'react-native'
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
import ChangePasswordDialog from '~/components/change-password-dialog';
import useOrders from '~/hooks/useOrders';
import { OrderStatus } from '~/utils/types';
import useThemeColor from '~/hooks/useThemeColor';
import useStock from '~/hooks/useStock';
import useMenuItems from '~/hooks/useMenuItems';

export default function AdminDashboard() {
  return (
    <Page>
        <Header headerTitle='Dashboard' noRightIcon = {true} />
        <ScrollView contentContainerStyle = {styles.container}>
        <DashboardMetricsContainer/>

        <ChangePasswordDialog/>

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
    <Card className='bg-primary' style={{paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 24}}>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-4xl text-white'>{value}</CardTitle>
          <View className='bg-white rounded-full p-4'>
            {icon}
          </View>
        </CardHeader>
        <CardFooter style={{marginTop: 24}}>
          <Text className='text-white font-semibold text-lg' >{title}</Text>
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
            //Usiere- My SVGs are just not visible. I've checked the stroke color in the code and still nothing

            // icon: <Image source={require("../../../assets/icons/shopping-cart.svg")} style={{ height: 30, width: 30 }}/>
            // icon: <View style={{ backgroundColor: 'green' }}><Image source={require("../../../assets/icons/shopping-cart.svg")} style={{ height: 30, width: 30 }}/></View>
            // icon: <View style={{ height: 30, width: 30, backgroundColor: 'green' }}/>
        },
        {
            title: "Orders Accepted Today",
            value: dashboardMetrics?.ordersAcceptedToday || 0,
            icon: <ArrowsUpFromLine size="16px" stroke="#F72F2F"/>
        },
        {
            title: "Orders Ready",
            value: dashboardMetrics?.ordersReady || 0,
            icon: <ShoppingBag size="16px" stroke="#F72F2F"/>
        },
        {
            title: "Orders Delivered",
            value: dashboardMetrics?.ordersDelivered || 0,
            icon: <Truck size="16px" stroke="#F72F2F"/>
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
    const { menuItemsRaw, isLoading } = useMenuItems();

    const lowStockCount = menuItemsRaw?.filter((item) => item.quantity < item.warning_stock_value).length;

    if (isLoading || lowStockCount === 0) return null

    return (
        <View className='border border-black rounded-lg p-4'>
            <Text style={{fontSize: 16, fontWeight: 600}}>Low Stock Alert</Text>
            <Text>
                You have {lowStockCount} low stock items. <Link className='text-primary' href="/admin/stock">See them</Link>
            </Text>
        </View>
    )
}

function AnalyticsChart() {
    const { resturant } = useResturant();
    const { orderCounts } = useAnalytics(resturant?.id!);
    const primary = useThemeColor({}, "primary");
    
    

    return (
        <View className='bg-primary-tint overflow-hidden p-4 rounded-3xl border border-input'>
            <Text className='text-2xl font-semibold'>Orders in Past 30 Days</Text>
            <View className='mt-4'>
                {
                    // isLoading ? <ActivityIndicator/> :
                    <LineChart 
                        width={scale(250)}
                        data={orderCounts} 
                        color={primary} 
                        dataPointsColor={primary} 
                    />
                }
            </View>
        </View>
    )
}

function ChartData() {
    const { orders } = useOrders();
    const primary = useThemeColor({}, "primary");

    const cancelledOrders = orders?.filter((order) => order.status === OrderStatus.Cancelled);
    const completedOrders = orders?.filter((order) => order.status >= OrderStatus.Completed && order.status <= OrderStatus.Collected);
    const successRate = completedOrders?.length! / orders?.length!
    

    const data = [
        {
            name: "Total Orders",
            value: orders?.length || 0,
        },
        {
            name: "Completed",
            value: completedOrders?.length || 0,
        },
        {
            name: "Cancelled",
            value: cancelledOrders?.length || 0,
        },
    ]

    return (
        <Card>
            <CardHeader className='p-6'>
                <CardTitle>Order Fulfillment Rate</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-row items-center justify-between'>
                <View className='w-3/5'>
                    {
                        data.map((metric) => (
                            <View key={metric.name} className='py-2 flex flex-row gap-5'>
                                <Text className='text-xl'>{metric.name}</Text>
                                <Text className='text-2xl font-semibold'>{metric.value}</Text>
                            </View>
                        ))
                    }
                </View>
                <AnimatedCircularProgress
                    fill={successRate * 100}
                    key={successRate}
                    backgroundColor={primary + "80"}
                    tintColor={primary}
                    width={10}
                    size={120}
                    style={{ borderRadius: 10 }}
                    children={() => <Text className='text-2xl font-semibold'>{successRate * 100}%</Text>}
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