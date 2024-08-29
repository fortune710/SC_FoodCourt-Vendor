import { Link } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import { View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
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

export default function AdminDashboard() {
  return (
    <Page>
        <Header headerTitle='Dashboard' />
        <DashboardMetricsContainer/>
        <StockAlertBanner/>
        <ChartData/>
        
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
    <Card className='w-full bg-primary'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>{value}</CardTitle>
          <View className='bg-white rounded-full p-4'>
            {icon}
          </View>
        </CardHeader>
        <CardFooter>
          <Text className='text-white font-medium text-lg'>{title}</Text>
        </CardFooter>
    </Card>
    )
}


function DashboardMetricsContainer() {
    const metrics: DashboardMetricCardProps[] = [
        {
            title: "Orders Received Today",
            value: 89,
            icon: <ShoppingCart stroke="#F72F2F"/>
        },
        {
            title: "Orders Received Today",
            value: 89,
            icon: <ShoppingCart stroke="#F72F2F"/>
        },
        {
            title: "Orders Received Today",
            value: 89,
            icon: <ShoppingCart stroke="#F72F2F"/>
        },
        {
            title: "Orders Received Today",
            value: 89,
            icon: <ShoppingCart stroke="#F72F2F"/>
        },
    ]

    return (
        <View className='flex flex-row gap-4 w-full'>
            {
                metrics.map((metric) => (
                    <View className='w-1/2'>
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

function ChartData() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Fulfillment Rate</CardTitle>
            </CardHeader>
            <CardContent>
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
